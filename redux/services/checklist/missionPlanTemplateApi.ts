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
      invalidatesTags: ["MissionPlanTemplates"],
    }),

    deleteMissionPlanTemplate: builder.mutation({
      query: (id) => ({
        url: `/mission-plan/template/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MissionPlanTemplates"],
    }),

    getMissionPlanTemplates: builder.query<
      MissionPlanTemplateData[],
      QueryParams
    >({
      query: (params) => ({
        url: `/mission-plan/template${generateQueryString({
          ...params,
        })}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanTemplates"],
      transformResponse: (response: {
        data: { templates: { data: MissionPlanTemplateData[] } };
      }) => response.data.templates.data,
    }),
  }),
});

export const {
  useCreateMissionPlanTemplateMutation,
  useGetMissionPlanTemplatesQuery,
  useDeleteMissionPlanTemplateMutation,
} = missionPlanTemplateApi;
