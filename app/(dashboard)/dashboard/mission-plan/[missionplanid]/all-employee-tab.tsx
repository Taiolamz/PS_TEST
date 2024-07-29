import React from "react";
import {
  allemployeeColumns,
  allemployeeData,
} from "./_component/all-employee-table-data";
import AllEmployeeTable from "../_components/all-employee-table";
import AllEmployeeMissionCard from "../_components/all-employee-mission-card";

export default function AllEmployeeTab() {
  return (
    <>
      <AllEmployeeMissionCard />
      <div className="pt-12">
        <AllEmployeeTable data={allemployeeData} columns={allemployeeColumns} />
      </div>
    </>
  );
}
