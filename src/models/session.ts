import { createSlice } from '@reduxjs/toolkit';

import type { Site, UserType } from './lecturer';
import { pageStateReceived } from './pageState';

export type Lang = 'ru' | 'kk';

export interface SessionState {
    userType: UserType;
    site: Site;
    lang: Lang;
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState: { userType: 'anonymous', site: 'hh.ru', lang: 'ru' } as SessionState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(pageStateReceived, (_state, { payload }) => payload.session);
    },
});
