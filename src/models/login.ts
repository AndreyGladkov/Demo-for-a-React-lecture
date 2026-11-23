import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { postJson } from '../utils/bff';
import { codeChecked, codeSent } from './demo';
import { pageStateReceived } from './pageState';

export const DEMO_CONFIRMATION_CODE = '4242';

export type LoginStep = 'credentials' | 'code' | 'done';

export interface LoginError {
    code: '2fa_check';
}

export interface LoginState {
    step: LoginStep;
    email: string;
    error: LoginError | null;
}

interface Credentials {
    email: string;
    password: string;
}

export const submitCredentials = createAsyncThunk('login/submitCredentials', (credentials: Credentials) =>
    postJson<{ step: LoginStep }>('/bff/login', credentials)
);

interface CodeCheck {
    login: string;
    code: string;
}

export const sendCode = createAsyncThunk('login/sendCode', async (login: string, { dispatch }) => {
    const { sent } = await postJson<{ sent: boolean }>('/bff/login/send-code', { login });
    if (sent) {
        dispatch(codeSent());
    }
});

export const submitCode = createAsyncThunk('login/submitCode', (check: CodeCheck, { dispatch }) => {
    dispatch(codeChecked());
    return postJson<{ ok: boolean; error?: LoginError }>('/bff/login/code', check);
});

export const loginSlice = createSlice({
    name: 'login',
    initialState: { step: 'credentials', email: '', error: null } as LoginState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(pageStateReceived, (state, { payload }) => payload.login ?? state)
            .addCase(submitCredentials.fulfilled, (state, { payload, meta }) => {
                state.step = payload.step;
                state.email = meta.arg.email;
            })
            .addCase(submitCode.fulfilled, (state, { payload }) => {
                if (payload.ok) {
                    state.step = 'done';
                    state.error = null;
                } else {
                    state.error = payload.error ?? null;
                }
            });
    },
});
