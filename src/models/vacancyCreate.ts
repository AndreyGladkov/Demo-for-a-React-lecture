import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getJson } from '../utils/bff';
import { pageStateReceived } from './pageState';

export type LoadSourceStatus = 'draftLoaded' | 'templateLoaded';

export interface PublicationType {
    id: string;
    name: string;
    price: number;
}

export interface VacancyCreateState {
    draft: { title: string; description: string };
    loadSourceStatus: LoadSourceStatus | null;
    availablePublicationTypes: { loading: boolean; data: PublicationType[] | null };
    publicationDate: string;
}

export const fetchPublicationTypes = createAsyncThunk('vacancyCreate/fetchPublicationTypes', () =>
    getJson<PublicationType[]>('/bff/vacancy/publication-types')
);

export const vacancyCreateSlice = createSlice({
    name: 'vacancyCreate',
    initialState: {
        draft: { title: '', description: '' },
        loadSourceStatus: null,
        availablePublicationTypes: { loading: false, data: null },
        publicationDate: new Date(0).toISOString(),
    } as VacancyCreateState,
    reducers: {
        loadSourceStatusReset: (state) => {
            state.loadSourceStatus = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(pageStateReceived, (state, { payload }) => payload.vacancyCreate ?? state)
            .addCase(fetchPublicationTypes.fulfilled, (state, { payload }) => {
                state.availablePublicationTypes = { loading: false, data: payload };
            });
    },
});

export const { loadSourceStatusReset } = vacancyCreateSlice.actions;
