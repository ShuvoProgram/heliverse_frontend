import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://backend-jet-five.vercel.app/api`,
    }),
    tagTypes: ['users', 'teams'],
    endpoints: () => ({})
})