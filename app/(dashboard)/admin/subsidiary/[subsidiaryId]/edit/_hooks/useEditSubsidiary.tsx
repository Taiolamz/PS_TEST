import * as yup from "yup";
import { HomeIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";
import Routes from "@/lib/routes/routes";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useGetStatesQuery } from "@/redux/services/slug/statesApi";
import routesPath from "@/utils/routes";
import { COUNTRIES_STATES } from "@/utils/data";
import { useContext, useEffect } from "react";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { useGetOrgDetailsQuery } from "@/redux/services/onboarding/organizationApi";
import { useGetAllEmployeesQuery } from "@/redux/services/employee/employeeApi";
import { useSubsidiaryById } from "../../../_hooks/useSubsidiaryById";

type Prop = {
  id: string;
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
});

const { ADMIN } = routesPath;

export const useEditSubsidiary = ({ id }: Prop) => {
  const router = useRouter();
  const actionCtx = useContext(ActionContext);
  const user = useAppSelector(selectUser);

  const { data: statesData, isLoading: isLoadingStates } = useGetStatesQuery(
    {}
  );

  const { subDetalsData } = useSubsidiaryById(id ?? "");

  console.log({
    subDetalsData,
  });

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

  const handleSubmit = async () => {
    const payload = new FormData();
    const { logo, head, state, ...rest } = formik.values;

    Object.entries(rest).forEach(([key, value]) => {
      payload.append(key, value as string);
    });
    if (logo instanceof File) {
      payload.append("logo", logo);
    }
    payload.append("head", head.id);
    payload.append("state", state);
    console.log(formik.values, "payload", id);
    // await createSubsidiary(payload)
    //   .unwrap()
    //   .then(() => {
    //     actionCtx?.triggerUpdateChecklist();
    //     toast.success("Subsidiary Created Successfully");
    //     router.push(SubsidiaryRoute);
    //     new Promise(() => {
    //       setTimeout(() => {
    //         toast.dismiss();
    //       }, 2000);
    //     });
    //   });
  };

  const formik = useFormik({
    initialValues: {
      name: subDetalsData?.name || "",
      email: subDetalsData?.work_email || "",
      address: subDetalsData?.address ?? "",
      country: subDetalsData?.country || "",
      state: subDetalsData?.state || "",
      head: {
        name: subDetalsData?.head?.name || "",
        email: subDetalsData?.hos_email || "",
        id: subDetalsData?.head?.id || "",
      },
      work_email: subDetalsData?.hos_email || "",
      logo: null as File | null,
      description: subDetalsData?.description || "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {}, []);

  return {
    formik,
    countries,
    states: handleFormatDropdown(states),
    stateDrop,
    employees: handleFormatDropdown(employees),
    employeeDrop,
    isLoadingStates,
  };
};
