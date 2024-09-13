import * as yup from "yup";
import { useRouter } from "next/navigation";
import useDisclosure from "./useDisclosure";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useCreateBranchMutation } from "@/redux/services/checklist/branchApi";
import { useGetStatesQuery } from "@/redux/services/slug/statesApi";
import routesPath from "@/utils/routes";
import { useContext } from "react";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { useGetAllEmployeesQuery } from "@/redux/services/employee/employeeApi";
import { useGetAllOrganizationMissionPlanDropdownQuery } from "@/redux/services/mission-plan/allmissionplanApi";

type Prop = {
  cancelPath: string;
};

type Select = {
  label: string | number;
  value: string | number;
};
const { ADMIN } = routesPath;

export const useBranch = ({ cancelPath }: Prop) => {
  // const { user, checklist } = useAppSelector((state) => state.auth);
  const actionCtx = useContext(ActionContext);
  const { data: dropdownData, isLoading: isLoadingSubsidiaries }: any =
    useGetAllOrganizationMissionPlanDropdownQuery({});

  const { data: statesData, isLoading: isLoadingStates } = useGetStatesQuery(
    {}
  );
  const { data: employeesData, isLoading: isLoadingEmployees } =
    useGetAllEmployeesQuery();

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

  const subsidiaries = dropdownData?.organization_info?.subsidiaries ?? [];
  const states = statesData ?? [];
  const employees = employeesData ?? [];

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

  const router = useRouter();
  const user = useAppSelector(selectUser);
  const { organization } = user;
  const BranchRoute = ADMIN.BRANCHES;
  const [createBranch, { isLoading: isCreatingBranch, data, error }] =
    useCreateBranchMutation();

  const formSchema = yup.object().shape({
    name: yup.string().min(3, "Name is required").required("Name is required"),
    branch_email: yup.string().optional(),
    address: yup
      .string()
      .min(5, "Address is required")
      .required("Address is required"),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
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
      branch_email: "",
      address: "",
      country: "",
      state: "",
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
      description: "",
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
    handleProceedCancel,
    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
    subsidiaries: handleFormatDropdown(subsidiaries),
    employees: handleFormatDropdown(employees),
    isLoadingSubsidiaries,
  };
};
