import { resetAuth, setAuthUser } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import { baseApi } from "../baseApi";
import MissionPlanApprovablesType from "@/@types/missionPlan/MissionPlanAprovables";

export const missionPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStrategicIntent: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/strategic-intent`,
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
    getMyMissionPlan: builder.query({
      query: (payload) => ({
        url: `/mission-plan?fiscal_year=${payload.id}${
          payload.isInclude === true
            ? `&include-approvals=${payload.isInclude}`
            : ""
        }`,
        method: "GET",
      }),
      providesTags: ["MissionPlan"],
    }),
    createFinancialYear: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/financial-year`,
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
    createMissionAndVision: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/mission-vision`,
        method: "POST",
        body: payload,
      }),
    }),
    createStrategicPillars: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/strategic-pillar`,
        method: "POST",
        body: payload,
      }),
    }),
    createSpecifiedTask: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/specified-task`,
        method: "POST",
        body: payload,
      }),
    }),
    createMeasureOfSuccess: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/measure-of-success`,
        method: "POST",
        body: payload,
      }),
    }),
    getFinancialYearPreview: builder.query({
      query: () => ({
        url: `/mission-plan/preview`,
        method: "GET",
      }),
    }),
    getLineManagerMissionPlan: builder.query({
      query: ({ fiscalYear }) => ({
        url: `/mission-plan/line-manager/${fiscalYear}`,
        method: "GET",
      }),
    }),
    saveFinancialYear: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/save`,
        method: "POST",
        body: payload,
      }),
    }),
    getOrganizationMissionPlans: builder.query({
      query: () => ({
        url: `/mission-plan/fiscal-years/organization`,
        method: "GET",
      }),
    }),
    createMissionStatement: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/mission-statement`,
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
    createBoundaries: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/boundary`,
        method: "POST",
        body: payload,
      }),
    }),
    submitPreviewedMissionPlan: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/${payload?.id}/submit`,
        method: "POST",
        body: payload,
      }),
    }),
    getMissionPlanItemsById: builder.query<
      { data: MissionPlanApprovablesType },
      { missionplanid: string }
    >({
      query: ({ missionplanid }) => ({
        url: `/mission-plan/${missionplanid}/with-approvables`,
        method: "GET",
      }),
      providesTags: ["Approvables"],
    }),
  }),
});

export const {
  useCreateBoundariesMutation,
  useCreateFinancialYearMutation,
  useAddStrategicIntentMutation,
  useLazyGetMyMissionPlanQuery,
  useCreateMissionAndVisionMutation,
  useCreateStrategicPillarsMutation,
  useGetFinancialYearPreviewQuery,
  useSaveFinancialYearMutation,
  useGetOrganizationMissionPlansQuery,
  useCreateMissionStatementMutation,
  useCreateMeasureOfSuccessMutation,
  useCreateSpecifiedTaskMutation,
  useSubmitPreviewedMissionPlanMutation,
  useGetMissionPlanItemsByIdQuery,
  useGetLineManagerMissionPlanQuery,
} = missionPlanApi;
