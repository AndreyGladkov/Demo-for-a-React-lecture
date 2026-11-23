import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { bffRequested } from './demo';
import type { Vacancy } from './search';

const fetchFromBff = fetchBaseQuery({ baseUrl: '/bff' });

const countedFetchFromBff: typeof fetchFromBff = (args, api, extraOptions) => {
    api.dispatch(bffRequested());
    return fetchFromBff(args, api, extraOptions);
};

export const bffApi = createApi({
    reducerPath: 'bffApi',
    baseQuery: countedFetchFromBff,
    endpoints: (build) => ({
        getVacancies: build.query<Vacancy[], { text: string }>({
            query: (params) => ({ url: '/vacancies', params }),
        }),
    }),
});

export const { useGetVacanciesQuery } = bffApi;
