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
import { useGetAllEmployeesQuery } from "@/redux/services/employee/employeeApi";

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
  // head_of_subsidiary: yup.string().optional(),
  // work_email: yup
  //   .string()
  //   .min(1, "Work Email is required")
  //   .email("Invalid email address")
  //   .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
  //   .required("Work Email is required"),
});

const { ADMIN } = routesPath;

export const useSubsidiary = ({ cancelPath }: Prop) => {
  const router = useRouter();
  const actionCtx = useContext(ActionContext);
  const user = useAppSelector(selectUser);

  const { data: statesData, isLoading: isLoadingStates } = useGetStatesQuery(
    {}
  );

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
  const { data: employeesData, isLoading: isLoadingEmployees } =
    useGetAllEmployeesQuery();
  const states = statesData ?? [];
  const employees = employeesData ?? [];
  const employeeDrop = handleDropdown(employees);

  // const { data: orgData } = useGetOrgDetailsQuery();
  // console.log(orgData, "org-data");

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

  const stateDrop = handleDropdown(states);

  const { organization } = user;
  const SubsidiaryRoute = ADMIN.SUBSIDIARY;
  const [createSubsidiary, { isLoading: isCreatingSubsidiary }] =
    useCreateSubsidiaryMutation();
  // const handleSubmit = async () => {
  //   const payload = new FormData();
  //   const { logo } = formik.values;

  //   Object.entries(formik.values).forEach(([key, value]) => {
  //     if (key === "logo" && logo instanceof File) {
  //       payload.append(key, logo);
  //     } else if (key === "head") {
  //       payload.append(key, formik.values.head.id);
  //     } else {
  //       payload.append(key, value as string);
  //     }
  //   });

  //   payload.append("city", formik.values.state);

  //   // const payload = {
  //   //   ...formik.values,
  //   //   organization_id: organization?.id,
  //   //   city: formik.values.state,
  //   //   head: formik.values.head.id,
  //   // };
  //   await createSubsidiary(payload)
  //     .unwrap()
  //     .then(() => {
  //       actionCtx?.triggerUpdateChecklist();
  //       toast.success("Subsidiary Created Successfully");
  //       router.push(SubsidiaryRoute);
  //       new Promise(() => {
  //         setTimeout(() => {
  //           toast.dismiss();
  //           // router.push(SubsidiaryRoute);
  //         }, 2000);
  //       });
  //     });
  // };
  const handleSubmit = async () => {
    const payload = new FormData();
    const { logo, head, state, ...rest } = formik.values;

    // Append the rest of the form values
    Object.entries(rest).forEach(([key, value]) => {
      payload.append(key, value as string);
    });
    if (logo instanceof File) {
      payload.append("logo", logo);
    }
    payload.append("head", head.id);
    payload.append("state", state);

    await createSubsidiary(payload)
      .unwrap()
      .then(() => {
        actionCtx?.triggerUpdateChecklist();
        toast.success("Subsidiary Created Successfully");
        router.push(SubsidiaryRoute);
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
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
      head: {
        name: "",
        email: "",
        id: "",
      },
      work_email: "",
      logo: null as File | null,
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
    employees: handleFormatDropdown(employees),
    employeeDrop,
    isLoadingStates,
    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
  };
};
