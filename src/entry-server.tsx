import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

import { App } from './app/App';
import { createStore } from './app/store';
import type { PageState } from './models/pageState';

export const render = (url: string, state: PageState): string =>
    renderToString(
        <Provider store={createStore(state)}>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </Provider>
    );
