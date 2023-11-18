/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from '../tagTypes';
import { IUser } from './../../types/index';
import { api } from "./baseApi";


const USER_URL = `/users`

const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: USER_URL,
                    method: 'GET',
                    params: arg
                };
            },
            transformResponse: (response: IUser[], meta: any) => {
                return {
                  users: response,
                  meta,
                };
              },
              providesTags: [tagTypes.users],
        })
    })
})

export const {
    useGetUsersQuery
} = usersApi;