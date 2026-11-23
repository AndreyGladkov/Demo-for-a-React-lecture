import type { Site } from '../../src/models/lecturer';
import type { Vacancy } from '../../src/models/search';

const titles = [
    'Frontend-разработчик',
    'React-разработчик',
    'Senior Frontend Engineer',
    'Fullstack-разработчик (Node.js + React)',
    'Junior Frontend-разработчик',
    'Тимлид фронтенда',
    'Разработчик интерфейсов',
    'TypeScript-разработчик',
];
const companies = ['Ромашка', 'Вектор', 'Северный ветер', 'Облако', 'Пиксель', 'Стрела', 'Гранит', 'Лабиринт'];
const cities: Record<Site, string[]> = {
    'hh.ru': ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург'],
    'hh.kz': ['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе'],
};
const tagPool = ['React', 'Redux', 'TypeScript', 'SSR', 'Jest', 'Webpack', 'Vite', 'Node.js', 'CSS', 'GraphQL'];

export const VACANCIES_TOTAL = 500;

export const generateVacancies = (site: Site): Vacancy[] =>
    Array.from({ length: VACANCIES_TOTAL }, (_, index) => ({
        id: 100000 + index,
        title: titles[index % titles.length],
        company: companies[(index * 3) % companies.length],
        city: cities[site][(index * 7) % cities[site].length],
        salary:
            site === 'hh.kz'
                ? { from: 600000 + (index % 20) * 50000, currency: 'KZT' }
                : { from: 120000 + (index % 20) * 10000, currency: 'RUR' },
        tags: [0, 1, 2].map((offset) => tagPool[(index + offset * 3) % tagPool.length]),
        publishedAt: new Date(Date.UTC(2026, 9, 1 + (index % 28), 12)).toISOString(),
    }));

export const searchVacancies = (site: Site, text: string): Vacancy[] =>
    generateVacancies(site).filter((vacancy) => vacancy.title.toLowerCase().includes(text.toLowerCase()));
