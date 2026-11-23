import type { Location } from 'react-router';

import type { NotificationKind } from '../../models/notifications';
import type { LoadSourceStatus } from '../../models/vacancyCreate';

const SOURCE_PARAMETERS = ['fromDraftId', 'fromTemplateId'];

export const sourceStatusNotifications: Record<LoadSourceStatus, [NotificationKind, string]> = {
    draftLoaded: ['success', 'Черновик загружен'],
    templateLoaded: ['success', 'Шаблон загружен'],
};

export const hrefOf = ({ pathname, search }: Pick<Location, 'pathname' | 'search'>): string => pathname + search;

export const hrefWithoutSourceParameters = ({ pathname, search }: Pick<Location, 'pathname' | 'search'>): string => {
    const params = new URLSearchParams(search);
    SOURCE_PARAMETERS.forEach((name) => params.delete(name));
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
};
