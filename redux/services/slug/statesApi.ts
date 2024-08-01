import Cookies from "js-cookie";
import { baseApi } from "../baseApi";

export const statesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStates: builder.query<StateData[], any>({
      query: () => ({
        url: `/states`,
        method: "GET",
      }),
      transformResponse: (response: { data: StateData[] }) => response.data,
    }),
  }),
});

export const { useGetStatesQuery } = statesApi;
