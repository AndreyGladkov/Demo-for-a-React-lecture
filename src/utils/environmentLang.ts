import type { Lang } from '../models/session';

const SERVER_LANG: Lang = 'ru';

let simulatedBrowserLocale: string | undefined;

export const simulateBrowserLocale = (locale: string): void => {
    simulatedBrowserLocale = locale;
};

export const environmentLang = (): Lang => {
    if (typeof window === 'undefined') {
        return SERVER_LANG;
    }
    const browserLocale = simulatedBrowserLocale ?? navigator.language;
    return browserLocale.startsWith('kk') ? 'kk' : 'ru';
};
