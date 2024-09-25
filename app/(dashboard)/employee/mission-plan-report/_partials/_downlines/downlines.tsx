"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  ApproveMOS,
  ApproveTask,
  DownlineTable,
  MyMeasureSuccess,
  MySpecifiedTask,
  ViewProgress,
} from "./_partials";

const Downlines = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const ui = searchParams.get("ui");
  const tab = searchParams.get("tab");

  return (
    <div className="mt-5">
      {ui === "downlines" && !id && <DownlineTable />}
      {ui === "downlines" &&
        id &&
        type === "view-progress" &&
        typeof tab !== "string" && <ViewProgress />}
      {ui === "downlines" &&
        id &&
        type === "view-progress" &&
        tab === "measure-success" && <MyMeasureSuccess />}
      {ui === "downlines" &&
        id &&
        type === "view-progress" &&
        tab === "specified-task" && <MySpecifiedTask />}
      {ui === "downlines" && id && type === "approve-task" && <ApproveTask />}
      {ui === "downlines" && id && type === "approve-mos" && <ApproveMOS />}
    </div>
  );
};

export default Downlines;
