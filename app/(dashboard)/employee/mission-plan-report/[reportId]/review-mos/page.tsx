"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommentsIcon from "@/public/assets/icons/comments";
import { cn } from "@/lib/utils";
import CustomCommentDrawer from "@/components/drawer/comment-drawer";
import HistoryDrawer from "@/components/drawer/history-drawer";
import RejectModal from "../../_component/reject-modal";
import ApproveModal from "../../_component/approve-modal";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";

export default function ApproveMOS() {
  const [showHistory, setShowHistory] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [id, setId] = useState("");
  const handleFormSubmit = () => {};

  const formik = useFormik({
    initialValues: {
      implied_task: [
        {
          expected: "",
          actual_outcome: "",
          contribution: "",
          expected_outcome: "",
        },
      ],
    },
    // validationSchema:
    onSubmit: handleFormSubmit,
    // validateOnChange: true,
    // validateOnBlur: true,
  });
  return (
    <DashboardLayout back headerTitle="Downlines">
      <div className="m-5 mt-7 space-y-7">
        <section className="border border-[var(--input-border)] bg-white px-6 py-5">
          <header className="flex items-center justify-between">
            <h3 className="text-black max-lg:inline-block capitalize text-nowrap">
              1 .Measure of Success Title
            </h3>
            <h3 className="inline-flex items-center max-lg:float-right gap-x-1 text-[var(--text-color4)] text-sm">
              Approval Status :
              <span
                className={cn(
                  "text-[rgb(var(--bg-green-100))]"
                  // "text-[var(--bg-yellow-400)]"
                )}
              >
                Approved
              </span>
            </h3>
          </header>
          <main className="mt-7 lg:flex gap-x-3">
            <section className="w-full mb-6">
              <div className="grid grid-cols-9 text-[var(--footer-link-color)] gap-x-1">
                <p className=" col-span-4 text-sm">Measure</p>
                <p className=" col-span-2 text-sm">Weight</p>
                <p className=" col-span-1 text-sm">Unit</p>
                <p className=" col-span-2 text-sm">Yearly Target</p>

                <hr className="my-3 col-span-12" />

                <p className=" col-span-4 text-xs">
                  Achieve New user onboarding for over 50 new customers
                </p>
                <p className=" col-span-2 text-xs">80%</p>
                <p className=" col-span-1 text-xs">%</p>
                <p className=" col-span-2 text-xs">200</p>
              </div>
              <div className="flex gap-x-3 mt-8">
                <Button
                  onClick={() => {
                    setShowHistory(true);
                    setId("213|f12dfe2334jh88er");
                  }}
                  className="text-primary text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                >
                  View History
                </Button>
                <Button
                  onClick={() => {
                    setShowComment(true);
                    setId("213|f12dfe2334jh88er");
                  }}
                  className="text-[#6E7C87] text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                >
                  Comments
                  <CommentsIcon />
                </Button>
              </div>
            </section>
            <section className="border grid gap-y-4 border-[var(--input-border)] rounded-sm w-full py-5 px-4">
              <Input
                label="Jan Target"
                id="target"
                name="target"
                placeholder="Target as set during period start"
                disabled
              />
              <Input
                label="Jan Achievement"
                id="achievement"
                name="achievement"
                placeholder="Input Achievement"
                disabled
              />
              <div className="grid lg:grid-cols-2 gap-4">
                <Input
                  label="Total Percentage Achieved"
                  id="total_percentage"
                  name="total_percentage"
                  placeholder="% Auto Calculated"
                  disabled
                />
                <Input
                  label="Downline Achievement"
                  id="downline_achieved"
                  name="downline_achieved"
                  placeholder="Auto Generated"
                  disabled
                />
              </div>
              <div className="space-x-3">
                <Button
                  onClick={() => {
                    setShowApprove(true);
                    setId("143ofd4345approveId");
                  }}
                  className="text-[rgb(var(--bg-green-100))] w-[120px] text-sm font-medium bg-[rgb(var(--bg-green-100)/0.1)] p-2 px-5 rounded shadow-none"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => {
                    setShowReject(true);
                    setId("143ofd4345approveId");
                  }}
                  className="text-[var(--bg-red-100)] w-[120px] text-sm font-medium bg-[var(--bg-red-100-op)] p-2 px-5 borders border-transparent rounded shadow-none"
                >
                  Reject
                </Button>
              </div>
            </section>
          </main>
        </section>
        {/* Approve MOS target MOdal */}
        <ApproveModal
          show={showApprove}
          handleClose={() => setShowApprove(false)}
          handleSubmit={() => {
            setShowApprove(false);
          }}
        />
        {/* Reject MOS target MOdal */}
        <RejectModal
          show={showReject}
          handleClose={() => setShowReject(false)}
          handleSubmit={(val) => {
            setShowReject(false);
            console.log(val);
          }}
        />
        {/* MOS comment drawer */}
        <CustomCommentDrawer
          open={showComment}
          onClose={() => setShowComment(false)}
          id={id}
          data={[]}
          handleSubmit={() => {}}
          commentType={"success-measure"}
        />
        {/* MOS history drawer */}
        <HistoryDrawer
          open={showHistory}
          onClose={() => setShowHistory(false)}
          id={id}
          loading={false}
          data={[]}
        />
      </div>
    </DashboardLayout>
  );
}
