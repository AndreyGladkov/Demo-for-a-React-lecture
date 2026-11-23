import type { LecturerSettings } from '../../src/models/lecturer';
import type { PageState } from '../../src/models/pageState';

export interface PageContext {
    settings: LecturerSettings;
    url: URL;
}

export type PagePart = Omit<PageState, 'lecturer' | 'session' | 'experiments'>;

export type PageHandler = (context: PageContext) => PagePart;
