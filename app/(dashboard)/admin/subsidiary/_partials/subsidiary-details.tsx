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
    {
      active: tab === "departments",
      title: "Total Departments",
      type: "department",
      count: 0,
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
      pending: false,
      primaryColor: "",
    },
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
          router.replace(ADMIN.SUBSIDIARY_DETAILS({ id: id, tab: "units" }));
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
          router.replace(ADMIN.SUBSIDIARY_DETAILS({ id: id, tab: "staffs" }));
      },
      pending: false,
      primaryColor: "",
    },
  ];

  return (
    <DashboardLayout back headerTitle="Subsidiaries">
      <section className="p-5">
        <div className="flex max-lg:flex-col-reverse justify-between mb-10">
          <div className="w-full">
            <span className="flex items-center gap-8">
              <img
                //   src={
                //     "https://play-lh.googleusercontent.com/bojfiBmqU2A0U4CwGk_KQoxFw5rsLwIc4KSG4FC0vC4y0OtC-sJ4juxKMZF3g2cgeg"
                //   }
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1vmgM8M4YgXQpE3ytknAMwTluWH65ApphN7j83xtVWSU7JKWT8FV7AVarHxIjPmE8ufQ&usqp=CAU"
                }
                alt="subsidiary logo"
                className="size-[100px] rounded-full object-contain border border-[var( --input-border)]"
              />
              <h3 className="text-2xl font-medium text-[var(--text-color3)]">
                Enyata
              </h3>
            </span>
            <div className="grid lg:grid-cols-2 gap-4 w-full text-[var(--text-color)] text-xs mt-5">
              <span className="space-y-3">
                <h4>
                  Head Of Subsidiary:{" "}
                  <span className="text-[var(--text-color4)] font-medium ml-1">
                    Bryan Adamu
                  </span>
                </h4>
                <h4>
                  Subsidiary Email:{" "}
                  <span className="text-[var(--text-color4)] font-medium ml-1">
                    zojatech@gmail.com
                  </span>
                </h4>
                <h4>
                  Head of Subsidiary Email:{" "}
                  <span className="text-[var(--text-color4)] font-medium ml-1">
                    Martini@zojatech.com
                  </span>
                </h4>
              </span>
              <span className="space-y-3">
                <h4>
                  Address:{" "}
                  <span className="text-[var(--text-color4)] font-medium ml-1">
                    9b, Akin Ogunmade Gbagada
                  </span>
                </h4>
                <h4>
                  State:{" "}
                  <span className="text-[var(--text-color4)] font-medium ml-1">
                    Lagos
                  </span>
                </h4>
                <h4>
                  Country:{" "}
                  <span className="text-[var(--text-color4)] font-medium ml-1">
                    Nigeria
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
