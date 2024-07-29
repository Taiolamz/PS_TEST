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

export const useUnit = ({ cancelPath }: Prop) => {
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

  const subsidiaries = subsidiariesData ?? [];
  const branches = branchesData ?? [];
  const departments = departmentsData ?? [];

  const handleFormatDropdown = (
    items: SubsidiaryData[] | BranchData[] | DepartmentData[]
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
    head_of_unit: yup
      .string()
      .min(1, "Head of Unit is required")
      .required("Head of Unit is required"),
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
  const UnitRoute = Routes.ChecklistRoute.UnitRoute();
  const [createUnit, { isLoading: isCreatingUnit }] = useCreateUnitMutation();

  const handleSubmit = async () => {
    const payload = {
      ...formik.values,
      address: "lagos island",
      organization_id: organization?.id,
    };
    await createUnit(payload)
      .unwrap()
      .then(() => {
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
      state: "",
      head_of_unit: "",
      work_email: "",
      subsidiary: "",
      branch: "",
      department: "",
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
    states,
    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
    headOfBranches,
    headOfUnit,
    subsidiaries: handleFormatDropdown(subsidiaries),
    branches: handleFormatDropdown(branches),
    departments: handleFormatDropdown(departments),
    isLoadingSubsidiaries,
    isLoadingBranches,
  };
};
