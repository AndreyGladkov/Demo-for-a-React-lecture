import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { searchVacancies } from '../../../server/data/vacancies';
import { renderWithStore } from '../../test/renderWithStore';
import { RtkQueryDemo } from './RtkQueryDemo';

const fetchMock = vi.fn(async (request: Request) =>
    Response.json(searchVacancies('hh.ru', new URL(request.url).searchParams.get('text') ?? ''))
);

beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
    vi.unstubAllGlobals();
    fetchMock.mockClear();
});

const expectedTotal = searchVacancies('hh.ru', 'frontend').length;

test('counter and list share one request', async () => {
    const { store } = renderWithStore(<RtkQueryDemo />);

    await userEvent.click(screen.getByRole('button', { name: 'Показать вакансии' }));

    expect(await screen.findByText(`Найдено вакансий: ${expectedTotal}`)).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(store.getState().demo.bffRequests).toBe(1);
});

test('showing the block again takes data from the cache', async () => {
    renderWithStore(<RtkQueryDemo />);

    await userEvent.click(screen.getByRole('button', { name: 'Показать вакансии' }));
    await screen.findByText(`Найдено вакансий: ${expectedTotal}`);
    await userEvent.click(screen.getByRole('button', { name: 'Скрыть вакансии' }));
    await userEvent.click(screen.getByRole('button', { name: 'Показать вакансии' }));

    expect(screen.getByText(`Найдено вакансий: ${expectedTotal}`)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
});

test('counter reports a failed request instead of zero vacancies', async () => {
    fetchMock.mockResolvedValueOnce(new Response('Not Found', { status: 404 }));
    renderWithStore(<RtkQueryDemo />);

    await userEvent.click(screen.getByRole('button', { name: 'Показать вакансии' }));

    expect(await screen.findByText('Не удалось загрузить вакансии')).toBeInTheDocument();
});
