"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import React from "react";
import { CustomAccordion } from "@/components/custom-accordion";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { EditableLabel } from "@/components/fragment";
import { data } from "./_data/data";
import { useRouter } from "next/navigation";
import ImpliedTaskApproval from "./_partials/implied-task-approval";

export default function ViewApprovalProgress({
  params,
}: {
  params: { reportId: string };
}) {
  const router = useRouter();
  const handleFormSubmit = () => {};

  const formik = useFormik({
    initialValues: {
      implied_task: [
        {
          expected: "",
          actual_outcome: "",
          percentage_completion: "",
        },
      ],
    },
    // validationSchema:
    onSubmit: handleFormSubmit,
    // validateOnChange: true,
    // validateOnBlur: true,
  });
  return (
    <DashboardLayout back headerTitle="Approval Tasks Submission">
      <div className="p-[2rem]">
        <h1 className="font-normal pb-[2rem] text-lg">
          January Expected Outcome
        </h1>
        {data?.map((item, idx) => (
          <CustomAccordion
            key={idx}
            className="mb-4 flex flex-col gap-1"
            headerClassName="bg-white p-5 border border-custom-divider rounded"
            title={
              <div className="flex w-full gap-x-5">
                <p className="text-black text-[.95rem]">{idx + 1}.</p>
                <div className="flex justify-between items-center w-[80%]">
                  <div className="w-[60%] text-left grid gap-y-2">
                    <p className="text-[.97rem] font-[500] ">Specified Task</p>
                    <p className="text-sm font-[300]">{item.title}</p>
                    <p className="text-sm font-[300]">
                      {item.startDate} - {item.endDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-[.97rem] font-medium mb-2">Weight</p>
                    <p className="font-[300] ">{item.weight}%</p>
                  </div>
                  <div>
                    <p className="text-[.97rem] font-medium mb-2">Status</p>
                    <EditableLabel status={item.status} />
                  </div>
                </div>
              </div>
            }
            content={
              <div>
                <FormikProvider value={formik}>
                  <FieldArray name="tasks">
                    {({ insert, remove, push }) => (
                      <div>
                        {formik.values.implied_task?.length > 0 &&
                          formik.values.implied_task.map(
                            (implied_task: any, index: number) => (
                              <div
                                key={index}
                                className="pt-8 border border-white p-8 bg-white"
                              >
                                <ImpliedTaskApproval
                                  formik={formik}
                                  impliedTaskData={item?.impliedTasks}
                                />
                              </div>
                            )
                          )}
                      </div>
                    )}
                  </FieldArray>
                  <div className="bg-white p-8 rounded-b">
                    <Button className="text-white text-sm font-medium bg-primary p-2 border flex gap-x-2 border-primary shadow-none">
                      Submit Input
                    </Button>
                  </div>
                </FormikProvider>
              </div>
            }
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
