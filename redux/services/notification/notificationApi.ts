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
    getNotificationById: builder.query({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "GET",
      }),
      // transformResponse: (response: { data: any[] }) => response.data,
      providesTags: TAG_TYPES,
    }),
    markNotificationAsRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/read/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Notification"],
    }),
    deleteNotificationAsRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const { useGetAllNotificationQuery } = notificationApi;
