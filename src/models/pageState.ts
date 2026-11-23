import { createAction } from '@reduxjs/toolkit';

import type { LecturerSettings } from './lecturer';
import type { LoginState } from './login';
import type { PageMeta } from './page';
import type { SearchState } from './search';
import type { SessionState } from './session';
import type { VacancyCreateState } from './vacancyCreate';

export interface PageState {
    lecturer: LecturerSettings;
    session: SessionState;
    experiments: Record<string, boolean>;
    page: PageMeta;
    search?: SearchState;
    login?: LoginState;
    vacancyCreate?: VacancyCreateState;
}

export const pageStateReceived = createAction<PageState>('pageState/received');
