import type { Site } from '../../src/models/lecturer';
import type { LoadSourceStatus, PublicationType } from '../../src/models/vacancyCreate';
import type { PageHandler } from './types';

export const PUBLICATION_DATE = '2024-08-30T12:00:00.000Z';

export const publicationTypes = (site: Site): PublicationType[] => {
    const rate = site === 'hh.kz' ? 6 : 1;
    return [
        { id: 'standard', name: 'Стандарт', price: 6000 * rate },
        { id: 'standard_plus', name: 'Стандарт плюс', price: 12000 * rate },
        { id: 'premium', name: 'Премиум', price: 21000 * rate },
    ];
};

const loadSourceStatus = ({ searchParams }: URL): LoadSourceStatus | null => {
    if (searchParams.has('fromDraftId')) {
        return 'draftLoaded';
    }
    if (searchParams.has('fromTemplateId') || searchParams.has('fromPreparedTemplateId')) {
        return 'templateLoaded';
    }
    return null;
};

export const vacancyCreatePage: PageHandler = ({ settings, url }) => {
    if (settings.userType !== 'employer') {
        return { page: { name: 'forbidden', loading: false } };
    }
    const honestState = settings.fixes.sourceStatusGuard;
    return {
        page: { name: 'vacancyCreate', loading: false },
        vacancyCreate: {
            draft: { title: 'Frontend-разработчик (React)', description: 'Делаем поиск работы для миллионов людей.' },
            loadSourceStatus: loadSourceStatus(url),
            availablePublicationTypes: honestState
                ? { loading: false, data: publicationTypes(settings.site) }
                : { loading: true, data: null },
            publicationDate: PUBLICATION_DATE,
        },
    };
};
