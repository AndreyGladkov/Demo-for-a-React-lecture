import type { Lang } from '../models/session';

const currencyCodes = { RUR: 'RUB', KZT: 'KZT' } as const;

const currencySymbols = { RUB: '₽', KZT: '₸' } as const;

const NBSP = '\u00a0';

const monthsGenitive: Record<Lang, string[]> = {
    ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    kk: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
};

const weekdays: Record<Lang, string[]> = {
    ru: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    kk: ['жексенбі', 'дүйсенбі', 'сейсенбі', 'сәрсенбі', 'бейсенбі', 'жұма', 'сенбі'],
};

// Not Intl.NumberFormat: Node 24 ships full ICU and formats kk/KZT as "36 000 ₸", while Chrome 158
// lacks the kk locale and falls back to "KZT 36,000", so the server-rendered price breaks hydration.
export const formatMoney = (amount: number, currency: keyof typeof currencySymbols): string =>
    `${String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP)}${NBSP}${currencySymbols[currency]}`;

export const formatSalary = (amount: number, currency: keyof typeof currencyCodes): string =>
    `от ${formatMoney(amount, currencyCodes[currency])}`;

export const formatPublicationDate = (isoDate: string, lang: Lang): string => {
    const date = new Date(isoDate);
    return `${date.getUTCDate()} ${monthsGenitive[lang][date.getUTCMonth()]}, ${weekdays[lang][date.getUTCDay()]}`;
};
