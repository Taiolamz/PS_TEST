import Routes from "@/lib/routes/routes";
import {
  GraySkeleton,
  SuccessSkeleton,
  WarningSkeleton,
} from "@/public/assets/icons";
import routesPath from "@/utils/routes";

const { ADMIN } = routesPath;

export const checklistDetails = [
  {
    title: "Set up organization structure",
    subTitle:
      "Manage users that will be joining your organization and how they are inducted",
    items: [
      {
        isChecked: false,
        label: "Add Subsidiary",
      },
      {
        isChecked: false,
        label: "Add Branches",
      },
      {
        isChecked: false,
        label: "Add Department",
      },
      {
        isChecked: false,
        label: "Add Unit",
      },
    ],
    isAllChecked: false,
    path: ADMIN.SUBSIDIARY,
  },
  {
    title: "Set up employee and roles",
    subTitle:
      "Manage users that will be joining your organization and how they are inducted",
    isAllChecked: false,
    path: ADMIN.EMPLOYEES,
  },
  {
    title: "Set up mission plan",
    subTitle:
      "Manage users that will be joining your organization and how they are inducted",
    items: [
      {
        isChecked: false,
        label: "Create Mission Plan Template",
      },
      {
        isChecked: false,
        label: "Approval Flow",
      },
    ],
    isAllChecked: false,
    path: ADMIN.MISSION_PLAN_TEMPLATE,
  },
];

export const missionPlanDetails = [
  {
    label: "C-Level Mission Plan",
    content: "",
    path: "",
    icon: GraySkeleton,
  },
  {
    label: "Entry Level Mission Plan",
    content: "",
    path: "",
    icon: SuccessSkeleton,
  },
  {
    label: "C-Level Mission Plan",
    content: "",
    path: "",
    icon: WarningSkeleton,
  },
  {
    label: "Entry Level Mission Plan",
    content: "",
    path: "",
    icon: SuccessSkeleton,
  },
  {
    label: "C-Level Mission Plan",
    content: "",
    path: "",
    icon: WarningSkeleton,
  },
  {
    label: "Entry Level Mission Plan",
    content: "",
    path: "",
    icon: SuccessSkeleton,
  },
  {
    label: "C-Level Mission Plan",
    content: "",
    path: "",
    icon: WarningSkeleton,
  },

  {
    label: "C-Level Mission Plan",
    content: "",
    path: "",
    icon: GraySkeleton,
  },
];

export type MissionContentDetails = {
  id: string;
  title: string;
  label: string;
  content: string;
  isSelected: boolean;
};

export const missionContentModal: MissionContentDetails[] = [
  {
    id: "1",
    label: "Name of Financial Year",
    title: "Financial Year",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    id: "2",
    label: "Mission Statement",
    title: "Mission Statement",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    id: "3",
    label: "Measure of Success",
    title: "Measure of Success",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    id: "5",
    label: "Specified Tasks",
    title: "Specified Task",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    id: "4",
    label: "Implied Tasks",
    title: "Implied Task",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    id: "6",
    label: "Freedom & Constraints",
    title: "Freedom & Constraints",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    id: "7",
    label: "Strategic Intent/Behaviour",
    title: "Set Strategic Intent",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    id: "8",
    label: "Strategic Pillars",
    title: "Set Strategic Pillars",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
];

export const checklistSidebar = [
  {
    title: "Organizational structure",
    items: ["Add subsidiary", "Add Branches", "Add Department", "Add unit"],
    path: ADMIN.SUBSIDIARY,
  },
  {
    title: "Setup Employees and Roles",
    path: ADMIN.ADD_EMPLOYEE,
  },
  {
    title: "Mission Plan",
    items: ["Create Mission Plan Template", "Approval flow"],
    path: Routes.ChecklistRoute.MissionPlanTemplateRoute(),
  },
];
