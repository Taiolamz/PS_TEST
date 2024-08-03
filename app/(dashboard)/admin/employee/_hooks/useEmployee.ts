"use client";
import * as yup from "yup";
import useDisclosure from "./useDisclosure";
import Routes from "@/lib/routes/routes";
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
import { Dictionary } from "@/@types/dictionary";
import routesPath from "@/utils/routes";
import { useGetAllRolesQuery } from "@/redux/services/role/rolesApi";

// dummy data
type Prop = {
  path: () => void;
  cancelPath: string;
};

// Define the type for the subsidiary item
interface propType {
  id: string;
  name: string;
}
interface BranchItem {
  name: string;
  branch_id: string | null;
}

// Dummy data
const countries = [
  { label: "Nigeria", value: "Nigeria", icon: HomeIcon },
  { label: "Germany", value: "Germany", icon: HomeIcon },
  { label: "South Africa", value: "South Africa", icon: HomeIcon },
  // ...other countries
];

const jobTitles = [
  { name: "UX Designer", value: "UX Designer" },
  { name: "Product Manager", value: "Product Manager" },
  { name: "Quality Assurance Tester", value: "Quality Assurance Tester" },
  { name: "Backend Engineer", value: "Backend Engineer" },
];
const roles = [
  { name: "UX Designer", value: "UX Designer" },
  { name: "Product Manager", value: "Product Manager" },
  { name: "Quality Assurance Tester", value: "Quality Assurance Tester" },
  { name: "Backend Engineer", value: "Backend Engineer" },
];
const gradeLevels = [
  { name: "Managing Director", value: "managing_director" },
  { name: "Admin (Strategy)", value: "admin_strategy" },
  { name: "Admin (Finance)", value: "admin_finance" },
  { name: "Supervisor 1", value: "supervisor_1" },
  { name: "Supervisor 2", value: "supervisor_2" },
];
const newEmployeeStatuses = [
  {
    name: "Yes",
    value: "Yes",
  },
  { name: "No", value: "No" },
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

const { ADMIN } = routesPath

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
  

  // console.log(rolesData)

  const handleDropdown = (
    items: StateData[] | SubsidiaryData[] | DepartmentData[]
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
    items: SubsidiaryData[] | BranchData[] | DepartmentData[] | UnitData[]
  ) => {
    const data = items.map((chi) => {
      return {
        ...chi,
        label: chi?.name,
        value: chi?.name,
      };
    });
    return data;
  };

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

  const stateDrop = handleDropdown(states);
  const subsidiaryDrop = handleDropdown(subsidiaries);
  const branchDrop = handleBranchDropdown(branches);
  const departmentDrop = handleDropdown(departments);
  const unitsDrop = handleDropdown(units);

  const EmployeeRoute = ADMIN.ADD_EMPLOYEE
  const user = useAppSelector(selectUser);
  const { organization } = user;
  const [createEmployee, { isLoading: isCreatingEmployee }] =
    useCreateEmployeeMutation();

    
    
    const handleSubmit = async () => {
    const payload = {
      ...formik.values,
      organization_id: organization?.id,
      level:"entry-level"
    };
    await createEmployee(payload)
      .unwrap()
      .then(() => {
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

  console.log(formik.errors)

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
    jobTitles: handleFormatDropdown(jobTitles),
    gradeLevels: handleFormatDropdown(gradeLevels),
    newEmployeeStatuses: handleFormatDropdown(newEmployeeStatuses),
    states: handleFormatDropdown(states),
    stateDrop,
    subsidiaryDrop,
    branchDrop,
    departmentDrop,
    unitsDrop,
    openCancelModal,
    handleProceedCancel,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
  };
};
