"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { ApproveMOS, ApproveTask, DownlineTable } from "./_partials";

const Downlines = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const ui = searchParams.get("ui");

  return (
    <div className="mt-5">
      {ui === "downlines" && !id && <DownlineTable />}
      {ui === "downlines" && id && type === "approve-task" && <ApproveTask />}
      {ui === "downlines" && id && type === "approve-mos" && <ApproveMOS />}
    </div>
  );
};

export default Downlines;
