"use client";
import * as yup from "yup";
import useDisclosure from "./useDisclosure";
import { useCreateEmployeeMutation } from "@/redux/services/checklist/employeeApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useFormik } from "formik";
import { useGetStatesQuery } from "@/redux/services/slug/statesApi";
import routesPath from "@/utils/routes";
import { useGetGradeLevelsQuery } from "@/redux/services/onboarding/gradeLevelApi";
import { useContext } from "react";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { useGetAllOrganizationMissionPlanDropdownQuery } from "@/redux/services/mission-plan/allmissionplanApi";
import { useGetAllEmployeesQuery } from "@/redux/services/employee/employeeApi";

// dummy data
type Prop = {
  path: () => void;
  cancelPath: string;
};

interface EmployeeData {
  name: string;
  id: string;
  value: string;
}

const newEmployeeStatuses = [
  {
    name: "Yes",
    id: "1",
    value: "1",
  },
  { name: "No", id: "0", value: "0" },
];
const genderOptions = [
  { name: "Male", value: "Male" },
  { name: "Female", Value: "Female" },
  { name: "Others", value: "Others" },
];

const formSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  middle_name: yup.string().optional(),
  last_name: yup.string().required("Last name is required"),
  maiden_name: yup.string().optional(),
  date_of_birth: yup.date().optional(),
  gender: yup.string().optional(),
  resumption_date: yup.date().optional(),
  level: yup.string().required("Grade level is required"),
  // subsidiary_id: yup.string().required("Subsidiary is required"),
  // department_id: yup.string().required("Department is required"),
  // branch_id: yup.string().required("Branch is required"),
  // unit_id: yup.string().required("Unit is required"),
  designation: yup.string().optional(),
  staff_number: yup.string().optional(),
  new_employee: yup.string().required("New employee status is required"),
  email: yup
    .string()
    .min(1, "Work Email is required")
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("work Email is required"),
  line_manager_email: yup
    .string()
    .min(1, "Line Manager Email is required")
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("Line Manager Email is required"),
  phone_number: yup
    .string()
    .optional()
    // .matches(/^\d+$/, "Phone number must be digits only")
    .max(14, "Phone number cannot exceed 14 digits"),
  role_id: yup.string().required("Role is required"),
});

const { ADMIN } = routesPath;

export const useEmployee = ({ path, cancelPath }: Prop) => {
  const router = useRouter();

  const { data: dropdownData, isLoading: isLoadingDropdown }: any =
    useGetAllOrganizationMissionPlanDropdownQuery({});

  const { data: gradeLevelData, isLoading: isLoadingGradeLevel } =
    useGetGradeLevelsQuery({});

  const { data: statesData, isLoading: isLoadingStates } = useGetStatesQuery(
    {}
  );

  const handleDropdown = (
    items: StateData[] | SubsidiaryData[] | DepartmentData[] | EmployeeData[]
  ) => {
    const data = items.map((chi) => {
      return {
        ...chi,
        label: chi?.name,
        value: chi?.id,
      };
    });
    return data;
  };

  const handleFormatDropdown = (
    items:
      | SubsidiaryData[]
      | BranchData[]
      | DepartmentData[]
      | UnitData[]
      | EmployeeData[]
      | AllStaff[]
    // | GradeLevelData[]
  ) => {
    const data = items?.map((chi) => {
      return {
        ...chi,
        label: chi?.name,
        value: chi?.name,
      };
    });
    return data;
  };

  const subsidiaries = dropdownData?.organization_info?.subsidiaries ?? [];
  const branches = dropdownData?.organization_info?.branches ?? [];
  const departments = dropdownData?.organization_info?.departments ?? [];
  const units = dropdownData?.organization_info?.units ?? [];
  const states = statesData ?? [];
  const gradeLevels = gradeLevelData ?? [];

  const newEmployeeDrop = handleDropdown(newEmployeeStatuses);
  const actionCtx = useContext(ActionContext);
  const EmployeeRoute = ADMIN.EMPLOYEES;
  const user = useAppSelector(selectUser);
  const { organization } = user;
  const [createEmployee, { isLoading: isCreatingEmployee }] =
    useCreateEmployeeMutation();

  const { data: employeesData, isLoading: isLoadingEmployees } =
    useGetAllEmployeesQuery();

  const employees = employeesData ?? [];
  const employeeDrop = handleDropdown(employees);

  const handleSubmit = async () => {
    const payload = {
      ...formik.values,
      organization_id: organization?.id,
      subsidiary_id: formik.values.subsidiary_id.id,
    };
    await createEmployee(payload)
      .unwrap()
      .then(() => {
        actionCtx?.triggerUpdateChecklist();
        router.push(EmployeeRoute);
        toast.success("Employee Created Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            router.push(EmployeeRoute);
          }, 2000);
        });
      });
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      maiden_name: "",
      date_of_birth: "",
      gender: "",
      resumption_date: "",
      level: "",
      subsidiary_id: {
        name: "",
        id: "",
      },
      line_manager: {
        name:"",
        email:"",
        id:""
      },
      department_id: "",
      branch_id: "",
      unit_id: "",
      designation: "",
      staff_number: "",
      new_employee: "",
      email: "",
      line_manager_email: "",
      phone_number: "",
      role_id: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  const {
    isOpen: openCancelModal,
    open: onOpenCancelModal,
    close: closeCancelModal,
  } = useDisclosure();

  const handleCancelDialog = () => {
    onOpenCancelModal();
    if (openCancelModal) {
      closeCancelModal();
    }
  };

  const handleProceedCancel = () => {
    router.push(cancelPath);
  };

  return {
    formik,
    isCreatingEmployee,
    subsidiaries: handleFormatDropdown(subsidiaries),
    branches: handleFormatDropdown(branches),
    departments: handleFormatDropdown(departments),
    units: handleFormatDropdown(units),
    genderOptions: handleFormatDropdown(genderOptions),
    gradeLevels: handleFormatDropdown(gradeLevels),
    newEmployeeStatuses: handleFormatDropdown(newEmployeeStatuses),
    newEmployeeDrop,
    states: handleFormatDropdown(states),
    employees: handleFormatDropdown(employees),
    openCancelModal,
    handleProceedCancel,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
  };
};
