import { baseApi } from "../baseApi";

export const employeeInvitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    acceptEmployeeInvitation: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/invitation/${id}/accept`,
        method: "POST",
        body: payload,
      }),
    }),
    rejectEmployeeInvitation: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/invitation/${id}/reject`,
        method: "POST",
        body: payload,
      }),
    }),
    getInvitedEmployees: builder.query<InvitedUser, string>({
      query: (id) => ({
        url: `/invitation/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: InvitedUser }) => response.data,
    }),
    getAllEmployees: builder.query<AllStaff[], void>({
      query: () => ({
        url: `/staff/dropdown`,
        method: "GET",
      }),
      transformResponse: (response: { data: { staff_members: AllStaff[] } }) =>
        response.data.staff_members,
    }),
    getAllStaff: builder.query({
      query: ({ page }) => ({
        url: `/admin/staff/all-staff?current_page=${page}`,
        method: "GET",
      }),
      providesTags: ["Staff"],
    }),
    getStaffInfo: builder.query({
      query: ({ staff_id }) => ({
        url: `/admin/staff/view/${staff_id}`,
        method: "GET",
      }),
    }),
    getInvitedStaff: builder.query({
      query: () => ({
        url: `/admin/invitation`,
        method: "GET",
      }),
      providesTags: ["Staff"],
    }),
    getStaffCount: builder.query({
      query: () => ({
        url: `/admin/staff/staff-count`,
        method: "GET",
      }),
    }),
    getAllApproverList: builder.query<string[], void>({
      query: () => ({
        url: `admin/organization/approver-list`,
        method: "GET",
      }),
      transformResponse: (response: { data: string[] }) => response.data,
    }),
    getAllDownliners: builder.query<Downliners[], void>({
      query: () => ({
        url: `/mission-plan/downliners`,
        method: "GET",
      }),
      transformResponse: (response: { data: { data: Downliners[] } }) =>
        response.data.data,
    }),
  }),
});

export const {
  useAcceptEmployeeInvitationMutation,
  useRejectEmployeeInvitationMutation,
  useGetInvitedEmployeesQuery,
  useGetAllEmployeesQuery,
  useGetAllApproverListQuery,
  useGetAllDownlinersQuery,
  useGetAllStaffQuery,
  useGetStaffCountQuery,
  useGetInvitedStaffQuery,
  useGetStaffInfoQuery,
} = employeeInvitationApi;
