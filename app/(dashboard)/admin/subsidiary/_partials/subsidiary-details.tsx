import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import React from "react";
import routesPath from "@/utils/routes";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ModalContainer from "@/components/modal-container";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { processInputAsArray } from "@/utils/helpers";
import { BranchesTable, DeptTable, StaffTable, UnitTable } from "./_table";
import ParentModuleCard from "@/components/card/module-cards/ParentModuleCard";
import {
  useGetSubsidiaryByIdQuery,
  useGetSubsidiaryInBranchQuery,
  useGetSubsidiaryInDeptQuery,
} from "@/redux/services/checklist/subsidiaryApi";
import { PageLoader } from "@/components/custom-loader";
import { useSubsidiaryById } from "../_hooks/useSubsidiaryById";

const { ADMIN } = routesPath;

export default function SubsidiaryDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [view, setView] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const id = searchParams.get("id");
  const tab = searchParams.get("tab");

  const {
    subDetalsData,
    isLoadingSubDetails,
    subDetailsDepthData,
    isLoadingSubDetailsDept,
    subDetailsBranchData,
    isLoadingSubDetailsBranch,
    subDetailsUnithData,
    isLoadingSubDetailsunit,
    subDetailsStaffhData,
    isLoadingSubDetailsStaff,
  } = useSubsidiaryById(id ?? "");

  const listToTest = [
    {
      active: tab === "branches",
      title: "Total Branches",
      type: "branch",
      count: subDetailsBranchData?.meta?.total ?? 0,
      accentColor: "",
      hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
        "branch"
      ),
      icon: "",
      onClick: () => {
        id &&
          router.replace(ADMIN.SUBSIDIARY_DETAILS({ id: id, tab: "branches" }));
      },
      pending: isLoadingSubDetailsBranch,
      primaryColor: "",
    },
    {
      active: tab === "departments",
      title: "Total Departments",
      type: "department",
      count: subDetailsDepthData?.meta?.total ?? 0,
      accentColor: "",
      hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
        "department"
      ),
      icon: "",
      onClick: () => {
        id &&
          router.replace(
            ADMIN.SUBSIDIARY_DETAILS({ id: id, tab: "departments" })
          );
      },
      pending: isLoadingSubDetailsDept,
      primaryColor: "",
    },
    {
      active: tab === "units",
      title: "Total Units",
      type: "unit",
      count: subDetailsUnithData?.meta?.total ?? 0,
      accentColor: "",
      hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
        "unit"
      ),
      icon: "",
      onClick: () => {
        id &&
          router.replace(ADMIN.SUBSIDIARY_DETAILS({ id: id, tab: "units" }));
      },
      pending: isLoadingSubDetailsunit,
      primaryColor: "",
    },
    {
      active: tab === "staffs",
      title: "Total Staffs",
      type: "staff",
      count: subDetailsStaffhData?.meta?.total ?? 0,
      accentColor: "",
      hide: false,
      icon: "",
      onClick: () => {
        id &&
          router.replace(ADMIN.SUBSIDIARY_DETAILS({ id: id, tab: "staffs" }));
      },
      pending: isLoadingSubDetailsStaff,
      primaryColor: "",
    },
  ];

  return (
    <DashboardLayout back headerTitle="Subsidiaries">
      <section className="p-5">
        {isLoadingSubDetails ? (
          <PageLoader />
        ) : (
          <div className="flex max-lg:flex-col-reverse justify-between mb-10">
            <div className="w-full">
              <span className="flex items-center gap-8">
                {!subDetalsData?.logo ? (
                  <img
                    src={subDetalsData?.logo}
                    alt="subsidiary logo"
                    className="size-[100px] rounded-full object-contain border border-[var( --input-border)]"
                  />
                ) : (
                  <span className="size-[100px] rounded-full place-content-center grid bg-white border border-[var( --input-border)]">
                    {subIcon}
                  </span>
                )}
                <h3 className="text-2xl font-medium text-[var(--text-color3)]">
                  {subDetalsData?.name}
                </h3>
              </span>
              <div className="grid lg:grid-cols-2 gap-4 w-full text-[var(--text-color)] text-xs mt-5">
                <span className="space-y-3">
                  <h4>
                    Head Of Subsidiary:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-1">
                      {subDetalsData?.head?.name}
                    </span>
                  </h4>
                  <h4>
                    Subsidiary Email:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-1">
                      {subDetalsData?.work_email}
                    </span>
                  </h4>
                  <h4>
                    Head of Subsidiary Email:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-1">
                      {subDetalsData?.hos_email}
                    </span>
                  </h4>
                </span>
                <span className="space-y-3">
                  <h4>
                    Address:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-1">
                      {subDetalsData?.address}
                    </span>
                  </h4>
                  <h4>
                    State:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-1">
                      {subDetalsData?.state}
                    </span>
                  </h4>
                  <h4>
                    Country:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-1">
                      {subDetalsData?.country}
                    </span>
                  </h4>
                </span>
              </div>
            </div>
            <div className="inline-flex justify-end gap-x-3">
              <Link href={ADMIN.EDIT_SUBSIDIARY(id ?? "")}>
                <Button
                  variant="outline"
                  className="rounded border-[var(--primary-color)] text-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-white"
                >
                  Edit
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => setModal(true)}
                className="rounded border-[var(--bg-red-100)] text-[var(--bg-red-100)] hover:text-[var(--bg-red-100)] hover:bg-white"
              >
                Deactivate
              </Button>
            </div>
          </div>
        )}
        <div className="block mb-9">
          <ParentModuleCard list={listToTest} />
        </div>
        <section className="">
          {tab === "branches" && <BranchesTable />}
          {tab === "departments" && <DeptTable />}
          {tab === "units" && <UnitTable />}
          {tab === "staffs" && <StaffTable />}
        </section>
      </section>

      <ModalContainer
        show={modal}
        handleClose={() => setModal(false)}
        modalClass="h-[220px] !w-[540px] rounded "
        title="Close Subsidairy"
      >
        <div className="absolute top-0 text-right">
          <div className="  w-full p-4 px-6 ">
            <div className="flex justify-between items-center mt-3 mb-[18px]">
              <h4 className="text-[var(--bg-red-100)]">
                Deactivate Subsidairy
              </h4>
              <X
                className="size-[18px] cursor-pointer"
                onClick={() => setModal(false)}
              />
            </div>
            <p className="text-[var(--text-color4)] text-sm text-left">
              You’re about to deactivate this Subsidiary. The Departments, units
              and staffs under this Subsidiary would be inaccessible. Do you
              still want to deactivate?
            </p>
            <Button
              loading={false}
              loadingText="Deactivating"
              disabled={false}
              className={cn("font-light bg-[var(--bg-red-100)] mt-5 ")}
            >
              Yes, Deactivate
            </Button>
          </div>
        </div>
      </ModalContainer>
    </DashboardLayout>
  );
}

const subIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="42"
    fill="none"
    viewBox="0 0 42 42"
  >
    <path
      fill={"var(--primary-color)"}
      fillRule="evenodd"
      d="M34.542 21a13.542 13.542 0 11-27.084 0 13.542 13.542 0 0127.084 0zm3.125 0a16.667 16.667 0 11-33.334 0 16.667 16.667 0 0133.334 0zM21 25.688a3.125 3.125 0 11-6.25 0 3.125 3.125 0 016.25 0zM13.742 21a6.25 6.25 0 1010.275 5.854 6.25 6.25 0 100-11.708A6.25 6.25 0 1013.742 21zm4.133-1.562a3.125 3.125 0 100-6.25 3.125 3.125 0 000 6.25zm8.334 4.687a3.125 3.125 0 100-6.25 3.125 3.125 0 000 6.25z"
      clipRule="evenodd"
    ></path>
  </svg>
);
