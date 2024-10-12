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
import {
  useGetSingleUnitQuery,
  useUpdateUnitMutation,
} from "@/redux/services/checklist/unitApi";

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
  description: yup.string().min(5, "Description too short").optional(),
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

  const handleDropdown = (items: any[]) => {
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
  const UnitRoute = ADMIN.UNIT;

  const { organization } = user;

  const [updateUnit, { isLoading: isUpdating }] = useUpdateUnitMutation();

  const handleSubmit = async () => {
    // const payload = new FormData();
    // const { hou, ...rest } = formik.values;
    const payload = {
      // ...formik.values,
      // address: "lagos island",
      name: formik.values.name,
      organization_id: organization?.id,
      head_of_unit: formik.values.head_of_unit.id,
      subsidiary_id: formik.values.subsidiary_id.id,
      branch_id: formik.values.branch_id,
      department_id: formik.values.department_id,
      unit_email: formik.values.unit_email,
      description: formik.values.description,
      id: id,
      // state_id: formik.values?.state_id.toString(),
    };

    // Object.entries(rest).forEach(([key, value]) => {
    //   payload.append(key, value as string);
    // });

    // payload.append("head_of_department", hou);

    // return;
    await updateUnit(payload)
      .unwrap()
      .then(() => {
        toast.success("Unit Updated Successfully");
        router.push(UnitRoute);
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
      });
  };

  const formik = useFormik({
    // initialValues: {
    //   name: unitDetail?.data?.unit?.name || "",
    //   email: unitDetail?.data?.unit?.unit_email || "",
    //   // hou: unitDetail?.data?.unit?.head_of_unit?.name || "",
    //   head_of_unit: {
    //     name: unitDetail?.data?.unit?.head_of_unit?.name || "",
    //     email: unitDetail?.data?.unit?.head_of_unit?.email || "",
    //     id: unitDetail?.data?.unit?.head_of_unit?.id || "",
    //   },
    //   // subsidiary_id: unitDetail?.subsidiary?.id || "",
    //   description: "",
    //   // branch_id: unitDetail?.branch?.id || "",
    //   work_email: unitDetail?.data?.unit?.unit_email,
    //   // department_id: unitDetail?.data?.unit?.deparment.id || "",
    //   // new values (for edit)
    //   department_id: {
    //     id: unitDetail?.data?.unit?.deparment?.id || "",
    //     name: unitDetail?.data?.unit?.deparment?.name || "",
    //   },
    //   subsidiary_id: {
    //     id: unitDetail?.subsidiary?.id || "",
    //     name: unitDetail?.subsidiary?.name || "",
    //   },
    //   branch_id: {
    //     id: unitDetail?.branch?.id || "",
    //     name: unitDetail?.branch?.name || "",
    //   },
    // },
    initialValues: {
      name: unitDetail?.data?.unit?.name || "",
      unit_email: unitDetail?.data?.unit?.unit_email || "",
      head_of_unit: {
        name: unitDetail?.data?.unit?.head_of_unit?.name || "",
        email: unitDetail?.data?.unit?.head_of_unit?.work_email || "",
        id: unitDetail?.data?.unit?.head_of_unit?.id || "",
      },
      work_email: unitDetail?.data?.unit?.unit_email || "",
      subsidiary_id: {
        id: unitDetail?.data?.unit?.subsidiary?.id || "",
        name: unitDetail?.data?.unit?.subsidiary?.name || "",
      },
      branch_id: unitDetail?.data?.unit?.branch?.id || "",
      department_id: unitDetail?.data?.unit?.deparment?.id || "",
      description: unitDetail?.data?.unit?.description || "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return {
    isUpdating,
    formik,
    handleSubmit,
    subsidiaries: handleFormatDropdown(subsidiaries ?? []),
    branches: handleFormatDropdown(branches ?? []),
    departments: handleFormatDropdown(departments ?? []),
    subsidiaryDrop,
    branchDrop,
    departmentDrop,
    isLoadingStates,
    employeeDrop,
    employees: handleFormatDropdown(employees),
  };
};
