// MAIN DASHBOARD ROUTE
const MainDashboardPath = "/dashboard";
const Home = () => `${MainDashboardPath}`;
const Performance = () => `${MainDashboardPath}/performance`;
const Mission_Plan = () => `${MainDashboardPath}/mission-plan`;
const Engagements = () => `${MainDashboardPath}/engagements`;
const Calender = () => `${MainDashboardPath}/calender`;
const Reports = () => `${MainDashboardPath}/reports`;
const Settings = () => `${MainDashboardPath}/settings`;
const HelpResources = () => `${MainDashboardPath}/help-resources`;
const ContactSupport = () => `${MainDashboardPath}/contact-support`;

//DASHBOARD SETTINGS ROUTE
const DashboardSettings = `${MainDashboardPath}/settings`;
const GeneralSettingsPath = `${DashboardSettings}/general`;
const AccountSetupSettingsPath = `${DashboardSettings}/account-setup`;
const CustomizationSettingsPath = `${DashboardSettings}/customization`;
const ModuleSettingsPath = `${DashboardSettings}/module`;
const AutomationSettingsPath = `${DashboardSettings}/automation`;
const MissionPlanPath = `${DashboardSettings}/mission-plan`;

const SettingsRoute = {
  // DASHBOARD GENERAL SETTING ROUTE
  PersonalSettings: () => `${GeneralSettingsPath}/personal-settings`,
  OrganizationProfile: () => `${GeneralSettingsPath}/organization-profile`,
  Notification: () => `${GeneralSettingsPath}/notification`,
  Security: () => `${GeneralSettingsPath}/security`,

  // DASHBOARD ACCOUNT SETTINGS ROUTE
  FiscalYear: () => `${AccountSetupSettingsPath}/fiscal-year`,
  Subsidiary: () => `${AccountSetupSettingsPath}/subsidiary`,
  Branch: () => `${AccountSetupSettingsPath}/branch`,
  Departments: () => `${AccountSetupSettingsPath}/departments`,
  Units: () => `${AccountSetupSettingsPath}/units`,
  Staffs: () => `${AccountSetupSettingsPath}/staffs`,
  Roles: () => `${AccountSetupSettingsPath}/roles`,

  // DASHBOARD CUSTOMIZATION SETTINGS ROUTE
  Templates: () => `${CustomizationSettingsPath}/templates`,
  CustomizeHomeWidget: () =>
    `${CustomizationSettingsPath}/customize-home-widget`,

  // DASHBOARD MODULE SETTINGS ROUTE
  Organogram: () => `${ModuleSettingsPath}/organogram`,
  Onboarding: () => `${ModuleSettingsPath}/onboarding`,
  MissionPlan: () => `${ModuleSettingsPath}/mission-plan`,
  Kpi: () => `${ModuleSettingsPath}/kpi`,
  Assessment: () => `${ModuleSettingsPath}/assessments`,

  // DASHBOARD AUTOMATION SETTINGS ROUTE
  ApprovalProcess: () => `${AutomationSettingsPath}/approval-process`,
  Integration: () => `${AutomationSettingsPath}/integration`,
};

// DASHBOARD SETTINGS CREATE ROUTE
const CreateRoute = {
  CreateSubsidiary: () => `${SettingsRoute.Subsidiary()}/create-subsidiary`,
  CreateUnit: () => `${SettingsRoute.Units()}/create-unit`,
};
// CHECKLIST ROUTE
const ChecklistPath = "/checklist";
const OrganizationStructure = `${ChecklistPath}/organizational-structure`;
const MissionPlanRoute = `${ChecklistPath}/mission-plan`;

// const BranchRoute = `${OrganizationStructure}/branch`;
// ....add all other routes here

const ChecklistRoute = {
  // OVERVIEW ROUTE
  ChecklistOverview: () => `${ChecklistPath}`,

  // ORGNANISATIONAL STRUCTURE
  OrganizationStructureRoute: () => OrganizationStructure,
  SubsidiaryRoute: () => `${ChecklistPath}/subsidiary`,
  BranchesRoute: () => `${ChecklistPath}/branches`,
  DepartmentRoute: () => `${ChecklistPath}/department`,
  UnitRoute: () => `${ChecklistPath}/unit`,

  // CREATE ROUTE
  AddSubsidiary: () => `${ChecklistRoute.SubsidiaryRoute()}/add-subsidiary`,
  AddBranches: () => `${ChecklistRoute.BranchesRoute()}/add-branch`, //change route on development
  AddDepartment: () => `${ChecklistRoute.DepartmentRoute()}/add-department`, //change route on development
  AddUnit: () => `${ChecklistRoute.UnitRoute()}/add-unit`, //change route on development

  // SETUP EMPLOYEES AND ROLES
  SetupEmployeesAndRolesRoute: () => `${ChecklistPath}/employee-and-roles`,
  AddEmployeesAndRolesRoute: () =>
    `${ChecklistRoute.SetupEmployeesAndRolesRoute()}/add-employees`,

  // MISSION PLAN
  MissionPlanTemplateRoute: () => `${ChecklistPath}/mission-plan-template`,
  // MissionPlanTemplateRoute: () => `${MissionPlanRoute}/mission-plan-template`,
  MissionPlanTemplateLevelRoute: () =>
    `${ChecklistRoute.MissionPlanTemplateRoute()}/level`,
  AddMissionPlanTemplateRoute: () =>
    `${ChecklistRoute.MissionPlanTemplateRoute()}/add-template`,

  // APRPOVAL FLOW
  ApprovalFlowRoute: () => `${MissionPlanRoute}/approval-flow`,
};

const Routes = {
  Home,
  Performance,
  Mission_Plan,
  Engagements,
  Calender,
  Reports,
  Settings,
  HelpResources,
  ContactSupport,
  SettingsRoute,
  CreateRoute,
  ChecklistRoute,
};

export default Routes;
