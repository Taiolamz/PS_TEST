import BookmarkIcon from "@/public/assets/icons/BookmarkIcon";

import {
  CalenderIcon,
  ChatIcon,
  EngagementIcon,
  HomeIcon,
  MagnifierIcon,
  ReportIcon,
  SettingsIcon,
} from "@/public/assets/icons";
import Routes from "@/app/_Routes/routes";

export const sidebarContents = [
  {
    label: "Home",
    path: Routes.Home(),
    icon: HomeIcon,
  },
  {
    label: "Mission Plan",
    path: Routes.Mission_Plan(),
    icon: BookmarkIcon,
  },
  {
    label: "Performance",
    path: Routes.Performance(),
    icon: MagnifierIcon,
  },
  {
    label: "Engagements",
    path: Routes.Engagements(),
    icon: EngagementIcon,
  },
  {
    label: "Calendar",
    path: Routes.Calender(),
    icon: CalenderIcon,
  },
  {
    label: "Reports",
    path: Routes.Reports(),
    icon: ReportIcon,
  },
  {
    label: "Settings",
    path: Routes.SettingsRoute.PersonalSettings(),
    // path: Routes.Settings(),
    icon: SettingsIcon,
  },
  {
    label: "Help Resources",
    path: Routes.HelpResources(),
    icon: BookmarkIcon,
  },
  {
    label: "Contact Support",
    path: Routes.ContactSupport(),
    icon: ChatIcon,
  },
];

export const settingsSidebar = [
  {
    label: "General",
    openDrop: false,
    drop: [
      {
        label: "Personal settings",
        path: Routes.SettingsRoute.PersonalSettings(),
      },
      {
        label: "Organization profile",
        path: Routes.SettingsRoute.OrganizationProfile(),
      },
      {
        label: "Notifications",
        path: Routes.SettingsRoute.Notification(),
      },
      {
        label: "Security",
        path: Routes.SettingsRoute.Security(),
      },
    ],
  },
  {
    label: "Account setup",
    openDrop: false,
    drop: [
      {
        label: "Fiscal year",
        path: Routes.SettingsRoute.FiscalYear(),
      },
      {
        label: "Subsidiary",
        path: Routes.SettingsRoute.Subsidiary(),
      },
      {
        label: "Branch",
        path: Routes.SettingsRoute.Branch(),
      },
      {
        label: "Departments",
        path: Routes.SettingsRoute.Departments(),
      },
      {
        label: "Units",
        path: Routes.SettingsRoute.Units(),
      },
      {
        label: "Staff",
        path: Routes.SettingsRoute.Staffs(),
      },
      {
        label: "Roles",
        path: Routes.SettingsRoute.Roles(),
      },
    ],
  },
  {
    label: "Customization",
    openDrop: false,
    drop: [
      {
        label: "Templates",
        path: Routes.SettingsRoute.Templates(),
      },
      {
        label: "Customize Home Widget",
        path: Routes.SettingsRoute.CustomizeHomeWidget(),
      },
    ],
  },
  {
    label: "Module",
    openDrop: false,
    drop: [
      {
        label: "Organogram",
        path: Routes.SettingsRoute.Organogram(),
      },
      {
        label: "Onboarding",
        path: Routes.SettingsRoute.Onboarding(),
      },
      {
        label: "Mission Plan",
        path: Routes.SettingsRoute.MissionPlan(),
      },
      {
        label: "KPI",
        path: Routes.SettingsRoute.Kpi(),
      },
      { label: "Assessment", path: Routes.SettingsRoute.Assessment() },
    ],
  },
  {
    label: "Automation",
    openDrop: false,
    drop: [
      {
        label: "Approval process",
        path: Routes.SettingsRoute.ApprovalProcess(),
      },
      {
        label: "Integration",
        path: Routes.SettingsRoute.Integration(),
      },
    ],
  },
];

export const checklistSidebar = [
  {
    title: "Organizational structure",
    items: ["Add subsidiary", "Add Branches", "Add Department", "Add unit"],
    path: Routes.ChecklistRoute.OrganizationStructureRoute(),
  },
  {
    title: "Setup Employees and Roles",
    path: Routes.ChecklistRoute.SetupEmployeesAndRolesRoute(),
  },
  {
    title: "Mission Plan",
    items: ["Create Mission Plan Template", "Approval flow"],
    path: Routes.ChecklistRoute.MissionPlanTemplateRoute(),
  },
];