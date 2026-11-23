import { createSlice } from '@reduxjs/toolkit';

import { pageStateReceived } from './pageState';

export type PageName = 'home' | 'search' | 'login' | 'vacancyCreate' | 'forbidden' | 'notFound';

export interface PageMeta {
    name: PageName;
    loading: boolean;
}

export const pageSlice = createSlice({
    name: 'page',
    initialState: { name: 'home', loading: false } as PageMeta,
    reducers: {
        pageLoadingStarted: (state) => {
            state.loading = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(pageStateReceived, (_state, { payload }) => payload.page);
    },
});

export const { pageLoadingStarted } = pageSlice.actions;
