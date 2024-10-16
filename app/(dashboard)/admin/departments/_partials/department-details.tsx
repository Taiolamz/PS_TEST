import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { processInputAsArray } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import ParentModuleCard from "@/components/card/module-cards/ParentModuleCard";

import useDisclosure from "../_hooks/useDisclosure";
import Hierarchy from "@/components/fragment/info/hierachy";
import DeactivateOrgModal from "@/components/atoms/modals/deactivate-modal";
import {
  useDeleteDepartmentMutation,
  useGetAllDepartmentStaffByIdQuery,
  useGetAllDepartmentUnitByIdQuery,
  useGetDepartmentByIdQuery,
} from "@/redux/services/checklist/departmentApi";
import { toast } from "sonner";
import { useDebounce } from "@/app/(dashboard)/_layout/Helper";
import { StaffTable, UnitTable } from "./_table";

const { ADMIN } = routesPath;

const DepartmentDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAppSelector((state) => state.auth);
  const id = searchParams.get("id");
  const tab = searchParams.get("tab");
  const [search, setSearch] = React.useState<string>("");
  const [page, setPage] = React.useState(1);

  const deptId = searchParams.get("id");

  const debounceSearch = useDebounce(search, 500);

  const { data: departmentStaffs, isLoading: isLoadingDepartmentStaff } =
    useGetAllDepartmentStaffByIdQuery(
      {
        id: id as string,
        params: {
          to: 0,
          total: 0,
          per_page: 50,
          currentPage: 0,
          next_page_url: "",
          prev_page_url: "",
          search: tab === "staffs" ? debounceSearch : "",
          page: tab === "staffs" ? page : 1,
        },
      },
      {
        skip: !id,
      }
    );

  const {
    data: departmentUnits,
    isLoading: isLoadingDepartmentUnits,
    isFetching: isFetchingDepartmentUnits,
  } = useGetAllDepartmentUnitByIdQuery(
    {
      id: id as string,
      params: {
        to: 0,
        total: 0,
        per_page: 50,
        currentPage: 0,
        next_page_url: "",
        prev_page_url: "",
        search: tab === "units" ? debounceSearch : "",
        page: tab === "units" ? page : 1,
      },
    },
    {
      skip: !id,
    }
  );

  const {
    data: departmentData,
    isLoading: isLoadingDepartment,
    isFetching: isFetchingDepartment,
    refetch: refetchDepartment,
  } = useGetDepartmentByIdQuery(deptId, { skip: !deptId });

  const listToTest = [
    {
      active: tab === "units",
      title: "Total Units",
      type: "unit",
      count: departmentUnits?.data?.data?.length || 0,
      accentColor: "",
      hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
        "unit"
      ),
      icon: "",
      onClick: () => {
        id &&
          router.replace(ADMIN.DEPARTMENT_DETAILS({ id: id, tab: "units" }));
      },
      pending: false,
      primaryColor: "",
    },
    {
      active: tab === "staffs",
      title: "Total Staffs",
      type: "staff",
      count: departmentStaffs?.data?.data?.length || 0,
      accentColor: "",
      hide: false,
      icon: "",
      onClick: () => {
        id &&
          router.replace(ADMIN.DEPARTMENT_DETAILS({ id: id, tab: "staffs" }));
      },
      pending: false,
      primaryColor: "",
    },
  ];
  const {
    isOpen: openDeactivateModal,
    open: onOpenDeactivateModal,
    close: closeDeactivateModal,
  } = useDisclosure();

  const handleDeactivateModalChange = () => {
    onOpenDeactivateModal();
    if (openDeactivateModal) {
      closeDeactivateModal();
    }
  };

  const [deleteDepartment, { isLoading: isDeletingDept }] =
    useDeleteDepartmentMutation();

  const handleDeleteDept = async () => {
    await deleteDepartment(deptId)
      .unwrap()
      .then(() => {
        toast.success(`Department Deactivated Successfully`);
        new Promise(() => {
          setTimeout(() => {
            handleDeactivateModalChange();
            toast.dismiss();
            router.push(ADMIN.DEPARTMENT);
          }, 1000);
        });
      });
  };

  return (
    <DashboardLayout headerTitle="Departments" back>
      <div className="p-5 ">
        <Hierarchy
          onDeactivate={onOpenDeactivateModal}
          editRef={ADMIN.EDIT_DEPARTMENT(id ?? "")}
          headName={departmentData?.data?.head_of_department?.name || "n/a"}
          deptEmail={departmentData?.data?.department_email || "n/a"}
          headOrgEmail={
            departmentData?.data?.head_of_department?.work_email || "n/a"
          }
          address={departmentData?.data?.address || "n/a"}
          state={departmentData?.data?.state || "n/a"}
          country={departmentData?.data?.country || "n/a"}
        />
        <div className="block mt-10 mb-9">
          <ParentModuleCard list={listToTest} />
        </div>
        <section className="">
          {tab === "units" && (
            <UnitTable
              onSearch={(e) => {
                setSearch(e);
                setPage(1);
              }}
              isLoading={isLoadingDepartmentUnits}
              perPage={departmentUnits?.data?.meta?.per_page}
              totalPage={departmentUnits?.data?.meta?.total}
              currentPage={departmentUnits?.data?.meta?.current_page}
              isFetching={isFetchingDepartmentUnits}
              tableData={departmentUnits?.data?.data}
            />
          )}
          {tab === "staffs" && (
            <StaffTable
              onSearch={(e) => {
                setSearch(e);
                setPage(1);
              }}
              isLoading={isLoadingDepartmentUnits}
              isFetching={isFetchingDepartmentUnits}
              tableData={departmentStaffs?.data?.data}
              perPage={departmentStaffs?.data?.meta?.per_page}
              totalPage={departmentStaffs?.data?.meta?.total}
              currentPage={departmentStaffs?.meta?.current_page}
            />
          )}
        </section>
        <DeactivateOrgModal
          organization="Department"
          isLoading={isDeletingDept}
          onDeactivate={handleDeleteDept}
          onModalChange={handleDeactivateModalChange}
          show={openDeactivateModal}
          content={
            "You’re about to deactivate this Department. The units and staffs under this Department would be inaccessible. Do you still want to deactivate?"
          }
        />
      </div>
    </DashboardLayout>
  );
};

export default DepartmentDetails;
