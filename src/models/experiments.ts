import { createSlice } from '@reduxjs/toolkit';

import { pageStateReceived } from './pageState';

export const experimentsSlice = createSlice({
    name: 'experiments',
    initialState: {} as Record<string, boolean>,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(pageStateReceived, (_state, { payload }) => payload.experiments);
    },
});
