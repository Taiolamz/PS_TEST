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

// const headOfBranches = [
//   {
//     label: "Hassan",
//     value: "Hassan",
//   },
//   {
//     label: "Lamidi",
//     value: "Lamidi",
//   },
//   {
//     label: "Friday",
//     value: "Friday",
//   },
//   {
//     label: "Emeka",
//     value: "Emeka",
//   },
// ];

export const useBranch = ({ cancelPath }: Prop) => {
  const { data: subsidiariesData, isLoading: isLoadingSubsidiaries } =
    useGetSubsidiariesQuery({
      to: 0,
      total: 0,
      per_page: 50,
      currentPage: 0,
      next_page_url: "",
      prev_page_url: "",
    });

  const subsidiaries = subsidiariesData ?? [];

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
    address: yup
      .string()
      .min(1, "Address is required")
      .required("Address is required"),
    country: yup
      .string()
      .oneOf(handleFormatArray(countries), "Country is required")
      .required("Country is required"),
    state: yup
      .string()
      .oneOf(handleFormatArray(states), "State is required")
      .required("State is required"),
    head: yup.string().min(1, "Head of Subsidiary is required").optional(),
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
  const BranchRoute = Routes.ChecklistRoute.BranchesRoute();
  const [createBranch, { isLoading: isCreatingBranch }] =
    useCreateBranchMutation();

  const handleSubmit = async () => {
    const payload = {
      ...formik.values,
      organization_id: organization?.id,
    };
    await createBranch(payload)
      .unwrap()
      .then(() => {
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
      head: "",
      work_email: "",
      subsidiary: "",
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
    states,
    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
    // headOfBranches,
    subsidiaries: handleFormatDropdown(subsidiaries),
    isLoadingSubsidiaries,
  };
};
