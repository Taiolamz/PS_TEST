import * as yup from "yup";
import { useRouter } from "next/navigation";
import useDisclosure from "./useDisclosure";
import { useFormik } from "formik";
import { toast } from "sonner";
import Routes from "@/lib/routes/routes";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useGetSubsidiariesQuery } from "@/redux/services/checklist/subsidiaryApi";
import { useGetBranchesQuery } from "@/redux/services/checklist/branchApi";
import { useCreateDepartmentMutation } from "@/redux/services/checklist/departmentApi";
import { useGetStatesQuery } from "@/redux/services/slug/statesApi";
import routesPath from "@/utils/routes";
import { useContext } from "react";
import ActionContext from "@/app/(dashboard)/context/ActionContext";

type Prop = {
  cancelPath: string;
};

type Select = {
  label: string | number;
  value: string | number;
};

const states = [
  {
    label: "Lagos",
    value: "Lagos",
  },
  {
    label: "Ogun",
    value: "Ogun",
  },
];

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
const headOfDepartment = [
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

const { ADMIN } = routesPath

export const useDepartment = ({ cancelPath }: Prop) => {
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

  const { data: statesData, isLoading: isLoadingStates } = useGetStatesQuery(
    {}
  );

  const handleFormatDropdown = (
    items: SubsidiaryData[] | BranchData[] | StateData[]
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
  const handleDropdown = (items: StateData[]) => {
    const data = items.map((chi) => {
      return {
        ...chi,
        label: chi?.name,
        value: chi?.id,
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
  const states = statesData ?? [];

  const stateDrop = handleDropdown(states);
  const branchDrop = handleBranchDropdown(branches);

  const formSchema = yup.object().shape({
    name: yup.string().min(1, "Name is required").required("Name is required"),
    head_of_department: yup
      .string()
      .min(1, "Head of Department is required")
      .optional(),
    work_email: yup
      .string()
      .min(1, "Work Email is required")
      .required("Work Email is required"),
    subsidiary: yup.string().required(),
    branch_id: yup.string().required(),
  });

  const router = useRouter();
  const actionCtx = useContext(ActionContext)
  const user = useAppSelector(selectUser);
  const { organization } = user;
  const DepartmentRoute = ADMIN.DEPARTMENT;
  const [createDepartment, { isLoading: isCreatingDepartment }] =
    useCreateDepartmentMutation();

  const handleSubmit = async () => {
    const payload = {
      ...formik.values,
      address: "lagos island",
      organization_id: organization?.id,
      state_id: formik.values.state_id.toString(),
    };
    await createDepartment(payload)
      .unwrap()
      .then(() => {
        actionCtx?.triggerUpdateChecklist();
        toast.success("Department Created Successfully");
        router.push(DepartmentRoute);
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            router.push(DepartmentRoute);
          }, 2000);
        });
      });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      state_id: "",
      head_of_department: "",
      work_email: "",
      subsidiary: "",
      branch_id: "",
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
    isCreatingDepartment,
    handleProceedCancel,
    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
    headOfBranches,
    headOfDepartment,
    subsidiaries: handleFormatDropdown(subsidiaries),
    branches: handleFormatDropdown(branches),
    states: handleFormatDropdown(states),
    stateDrop,
    branchDrop,
    isLoadingSubsidiaries,
    isLoadingBranches,
    isLoadingStates,
  };
};
