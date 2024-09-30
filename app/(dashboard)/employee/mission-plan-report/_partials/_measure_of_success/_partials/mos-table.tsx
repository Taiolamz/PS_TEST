import { Progress } from "@/components/ui/progress";
import ApprovalProgress from "@/components/fragment/progress/approval-progress";
import { Button } from "@/components/ui/button";
import TableWrapper from "@/components/tables/TableWrapper";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { fakeApprovalStep, fakeTableData } from "../_data/data";
import Link from "next/link";
import ApprovalDrawer from "@/components/drawer/approval-drawer";

export default function MOSTable() {
  const router = useRouter();
  const pathname = usePathname();
  const [fyId, setFyId] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const createDownlineQueryString = React.useCallback(
    ({ name, id, type }: { name: string; id: string; type: string }) => {
      const params = new URLSearchParams();
      params.set("ui", name); // Set the 'name' param
      params.set("id", id); // Set the 'id' param
      type === "task" && params.set("type", "target-submission");
      type === "report" && params.set("type", "report");
      return params.toString(); // Return the query string
    },
    []
  );

  const FORMAT_TABLE_DATA = (data: any) => {
    return data?.map((item: any) => ({
      name: (
        <>
          <span className="hidden">{item.id}</span>
          <p>{item?.fyName}</p>
        </>
      ),
      status: (
        <p
          className={
            item?.status === "Ongoing" ? "text-[#119C2B]" : "text-[#835101]"
          }
        >
          {item?.status}
        </p>
      ),
      approvalProgress: (
        <ApprovalProgress steps={4} completedSteps={item?.approvalProgress} />
      ),

      taskCompletionPercentage: (
        <div className="flex gap-x-1 items-center">
          <p className="text-[10px]">{item?.taskCompletionPercentage}%</p>
          <Progress
            value={item?.taskCompletionPercentage}
            className={`w-[150px] h-1.5 `}
            indicatorClass={
              item?.taskCompletionPercentage >= 70
                ? "bg-green-500"
                : item?.taskCompletionPercentage > 40
                ? "bg-warning"
                : "bg-[red]"
            }
          />
        </div>
      ),
    }));
  };

  return (
    <div className="mt-2">
      <TableWrapper
        tableheaderList={[
          "FY Name",
          "Status",
          "Approval Progress",
          "Measure Of Success Achievement",
          "Action",
        ]}
        perPage={"10"}
        totalPage={"1"}
        currentPage={"1"}
        onPageChange={(p) => {}}
        hideNewBtnOne={true}
        tableBodyList={FORMAT_TABLE_DATA(fakeTableData)}
        loading={false}
        dropDown
        dynamicDropDownList={(row: any) => {
          if (row?.status.props.children.toLowerCase() === "closed") {
            return [
              {
                label: "View My Report",
                onActionClick: (param: any, dataTwo: any) => {
                  router.push(
                    pathname.split("?")[0] +
                      "?" +
                      createDownlineQueryString({
                        type: "report",
                        id: row?.name?.props?.children[0].props.children,
                        name: "measure_of_success",
                      })
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
                    pathname.split("?")[0] +
                      "?" +
                      createDownlineQueryString({
                        type: "task",
                        id: row?.name?.props?.children[0].props.children,
                        name: "measure_of_success",
                      })
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
      <ApprovalDrawer
        open={open}
        onClose={() => setOpen(false)}
        data={fakeApprovalStep}
        id={fyId}
      />
    </div>
  );
}
