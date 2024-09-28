"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommentsIcon from "@/public/assets/icons/comments";
import { cn } from "@/lib/utils";

export default function TargetSubmission() {
  const [showHistory, setShowHistory] = useState(false);
  const [showComment, setShowComment] = useState(false);
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
    <div className="mt-2">
      <div className="border border-[var(--input-border)] bg-[var(--bg-white-200)] px-6 py-5">
        <header className="lg:flex items-center justify-between">
          <h3 className="text-black max-lg:inline-block capitalize text-nowrap">
            1 .Measure of Success Title
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
          <h3 className="text-lg font-semibold max-lg:mt-3 items-center gap-x-1 text-[var(--text-color4)]">
            Percent Completed:
            <span className=" text-red-500">{40}%</span>
          </h3>
        </header>
        <main className="mt-7 lg:flex gap-x-3">
          <section className="w-full mb-6">
            <div className="grid grid-cols-11 gap-x-1">
              <p className=" col-span-4 text-[var(--text-color2)] text-sm">
                Name of Task
              </p>
              <p className=" col-span-3 text-[var(--text-color2)] text-sm">
                Weight
              </p>
              <p className=" col-span-4 text-[var(--text-color2)] text-sm">
                Resource
              </p>

              <hr className="my-3 col-span-11" />

              <p className=" col-span-4 text-[var(--text-color2)] text-xs">
                Achieve New user onboarding for over 50 new customers
              </p>
              <p className=" col-span-3 text-[var(--text-color2)] text-xs">
                80%
              </p>
              <p className=" col-span-4 text-[var(--text-color2)] text-xs">
                Adamu Bryan, Damilare Adebowale
              </p>
            </div>
            <div className="flex gap-x-3 mt-8">
              <Button
                onClick={() => setShowHistory(true)}
                className="text-primary text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
              >
                View History
              </Button>
              <Button
                onClick={() => setShowComment(true)}
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
            <div className="">
              <Button className="text-white text-sm font-medium bg-primary p-2 px-5 borders border-primary shadow-none">
                Submit
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
