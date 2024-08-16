import { baseApi } from "../baseApi";

export const missionPlanApprovalStepsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        EmployeeMissionPlanApprovalSteps: builder.query({
            query: (id) => ({
                url: `/mission-plan/${id}/approval-steps`,
                method: "GET",
            }),
        }),
    }),
});

export const { useLazyEmployeeMissionPlanApprovalStepsQuery } = missionPlanApprovalStepsApi;