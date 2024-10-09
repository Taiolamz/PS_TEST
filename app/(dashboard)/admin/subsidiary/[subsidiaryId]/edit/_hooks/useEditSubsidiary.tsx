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
import { useUpdateSubsidiaryMutation } from "@/redux/services/checklist/subsidiaryApi";

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

  const { subDetailsData } = useSubsidiaryById(id ?? "");

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

  const { data: employeesData } = useGetAllEmployeesQuery();

  const [updateSubsidiary, { isLoading: isUpdatingSubsidiary }] =
    useUpdateSubsidiaryMutation();

  const states = statesData ?? [];
  const employees = employeesData ?? [];
  const employeeDrop = handleDropdown(employees);

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
    updateSubsidiary({ data: payload, id: id })
      .unwrap()
      .then(() => {
        toast.success("Subsidiary Updated Successfully");
        router.back();
      });
  };

  const formik = useFormik({
    initialValues: {
      name: subDetailsData?.name || "",
      address: subDetailsData?.address ?? "",
      country: subDetailsData?.country || "",
      state: subDetailsData?.state || "",
      head: {
        name: subDetailsData?.head?.name || "",
        email: subDetailsData?.hos_email || "",
        id: subDetailsData?.head?.id || "",
      },
      work_email: subDetailsData?.work_email || "",
      logo: null as File | null,
      description: subDetailsData?.description || "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return {
    formik,
    countries,
    states: handleFormatDropdown(states),
    stateDrop,
    employees: handleFormatDropdown(employees),
    employeeDrop,
    isLoadingStates,
    isUpdatingSubsidiary,
  };
};
