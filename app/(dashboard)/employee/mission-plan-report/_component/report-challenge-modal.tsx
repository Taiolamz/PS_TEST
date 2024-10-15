import CustomSelect from "@/components/custom-select";
import Icon from "@/components/icon/Icon";
import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAddChallangeMutation } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { LucidePlusCircle, X } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

interface ReportChallengeModalProps {
  show: boolean;
  hasCloseButton?: boolean;
  handleClose: () => void;
  icon?: string;
  modalClass?: string;
  handleClick?: () => void;
  content?: React.ReactNode;
  loading?: boolean;
  option?: "task-outcome" | "target-achievement";
  id?: string;
  handleSuccess: () => void;
}

export default function ReportChallengeModal({
  show,
  hasCloseButton = false,
  handleClose,
  content,
  modalClass,
  id,
  option = "task-outcome",
  handleSuccess,
}: ReportChallengeModalProps) {
  const [addChallange, { isLoading, data }] = useAddChallangeMutation();

  const formik = useFormik<any>({
    initialValues: {
      challenges: [
        { title: "", risk_level: "", description: "", recommendation: "" },
      ],
    },
    onSubmit: (value) => handleFormSubmit(value),
    validationSchema: Yup.object({
      challenges: Yup.array().of(
        Yup.object({
          title: Yup.string(),
          riskLevel: Yup.string(),
          description: Yup.string(),
          recommendation: Yup.string(),
        })
      ),
    }),
    // validateOnMount: true,
    // enableReinitialize: true,
  });

  //Submitting challenge
  const handleFormSubmit = (value: any) => {
    addChallange({
      ...value,
      challengeable_id: id || "",
      challengeable_type: option,
    })
      .unwrap()
      .then(() => {
        formik.resetForm();
        handleClose();
        handleSuccess();
      })
      .catch(() => {});
  };

  useEffect(() => {
    formik.resetForm();
  }, [show]);

  return (
    <ModalContainer
      show={show}
      handleClose={handleClose}
      title="Challenges"
      modalClass={cn(
        "rounded-md bg-white md:w-[28.8rem] md:max-w-[30.8rem] lg:w-[482px] lg:max-w-[482px] pb-0",
        modalClass
      )}
      hasCloseButton={false}
    >
      <div className="pb-4 max-h-[84vh] overflow-auto relative">
        <div className="flex items-center justify-between sticky top-0 bg-white z-40 pb-3 px-8 w-full">
          <h2 className="text-lg">Challenges</h2>
          <div onClick={handleClose} className="cursor-pointer">
            <X color="red" width={17} height={17} />
          </div>
        </div>
        <form className="px-8" onSubmit={formik.handleSubmit}>
          <FormikProvider value={formik}>
            <FieldArray
              name="challenges"
              render={({ remove, push }) => (
                <div>
                  {formik.values.challenges.map(
                    (challenge: any, index: number) => (
                      <div
                        key={index}
                        className="grid gap-y-3 items-center space-x-2 relative mt-2"
                      >
                        <div className="grid gap-y-3">
                          {index > 0 && <hr className="mt-2" />}
                          {index > 0 && (
                            <div className="flex justify-between items-center">
                              <p className="text-[#5A5B5F] font-medium text-sm">
                                Challenge {index + 1}
                              </p>

                              {index !== 0 && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="text-red-500 hover:text-red-700 "
                                >
                                  <Icon
                                    name="remove"
                                    width={14.28}
                                    height={18.63}
                                  />
                                </button>
                              )}
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-x-3">
                            <div className="w-full flex-1">
                              <Input
                                type="text"
                                id={`challenges.${index}.title`}
                                name={`challenges.${index}.title`}
                                placeholder="Input challenge title"
                                label="Title"
                                // error={formik.errors.challenges?.[index]?.title}
                                // touched={formik.touched.challenges?.[index]?.title}
                                onBlur={formik.handleBlur}
                                value={formik.values.challenges[index].title}
                                onChange={formik.handleChange}
                                className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                              />
                            </div>
                            <div className="flex-1 w-[100%]">
                              <CustomSelect
                                label="Risk Level"
                                placeholder="Select risk level"
                                options={[
                                  { value: "", label: "Select risk level" },
                                  { value: "high", label: "High" },
                                  { value: "medium", label: "Medium" },
                                  { value: "low", label: "Low" },
                                ]}
                                // selected={formik.values.employees_range}
                                setSelected={(selected: any) => {
                                  formik.setFieldValue(
                                    `challenges.${index}.risk_level`,
                                    selected
                                  );
                                }}
                                id={`challenges.${index}.risk_level`}
                                selected={
                                  formik.values.challenges[index].risk_level
                                }
                                // setSelected={formik.handleChange}
                                labelClass="block relative text-xs  text-[#6E7C87] font-normal pb-3"
                                // touched={formik.touched.challenges?.[index]?.risk_level && formik.touched.challenges?.[index]?.risk_level}
                                // error={
                                //   formik?.errors?.challenges?.[index]?.risk_level
                                // }
                                canSearch={false}
                              />
                            </div>
                          </div>
                          <div className="w-full flex-1">
                            <Textarea
                              label="Description Of Challenge"
                              rows={3}
                              id={`challenges.${index}.description`}
                              name={`challenges.${index}.description`}
                              placeholder="Enter Description Of Challenge"
                              className="mt-1 block px-3 py-2 border outline-none border-gray-300 rounded-md shadow-sm sm:text-sm"
                              // onChange={formik.handleChange}
                              // touched={formik.touched.description}
                              // value={formik.values.description}
                              // error={formik.errors.description}

                              value={
                                formik.values.challenges[index].description
                              } // Accessing value
                              onChange={formik.handleChange} // Handling onChange event
                              onBlur={formik.handleBlur} // Handling onBlur event
                            />
                          </div>
                          <div className="w-full flex-1">
                            <Textarea
                              label="Recommendation"
                              rows={3}
                              placeholder="Enter Recommendation"
                              className="mt-1 block px-3 py-2 border outline-none border-gray-300 rounded-md shadow-sm sm:text-sm"
                              // onChange={formik.handleChange}
                              // touched={formik.touched.description}
                              // value={formik.values.description}
                              // error={formik.errors.description}
                              id={`challenges.${index}.recommendation`}
                              name={`challenges.${index}.recommendation`}
                              value={
                                formik.values.challenges[index].recommendation
                              } // Accessing value
                              onChange={formik.handleChange} // Handling onChange event
                              onBlur={formik.handleBlur} // Handling onBlur event
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      push({
                        title: "",
                        risk_level: "",
                        description: "",
                        recommendation: "",
                      })
                    }
                    className="flex items-center gap-2 mt-5 text-[var(--primary-color)] text-sm px-1"
                  >
                    <LucidePlusCircle
                      style={{ color: "var(--primary-color)" }}
                      size={20}
                    />
                    Add new specified challenge
                  </button>
                </div>
              )}
            />
            <div className="mt-8 flex gap-x-2 items-center">
              <Button
                // disabled={
                //   !(formik.isValid && formik.dirty) ||
                //   isLoading ||
                //   isReassigning ||
                //   isLoadingDeleteSpecifiedTask
                // }
                disabled={isLoading}
                type="submit"
                loading={isLoading}
                loadingText={"Submit"}
              >
                Submit
              </Button>
            </div>
          </FormikProvider>
        </form>
      </div>
    </ModalContainer>
  );
}
