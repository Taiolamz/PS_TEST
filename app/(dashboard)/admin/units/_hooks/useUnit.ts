import * as yup from "yup";
import { HomeIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import useDisclosure from "./useDisclosure";
import { useFormik } from "formik";
import { toast } from "sonner";
import Routes from "@/lib/routes/routes";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useGetSubsidiariesQuery } from "@/redux/services/checklist/subsidiaryApi";
import { useGetBranchesQuery } from "@/redux/services/checklist/branchApi";
import { useGetDepartmentsQuery } from "@/redux/services/checklist/departmentApi";
import { useCreateUnitMutation } from "@/redux/services/checklist/unitApi";
import { useGetStatesQuery } from "@/redux/services/slug/statesApi";
import routesPath from "@/utils/routes";
import { useContext } from "react";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { useGetAllEmployeesQuery } from "@/redux/services/employee/employeeApi";

type Prop = {
  cancelPath: string;
};

type Select = {
  label: string | number;
  value: string | number;
};

const headOfBranches = [
  {
    label: "Hassan",
    value: "Hassan",
  },
  {
    label: "Lamidi",
    value: "Lamidi",
  },
  {
    label: "Friday",
    value: "Friday",
  },
  {
    label: "Emeka",
    value: "Emeka",
  },
];

const headOfUnit = [
  {
    label: "Hassan",
    value: "Hassan",
  },
  {
    label: "Lamidi",
    value: "Lamidi",
  },
  {
    label: "Friday",
    value: "Friday",
  },
  {
    label: "Emeka",
    value: "Emeka",
  },
];

const { ADMIN } = routesPath;

export const useUnit = ({ cancelPath }: Prop) => {
  const actionCtx = useContext(ActionContext);
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

  const { data: departmentsData, isLoading: isLoadingDepartments } =
    useGetDepartmentsQuery({
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
  const { data: employeesData, isLoading: isLoadingEmployees } =
    useGetAllEmployeesQuery();

  const handleDropdown = (
    items: StateData[] | SubsidiaryData[] | DepartmentData[] | AllStaff[]
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
    items: SubsidiaryData[] | BranchData[] | DepartmentData[] | AllStaff[]
  ) => {
    const data = items.map((chi) => {
      return {
        ...chi,
        label: chi?.name,
        value: chi?.name, //has to change to id
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

  const handleFormatArray = (items: SelectFormType) => {
    const array = items.map((item) => item.label);
    return array;
  };

  const subsidiaries = subsidiariesData ?? [];
  const branches = branchesData ?? [];
  const departments = departmentsData ?? [];
  const states = statesData ?? [];
  const employees = employeesData ?? [];
  const employeeDrop = handleDropdown(employees);

  const stateDrop = handleDropdown(states);
  const subsidiaryDrop = handleDropdown(subsidiaries);
  const branchDrop = handleBranchDropdown(branches);
  const departmentDrop = handleDropdown(departments);

  const formSchema = yup.object().shape({
    name: yup.string().min(1, "Name is required").required("Name is required"),
    // head_of_unit: yup.string().min(1, "Head of Unit is required").optional(),
    // work_email: yup
    //   .string()
    //   .min(1, "Work Email is required")
    //   .email("Invalid email address")
    //   .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    //   .required("Work Email is required"),
    // // subsidiary_id: yup.string().required("Subsidiary is required"),
    // branch_id: yup.string().required("Branch is required"),
  });
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const { organization } = user;
  const UnitRoute = ADMIN.UNIT;
  const [createUnit, { isLoading: isCreatingUnit }] = useCreateUnitMutation();

  const handleSubmit = async () => {
    const payload = {
      ...formik.values,
      // address: "lagos island",
      organization_id: organization?.id,
      head_of_unit: formik.values.head_of_unit.id,
      subsidiary_id: formik.values.subsidiary_id.id,
      // state_id: formik.values?.state_id.toString(),
    };
    await createUnit(payload)
      .unwrap()
      .then(() => {
        actionCtx?.triggerUpdateChecklist();
        router.push(UnitRoute);
        toast.success("Unit Created Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            router.push(UnitRoute);
          }, 2000);
        });
      });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      state_id: "",
      head_of_unit: {
        name: "",
        email: "",
        id: "",
      },
      work_email: "",
      subsidiary_id: {
        name: "",
        id: "",
      },
      branch_id: "",
      department_id: "",
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
    isCreatingUnit,
    handleProceedCancel,

    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
    headOfBranches,
    headOfUnit,
    states: handleFormatDropdown(states),
    subsidiaries: handleFormatDropdown(subsidiaries),
    branches: handleFormatDropdown(branches),
    departments: handleFormatDropdown(departments),
    employeeDrop,
    employees: handleFormatDropdown(employees),
    stateDrop,
    subsidiaryDrop,
    branchDrop,
    departmentDrop,
    isLoadingSubsidiaries,
    isLoadingBranches,
  };
};
