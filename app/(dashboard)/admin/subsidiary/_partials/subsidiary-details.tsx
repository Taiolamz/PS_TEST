import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import MetricCard from "@/components/card/metric-card";
import { Button } from "@/components/ui/button";
import {
  BranchesIcon,
  DepartmentIcon,
  StaffIcon,
  UnitIcon,
} from "@/public/assets/icons";
import React from "react";
import routesPath from "@/utils/routes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ModalContainer from "@/components/modal-container";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { processInputAsArray } from "@/utils/helpers";
import {
  BranchesTable,
  DeptTable,
  StaffTable,
  UnitTable,
} from "./details-table";

const { ADMIN } = routesPath;

export default function SubsidiaryDetails() {
  const [view, setView] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  React.useEffect(() => {
    if (
      processInputAsArray(user?.organization?.hierarchy)?.includes("branch")
    ) {
      setView("branches");
    } else if (
      processInputAsArray(user?.organization?.hierarchy)?.includes("branch")
    ) {
      setView("departments");
    } else if (
      processInputAsArray(user?.organization?.hierarchy)?.includes("branch")
    ) {
      setView("units");
    } else {
      setView("staffs");
    }
  }, []);

  return (
    <DashboardLayout back headerTitle="Subsidiary">
      <section className="p-5">
        <div className="inline-flex float-right gap-x-3">
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
        <div className="grid md:grid-cols-4 w-full pt-6 mb-8 gap-4">
          {processInputAsArray(user?.organization?.hierarchy)?.includes(
            "branch"
          ) && (
            <MetricCard
              count={0}
              option="darkgreen"
              title="Total Branches"
              isActive={view === "branches"}
              icon={BranchesIcon}
              onClick={() => setView("branches")}
            />
          )}
          {processInputAsArray(user?.organization?.hierarchy)?.includes(
            "department"
          ) && (
            <MetricCard
              count={0}
              option="blue"
              title="Total Departments"
              isActive={view === "departments"}
              icon={DepartmentIcon}
              onClick={() => setView("departments")}
            />
          )}
          {processInputAsArray(user?.organization?.hierarchy)?.includes(
            "unit"
          ) && (
            <MetricCard
              count={0}
              option="purple"
              title="Total Units"
              isActive={view === "units"}
              icon={UnitIcon}
              onClick={() => setView("units")}
            />
          )}
          <MetricCard
            count={0}
            option="lightgreen"
            title="Total Staffs"
            isActive={view === "staffs"}
            icon={StaffIcon}
            onClick={() => setView("staffs")}
          />
        </div>
        <div className="inline-flex gap-x-5 text-[var(--text-color)] text-sm mb-8">
          <span className="space-y-2.5">
            <h4>
              Subsidairy Name:{" "}
              <span className="text-[var(--text-color4)] font-medium">
                People & Culture
              </span>
            </h4>
            <h4>
              Address:{" "}
              <span className="text-[var(--text-color4)] font-medium">
                People & Culture
              </span>
            </h4>
          </span>
          <span className="space-y-2.5">
            <h4>
              Head of Subsidiary:{" "}
              <span className="text-[var(--text-color4)] font-medium">
                Tolu A Tolu
              </span>
            </h4>
            <h4>
              Head of Subsidiary Email:{" "}
              <span className="text-[var(--text-color4)] font-medium">
                toluatolu@zojatech.com
              </span>
            </h4>
          </span>
        </div>
        <section className="">
          {view === "branches" && <BranchesTable />}
          {view === "departments" && <DeptTable />}
          {view === "units" && <UnitTable />}
          {view === "staffs" && <StaffTable />}
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
