import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { App } from './app/App';
import { createStore } from './app/store';
import type { PageState } from './models/pageState';
import { simulateBrowserLocale } from './utils/environmentLang';

declare global {
    interface Window {
        __INITIAL_STATE__: PageState;
    }
}

const initialState = window.__INITIAL_STATE__;
simulateBrowserLocale(initialState.lecturer.browserLocale);

const app = (
    <Provider store={createStore(initialState)}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

hydrateRoot(document.getElementById('root')!, initialState.lecturer.strictMode ? <StrictMode>{app}</StrictMode> : app);
