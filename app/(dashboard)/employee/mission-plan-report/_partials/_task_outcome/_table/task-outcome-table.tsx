import React, { useMemo } from "react";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { TableLoader } from "@/components/fragment";
import TableWrapper from "@/components/tables/TableWrapper";
import ApprovalDrawer from "@/components/drawer/approval-drawer";
import ApprovalProgress from "@/components/fragment/progress/approval-progress";
import { useGetFiscalYearsProgressQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { getCurrentMonth } from "@/utils/helpers/date-formatter";
import { fakeApprovalStep } from "../../_measure_of_success/_data/data";
import { useAppSelector } from "@/redux/store";

const { EMPLOYEE } = routesPath;

const TaskOutcomeTable = () => {
  const router = useRouter();
  const [fyId, setFyId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const currentMonth = useMemo(() => getCurrentMonth(), []); //Get the current month name
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, isFetching } = useGetFiscalYearsProgressQuery({
    type: "tasks",
    page,
  });

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
            "Task Completion Percentage",
            "Action",
          ]}
          perPage={data?.fiscal_years?.meta?.per_page}
          totalPage={data?.fiscal_years?.meta?.total}
          currentPage={data?.fiscal_years?.meta?.current_page}
          onPageChange={(p) => {
            setPage(p);
          }}
          hideNewBtnOne={true}
          tableBodyList={FORMAT_TABLE_DATA(data?.fiscal_years?.data)}
          loading={isFetching}
          dropDown
          dynamicDropDownList={(row: any) => {
            if (row?.status?.props?.children?.toLowerCase() !== "active") {
              return [
                {
                  label: "View My Report",
                  onActionClick: (param: any, dataTwo: any) => {
                    router.push(`
                      ${EMPLOYEE.SPECIFIED_TASK_REPORT(user?.id || "")}?fy=${
                      row?.name?.props?.children[0]?.props?.children
                    }
                    `);
                  },
                },
              ];
            } else {
              return [
                {
                  label: `${currentMonth} Expected Outcome`,
                  color: !row?.name?.props?.children[1]?.props?.children
                    ? "opacity-20"
                    : "",
                  onActionClick: (param: any, dataTwo: any) => {
                    if (row?.name?.props?.children[1]?.props?.children) {
                      router.push(
                        EMPLOYEE.EXPECTED_OUTCOME(
                          row?.name?.props?.children[0]?.props?.children
                        )
                      );
                    }
                  },
                },
                {
                  label: `${currentMonth} Actual Outcome`,
                  color: !row?.name?.props?.children[2]?.props?.children
                    ? "opacity-20"
                    : "",
                  onActionClick: (param: any, dataTwo: any) => {
                    if (row?.name?.props?.children[2]?.props?.children) {
                      router.push(
                        EMPLOYEE.ACTUAL_OUTCOME(
                          row?.name?.props?.children[0]?.props?.children
                        )
                      );
                    }
                  },
                },
                {
                  label: "Approval Status",
                  color: "",
                  onActionClick: (param: any, dataTwo: any) => {
                    setOpen(true);
                    setFyId(row?.name?.props?.children[0]?.props?.children);
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
};

export default TaskOutcomeTable;

const FORMAT_TABLE_DATA = (data: any) => {
  return data?.map((item: any) => ({
    name: (
      <>
        <span className="hidden">{item?.id}</span>
        <span className="hidden">{item?.set_target}</span>
        <span className="hidden">{item?.set_outcome}</span>
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
            Math?.round(Number(item?.percentage?.split("%")[0])) >= 70
              ? "bg-green-500"
              : Math?.round(Number(item?.percentage?.split("%")[0])) > 40
              ? "bg-warning"
              : "bg-[red]"
          }
        />
      </div>
    ),
  }));
};
