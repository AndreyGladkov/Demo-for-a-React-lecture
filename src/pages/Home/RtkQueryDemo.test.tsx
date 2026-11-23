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

const toggle = (name: string) => userEvent.click(screen.getByRole('button', { name }));

test('counter loads vacancies without the list', async () => {
    renderWithStore(<RtkQueryDemo />);

    await toggle('Показать счётчик');

    expect(screen.getByText('Загружаем…')).toBeInTheDocument();
    expect(await screen.findByText(`Найдено вакансий: ${expectedTotal}`)).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
});

test('list added next to the counter takes data from the same request', async () => {
    const { store } = renderWithStore(<RtkQueryDemo />);

    await toggle('Показать счётчик');
    await screen.findByText(`Найдено вакансий: ${expectedTotal}`);
    await toggle('Показать список');

    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(store.getState().demo.bffRequests).toBe(1);
});

test('counter and list shown together share one request', async () => {
    renderWithStore(<RtkQueryDemo />);

    await toggle('Показать список');
    await toggle('Показать счётчик');

    expect(await screen.findByText(`Найдено вакансий: ${expectedTotal}`)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
});

test('showing the counter again takes data from the cache', async () => {
    renderWithStore(<RtkQueryDemo />);

    await toggle('Показать счётчик');
    await screen.findByText(`Найдено вакансий: ${expectedTotal}`);
    await toggle('Скрыть счётчик');
    await toggle('Показать счётчик');

    expect(screen.getByText(`Найдено вакансий: ${expectedTotal}`)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
});

test('counter reports a failed request instead of zero vacancies', async () => {
    fetchMock.mockResolvedValueOnce(new Response('Not Found', { status: 404 }));
    renderWithStore(<RtkQueryDemo />);

    await toggle('Показать счётчик');

    expect(await screen.findByText('Не удалось загрузить вакансии')).toBeInTheDocument();
});
