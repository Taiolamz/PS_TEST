import { CustomAccordion } from "@/components/custom-accordion";
import React, { useState } from "react";
import ImpliedTask from "./implied-task";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { data } from "../_data/data";
import { Button } from "@/components/ui/button";
import { ReusableDrawer } from "@/components/fragment";
import History from "./history";
import CommentCard from "../../../_component/comment-card";
import Comment from "./comment";
import ReportChallengeModal from "./report-challenge-modal";

const ActualOutcome = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
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
    <div>
      <ReusableDrawer
        title="Outcome History"
        show={showHistory}
        handleClose={() => setShowHistory(false)}
        closeOnClickOutside={false}
        headerClass={"bg-primary lg:mx-0 p-5"}
        titleClass={"text-white"}
      >
        <div className="py-4 px-[18px]">
          <History />
        </div>
      </ReusableDrawer>
      <ReusableDrawer
        title="Outcome History"
        show={showComment}
        handleClose={() => setShowComment(false)}
        closeOnClickOutside={false}
        headerClass={"bg-primary lg:mx-0 p-5"}
        titleClass={"text-white"}
        childrenContainerClass="py-0"
      >
        <div className="">
          <Comment />
        </div>
      </ReusableDrawer>

      <ReportChallengeModal
        show={showChallengeModal}
        handleClose={() => setShowChallengeModal(false)}
      />
      {data?.map((item, idx) => (
        <CustomAccordion
          key={idx}
          className="mb-4 flex flex-col gap-1"
          headerClassName="bg-white p-5 border border-custom-divider rounded"
          title={
            <div className="flex w-full gap-x-5">
              <p className="text-[#015858] text-xl">{idx + 1}.</p>
              <div className="flex justify-between items-center w-[80%]">
                <div className="w-[60%] text-left grid gap-y-2">
                  <p className="text-[#222222ef] text-sm font-medium">
                    Specified task
                  </p>
                  <p className="text-[#222222d2] font-medium">{item.title}</p>
                  <p className="text-[#222222ef] text-sm">
                    {item.startDate} - {item.endDate}
                  </p>
                </div>
                <div>
                  <p className="text-[#222222ef] text-sm font-medium mb-2">
                    Weight
                  </p>
                  <p className="font-medium text-[#222222ef]">{item.weight}%</p>
                </div>
                <div>
                  <p className="text-[#222222ef] text-sm font-medium mb-2">
                    Status
                  </p>
                  <p className="font-medium text-[#FFC043]">{item.status}</p>
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
                              className="pt-8 border border-[#E5E9EB] p-8 bg-white"
                            >
                              <ImpliedTask
                                formik={formik}
                                impliedTaskData={item.impliedTasks}
                                setShowHistory={setShowHistory}
                                setShowComment={setShowComment}
                                setShowChallengeModal={setShowChallengeModal}
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
  );
};

export default ActualOutcome;
