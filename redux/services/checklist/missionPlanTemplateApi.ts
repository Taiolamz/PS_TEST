import Cookies from "js-cookie";
import { baseApi } from "../baseApi";
import { generateQueryString } from "@/utils/helpers";

export const missionPlanTemplateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMissionPlanTemplate: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/template`,
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          // console.log('Error:', error)
        }
      },
    }),

    getMissionPlanTemplates: builder.query<DepartmentData[], QueryParams>({
      query: (params) => ({
        url: `/admin/mission-plan/template${generateQueryString({
          ...params,
        })}`,
        method: "GET",
      }),
      transformResponse: (response: { data: { data: DepartmentData[] } }) =>
        response.data.data,
    }),
  }),
});

export const {
  useCreateMissionPlanTemplateMutation,
  useGetMissionPlanTemplatesQuery,
} = missionPlanTemplateApi;
