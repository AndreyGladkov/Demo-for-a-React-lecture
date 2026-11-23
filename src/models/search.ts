import { createSlice } from '@reduxjs/toolkit';

import { pageStateReceived } from './pageState';

export interface Vacancy {
    id: number;
    title: string;
    company: string;
    city: string;
    salary: { from: number; currency: 'RUR' | 'KZT' };
    tags: string[];
    publishedAt: string;
}

export interface SearchState {
    total: number;
    vacancies: Vacancy[];
}

export const searchSlice = createSlice({
    name: 'search',
    initialState: { total: 0, vacancies: [] } as SearchState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(pageStateReceived, (state, { payload }) => payload.search ?? state);
    },
});
