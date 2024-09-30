"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommentsIcon from "@/public/assets/icons/comments";
import { cn } from "@/lib/utils";
import CustomCommentDrawer from "@/components/drawer/comment-drawer";
import HistoryDrawer from "@/components/drawer/history-drawer";
import { fakehistoryData } from "../../../_partials/_measure_of_success/_data/data";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReportChallengeModal from "../../../_component/report-challenge-modal";

export default function TargetSubmission() {
  const [showHistory, setShowHistory] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showReportChallenge, setShowReportChallenge] = useState(false);
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
    <DashboardLayout back headerTitle="Period Target Submission">
      <div className="m-5 mt-7 space-y-7">
        <section className="border border-[var(--input-border)] bg-white px-6 py-5">
          <header className="lg:flex items-center justify-between">
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
            <h3 className="font-medium max-lg:mt-3 items-center gap-x-1 text-[var(--text-color4)]">
              Percent Completed:{" "}
              <span className="font-semibold text-green-500">{74}%</span>
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
                  className="text-[var(--footer-link-color)] text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
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
                required
              />
              <div className="grid lg:grid-cols-2 gap-4">
                <Input
                  label="Total Percentage Achieved"
                  id="total_percentage"
                  name="total_percentage"
                  placeholder="% Auto Calculated"
                />
                <Input
                  label="Downline Achievement"
                  id="downline_achieved"
                  name="downline_achieved"
                  placeholder="Auto Generated"
                />
              </div>
              <div className="space-x-5">
                <Button className="text-white text-sm font-medium bg-primary p-2 px-5 borders border-primary shadow-none">
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    setId("dfdfdfdf12");
                    setShowReportChallenge(true);
                  }}
                  className="bg-transparent shadow-none p-0 underline text-[var(--primary-color)] mt-6 text-xs"
                >
                  Report Challenge
                </Button>
              </div>
            </section>
          </main>
        </section>

        <section className="border border-[var(--input-border)] bg-[var(--bg-white-200)] px-6 py-5">
          <header className="lg:flex items-center justify-between">
            <h3 className="text-black max-lg:inline-block capitalize text-nowrap">
              2 .Measure of Success Title
            </h3>
            <h3 className="inline-flex items-center max-lg:float-right gap-x-1 text-[var(--text-color4)] text-sm">
              Approval Status :
              <span
                className={cn(
                  "text-[rgb(var(--bg-green-100))]",
                  "text-[var(--bg-yellow-400)]"
                )}
              >
                Not Approved
              </span>
            </h3>
            <h3 className="font-medium max-lg:mt-3 items-center gap-x-1 text-[var(--text-color4)]">
              Percent Completed:{" "}
              <span className="font-semibold text-red-500">{28}%</span>
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
                  className="text-[var(--footer-link-color)] text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
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
                required
              />
              <div className="grid lg:grid-cols-2 gap-4">
                <Input
                  label="Total Percentage Achieved"
                  id="total_percentage"
                  name="total_percentage"
                  placeholder="% Auto Calculated"
                />
                <Input
                  label="Downline Achievement"
                  id="downline_achieved"
                  name="downline_achieved"
                  placeholder="Auto Generated"
                />
              </div>
              <div className="space-x-5">
                <Button className="text-white text-sm font-medium bg-primary p-2 px-5 borders border-primary shadow-none">
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    setId("rererere98");
                    setShowReportChallenge(true);
                  }}
                  className="bg-transparent shadow-none p-0 underline text-[var(--primary-color)] mt-6 text-xs"
                >
                  Report Challenge
                </Button>
              </div>
            </section>
          </main>
        </section>

        <ReportChallengeModal
          show={showReportChallenge}
          handleClose={() => setShowReportChallenge(false)}
        />

        <CustomCommentDrawer
          open={showComment}
          onClose={() => setShowComment(false)}
          id={id}
          data={[]}
          handleSubmit={() => {}}
          commentType={"success-measure"}
        />
        <HistoryDrawer
          open={showHistory}
          onClose={() => setShowHistory(false)}
          id={id}
          loading={false}
          data={fakehistoryData}
        />
      </div>
    </DashboardLayout>
  );
}
