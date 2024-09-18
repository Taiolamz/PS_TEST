import { ManceLoader } from "@/components/custom-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setNewSpecifiedTask } from "@/redux/features/mission-plan/specifiedTaskReassignment";
import { useReAssignImpliedTaskMutation } from "@/redux/services/mission-plan/impliedTaskApi";
import { useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as yup from "yup";

const TransferImpliedTaskOrWeight = ({
  onCancel,
  // onProceed,
  data,
  allSpecifiedTask,
  isWeightTransfer,
  onCloseModal,
  onWeightNotify,
}: {
  onCancel: () => void;
  // onProceed: () => void;
  data: any;
  allSpecifiedTask: any[];
  isWeightTransfer: boolean;
  onWeightNotify: (param: boolean) => void;
  onCloseModal: () => void;
}) => {
  const formSchema = yup.object().shape({
    check_task: yup.string().required("You must select a task"),
  });

  const [reAssignImpliedTask, { isLoading: isReassigning }] =
    useReAssignImpliedTaskMutation();

  const { EMPLOYEE } = routesPath;

  const router = useRouter();

  // const handleSubmit = async () => {
  //   const obj = {
  //     specified_task_id: data?.specified_task_id,
  //     implied_task_id: data?.implied_tasks[0].implied_task_id,
  //   };

  //   await reAssignImpliedTask(obj).unwrap();
  //   toast.success("Implied Task Reassigned Successfully");

  //   if (isWeightTransfer) {
  //     setTimeout(() => {
  //       router.push(`${EMPLOYEE.CREATE_MISSION_PLAN}?ui=specified-task`);
  //       toast.dismiss();
  //     }, 1000);
  //   } else {
  //     setTimeout(() => {
  //       onCloseModal();
  //       onWeightNotify(true);
  //       toast.dismiss();
  //     }, 1000);
  //   }
  // };
  const dispatch = useDispatch();
  const [newSpecifiedID, setNewSpecifiedID] = useState("");
  const { old_specified_task_id, new_specified_task_id } = useAppSelector(
    (state) => state.specified_task_reassignment
  );

  const handleSubmit = () => {
    const obj = {
      oldSpecifiedId: data?.specified_task_id,
      newSpecifiedId: newSpecifiedID,
    };
    dispatch(setNewSpecifiedTask(obj));
    router.push(
      `${EMPLOYEE.CREATE_MISSION_PLAN}?ui=specified-task&reassign-specified-task-id=${data?.specified_task_id}`
    );
  };

  console.log(old_specified_task_id, new_specified_task_id, "specified id");

  const formik = useFormik({
    initialValues: {
      title: data?.task || "",
      specified_task: "",
      implied_task: data?.implied_tasks?.map((chi: any) => chi.task) || [""],
      weight: data?.weight || "",
      check_task: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  const oldSpecifiedID = data?.specified_task_id;

  const filteredTasks = allSpecifiedTask.filter(
    (task) => task.specified_task_id !== oldSpecifiedID
  );

  const formatAllSpecifiedTask = () => {
    const newTasks = filteredTasks.map((chi) => {
      return {
        ...chi,
        label: chi?.task,
        value: chi?.task,
      };
    });
    return newTasks;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="text-primary font-medium text-[16px]">
        {isWeightTransfer
          ? "Transfer Implied Task & Weight "
          : " Transfer Implied Task "}
      </p>
      <p className="text-[#5B6871] font-light text-xs">
        Select specified task below to add implied tasks.{" "}
      </p>
      <div className="grid grid-cols-[3fr_1fr] gap-4 mt-5">
        <Input
          type="text"
          placeholder="Specified task"
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          disabled
          className="text-[#9AA6AC] bg-[#E5E9EB]"
        />
        <Input
          type="text"
          placeholder="Weight"
          id="weight"
          name="weight"
          onChange={formik.handleChange}
          value={`${formik.values.weight}%`}
          disabled
          className="text-[#9AA6AC] bg-[#E5E9EB]"
        />
      </div>
      <div className="mt-2 flex flex-col gap-3">
        {formik.values.implied_task?.map((task: string, idx: number) => (
          <Input
            key={idx}
            type="text"
            placeholder="Input Task title"
            id={`implied_task.${idx}`}
            name={`implied_task.${idx}`}
            value={task}
            onChange={formik.handleChange}
            disabled
          />
        ))}
      </div>
      <div>
        <p className="text-[#6E7C87] font-normal mt-6 text-[13px]">
          Select specified task to transfer
        </p>
        <div className="flex flex-col space-y-4 mt-3">
          {formatAllSpecifiedTask()?.map((chi) => (
            <label
              key={chi.value}
              className="flex gap-4 text-[#162238] bg-[#F6F8F9] border border-[#E5E9EB] rounded-sm p-3 items-center cursor-pointer font-normal text-sm"
            >
              <input
                type="radio"
                name="check_task"
                value={chi.value}
                onChange={(e) => {
                  formik.handleChange(e);
                  setNewSpecifiedID(chi?.specified_task_id);
                }}
                checked={formik.values.check_task === chi.value}
                className="radio-custom"
              />
              {chi.label}
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-3 items-center mt-5 justify-end">
        <Button
          variant="outline"
          className="border-primary text-primary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        {/* <Button
          className="!bg-primary"
          // onClick={onProceed}
          disabled={!formik.isValid || !formik.dirty}
        >
          Proceed
        </Button> */}
        <Button
          type="submit"
          className={` font-light ${
            isReassigning || !formik.isValid || !formik.dirty
              ? "border  border-custom-divider font-medium  bg-custom-bg  text-custom-gray-scale-300 hover:bg-transparent cursor-not-allowed"
              : ""
          } `}
          disabled={isReassigning || !formik.isValid || !formik.dirty}
        >
          {isReassigning ? <ManceLoader /> : "Proceed"}
        </Button>
      </div>
    </form>
  );
};

export default TransferImpliedTaskOrWeight;
