import { tagTypes } from "../tagTypes";
import { api } from "./baseApi";

const TEAM_URL = '/teams'

const teamApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createTeam: builder.mutation({
            query: (data) => {
                console.log(data)
                return {
                    url: TEAM_URL,
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: [tagTypes.teams]
        }),
        getAllTeams: builder.query({
            query: () => TEAM_URL,
          }),
    })
})

export const {
    useCreateTeamMutation,
    useGetAllTeamsQuery
} = teamApi;