"use client";
import * as yup from "yup";
import useDisclosure from "./useDisclosure";
import { useCreateEmployeeMutation } from "@/redux/services/checklist/employeeApi";
import { useGetSubsidiariesQuery } from "@/redux/services/checklist/subsidiaryApi";
import { useGetBranchesQuery } from "@/redux/services/checklist/branchApi";
import { toast } from "sonner";
import { HomeIcon } from "@/public/assets/icons";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useFormik } from "formik";
import { useGetUnitsQuery } from "@/redux/services/checklist/unitApi";
import { useGetStatesQuery } from "@/redux/services/slug/statesApi";
import { useGetDepartmentsQuery } from "@/redux/services/checklist/departmentApi";
// import { Dictionary } from "@/@types/dictionary";
import routesPath from "@/utils/routes";
// import { useGetAllRolesQuery } from "@/redux/services/role/rolesApi";
import { useGetGradeLevelsQuery } from "@/redux/services/onboarding/gradeLevelApi";
import { useContext } from "react";
import ActionContext from "@/app/(dashboard)/context/ActionContext";

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
  middle_name: yup.string().required("Middle name is required"),
  last_name: yup.string().required("Last name is required"),
  maiden_name: yup.string().required("Maiden name is required"),
  date_of_birth: yup.date().required("A date of birth is required."),
  gender: yup.string().required("Gender is required"),
  resumption_date: yup.date().required("Resumption date is required."),
  level: yup.string().optional(),
  subsidiary_id: yup.string().required("Subsidiary is required"),
  department_id: yup.string().required("Department is required"),
  branch_id: yup.string().required("Branch is required"),
  unit_id: yup.string().required("Unit is required"),
  designation: yup.string().required("Job title is required"),
  staff_number: yup.string().optional(),
  new_employee: yup.string().required("New employee status is required"),
  email: yup.string().email("Invalid email address").optional(),
  line_manager_email: yup
    .string()
    .email("Invalid email address")
    .required("Line manager email is required"),
  phone_number: yup.string().optional(),
  role_id: yup.string().optional(),
});

const { ADMIN } = routesPath;

export const useEmployee = ({ path, cancelPath }: Prop) => {
  const router = useRouter();

  const { data: subsidiariesData, isLoading: isLoadingSubsidiaries } =
    useGetSubsidiariesQuery({
      to: 0,
      total: 0,
      per_page: 50,
      currentPage: 0,
      next_page_url: "",
      prev_page_url: "",
    });

  const { data: branchesData, isLoading: isLoadingBranches } =
    useGetBranchesQuery({
      to: 0,
      total: 0,
      per_page: 50,
      currentPage: 0,
      next_page_url: "",
      prev_page_url: "",
    });

  const { data: departmentData, isLoading: isLoadingDepartments } =
    useGetDepartmentsQuery({
      to: 0,
      total: 0,
      per_page: 50,
      currentPage: 0,
      next_page_url: "",
      prev_page_url: "",
    });

  const { data: gradeLevelData, isLoading: isLoadingGradeLevel } =
    useGetGradeLevelsQuery({});

  const { data: unitData, isLoading: isLoadingUnits } = useGetUnitsQuery({
    to: 0,
    total: 0,
    per_page: 50,
    currentPage: 0,
    next_page_url: "",
    prev_page_url: "",
  });
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

  const handleGradeDrop = (items: GradeLevelData[]) => {
    const data = items.map((chi) => {
      return {
        ...chi,
        label: chi.name,
        value: chi.level,
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

  // const handleFormat

  const handleBranchDropdown = (items: BranchData[]) => {
    const data = items.map((chi) => {
      return {
        ...chi,
        label: chi?.name,
        value: chi?.branch_id,
      };
    });
    return data;
  };

  const subsidiaries = subsidiariesData ?? [];
  const branches = branchesData ?? [];
  const departments = departmentData ?? [];
  const units = unitData ?? [];
  const states = statesData ?? [];
  // console.log(gradeLevelData, "grade level data");
  const gradeLevels = gradeLevelData ?? [];
  // const gradeLevels =
  //   gradeLevelData && gradeLevelData?.length > 1
  //     ? JSON.parse(gradeLevelData)
  //     : [];

  const stateDrop = handleDropdown(states);
  const subsidiaryDrop = handleDropdown(subsidiaries);
  const branchDrop = handleBranchDropdown(branches);
  const departmentDrop = handleDropdown(departments);
  const unitsDrop = handleDropdown(units);
  const newEmployeeDrop = handleDropdown(newEmployeeStatuses);
  const gradeLevelDrop = handleGradeDrop(gradeLevels);
  const actionCtx = useContext(ActionContext);
  const EmployeeRoute = ADMIN.EMPLOYEES;
  const user = useAppSelector(selectUser);
  const { organization } = user;
  const [createEmployee, { isLoading: isCreatingEmployee }] =
    useCreateEmployeeMutation();

  const handleSubmit = async () => {
    const payload = {
      ...formik.values,
      organization_id: organization?.id,
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
      subsidiary_id: "",
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
    isLoadingSubsidiaries,
    isLoadingBranches,
    isLoadingDepartments,
    isLoadingUnits,
    genderOptions: handleFormatDropdown(genderOptions),
    gradeLevels: handleFormatDropdown(gradeLevels),
    gradeLevelDrop,
    newEmployeeStatuses: handleFormatDropdown(newEmployeeStatuses),
    newEmployeeDrop,
    states: handleFormatDropdown(states),
    stateDrop,
    subsidiaryDrop,
    branchDrop,
    departmentDrop,
    isLoadingGradeLevel,
    unitsDrop,
    openCancelModal,
    handleProceedCancel,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
  };
};
