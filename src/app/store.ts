import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { bffApi } from '../models/bffApi';
import { demoSlice } from '../models/demo';
import { experimentsSlice } from '../models/experiments';
import { lecturerSlice } from '../models/lecturer';
import { loginSlice } from '../models/login';
import { notificationsSlice } from '../models/notifications';
import { pageSlice } from '../models/page';
import { searchSlice } from '../models/search';
import { sessionSlice } from '../models/session';
import { vacancyCreateSlice } from '../models/vacancyCreate';

const rootReducer = combineReducers({
    lecturer: lecturerSlice.reducer,
    session: sessionSlice.reducer,
    experiments: experimentsSlice.reducer,
    page: pageSlice.reducer,
    search: searchSlice.reducer,
    login: loginSlice.reducer,
    vacancyCreate: vacancyCreateSlice.reducer,
    notifications: notificationsSlice.reducer,
    demo: demoSlice.reducer,
    [bffApi.reducerPath]: bffApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createStore = (preloadedState: Partial<RootState>) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bffApi.middleware),
    });

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
