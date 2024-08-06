export const admin_auth = "admin";
export const employee_auth = "employee";
// super-admin,  hr-admin, strategy-admin, it-admin, compliance, staff
//  employee
export const employeeRoleList = ["staff"];

export const adminRoleList = [
  "hr-admin",
  "strategy-admin",
  "it-admin",
  "compliance",
  "super-admin",
  "user",
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
    MISSION_PLAN_TEMPLATE_LEVEL: `/${admin_auth}/mission-plan/template/level`,
    MISSION_PLAN_APPROVAL_FLOW: `/${admin_auth}/mission-plan/approval-flow`,
    CREATE_MISSION_PLAN_APPROVAL_FLOW: `/${admin_auth}/mission-plan/approval-flow/create`,
    KICK_START_MISSION_PLAN: `/${admin_auth}/mission-plan/kickstart`,
    PERFORMANCE: `/${admin_auth}/performance`,
    KPI: `/${admin_auth}/kpi`,
    BRANCHES: `/${admin_auth}/branches`,
    ORGANOGRAM: `/${admin_auth}/organogram`,
    TEAM_MANAGEMENT: `/${admin_auth}/team-management`,
    SETTINGS: `/${admin_auth}/settings`,
    CHECKLIST: `/${admin_auth}/checklist`,
    SUBSIDIARY: `/${admin_auth}/subsidiary`,
    CREATE_SUBSIDIARY: `/${admin_auth}/subsidiary/add-subsidiary`,
    BRANCH: `/${admin_auth}/branches`,
    CREATE_BRANCH: `/${admin_auth}/branches/add-branch`,
    DEPARTMENT: `/${admin_auth}/departments`,
    CREATE_DEPARTMENT: `/${admin_auth}/departments/add-department`,
    UNIT: `/${admin_auth}/units`,
    CREATE_UNIT: `/${admin_auth}/units/add-unit`,
    EMPLOYEES: `/${admin_auth}/employee`,
    ADD_EMPLOYEE: `/${admin_auth}/employee/add-employee`,
    // MISSION_PLAN_SINGLE: `/${admin_auth}/mission-plan/[missionplanid]/mission-plan`
  },
  EMPLOYEE: {
    OVERVIEW: `/${employee_auth}/overview`,
    MISSION_PLAN: `/${employee_auth}/mission-plan`,
    MISSION_PLAN_REPORT: `/${employee_auth}/mission-plan-report`,
    KPI: `/${employee_auth}/kpi`,
    MY_TEAM: `/${employee_auth}/my-team`,
    ORGANOGRAM: `/${employee_auth}/organogram`,
    CALENDAR: `/${employee_auth}/calendar`,
    TO_DO: `/${employee_auth}/to-do`,
    SETTINGS: `/${employee_auth}/settings`,
  },
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register?ui=organization-information",
  FORGOT_PASSWORD: "/forgot-password",
  ONBOARDING: "/onboarding",
};

export default routesPath;
