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

  const subsidiaries = subsidiariesData ?? []; 
  const branches = branchesData ?? [];

  const handleFormatDropdown = (items: SubsidiaryData[] | BranchData[]) => {
    const data = items.map((chi) => {
      return {
        ...chi,
        label: chi?.name,
        value: chi?.name, //has to change to id
      };
    });
    return data;
  };

  const handleFormatArray = (items: SelectFormType) => {
    const array = items.map((item) => item.label);
    return array;
  };

  const formSchema = yup.object().shape({
    name: yup.string().min(1, "Name is required").required("Name is required"),

    state: yup
      .string()
      .oneOf(handleFormatArray(states), "State is required")
      .required("State is required"),
    head_of_department: yup
      .string()
      .min(1, "Head of Department is required")
      .required("Head of Department is required"),
    work_email: yup
      .string()
      .min(1, "Work Email is required")
      .required("Work Email is required"),
    // subsidiary: yup
    //   .string()
    //   .oneOf(
    //     handleFormatArray(handleFormatDropdown(subsidiries)),
    //     "Subsidiary is required"
    //   )
    //   .required("Subsidiaryi s required"),
  });
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const { organization } = user;
  const DepartmentRoute = Routes.ChecklistRoute.DepartmentRoute();
  const [createDepartment, { isLoading: isCreatingDepartment }] =
    useCreateDepartmentMutation();

  const handleSubmit = async () => {
    const payload = {
      ...formik.values,
      address: "lagos island",
      state_id:"sdfsdfu",
      organization_id: organization?.id,
    };
    await createDepartment(payload)
      .unwrap()
      .then(() => {
        toast.success("Department Created Successfully");
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
      state: "",
      head_of_department: "",
      work_email: "",
      subsidiary: "",
      branch: "",
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
    states,
    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
    headOfBranches,
    headOfDepartment,
    subsidiaries: handleFormatDropdown(subsidiaries),
    branches: handleFormatDropdown(branches),
    isLoadingSubsidiaries,
    isLoadingBranches,
  };
};
