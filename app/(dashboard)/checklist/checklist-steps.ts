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
