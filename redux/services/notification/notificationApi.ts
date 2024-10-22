import { baseApi, TAG_TYPES } from "../baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => ({
        url: `/notifications`,
        method: "GET",
      }),
      // transformResponse: (response: { data: any[] }) => response.data,
      providesTags: TAG_TYPES,
    }),
  }),
});

export const { useGetAllNotificationQuery } = notificationApi;
