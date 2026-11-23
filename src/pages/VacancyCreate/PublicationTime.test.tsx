import { screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';

import type { RootState } from '../../app/store';
import type { Lang } from '../../models/session';
import { renderWithStore } from '../../test/renderWithStore';
import { simulateBrowserLocale } from '../../utils/environmentLang';
import { formatPublicationDate } from '../../utils/format';
import { PublicationTime } from './PublicationTime';

const stateWithSiteLang = (lang: Lang): Partial<RootState> => ({
    session: { userType: 'employer', site: 'hh.kz', lang },
    vacancyCreate: {
        draft: { title: '', description: '' },
        loadSourceStatus: null,
        availablePublicationTypes: { loading: false, data: [] },
        publicationDate: '2024-08-30T12:00:00.000Z',
    },
});

afterEach(() => {
    simulateBrowserLocale('ru-RU');
});

test('formats the date in both languages', () => {
    expect(formatPublicationDate('2024-08-30T12:00:00.000Z', 'ru')).toBe('30 августа, пятница');
    expect(formatPublicationDate('2024-08-30T12:00:00.000Z', 'kk')).toBe('30 тамыз, жұма');
});

test.each([
    { browserLocale: 'kk-KZ', siteLang: 'ru', publicationDateLocale: true, expected: '30 августа, пятница' },
    { browserLocale: 'kk-KZ', siteLang: 'ru', publicationDateLocale: false, expected: '30 тамыз, жұма' },
    { browserLocale: 'ru-RU', siteLang: 'kk', publicationDateLocale: true, expected: '30 тамыз, жұма' },
    { browserLocale: 'ru-RU', siteLang: 'kk', publicationDateLocale: false, expected: '30 августа, пятница' },
] as const)(
    '$browserLocale browser on a $siteLang site sees "$expected" when locale from store = $publicationDateLocale',
    ({ browserLocale, siteLang, publicationDateLocale, expected }) => {
        simulateBrowserLocale(browserLocale);

        renderWithStore(<PublicationTime />, { fixes: { publicationDateLocale }, state: stateWithSiteLang(siteLang) });

        expect(screen.getByText(expected)).toBeInTheDocument();
    }
);
