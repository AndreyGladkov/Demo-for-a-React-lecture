import { generateVacancies, VACANCIES_TOTAL } from '../data/vacancies';
import type { PageHandler } from './types';

export const searchPage: PageHandler = ({ settings }) => ({
    page: { name: 'search', loading: false },
    search: { total: VACANCIES_TOTAL, vacancies: generateVacancies(settings.site) },
});
