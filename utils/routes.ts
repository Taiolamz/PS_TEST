export const admin_auth = "admin";
export const employee_auth = "employee";



const routesPath = {
  ADMIN: {
    OVERVIEW: `/${admin_auth}/overview`,
    MISSION_PLAN: `/${admin_auth}/mission-plan`,
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
    MISSION_PLAN_OVERVIEW: `/${employee_auth}/employee/mission-plan/mission-plan-overview`,
    MISSION_STATEMENT: `/${employee_auth}/employee/mission-plan/mission-plan-overview`,
    MEASURE_OF_SUCCESS: `/${employee_auth}/employee/mission-plan/mission-plan-overview`,
    SET_STRATEGIC_INTENT: `/${employee_auth}/employee/mission-plan/mission-plan-overview`,
    SPECIFIED_TASK: `/${employee_auth}/employee/mission-plan/mission-plan-overview`,
    IMPLIED_TASK: `/${employee_auth}/employee/mission-plan/mission-plan-overview`,
    FREEDOM_AND_CONSTRAINTS: `/${employee_auth}/employee/mission-plan/mission-plan-overview`,
  },
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register?ui=organization-information",
  FORGOT_PASSWORD: "/forgot-password",
  ONBOARDING: "/onboarding",
};

export default routesPath;
