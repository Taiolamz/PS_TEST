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
import { useCreateBranchMutation } from "@/redux/services/checklist/branchApi";
import { useGetStatesQuery } from "@/redux/services/slug/statesApi";
import routesPath from "@/utils/routes";
import { COUNTRIES_STATES } from "@/utils/data";
import { useContext } from "react";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { processInputAsArray } from "@/utils/helpers";
import { useGetEmployeesQuery } from "@/redux/services/checklist/employeeApi";
import { useGetAllEmployeesQuery } from "@/redux/services/employee/employeeApi";
import { useGetOrgDetailsQuery } from "@/redux/services/onboarding/organizationApi";

type Prop = {
  cancelPath: string;
};

type Select = {
  label: string | number;
  value: string | number;
};

// DUMMY DATA
const countries = [
  { label: "Nigeria", value: "Nigeria", icon: HomeIcon },
  { label: "Germany", value: "Germany", icon: HomeIcon },
  { label: "South Africa", value: "South Africa", icon: HomeIcon },
];

const COUNTRIES = COUNTRIES_STATES?.map((d) => {
  return {
    label: d.name,
    value: d.name,
    icon: HomeIcon,
  };
});

const { ADMIN } = routesPath;

export const useBranch = ({ cancelPath }: Prop) => {
  // const { user, checklist } = useAppSelector((state) => state.auth);
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
  const { data: statesData, isLoading: isLoadingStates } = useGetStatesQuery(
    {}
  );
  const { data: employeesData, isLoading: isLoadingEmployees } =
    useGetAllEmployeesQuery();

  // const { data: organizationData, isLoading: isLoadingOrganizationsDetails } =
  //   useGetOrgDetailsQuery();

  const handleDropdown = (items: StateData[] | AllStaff[]) => {
    const data = items.map((chi) => {
      return {
        ...chi,
        label: chi?.name,
        value: chi?.id,
      };
    });
    return data;
  };

  const subsidiaries = subsidiariesData ?? [];
  const states = statesData ?? [];
  const employees = employeesData ?? [];
  const employeeDrop = handleDropdown(employees);
  const stateDrop = handleDropdown(states);

  const handleFormatDropdown = (
    items: SubsidiaryData[] | BranchData[] | StateData[] | AllStaff[]
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

  const handleFormatArray = (items: SelectFormType) => {
    const array = items.map((item) => item.label);
    return array;
  };

  const router = useRouter();
  const user = useAppSelector(selectUser);
  const { organization } = user;
  const BranchRoute = ADMIN.BRANCHES;
  const [createBranch, { isLoading: isCreatingBranch }] =
    useCreateBranchMutation();

  const formSchema = yup.object().shape({
    name: yup.string().min(1, "Name is required").required("Name is required"),
    address: yup
      .string()
      .min(1, "Address is required")
      .required("Address is required"),
    // country: yup
    //   .string()
    //   .oneOf(handleFormatArray(COUNTRIES), "Country is required")
    //   .required("Country is required"),
    // state:  yup.string().required(),
    // head: yup.string().min(1, "Head of Subsidiary is required").optional(),
    // work_email: yup
    //   .string()
    //   .min(1, "Work Email is required")
    //   .email("Invalid email address")
    //   .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    //   .required("Work Email is required"),
    // subsidiary:
      // processInputAsArray(user?.organization?.hierarchy)?.includes(
      //   "subsidiary"
    //   ) && yup.string().required() ? true : false as any,
  });

  const handleSubmit = async () => {
    const payload = {
      ...formik.values,
      organization_id: organization?.id,
      head: formik.values.head.id,
      subsidiary_id: formik.values.subsidiary_id.id,
    };
    await createBranch(payload)
      .unwrap()
      .then(() => {
        actionCtx?.triggerUpdateChecklist();
        router.push(BranchRoute);
        toast.success("Branch Created Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            router.push(BranchRoute);
          }, 2000);
        });
      });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      country: "",
      state: "",
      // head: "",
      head: {
        name: "",
        email: "",
        id: "",
      },
      work_email: "",
      subsidiary_id: {
        name: "",
        id: "",
      },
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
    isCreatingBranch,
    countries,
    handleProceedCancel,
    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
    stateDrop,
    states: handleFormatDropdown(states),
    subsidiaries: handleFormatDropdown(subsidiaries),
    employeeDrop,
    employees: handleFormatDropdown(employees),
    isLoadingSubsidiaries,
  };
};
