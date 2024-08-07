"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import CustomTab from "@/components/custom-tab";
import React, { useState } from "react";
import { PAGE_TABS } from "../_data";
import { useParams, useSearchParams } from "next/navigation";
import { AllEmployees } from "../_tabs";
import {
  allemployeeColumns,
  allemployeeData,
} from "../_data/all-employee-table-data";
import TableWrapper from "@/components/tables/TableWrapper";
import AllEmployeeMissionCard from "../_components/all-employee-mission-card";
import CustomSelect from "@/components/custom-select";
import { PageLoader } from "@/components/custom-loader";
import {
  useGetAllOrganizationEmployeeMissionPlanQuery,
  useGetAllOrganizationMissionPlanDropdownQuery,
  useGetAllOrganizationMissionPlanSummaryQuery,
  useLazyGetAllOrganizationEmployeeMissionPlanExportQuery,
} from "@/redux/services/mission-plan/allmissionplanApi";
import BadgeComponent from "@/components/badge/BadgeComponents";
import { toast } from "sonner";
import { downloadFile } from "@/utils/helpers/file-formatter";

const SingleMissionPlan = () => {
  const searchParams = useSearchParams();
  // const data = useAppSelector((state) => state?.auth?.user);
  const ui = searchParams.get("ui");
  const id = searchParams.get("id"); //The fiscial year ID
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [subsidiary, setSubsidiary] = useState<string>("");
  const [units, setUnits] = useState<string>("");
  const [departments, setDepartments] = useState<string>("");

  // -------- API Service for Tab == All Employee ------- //
  const {
    data: summaryData,
    isLoading: isLoadingSummary,
    isFetching: isFetchingSummary,
    error: summaryError,
  }: any = useGetAllOrganizationMissionPlanSummaryQuery({
    fiscal_year_id: id,
    subsidiary: subsidiary,
    department: departments,
    unit: units,
  });
  const {
    data: employeeData,
    isLoading: isLoadingEmployee,
    isFetching: isFetchingEmployee,
    error: employeeError,
  }: any = useGetAllOrganizationEmployeeMissionPlanQuery({
    fiscal_year_id: id,
    subsidiary: subsidiary,
    department: departments,
    unit: units,
    search: search,
    status: filter,
    sort_by: sort,
  });
  const {
    data: dropdownData,
    isLoading: isLoadingdropdown,
    error: dropdownError,
  }: any = useGetAllOrganizationMissionPlanDropdownQuery();
  const [downloadEmployeeData] =
    useLazyGetAllOrganizationEmployeeMissionPlanExportQuery();

  const handleExport = async () => {
    toast.loading("downloading...");
    downloadEmployeeData({
      export: true,
    })
      .unwrap()
      .then((payload) => {
        toast.dismiss();
        toast.success("Download completed");
        if (payload) {
          downloadFile({
            file: payload,
            filename: "Employee Mission Plan",
            fileExtension: "csv",
          });
        }
      })
      .catch(() => toast.dismiss());
  };
  //   console.log(isLoadingSummary, isLoadingEmployee, "isFetchingSummary", filter);
  //   console.log(
  //     subsidiary,
  //     "subsidiary",
  //     departments,
  //     "departments",
  //     units,
  //     "units"
  //   );
  const UNIT_DATA = (obj: any, deptId: string) => {
    const filtered = obj?.filter((item: any) => item?.department_id === deptId);
    return filtered?.map((org: { id: string; name: string }) => ({
      value: org.id,
      label: org.name,
    }));
  };
  // -------- END: API Service for Tab == All Employee ------- //

  return (
    <DashboardLayout headerTitle="Mission Plan 2023" back>
      <div
        style={{ backgroundColor: "rgba(244, 244, 244, 1)" }}
        className="p-5 w-full global_sticky_class"
      >
        {/* Change the PAGE_TABS here to simulate the different tabs */}
        <CustomTab options={PAGE_TABS.ADMIN} slug="ui" />
      </div>

      {ui === "mission-plan" && (
        <div className="space-y-5 mb-6 px-5 text-[var(--text-color3)]">
          {/* Financial Year */}
          <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
            <h3 className="text-sm font-normal ">1. Financial Year</h3>
            <div className="grid grid-cols-10 gap-5 mt-4 max-w-4xl">
              {/* Title */}
              <div className="col-span-4 space-y-2">
                <h4 className="text-[var(--text-color4)] font-light text-sm">
                  Title
                </h4>
                <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                  2022 Financial Year
                </p>
              </div>
              {/* Start Period */}
              <div className="col-span-3 space-y-2">
                <h4 className="text-[var(--text-color4)] font-light text-sm">
                  Start Period
                </h4>
                <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                  March 2022
                </p>
              </div>
              {/* End Period */}
              <div className="col-span-3 space-y-2">
                <h4 className="text-[var(--text-color4)] font-light text-sm">
                  End Period
                </h4>
                <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                  Feb 2023
                </p>
              </div>
            </div>
          </div>
          <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
            <h3 className="text-sm font-normal ">2. Mission and Vision</h3>
            <div className="space-y-7 mt-4 max-w-4xl">
              {/* Mission */}
              <div className="space-y-2">
                <h4 className="text-[var(--text-color4)] font-light text-sm">
                  Mission
                </h4>
                <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                  To be a pacesetter in digital transformation and software
                  solutions in West Africa by 2025.
                </p>
              </div>
              {/* Vision */}
              <div className="space-y-2">
                <h4 className="text-[var(--text-color4)] font-light text-sm">
                  Vision
                </h4>
                <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                  Providing you with innovative software solutions that exceed
                  your expectations.
                </p>
              </div>
            </div>
          </div>
          <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
            <h3 className="text-sm font-normal ">3. Strategic Pillars</h3>
            <div className="space-y-7 mt-4 max-w-lg">
              {/* Pillar 1 */}
              <div className="space-y-2">
                <h4 className="text-[var(--text-color4)] font-light text-sm">
                  Pillar 1
                </h4>
                <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                  Brand
                </p>
              </div>
              {/* Pillar 2 */}
              <div className="space-y-2">
                <h4 className="text-[var(--text-color4)] font-light text-sm">
                  Pillar 2
                </h4>
                <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                  People
                </p>
              </div>
              {/* Pillar 3 */}
              <div className="space-y-2">
                <h4 className="text-[var(--text-color4)] font-light text-sm">
                  Pillar 3
                </h4>
                <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                  Product
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {ui === "all-employees" &&
        (summaryError && employeeError ? (
          <>error</>
        ) : !isLoadingSummary && !isLoadingEmployee && !isLoadingdropdown ? (
          <div className="p-5 space-y-5">
            <div className="flex justify-between">
              <p className="text-xl font-medium text-primary">
                Mission Plan 2023
              </p>
              <div className="flex gap-x-[14px]">
                <CustomSelect
                  options={MAP_DATA(
                    dropdownData?.organization_info?.subsidiary
                  )}
                  selected={subsidiary}
                  setSelected={(e) => setSubsidiary(e)}
                  className="min-w-40 bg-white"
                  placeholder="Select subsidiary"
                />
                <CustomSelect
                  options={MAP_DATA(
                    dropdownData?.organization_info?.departments
                  )}
                  className="min-w-44 bg-white"
                  selected={departments}
                  setSelected={(e) => {
                    setDepartments(e);
                    setUnits("");
                  }}
                  placeholder="Select Department"
                />
                <CustomSelect
                  options={UNIT_DATA(
                    dropdownData?.organization_info?.units,
                    departments
                  )}
                  selected={units}
                  setSelected={(e) => setUnits(e)}
                  disabled={departments?.length === 0}
                  className="min-w-40 bg-white"
                  placeholder="Select Unit"
                />
              </div>
            </div>
            <AllEmployeeMissionCard {...summaryData?.summary} />
            <TableWrapper
              tableheaderList={[
                "Staff Name",
                "Designation",
                "Email",
                "Date Submtted",
                "Status",
              ]}
              perPage="10"
              totalPage="100"
              currentPage="1"
              onPageChange={(p) => {
                console.log(p);
              }}
              filterList={[
                { value: "in_review", label: "In Review" },
                { value: "approved", label: "Approved" },
                { value: "rejected", label: "Rejected" },
              ]}
              onFilterClick={(param) => {
                if (param?.value?.toLowerCase() === "all") {
                  setFilter("");
                }
                setFilter(param?.value);
              }}
              sortList={[
                { label: "Name", value: "name" },
                { label: "Date Modified", value: "date_modified" },
              ]}
              onSort={(param) => {
                if (param?.value?.toLowerCase() === "all") {
                  setSort("");
                }
                setSort(param?.value);
              }}
              hideNewBtnOne={true}
              tableBodyList={FORMAT_TABLE_DATA(
                employeeData?.mission_plans?.data
              )}
              loading={isFetchingEmployee}
              handleSearchClick={(param) => {
                setSearch(param);
              }}
              onPdfChange={handleExport}
              onCsvChange={handleExport}
            />
          </div>
        ) : (
          <div className="h-[75vh] place-content-center">
            <PageLoader />
          </div>
        ))}
    </DashboardLayout>
  );
};

export default SingleMissionPlan;

const FORMAT_TABLE_DATA = (obj: any) => {
  return obj?.map((org: any) => ({
    name: org?.name,
    designation: org?.designation,
    email: org?.email,
    created_at: org?.created_at,
    status: (
      <BadgeComponent
        text={org?.status}
        color={
          org?.status?.toLowerCase() === "approved"
            ? "green"
            : org?.status?.toLowerCase() === "rejected"
            ? "red"
            : "yellow"
        }
      />
    ),
  }));
};

const MAP_DATA = (obj: any) => {
  return obj?.map((org: { id: string; name: string }) => ({
    value: org.id,
    label: org.name,
  }));
};
