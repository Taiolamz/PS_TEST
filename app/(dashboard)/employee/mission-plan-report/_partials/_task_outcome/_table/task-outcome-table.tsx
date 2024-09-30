import TableWrapper from "@/components/tables/TableWrapper";
import routesPath from "@/utils/routes";
import { usePathname, useRouter } from "next/navigation";

import React, { useCallback } from "react";
const { EMPLOYEE } = routesPath;
interface TaskOutcomeTableProps {
  FORMAT_TABLE_DATA: (e: any) => void;
  isFetchingOutcomeData?: boolean;
  outcomeData: any;
}
const TaskOutcomeTable = ({
  FORMAT_TABLE_DATA,
  outcomeData,
}: TaskOutcomeTableProps) => {
  const pathname = usePathname();

  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, id: string, type: string) => {
      const params = new URLSearchParams();
      params.set("ui", name); // Set the 'name' param
      params.set("id", id); // Set the 'id' param
      type === "expected" && params.set("type", "expected-outcome");
      type === "actual" && params.set("type", "actual-outcome");

      return params.toString(); // Return the query string
    },
    [] // We are not dependent on `searchParams` now, so it's an empty dependency array
  );

  return (
    <div className="flex flex-col gap-5 mt-6">
      <TableWrapper
        tableheaderList={[
          "FY Name",
          "Status",
          "Approval Progress",
          "Task Completion Percentage",
          "Action",
        ]}
        perPage={"10"}
        totalPage={"1"}
        currentPage={"1"}
        onPageChange={(p) => {}}
        onRowClick={() => {}}
        hideNewBtnOne={true}
        tableBodyList={FORMAT_TABLE_DATA(outcomeData)}
        loading={false}
        dropDown
        dropDownList={[
          {
            label: "January Expected Outcome",
            color: "",
            onActionClick: (param: any, dataTwo: any) => {
              //   console.log(
              //     "dataTwo",
              //     dataTwo?.name?.props?.children[0].props.children
              //   );

              router.push(
                pathname.split("?")[0] +
                  "?" +
                  createQueryString(
                    "task_outcome",
                    dataTwo?.name?.props?.children[0].props.children,
                    "expected"
                  )
              );
            },
          },
          {
            label: "January Actual Outcome",
            color: "",
            onActionClick: (param: any, dataTwo: any) => {
              router.push(
                EMPLOYEE.ACTUAL_OUTCOME(
                  dataTwo?.name?.props?.children[0].props.children
                )
              );
            },
          },
          {
            label: "Approval Status",
            color: "",
            onActionClick: (param: any, dataTwo: any) => {},
          },
        ]}
        hideSearchFilterBox
        width="240px"
      />
    </div>
  );
};

export default TaskOutcomeTable;
