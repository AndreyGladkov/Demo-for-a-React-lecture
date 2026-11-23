import type { ComponentType } from 'react';

import { Header } from '../components/Header/Header';
import { LecturerPanel } from '../components/LecturerPanel/LecturerPanel';
import { Notifications } from '../components/Notifications/Notifications';
import { PageProgress } from '../components/PageProgress/PageProgress';
import type { PageName } from '../models/page';
import { AccountLoginPage } from '../pages/AccountLogin/AccountLoginPage';
import { HomePage } from '../pages/Home/HomePage';
import { ForbiddenPage, NotFoundPage } from '../pages/Errors/ErrorPages';
import { SearchVacancyPage } from '../pages/SearchVacancy/SearchVacancyPage';
import { VacancyCreatePage } from '../pages/VacancyCreate/VacancyCreatePage';
import { useAppSelector } from './store';
import { usePageStateLoader } from './usePageStateLoader';

const pages: Record<PageName, ComponentType> = {
    home: HomePage,
    search: SearchVacancyPage,
    login: AccountLoginPage,
    vacancyCreate: VacancyCreatePage,
    forbidden: ForbiddenPage,
    notFound: NotFoundPage,
};

export const App = () => {
    usePageStateLoader();
    const pageName = useAppSelector((state) => state.page.name);
    const Page = pages[pageName];

    return (
        <>
            <PageProgress />
            <Header />
            <main className="page">
                <Page key={pageName} />
            </main>
            <Notifications />
            <LecturerPanel />
        </>
    );
};
