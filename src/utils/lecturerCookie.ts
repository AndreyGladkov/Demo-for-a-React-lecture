import { LECTURER_COOKIE, type LecturerSettings } from '../models/lecturer';

const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;

export const saveLecturerSettings = (settings: LecturerSettings): void => {
    document.cookie = `${LECTURER_COOKIE}=${encodeURIComponent(JSON.stringify(settings))}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
};

export const applyLecturerSettings = (settings: LecturerSettings): void => {
    saveLecturerSettings(settings);
    window.location.reload();
};

export const resetLecturerSettings = (): void => {
    document.cookie = `${LECTURER_COOKIE}=; path=/; max-age=0`;
};
