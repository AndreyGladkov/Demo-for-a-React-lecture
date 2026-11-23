import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { pageStateReceived } from './pageState';
import type { Lang } from './session';

export type UserType = 'anonymous' | 'applicant' | 'employer';
export type Site = 'hh.ru' | 'hh.kz';
export type BrowserLocale = 'ru-RU' | 'kk-KZ';
export type ExperimentName = 'employer_login_2fa';
export type DemoFix = 'loginFormKey' | 'publicationDateLocale' | 'sourceStatusGuard' | 'bottomSheetCleanup';

export interface LecturerSettings {
    userType: UserType;
    site: Site;
    siteLang: Lang;
    browserLocale: BrowserLocale;
    experiments: Record<ExperimentName, boolean>;
    fixes: Record<DemoFix, boolean>;
    strictMode: boolean;
}

export const LECTURER_COOKIE = 'lecturer';

export const defaultLecturerSettings: LecturerSettings = {
    userType: 'anonymous',
    site: 'hh.ru',
    siteLang: 'ru',
    browserLocale: 'ru-RU',
    experiments: { employer_login_2fa: true },
    fixes: {
        loginFormKey: false,
        publicationDateLocale: false,
        sourceStatusGuard: false,
        bottomSheetCleanup: false,
    },
    strictMode: false,
};

export const parseLecturerSettings = (raw: string | undefined): LecturerSettings => {
    if (!raw) {
        return defaultLecturerSettings;
    }
    try {
        const parsed = JSON.parse(raw) as Partial<LecturerSettings>;
        return {
            ...defaultLecturerSettings,
            ...parsed,
            experiments: { ...defaultLecturerSettings.experiments, ...parsed.experiments },
            fixes: { ...defaultLecturerSettings.fixes, ...parsed.fixes },
        };
    } catch {
        return defaultLecturerSettings;
    }
};

export const lecturerSlice = createSlice({
    name: 'lecturer',
    initialState: defaultLecturerSettings,
    reducers: {
        fixToggled: (state, action: PayloadAction<DemoFix>) => {
            state.fixes[action.payload] = !state.fixes[action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(pageStateReceived, (state, { payload }) => payload.lecturer ?? state);
    },
});

export const { fixToggled } = lecturerSlice.actions;
