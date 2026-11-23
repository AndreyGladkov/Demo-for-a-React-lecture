import { createSlice } from '@reduxjs/toolkit';

export interface DemoCounters {
    bffRequests: number;
    codesSent: number;
    codeChecks: number;
    sheetOpens: number;
    fuseTripped: boolean;
}

export const demoSlice = createSlice({
    name: 'demo',
    initialState: { bffRequests: 0, codesSent: 0, codeChecks: 0, sheetOpens: 0, fuseTripped: false } as DemoCounters,
    reducers: {
        bffRequested: (state) => {
            state.bffRequests += 1;
        },
        codeSent: (state) => {
            state.codesSent += 1;
        },
        codeChecked: (state) => {
            state.codeChecks += 1;
        },
        sheetOpened: (state) => {
            state.sheetOpens += 1;
        },
        fuseTripped: (state) => {
            state.fuseTripped = true;
        },
    },
});

export const { bffRequested, codeSent, codeChecked, sheetOpened, fuseTripped } = demoSlice.actions;
