import Routes from "@/lib/routes/routes";

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
    path: Routes.ChecklistRoute.SubsidiaryRoute(),
  },
  {
    title: "Set up employee and roles",
    subTitle:
      "Manage users that will be joining your organization and how they are inducted",
    isAllChecked: false,
    path: Routes.ChecklistRoute.SetupEmployeesAndRolesRoute(),
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
    path: Routes.ChecklistRoute.MissionPlanTemplateRoute(),
  },
];

export const missionPlanDetails = [
  {
    label: "C-Level Mission Plan",
    content: "",
    path: "",
  },
  {
    label: "Entry Level Mission Plan",
    content: "",
    path: "",
  },
  {
    label: "C-Level Mission Plan",
    content: "",
    path: "",
  },
  {
    label: "Entry Level Mission Plan",
    content: "",
    path: "",
  },
  {
    label: "C-Level Mission Plan",
    content: "",
    path: "",
  },
  {
    label: "Entry Level Mission Plan",
    content: "",
    path: "",
  },
  {
    label: "C-Level Mission Plan",
    content: "",
    path: "",
  },
  {
    label: "Entry Level Mission Plan",
    content: "",
    path: "",
  },
  {
    label: "C-Level Mission Plan",
    content: "",
    path: "",
  },
];

export const missionContentModal = [
  {
    label: "Name of Financial Year",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    label: "Mission Statement",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    label: "Strategic Pillars",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    label: "Strategic Intent/Behaviour",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    label: "Measure of Success",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    label: "Freedom & Constraints",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    label: "Specified Tasks",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
  },
  {
    label: "Implied Tasks",
    content:
      "Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement Mission Statement",
    isSelected: false,
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
