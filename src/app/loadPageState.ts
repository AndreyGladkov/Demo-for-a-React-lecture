import { createAsyncThunk } from '@reduxjs/toolkit';

import { bffRequested } from '../models/demo';
import { pageLoadingStarted } from '../models/page';
import { pageStateReceived, type PageState } from '../models/pageState';
import { getJson } from '../utils/bff';

export const loadPageState = createAsyncThunk('pageState/load', async (href: string, { dispatch }) => {
    dispatch(pageLoadingStarted());
    dispatch(bffRequested());
    dispatch(pageStateReceived(await getJson<PageState>(`/bff/page?url=${encodeURIComponent(href)}`)));
});
