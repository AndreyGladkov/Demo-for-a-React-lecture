import type { LecturerSettings } from '../../src/models/lecturer';
import type { PageState } from '../../src/models/pageState';
import { homePage, notFoundPage } from './home';
import { loginPage } from './login';
import { searchPage } from './search';
import type { PageHandler } from './types';
import { vacancyCreatePage } from './vacancyCreate';

const routes: Record<string, PageHandler> = {
    '/': homePage,
    '/search/vacancy': searchPage,
    '/account/login': loginPage,
    '/employer/vacancy/create': vacancyCreatePage,
};

export const buildPageState = (settings: LecturerSettings, url: URL): PageState => {
    const handler = routes[url.pathname] ?? notFoundPage;
    return {
        lecturer: settings,
        session: { userType: settings.userType, site: settings.site, lang: settings.siteLang },
        experiments: settings.experiments,
        ...handler({ settings, url }),
    };
};
