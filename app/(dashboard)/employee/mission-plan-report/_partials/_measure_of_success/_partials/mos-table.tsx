import { Progress } from "@/components/ui/progress";
import ApprovalProgress from "@/components/fragment/progress/approval-progress";
import { Button } from "@/components/ui/button";
import TableWrapper from "@/components/tables/TableWrapper";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { fakeApprovalStep, fakeTableData } from "../_data/data";
import Link from "next/link";
import ApprovalDrawer from "@/components/drawer/approval-drawer";
import routesPath from "@/utils/routes";
import { useGetFiscalYearsProgressQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { TableLoader } from "@/components/fragment";

const { EMPLOYEE } = routesPath;
export default function MOSTable() {
  const router = useRouter();
  const [fyId, setFyId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const { data, isLoading, isFetching } = useGetFiscalYearsProgressQuery({
    type: "measures",
    page,
  });
  console.log({ data, isLoading, isFetching });
  return (
    <div className="mt-2">
      {isLoading ? (
        <TableLoader rows={8} columns={8} />
      ) : (
        <TableWrapper
          tableheaderList={[
            "FY Name",
            "Status",
            "Approval Progress",
            "Measure Of Success Achievement",
            "Action",
          ]}
          perPage={data.fiscal_years.meta.per_page}
          totalPage={data.fiscal_years.meta.total}
          currentPage={data.fiscal_years.meta.current_page}
          onPageChange={(p) => {
            setPage(p);
          }}
          hideNewBtnOne={true}
          tableBodyList={FORMAT_TABLE_DATA(data?.fiscal_years?.data)}
          loading={isFetching}
          dropDown
          dynamicDropDownList={(row: any) => {
            if (row?.status.props.children.toLowerCase() === "closed") {
              return [
                {
                  label: "View My Report",
                  onActionClick: (param: any, dataTwo: any) => {
                    router.push(
                      EMPLOYEE.MOS_REPORT(
                        row?.name?.props?.children[0].props.children
                      )
                    );
                  },
                },
              ];
            } else {
              return [
                {
                  label: "February Targets",
                  color: "",
                  onActionClick: (param: any, dataTwo: any) => {
                    router.push(
                      EMPLOYEE.MOS_TASK_SUBMISSION(
                        row?.name?.props?.children[0].props.children
                      )
                    );
                  },
                },
                {
                  label: "Approval Status",
                  color: "",
                  onActionClick: (param: any, dataTwo: any) => {
                    setOpen(true);
                    setFyId(row?.name?.props?.children[0].props.children);
                  },
                },
              ];
            }
          }}
          hideSearchFilterBox
          width="240px"
        />
      )}
      <ApprovalDrawer
        open={open}
        onClose={() => setOpen(false)}
        data={fakeApprovalStep}
        id={fyId}
      />
    </div>
  );
}

const FORMAT_TABLE_DATA = (data: any) => {
  return data?.map((item: any) => ({
    name: (
      <>
        <span className="hidden">{item.id}</span>
        <p>{item?.name}</p>
      </>
    ),
    status: (
      <p
        className={` capitalize 
          ${item?.status !== "active" ? "text-[#119C2B]" : "text-[#835101]"}`}
      >
        {item?.status}
      </p>
    ),
    approvalProgress: (
      <ApprovalProgress progressSteps={item?.approval_progress} />
    ),

    percentage: (
      <div className="flex gap-x-1 items-center">
        <p className="text-[10px]">
          {Math.round(Number(item?.percentage?.split("%")[0]))}%
        </p>
        <Progress
          value={Math.round(Number(item?.percentage?.split("%")[0]))}
          className={`w-[150px] h-1.5 `}
          indicatorClass={
            Math.round(Number(item?.percentage?.split("%")[0])) >= 70
              ? "bg-green-500"
              : Math.round(Number(item?.percentage?.split("%")[0])) > 40
              ? "bg-warning"
              : "bg-[red]"
          }
        />
      </div>
    ),
  }));
};
