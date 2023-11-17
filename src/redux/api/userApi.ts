import { api } from "./baseApi";

const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `/users`
        })
    })
})

export const {
    useGetUsersQuery
} = usersApi;