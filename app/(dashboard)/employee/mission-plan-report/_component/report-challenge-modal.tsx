import CustomSelect from "@/components/custom-select";
import Icon from "@/components/icon/Icon";
import ModalContainer from "@/components/modal-container";
import ReusableModalContainer from "@/components/reusable-modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { LucidePlusCircle, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ReportChallengeModalProps {
  show: boolean;
  hasCloseButton?: boolean;
  handleClose: () => void;
  icon?: string;
  modalClass?: string;
  handleClick?: () => void;
  content?: React.ReactNode;
}

export default function ReportChallengeModal({
  show,
  hasCloseButton = false,
  handleClose,
  content,
  modalClass,
}: ReportChallengeModalProps) {
  const uuidRef = useRef(uuidv4());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<any>();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = () => {};

  const handleDeleteTaskOpen = async (remove: any, index: any, id: any) => {
    // handleDeleteTaskDialog();
    setDeleteData({ formikRemove: remove, index: index, id: id });
  };

  const formik = useFormik<any>({
    initialValues: {
      tasks: [
        {
          id: uuidRef.current,
          title: "",
          risk_level: "",
          description: "",
          recommendations: "",
        },
      ],
    },
    onSubmit: handleFormSubmit,
    // validationSchema: specifiedTaskSchema(endDate, startDate),
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <ModalContainer
      show={show}
      handleClose={handleClose}
      title="Challenges"
      modalClass={cn(
        "rounded-md bg-white md:w-[28.8rem] md:max-w-[30.8rem] lg:w-[37.5rem] lg:max-w-[37.5rem] pb-0",
        modalClass
      )}
      hasCloseButton={false}
    >
      <div className="px-8 pb-4 h-[60vh] overflow-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Challenges</h2>
          <div onClick={handleClose} className="cursor-pointer">
            <X color="red" width={17} height={17} />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <FormikProvider value={formik}>
            <FieldArray name="tasks">
              {({ insert, remove, push }) => (
                <div>
                  {formik.values.tasks?.length > 0 &&
                    formik.values.tasks.map(
                      (
                        task: { id: React.Key | null | undefined },
                        index: number
                      ) => (
                        <div
                          key={task.id}
                          className="grid gap-y-3 items-center space-x-2 relative mt-5 "
                        >
                          <div className="grid gap-y-3">
                            <p className="text-[#5A5B5F] text-sm">
                              Challenge {index + 1}
                            </p>
                            {index > 0 && <hr />}

                            <div className="grid grid-cols-2 gap-x-3">
                              <div className="w-full flex-1">
                                <Input
                                  type="text"
                                  id="task"
                                  name={`tasks.${index}.task`}
                                  label="Title"
                                  // disabled={line_manager?.id !== null}
                                  // error={errorTasks?.[index]?.task}
                                  // touched={touchedTasks?.[index]?.task}
                                  onBlur={formik.handleBlur}
                                  placeholder="Input Task"
                                  className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                  onChange={
                                    (e) => {}
                                    // handleChange(e.target.value, index, "task")
                                  }
                                  value={formik.values.tasks[index].task}
                                />
                              </div>
                              <div className="flex-1 w-[100%]">
                                <CustomSelect
                                  label="Risk Level"
                                  placeholder="Select Risk Level"
                                  options={[
                                    { value: "high", label: "High" },
                                    { value: "medium", label: "Medium" },
                                    { value: "low", label: "Low" },
                                  ]}
                                  selected={formik.values.risk_level}
                                  setSelected={(selected: any) => {
                                    formik.setFieldValue(
                                      "risk_level",
                                      selected
                                    );
                                  }}
                                  labelClass="block relative text-xs  text-[#6E7C87] font-normal pb-3"
                                  touched={formik.touched.risk_level}
                                  error={formik.errors.risk_level}
                                  onBlur={formik.handleBlur}
                                  canSearch={false}
                                />
                              </div>
                            </div>
                            <div className="w-full flex-1">
                              <Textarea
                                label="Description Of Challenge"
                                rows={3}
                                id="description"
                                name="description"
                                placeholder="Enter Description Of Challenge"
                                className="mt-1 block px-3 py-2 border outline-none border-gray-300 rounded-md shadow-sm sm:text-sm"
                                onChange={formik.handleChange}
                                // touched={formik.touched.description}
                                value={formik.values.description}
                                // error={formik.errors.description}
                              />
                            </div>
                            <div className="w-full flex-1">
                              <Textarea
                                label="Recommendations"
                                rows={3}
                                id="recommendations"
                                name="recommendations"
                                placeholder="Enter Recommendations"
                                className="mt-1 block px-3 py-2 border outline-none border-gray-300 rounded-md shadow-sm sm:text-sm"
                                onChange={formik.handleChange}
                                // touched={formik.touched.description}
                                value={formik.values.description}
                                // error={formik.errors.description}
                              />
                            </div>
                            {index !== 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-500 hover:text-red-700 absolute right-[-4%] md:right-[-4%] top-10"
                              >
                                <Icon
                                  name="remove"
                                  width={14.28}
                                  height={18.63}
                                />
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  {formik.errors.tasks &&
                    typeof formik.errors.tasks === "string" && (
                      <span className="text-red-500 text-xs">
                        {" "}
                        {formik.errors.tasks}{" "}
                      </span>
                    )}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        id: uuidv4(),
                        task: "",
                        weight: "",
                        strategic_pillars: [],
                        success_measures: [],
                        start_date: "",
                        end_date: "",
                        is_main_effort: false,
                      })
                    }
                    className="flex items-center gap-2 mt-5 text-[var(--primary-color)] text-sm px-1"
                  >
                    <LucidePlusCircle
                      style={{ color: "var(--primary-color)" }}
                      size={20}
                    />
                    Add Another Challenge
                  </button>
                </div>
              )}
            </FieldArray>
            <div className="mt-8 flex gap-x-2 items-center">
              <Button
                // disabled={
                //   !(formik.isValid && formik.dirty) ||
                //   isLoading ||
                //   isReassigning ||
                //   isLoadingDeleteSpecifiedTask
                // }
                type="submit"
                // loading={
                //   isLoading || isReassigning || isLoadingDeleteSpecifiedTask
                // }
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
