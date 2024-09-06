import { baseApi } from "../baseApi";

export const missionPlanApprovalFlow = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMissionPlanFlow: builder.query<void, void>({
      query: () => ({
        url: `admin/organization/approval-flow`,
        method: "GET",
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const { useGetAllMissionPlanFlowQuery } = missionPlanApprovalFlow;
