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

const { ADMIN } = routesPath;

export default function SubsidiaryDetails() {
  const [view, setView] = React.useState("branches");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
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
            className="rounded border-[var(--bg-red-100)] text-[var(--bg-red-100)] hover:text-[var(--bg-red-100)] hover:bg-white"
          >
            Close Down
          </Button>
        </div>
        <div className="grid md:grid-cols-4 w-full pt-6 mb-8 gap-[22px]">
          <MetricCard
            count={0}
            option="darkgreen"
            title="Total Branches"
            isActive={view === "branches"}
            icon={BranchesIcon}
            onClick={() => setView("branches")}
          />
          <MetricCard
            count={0}
            option="blue"
            title="Total Departments"
            isActive={view === "departments"}
            icon={DepartmentIcon}
            onClick={() => setView("departments")}
          />
          <MetricCard
            count={0}
            option="purple"
            title="Total Units"
            isActive={view === "units"}
            icon={UnitIcon}
            onClick={() => setView("units")}
          />
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
      </section>
    </DashboardLayout>
  );
}
