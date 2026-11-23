import type { PageHandler } from './types';

export const homePage: PageHandler = () => ({ page: { name: 'home', loading: false } });

export const notFoundPage: PageHandler = () => ({ page: { name: 'notFound', loading: false } });
