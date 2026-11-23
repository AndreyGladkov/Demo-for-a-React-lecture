import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { createStore, type RootState } from '../app/store';
import { defaultLecturerSettings, type DemoFix } from '../models/lecturer';

interface Options {
    route?: string;
    fixes?: Partial<Record<DemoFix, boolean>>;
    state?: Partial<RootState>;
}

export const renderWithStore = (ui: ReactElement, { route = '/', fixes = {}, state = {} }: Options = {}) => {
    const store = createStore({
        lecturer: { ...defaultLecturerSettings, fixes: { ...defaultLecturerSettings.fixes, ...fixes } },
        ...state,
    });
    return {
        store,
        ...render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
            </Provider>
        ),
    };
};

export const isDemoBugEnabled = (fix: DemoFix): boolean => (process.env.DEMO_BUGS ?? '').split(',').includes(fix);
