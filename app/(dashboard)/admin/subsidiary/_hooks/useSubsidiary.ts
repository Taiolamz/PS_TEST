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
import routesPath from "@/utils/routes";
import { COUNTRIES_STATES } from "@/utils/data";
import { useContext } from "react";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { useGetOrgDetailsQuery } from "@/redux/services/onboarding/organizationApi";

type Prop = {
  cancelPath: string;
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

// const handleGetAuthUser = async () => {
//   getAuthUserDetails({})
//     .unwrap()
//     .then(() => {});
// };

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
  .oneOf(handleFormatArray(COUNTRIES), "Country is required")
  .required("Country is required"),
  state: yup.string().required(),
  head_of_subsidiary: yup.string().optional(),
  work_email: yup
  .string()
  .min(1, "Work Email is required")
  .email("Invalid email address")
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
  .required("Work Email is required"),
});

const { ADMIN } = routesPath;

export const useSubsidiary = ({ cancelPath }: Prop) => {
  const router = useRouter();
  const actionCtx = useContext(ActionContext);
  const user = useAppSelector(selectUser);
  
  const { data: statesData, isLoading: isLoadingStates } = useGetStatesQuery(
    {}
  );
  const states = statesData ?? [];

  const { data: orgData } = useGetOrgDetailsQuery();
  console.log(orgData, "org-data");
  
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
  const SubsidiaryRoute = ADMIN.SUBSIDIARY;
  const [createSubsidiary, { isLoading: isCreatingSubsidiary }] =
    useCreateSubsidiaryMutation();
  const handleSubmit = async () => {
    const payload = {
      ...formik.values,
      organization_id: organization?.id,
      city: formik.values.state,
    };
    await createSubsidiary(payload)
      .unwrap()
      .then(() => {
        actionCtx?.triggerUpdateChecklist();
        toast.success("Subsidiary Created Successfully");
        router.push(SubsidiaryRoute);
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            // router.push(SubsidiaryRoute);
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
      head_of_subsidiary: "",
      work_email: "",
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
