import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import type { UserType } from '../../models/lecturer';
import { renderWithStore } from '../../test/renderWithStore';
import { Header } from './Header';

test.each([
    { userType: 'anonymous', canCreateVacancy: false },
    { userType: 'applicant', canCreateVacancy: false },
    { userType: 'employer', canCreateVacancy: true },
] as { userType: UserType; canCreateVacancy: boolean }[])(
    '$userType sees "Создать вакансию": $canCreateVacancy',
    ({ userType, canCreateVacancy }) => {
        renderWithStore(<Header />, { state: { session: { userType, site: 'hh.ru', lang: 'ru' } } });

        expect(screen.queryByRole('link', { name: 'Создать вакансию' }) !== null).toBe(canCreateVacancy);
    }
);

test.each(['ru', 'kk'] as const)('marks the current site language %s as pressed', (lang) => {
    renderWithStore(<Header />, { state: { session: { userType: 'employer', site: 'hh.kz', lang } } });

    expect(screen.getByRole('button', { name: lang === 'ru' ? 'Рус' : 'Қаз' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: lang === 'ru' ? 'Қаз' : 'Рус' })).toHaveAttribute('aria-pressed', 'false');
});
