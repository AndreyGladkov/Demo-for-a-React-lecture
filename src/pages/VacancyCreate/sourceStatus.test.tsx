import { screen } from '@testing-library/react';
import { useLocation } from 'react-router';
import { expect, test } from 'vitest';

import type { VacancyCreateState } from '../../models/vacancyCreate';
import { renderWithStore } from '../../test/renderWithStore';
import { hrefWithoutSourceParameters } from './sourceParameters';
import { useSourceStatus } from './useSourceStatus';
import { useSourceStatusWithLoop } from './useSourceStatusWithLoop';

const vacancyCreate = (loadSourceStatus: VacancyCreateState['loadSourceStatus']): VacancyCreateState => ({
    draft: { title: '', description: '' },
    loadSourceStatus,
    availablePublicationTypes: { loading: false, data: [] },
    publicationDate: '2024-08-30T12:00:00.000Z',
});

const LocationProbe = ({ useHook }: { useHook: () => void }) => {
    useHook();
    const location = useLocation();
    return <output data-key={location.key}>{location.pathname + location.search}</output>;
};

test('strips known source parameters and keeps the rest', () => {
    expect(hrefWithoutSourceParameters({ pathname: '/create', search: '?fromTemplateId=7&utm=x' })).toBe('/create?utm=x');
    expect(hrefWithoutSourceParameters({ pathname: '/create', search: '?fromDraftId=1' })).toBe('/create');
});

test('removes the source parameter from the URL and reports the status once', () => {
    const { store } = renderWithStore(<LocationProbe useHook={useSourceStatus} />, {
        route: '/employer/vacancy/create?fromTemplateId=7',
        state: { vacancyCreate: vacancyCreate('templateLoaded') },
    });

    expect(screen.getByRole('status')).toHaveTextContent('/employer/vacancy/create');
    expect(store.getState().notifications.map(({ text }) => text)).toEqual(['Шаблон загружен']);
    expect(store.getState().vacancyCreate.loadSourceStatus).toBeNull();
});

test.each([
    { name: 'useSourceStatus', useHook: useSourceStatus, navigates: false },
    { name: 'useSourceStatusWithLoop', useHook: useSourceStatusWithLoop, navigates: true },
])('$name navigates to the same URL: $navigates', ({ useHook, navigates }) => {
    renderWithStore(<LocationProbe useHook={useHook} />, {
        route: '/employer/vacancy/create?fromPreparedTemplateId=3',
        state: { vacancyCreate: vacancyCreate('templateLoaded') },
    });

    const output = screen.getByRole('status');
    expect(output).toHaveTextContent('/employer/vacancy/create?fromPreparedTemplateId=3');
    expect(output.dataset.key !== 'default').toBe(navigates);
});
