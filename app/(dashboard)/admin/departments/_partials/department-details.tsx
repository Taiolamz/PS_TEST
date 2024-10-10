import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { processInputAsArray } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import ParentModuleCard from "@/components/card/module-cards/ParentModuleCard";
import {
  BranchesTable,
  DepartmentTable,
  StaffTable,
  UnitTable,
} from "../../subsidiary/_partials/_table";
import useDisclosure from "../_hooks/useDisclosure";
import Hierarchy from "@/components/fragment/info/hierachy";
import DeactivateOrgModal from "@/components/atoms/modals/deactivate-modal";
import { useDeleteDepartmentMutation } from "@/redux/services/checklist/departmentApi";
import { toast } from "sonner";

const { ADMIN } = routesPath;

const DepartmentDetails = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [view, setView] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const id = searchParams.get("id");
  const tab = searchParams.get("tab");
  const listToTest = [
    {
      active: tab === "branches",
      title: "Total Branches",
      type: "branch",
      count: 0,
      accentColor: "",
      hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
        "branch"
      ),
      icon: "",
      onClick: () => {
        id &&
          router.replace(ADMIN.SUBSIDIARY_DETAILS({ id: id, tab: "branches" }));
      },
      pending: false,
      primaryColor: "",
    },
    // {
    //   active: tab === "departments",
    //   title: "Total Departments",
    //   type: "department",
    //   count: 0,
    //   accentColor: "",
    //   hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
    //     "department"
    //   ),
    //   icon: "",
    //   onClick: () => {
    //     id &&
    //       router.replace(
    //         ADMIN.SUBSIDIARY_DETAILS({ id: id, tab: "departments" })
    //       );
    //   },
    //   pending: false,
    //   primaryColor: "",
    // },
    {
      active: tab === "units",
      title: "Total Units",
      type: "unit",
      count: 0,
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
      count: 0,
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

  const deptId = searchParams.get("id");

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
        />
        <div className="block mt-10 mb-9">
          <ParentModuleCard list={listToTest} />
        </div>
        <section className="">
          {tab === "branches" && <BranchesTable />}
          {tab === "departments" && <DepartmentTable />}
          {tab === "units" && <UnitTable />}
          {tab === "staffs" && <StaffTable />}
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
