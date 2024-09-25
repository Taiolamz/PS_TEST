export const admin_auth = "admin";
export const employee_auth = "employee";
// super-admin,  hr-admin, strategy-admin, it-admin, compliance, staff
//  employee
export const employeeRoleList = ["staff", "ceo", "it-admin"];

export const adminRoleList = [
  "hr-admin",
  "strategy-admin",
  // "it-admin",
  "compliance",
  "super-admin",
  // "user",
];

export const specialRoleList = ["super-admin"];
// const

const routesPath = {
  ADMIN: {
    OVERVIEW: `/${admin_auth}/overview`,
    MISSION_PLAN: `/${admin_auth}/mission-plan?ui=mission-plan`,
    MAIN_MISSION_PLAN: `/${admin_auth}/mission-plan`,
    CREATE_MISSION_PLAN: `/${admin_auth}/mission-plan/create`,
    SINGLE_MISSION_PLAN: `/${admin_auth}/mission-plan/view`,
    MISSION_PLAN_TEMPLATE: `/${admin_auth}/mission-plan/template`,
    CREATE_MISSION_PLAN_TEMPLATE: `/${admin_auth}/mission-plan/template/create`,
    VIEW_MISSION_PLAN_TEMPLATE: `/${admin_auth}/mission-plan/template/view-template`,
    MISSION_PLAN_TEMPLATE_LEVEL: `/${admin_auth}/mission-plan/template/level`,
    MISSION_PLAN_APPROVAL_FLOW: `/${admin_auth}/mission-plan/approval-flow`,
    MISSION_PLAN_APPROVAL_FLOW_LEVEL: `/${admin_auth}/mission-plan/approval-flow/level`,
    MISSION_PLAN_REPORT: `/${admin_auth}/mission-plan/reports?ui=organization-report`,
    ORGANIZATION_MP_SPECIFIED_TASK: `/${admin_auth}/mission-plan/reports/specified-task`,
    CREATE_MISSION_PLAN_APPROVAL_FLOW: `/${admin_auth}/mission-plan/approval-flow/create`,
    KICK_START_MISSION_PLAN: `/${admin_auth}/mission-plan/kickstart`,
    FINANCIAL_YEAR_UPDATE: `/${admin_auth}/mission-plan/update`,
    KICK_START_MISSION_PLAN_SELECT_TEMPLATE: `/${admin_auth}/mission-plan/kickstart/template`,
    APPROVE_REJECT_MISSION_PLAN: (id: string) =>
      `/${admin_auth}/mission-plan/${id}/approve`,
    PERFORMANCE: `/${admin_auth}/performance`,
    KPI: `/${admin_auth}/kpi`,
    BRANCHES: `/${admin_auth}/branches`,
    ORGANOGRAM: `/${admin_auth}/organogram`,
    TEAM_MANAGEMENT: `/${admin_auth}/team-management`,
    SETTINGS: `/${admin_auth}/settings`,
    CHECKLIST: `/${admin_auth}/checklist`,
    SUBSIDIARY: `/${admin_auth}/subsidiary`,
    SUBSIDIARY_DETAILS: ({ id, tab }: { id: string; tab?: string }) =>
      `/${admin_auth}/subsidiary?ui=details&id=${id}&tab=${tab}`,
    CREATE_SUBSIDIARY: `/${admin_auth}/subsidiary/add-subsidiary`,
    EDIT_SUBSIDIARY: (id: string) => `/${admin_auth}/subsidiary/${id}/edit`,
    BRANCH: `/${admin_auth}/branches`,
    CREATE_BRANCH: `/${admin_auth}/branches/add-branch`,
    DEPARTMENT: `/${admin_auth}/departments`,
    CREATE_DEPARTMENT: `/${admin_auth}/departments/add-department`,
    UNIT: `/${admin_auth}/units`,
    UNIT_DETAILS: ({ id, tab }: { id: string; tab: string }) =>
      `/${admin_auth}/units?ui=details&id=${id}&tab=${tab}`,
    EDIT_UNIT: (id: string) => `/${admin_auth}/units/${id}/edit`,
    CREATE_UNIT: `/${admin_auth}/units/add-unit`,
    EMPLOYEES: `/${admin_auth}/employee`,
    EMPLOYEE_VIEW: `/${admin_auth}/employee/view-employee`,
    ADD_EMPLOYEE: `/${admin_auth}/employee/add-employee`,
    // MISSION_PLAN_SINGLE: `/${admin_auth}/mission-plan/[missionplanid]/mission-plan`
    PRESENTATION: `/${admin_auth}/mission-plan/2023/approve`,
  },
  EMPLOYEE: {
    OVERVIEW: `/${employee_auth}/overview`,
    MISSION_PLAN: `/${employee_auth}/mission-plan?ui=mission-plan`,
    MAIN_MISSION_PLAN: `/${employee_auth}/mission-plan`,
    CREATE_MISSION_PLAN: `/${employee_auth}/mission-plan/create`,
    LINE_MANAGER_MISSION_PLAN: `/${employee_auth}/mission-plan/line-manager`,
    SINGLE_MISSION_PLAN: `/${employee_auth}/mission-plan/view`,
    MISSION_PLAN_TEMPLATE: `/${employee_auth}/mission-plan/template`,
    APPROVE_REJECT_MISSION_PLAN: (id: string) =>
      `/${employee_auth}/mission-plan/${id}/approve`,
    MISSION_PLAN_REPORT: `/${employee_auth}/mission-plan-report`,
    DOWNLINE_MISSION_PLAN_REPORT: (id: string) =>
      `/${employee_auth}/mission-plan-report/${id}/downline-progress`,
    DOWNLINE_MOS_REPORT: (id: string) =>
      `/${employee_auth}/mission-plan-report/${id}/downline-progress/measure-of-success`,
    DOWNLINE_SPECIFIED_TASK_REPORT: (id: string) =>
      `/${employee_auth}/mission-plan-report/${id}/downline-progress/specified-task`,
    KPI: `/${employee_auth}/kpi`,
    MY_TEAM: `/${employee_auth}/my-team`,
    ORGANOGRAM: `/${employee_auth}/organogram`,
    CALENDAR: `/${employee_auth}/calendar`,
    TO_DO: `/${employee_auth}/to-do`,
    SETTINGS: `/${employee_auth}/settings`,
    APPROVE_REJECT_MISSION_PLAN_DOWN_LINE: (id: string) =>
      `/${employee_auth}/mission-plan/${id}/approve/downline`,
  },
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register?ui=organization-information",
  FORGOT_PASSWORD: "/forgot-password",
  ONBOARDING: "/onboarding",
  PROFILE: {
    WORK: "/profile/work-info",
    PERSONAL: "/profile/personal-info",
  },
};

export const checkListRoutes = [
  routesPath?.ADMIN?.SUBSIDIARY,
  routesPath?.ADMIN?.BRANCH,
  routesPath?.ADMIN?.DEPARTMENT,
  routesPath?.ADMIN?.EMPLOYEES,
  routesPath?.ADMIN?.OVERVIEW,
  routesPath?.ADMIN?.MAIN_MISSION_PLAN,
  routesPath?.ADMIN?.UNIT,
  routesPath?.ADMIN?.MISSION_PLAN_TEMPLATE,
  // routesPath?.ADMIN?.
];

export default routesPath;
