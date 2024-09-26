import { EmptyState, TableLoader } from "@/components/fragment";
import TableWrapper from "@/components/tables/TableWrapper";
import { EmptyFileIcon } from "@/public/assets/icons";
import React, { useState } from "react";
import DrawerComment from "../_side-modal/drawer-comment";
import DrawerApprovalStatus from "../_side-modal/drawer-approval-status";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import BadgeComponent from "@/components/badge/BadgeComponents";
import { formatDate } from "@/utils/helpers/date-formatter";
import { updateEmployeeDetails } from "@/redux/features/mission-plan/employeeDataSlice";
import routesPath from "@/utils/routes";
import { allemployeeData } from "../../_data/all-employee-table-data";
import { useGetDownlineApprovalMissionPlanQuery } from "@/redux/services/mission-plan/allmissionplanApi";

const { EMPLOYEE } = routesPath;

export default function Approvals() {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  //The fiscial year ID
  const { mission_plan: mission_plan_info } = useAppSelector(
    (state) => state.mission_plan
  );

  const id = mission_plan_info?.active_fy_info?.id || "";

  const { data, isLoading, isFetching } =
    useGetDownlineApprovalMissionPlanQuery<{
      data: { data: any[]; links: any; meta: any };
      isLoading: boolean;
      isFetching?: boolean;
    }>({
      fiscalYear: id,
      params: {
        search: search,
        filter_by: filter,
        sort: sort,
      },
    });
  // State to handle drawer state and id
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openApprovalStatus, setOpenApprovalStatus] = useState<boolean>(false);
  const [drawerUserId, setDrawerUserId] = useState<string>("");
  return (
    <div className="p-5">
      {isLoading ? (
        <TableLoader rows={8} columns={6} />
      ) : (
        <>
          {data?.data?.length === 0 ? (
            <EmptyState icon={EmptyFileIcon} text="Sorry, you don’t have an">
              <p className="text-custom-gray-scale-400 font-medium text-sm -mt-3">
                approval request yet
              </p>
            </EmptyState>
          ) : (
            <TableWrapper
              tableheaderList={[
                "Staff Name",
                "Job Title",
                "Email",
                "Date Submitted",
                "Approval Status",
                "Action",
              ]}
              perPage="10"
              totalPage="30"
              currentPage="1"
              onPageChange={(p) => {
                console.log(p);
              }}
              onSearch={(val) => {
                setTimeout(() => {
                  setSearch(val);
                }, 2000);
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
              tableBodyList={FORMAT_TABLE_DATA(data?.data)}
              loading={isFetching}
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
                      EMPLOYEE.APPROVE_REJECT_MISSION_PLAN(
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
              hideExport
            />
          )}
        </>
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
    </div>
  );
}

const FORMAT_TABLE_DATA = (obj: any) => {
  return obj?.map((org: any) => ({
    name: (
      <>
        <span className="hidden">{org?.mission_plan_id}</span>
        <p>{org?.name}</p>
      </>
    ),
    designation: org?.designation ?? "Not assigned",
    email: org?.email ?? "Not assigned",
    created_at: formatDate(org?.date_submitted),
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
