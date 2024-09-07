"use client";
import React, { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
// import { allemployeeData } from "../_data/all-employee-table-data";
import TableWrapper from "@/components/tables/TableWrapper";
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
import DrawerComment from "../_side-modal/drawer-comment";
import DrawerApprovalStatus from "../_side-modal/drawer-approval-status";
import { formatDate } from "@/utils/helpers/date-formatter";
import { useDispatch } from "react-redux";
import { updateEmployeeDetails } from "@/redux/features/mission-plan/employeeDataSlice";
import AllEmployeeMissionCard from "../../_components/all-employee-mission-card";
import SubmissionExtendModal from "../_modal/submission-extend-modal";
import { cn } from "@/lib/utils";
import ReopenSubmissionModal from "../_modal/reopen-submission-modal";
import ConfirmationModal from "@/components/atoms/modals/confirm";

const { ADMIN } = routesPath;

const AllEmployeeMissionPlan = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const id = searchParams.get("id"); //The fiscial year ID
  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );
  const btn =
    "px-[1rem] py-[4px] text-[var(--primary-color)] bg-white text-sm border border-[var(--primary-color)] text-center rounded-sm font-[500] h-fit cursor-pointer hover:bg-[var(--primary-accent-color)] select-none";

  // const data = useAppSelector((state) => state?.auth?.user);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [subsidiary, setSubsidiary] = useState<string>("");
  const [departments, setDepartments] = useState<string>("");
  const [units, setUnits] = useState<string>("");

  console.log(active_fy_info, "active state");

  //Approval extension
  const [extendSubmission, setExtendSubmission] = useState<boolean>(false);
  const [reopenSubmission, setReopenSubmission] = useState<boolean>(false);

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // State to handle drawer state and id
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openApprovalStatus, setOpenApprovalStatus] = useState<boolean>(false);
  const [drawerUserId, setDrawerUserId] = useState<string>("");

  // -------- API Service for Tab == All Employee ------- //
  const {
    data: summaryData,
    isLoading: isLoadingSummary,
    isFetching: isFetchingSummary,
    error: summaryError,
  }: any = useGetAllOrganizationMissionPlanSummaryQuery({
    params: {
      subsidiary: subsidiary,
      department: departments,
      unit: units,
    },
    fiscal_year_id: id,
  });

  const {
    data: employeeData,
    isLoading: isLoadingEmployee,
    isFetching: isFetchingEmployee,
    error: employeeError,
  }: any = useGetAllOrganizationEmployeeMissionPlanQuery({
    params: {
      subsidiary: subsidiary,
      department: departments,
      unit: units,
      search: search,
      status: filter,
      sort_by: sort,
    },
    fiscal_year_id: id,
  });

  const {
    data: dropdownData,
    isLoading: isLoadingdropdown,
    error: dropdownError,
  }: any = useGetAllOrganizationMissionPlanDropdownQuery({});

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
  //Conditional render content of subsidiary dropdown
  const SUBSIDIARY_DATA = (obj: any) => {
    return [
      {
        label: "Select Subsidiary",
        value: "",
      },
      ...obj?.map((org: { id: string; name: string }) => ({
        value: org.id,
        label: org.name,
      })),
    ];
  };
  //Conditional render content of unit dropdown
  const UNIT_DATA = ({
    obj,
    deptId,
    SubId,
  }: {
    obj: any;
    deptId?: string;
    SubId?: string;
  }) => {
    let finalMapValue = [
      {
        value: "",
        label: "Select Option",
      },
    ];
    if (user_hierarchy?.includes("department")) {
      const filtered = obj?.filter(
        (item: any) => item?.department_id === deptId
      );
      finalMapValue = [
        {
          value: "",
          label: "Select Unit",
        },
        ...filtered?.map((org: { id: string; name: string }) => ({
          value: org.id,
          label: org.name,
        })),
      ];
    } else if (user_hierarchy?.includes("subsidiary")) {
      const filtered = obj?.filter(
        (item: any) => item?.subsidiary_id === SubId
      );
      finalMapValue = [
        {
          value: "",
          label: "Select Unit",
        },
        ...filtered?.map((org: { id: string; name: string }) => ({
          value: org.id,
          label: org.name,
        })),
      ];
    } else {
      finalMapValue = [
        {
          value: "",
          label: "Select Unit",
        },
        ...obj?.map((org: { id: string; name: string }) => ({
          value: org.id,
          label: org.name,
        })),
      ];
    }
    return finalMapValue;
  };
  //Conditional render content of department dropdown
  const DEPARTMENT_DATA = ({ obj, SubId }: { obj: any; SubId?: string }) => {
    let finalMapValue = [
      {
        value: "",
        label: "Select Option",
      },
    ];
    if (user_hierarchy?.includes("subsidiary")) {
      const filtered = obj?.filter(
        (item: any) => item?.subsidiary_id === SubId
      );
      finalMapValue = [
        {
          value: "",
          label: "Select Department",
        },
        ...filtered?.map((org: { id: string; name: string }) => ({
          value: org.id,
          label: org.name,
        })),
      ];
    } else {
      finalMapValue = [
        {
          value: "",
          label: "Select Department",
        },
        ...obj?.map((org: { id: string; name: string }) => ({
          value: org.id,
          label: org.name,
        })),
      ];
    }
    return finalMapValue;
  };
  //-------- END: API Service for Tab == All Employee ------- //

  const user_hierarchy = useAppSelector(
    (state) => state?.auth?.user?.organization?.hierarchy
  );

  if (summaryError) {
    toast.error(
      summaryError?.data?.message
        ? summaryError?.data?.message
        : "Unable to fetch data"
    );
  }
  if (employeeError) {
    toast.error(
      employeeError?.data?.message
        ? employeeError?.data?.message
        : "Unable to fetch data"
    );
  }
  if (dropdownError) {
    toast.error(
      dropdownError?.data?.message
        ? dropdownError?.data?.message
        : "Unable to fetch data"
    );
  }

  // Check if submission date has elasped
  // Define the end date for the report submission
  const submissionEndDate = new Date(active_fy_info?.creation_end_date);

  // Get today's date
  const today = new Date();

  // Check if the submission end date has not passed today's date
  const isSafe = submissionEndDate >= today;

  return (
    <>
      {summaryError && employeeError ? (
        <></>
      ) : !isLoadingSummary && !isLoadingEmployee && !isLoadingdropdown ? (
        <div className="pb-5 px-5 mt-1 space-y-5">
          <div className="flex gap-[10px] justify-end">
            {isSafe ? (
              <button
                className={cn(
                  btn,
                  active_fy_info?.status !== "active" &&
                    "opacity-30 hover:bg-white"
                )}
                disabled={active_fy_info?.status !== "active"}
                onClick={() => setExtendSubmission(true)}
              >
                Extend Submission Period
              </button>
            ) : (
              <button
                className={cn(
                  btn,
                  active_fy_info?.status !== "active" &&
                    "opacity-30 hover:bg-white"
                )}
                onClick={() => setReopenSubmission(true)}
                disabled={active_fy_info?.status !== "active"}
              >
                Reopen Submissions
              </button>
            )}
          </div>
          <div className="flex justify-between">
            <p className="text-xl font-medium text-primary">
              {active_fy_info?.title}
            </p>
            <div className="flex gap-x-[14px]">
              {/* render unit subsidiary if part of hierarcy */}
              {user_hierarchy?.includes("subsidiary") && (
                <CustomSelect
                  options={SUBSIDIARY_DATA(
                    dropdownData?.organization_info?.subsidiaries
                  )}
                  selected={subsidiary}
                  setSelected={(e) => {
                    if (subsidiary !== e) {
                      setDepartments("");
                      setUnits("");
                    }
                    setSubsidiary(e);
                  }}
                  className="min-w-40 bg-white"
                  placeholder="Select Subsidiary"
                />
              )}
              {/* render department dropdown if part of hierarcy */}
              {user_hierarchy?.includes("department") && (
                <CustomSelect
                  options={DEPARTMENT_DATA({
                    obj: dropdownData?.organization_info?.departments,
                    SubId: subsidiary,
                  })}
                  className="min-w-44 bg-white"
                  disabled={
                    subsidiary?.length === 0 &&
                    user_hierarchy?.includes("subsidiary")
                  }
                  selected={departments}
                  setSelected={(e) => {
                    if (departments !== e) {
                      setUnits("");
                    }
                    setDepartments(e);
                  }}
                  placeholder="Select Department"
                />
              )}
              {/* render unit dropdown if part of hierarcy */}
              {user_hierarchy?.includes("unit") && (
                <CustomSelect
                  options={UNIT_DATA({
                    obj: dropdownData?.organization_info?.units,
                    deptId: departments,
                    SubId: subsidiary,
                  })}
                  selected={units}
                  setSelected={(e) => setUnits(e)}
                  disabled={
                    (departments?.length === 0 &&
                      user_hierarchy?.includes("department")) ||
                    (subsidiary?.length === 0 &&
                      user_hierarchy?.includes("subsidiary"))
                  }
                  className="min-w-40 bg-white"
                  placeholder="Select Unit"
                />
              )}
            </div>
          </div>
          <AllEmployeeMissionCard {...summaryData?.summary} />
          <TableWrapper
            tableheaderList={[
              "Staff Name",
              "Designation",
              "Email",
              "Date Submitted",
              "Status",
              "Action",
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
              // allemployeeData
            )}
            loading={isFetchingEmployee}
            handleSearchClick={(param) => {
              setSearch(param);
            }}
            dropDown
            dropDownList={[
              {
                label: "View Mission Plan",
                color: "",
                onActionClick: (param: any, dataTwo: any) => {
                  dispatch(
                    updateEmployeeDetails({
                      name: dataTwo?.name?.props?.children[1].props?.children,
                    })
                  );
                  router.push(
                    ADMIN.APPROVE_REJECT_MISSION_PLAN(
                      dataTwo?.name?.props.children[0].props.children
                    )
                  );
                },
              },
              {
                label: "Approval Status",
                color: "",
                onActionClick: (param: any, dataTwo: any) => {
                  setDrawerUserId(
                    dataTwo?.name?.props.children[0].props.children
                  );
                  setOpenDrawer(false);
                  setOpenApprovalStatus(true);
                },
              },
              {
                label: "View Comments",
                color: "",
                onActionClick: (param: any, dataTwo: any) => {
                  setDrawerUserId(
                    dataTwo?.name?.props.children[0].props.children
                  );
                  setOpenApprovalStatus(false);
                  setOpenDrawer(true);
                },
              },
            ]}
            onPdfChange={handleExport}
            onCsvChange={handleExport}
          />
          <ReopenSubmissionModal
            show={reopenSubmission}
            setSuccessModal={setShowSuccessModal}
            handleClose={() => setReopenSubmission(false)}
          />
          <SubmissionExtendModal
            show={extendSubmission}
            setSuccessModal={setShowSuccessModal}
            handleClose={() => setExtendSubmission(false)}
          />
        </div>
      ) : (
        <div className="h-[75vh] place-content-center">
          <PageLoader />
        </div>
      )}
      <DrawerComment
        show={openDrawer}
        handleClose={() => {
          setDrawerUserId("");
          setOpenDrawer(false);
        }}
        userId={drawerUserId}
      />
      <DrawerApprovalStatus
        show={openApprovalStatus}
        handleClose={() => {
          setDrawerUserId("");
          setOpenApprovalStatus(false);
        }}
        userId={drawerUserId}
      />
      <ConfirmationModal
        icon="/assets/images/success.gif"
        iconClass="w-40"
        title="Changes Have been Saved"
        message="Congratulations! you have successfully updated your settings. Click on the button below to continue"
        show={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
        handleClick={() => setShowSuccessModal(false)}
        actionBtnTitle="Complete"
        modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
      />
    </>
  );
};

export default AllEmployeeMissionPlan;

const FORMAT_TABLE_DATA = (obj: any) => {
  return obj?.map((org: any) => ({
    name: (
      <>
        <span className="hidden">{org.id}</span>
        <p>{org?.name}</p>
      </>
    ),
    designation: org?.designation,
    email: org?.email,
    created_at: formatDate(org?.created_at),
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
