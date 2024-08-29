import * as yup from "yup";
import { HomeIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import useDisclosure from "./useDisclosure";
import { useFormik } from "formik";
import {
  useCreateSubsidiaryMutation,
  useGetSubsidiariesQuery,
} from "@/redux/services/checklist/subsidiaryApi";
import { toast } from "sonner";
import Routes from "@/lib/routes/routes";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useGetStatesQuery } from "@/redux/services/slug/statesApi";

type Prop = {
  cancelPath: string;
};

interface FormValues {
  name: string;
  address: string;
  country: string;
  state: string;
  head: string;
  work_email: string;
  logo: File | null;
  description: string;
}

// DUMMY DATA
const countries = [
  { label: "Nigeria", value: "Nigeria", icon: HomeIcon },
  { label: "Germany", value: "Germany", icon: HomeIcon },
  { label: "South Africa", value: "South Africa", icon: HomeIcon },
];

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
  state: yup.string().required(),
  head_of_subsidiary: yup.string().optional(),
  work_email: yup
    .string()
    .min(1, "Work Email is required")
    .required("Work Email is required"),
});

export const useSubsidiary = ({ cancelPath }: Prop) => {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const { data: statesData, isLoading: isLoadingStates } = useGetStatesQuery(
    {}
  );
  const states = statesData ?? [];

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

  const stateDrop = handleDropdown(states);

  const { organization } = user;
  const SubsidiaryRoute = Routes.ChecklistRoute.SubsidiaryRoute();
  const [createSubsidiary, { isLoading: isCreatingSubsidiary }] =
    useCreateSubsidiaryMutation();
  const handleSubmit = async () => {
    const payload = new FormData();

    const { logo } = formik.values;

    Object.entries(formik.values).forEach(([key, value]) => {
      if (key === "logo" && logo instanceof File) {
        payload.append(key, logo);
      } else {
        payload.append(key, value as string);
      }
    });

    payload.append("city", formik.values.state);
    payload.append("organization_id", organization?.id || "");

    // const payload = {
    //   ...formik.values,
    //   organization_id: organization?.id,
    //   city: formik.values.state,
    // };

    console.log({ payload });

    await createSubsidiary(payload)
      .unwrap()
      .then(() => {
        toast.success("Subsidiary Created Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            router.push(SubsidiaryRoute);
          }, 2000);
        });
      });
  };
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      address: "",
      country: "",
      state: "",
      // head_of_subsidiary: "",
      head: "",
      work_email: "",
      logo: null,
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
    isCreatingSubsidiary,
    countries,
    handleProceedCancel,
    states: handleFormatDropdown(states),
    stateDrop,
    isLoadingStates,
    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
  };
};
