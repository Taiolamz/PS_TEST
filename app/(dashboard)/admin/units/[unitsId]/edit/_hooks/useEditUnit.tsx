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
import { useContext } from "react";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { useGetOrgDetailsQuery } from "@/redux/services/onboarding/organizationApi";
import { useGetAllEmployeesQuery } from "@/redux/services/employee/employeeApi";
import { useGetSubsidiariesQuery } from "@/redux/services/checklist/subsidiaryApi";
import { useGetBranchesQuery } from "@/redux/services/checklist/branchApi";
import { useGetDepartmentsQuery } from "@/redux/services/checklist/departmentApi";
import { useGetSingleUnitQuery } from "@/redux/services/checklist/unitApi";

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
  const array = items?.map((item) => item.label);
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

export const useEditUnit = ({ id }: Prop) => {
  const router = useRouter();
  const actionCtx = useContext(ActionContext);
  const user = useAppSelector(selectUser);

  const { data: statesData, isLoading: isLoadingStates } = useGetStatesQuery(
    {}
  );

  const {
    data: unitDetail,
    error,
    isLoading,
  } = useGetSingleUnitQuery(id!, {
    skip: !id,
  });

  console.log(unitDetail, "unit Detail");

  const handleDropdown = (items: any[]) => {
    console.log("items", items);
    const data =
      items.length !== 0
        ? items?.map((chi) => {
            return {
              ...chi,
              label: chi?.name,
              value: chi?.id,
            };
          })
        : [];
    return data;
  };

  const handleFormatDropdown = (items: any[]) => {
    const data = items?.map((chi) => {
      return {
        ...chi,
        label: chi?.name,
        value: chi?.name,
      };
    });
    return data;
  };

  const handleBranchDropdown = (items: any[]) => {
    const data = items?.map((chi) => {
      return {
        ...chi,
        label: chi?.name,
        value: chi?.branch_id,
      };
    });
    return data;
  };

  const { data: employeesData, isLoading: isLoadingEmployees } =
    useGetAllEmployeesQuery();

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

  const { data: departmentData, isLoading: isLoadingDepartments } =
    useGetDepartmentsQuery({
      to: 0,
      total: 0,
      per_page: 50,
      currentPage: 0,
      next_page_url: "",
      prev_page_url: "",
    });

  const employees = employeesData ?? [];
  const subsidiaries = subsidiariesData?.data?.data ?? [];
  const branches = branchesData?.data.branches.data ?? [];
  const departments = departmentData?.data ?? [];

  const employeeDrop = handleDropdown(employees);
  const subsidiaryDrop = handleDropdown(subsidiaries);
  const branchDrop = handleBranchDropdown([]);
  const departmentDrop = handleDropdown(departments);

  // const { data: orgData } = useGetOrgDetailsQuery();
  // console.log(orgData, "org-data");

  const handleSubmit = async () => {
    const payload = new FormData();
    const { hou, ...rest } = formik.values;

    Object.entries(rest).forEach(([key, value]) => {
      payload.append(key, value as string);
    });

    payload.append("head_of_department", hou);
    // console.log(payload, "payload", id);
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
      name: "",
      email: "",
      hou: "",
      subsidiary_id: "",
      branch_id: "",
      work_email: "",
      department_id: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  return {
    formik,
    subsidiaries: handleFormatDropdown(subsidiaries ?? []),
    branches: handleFormatDropdown(branches ?? []),
    departments: handleFormatDropdown(departments ?? []),
    subsidiaryDrop,
    branchDrop,
    departmentDrop,
    isLoadingStates,
    employeeDrop,
    employees,
  };
};
