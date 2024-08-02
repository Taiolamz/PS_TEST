export const admin_auth = "admin";
export const employee_auth = "employee";



const routesPath = {
  ADMIN: {
    OVERVIEW: `/${admin_auth}/overview`,
    MISSION_PLAN: `/${admin_auth}/mission-plan`,
    PERFORMANCE: `/${admin_auth}/performance`,
    KPI: `/${admin_auth}/kpi`,
    SUBSIDIARY: `/${admin_auth}/subsidiary`,
    BRANCHES: `/${admin_auth}/branches`,
    ORGANOGRAM: `/${admin_auth}/organogram`,
    TEAM_MANAGEMENT: `/${admin_auth}/team-management`,
    SETTINGS: `/${admin_auth}/settings`,
    CHECKLIST: `/${admin_auth}/checklist`,
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
