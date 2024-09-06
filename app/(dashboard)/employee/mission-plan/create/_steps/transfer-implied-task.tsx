import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

const TransferImpliedTaskOrWeight = ({
  onCancel,
  onProceed,
}: {
  onCancel: () => void;
  onProceed: () => void;
}) => {
  const formSchema = yup.object().shape({
    check_task: yup.string().required("You must select a task"),
  });

  const handleSubmit = () => {
    console.log({ ...formik.values });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      specified_task: "",
      weight: "",
      check_task: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });
  const achievement = [
    {
      label: "Achieve $1 Billion in Company Revenue for the Financial year",
      value: "Achieve $1 Billion in Company Revenue for the Financial year",
    },
    {
      label: "Achieve $2 Billion in Company Revenue for the Financial year",
      value: "Achieve $2 Billion in Company Revenue for the Financial year",
    },
    {
      label: "Achieve $3 Billion in Company Revenue for the Financial year",
      value: "Achieve $3 Billion in Company Revenue for the Financial year",
    },
  ];
  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="text-primary font-medium text-[16px]">
        Transfer Implied Task
      </p>
      <p className="text-[#5B6871] font-light text-xs">
        Select specified task below to add implied tasks.{" "}
      </p>
      <div className="grid grid-cols-[3fr_1fr] gap-4 mt-5">
        <Input
          type="text"
          placeholder="Subsidiary name"
          id="name"
          name="name"
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
          disabled
          className="text-[#9AA6AC] bg-[#E5E9EB]"
        />
      </div>
      <div className="mt-2">
        <Input
          type="text"
          placeholder="Input Task title"
          id="title"
          name="title"
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <p className="text-[#6E7C87] font-normal mt-6 text-[13px]">
          Select specified task to transfer
        </p>
        <div className="flex flex-col space-y-4 mt-3">
          {achievement.map((chi) => (
            <label
              key={chi.value}
              className="flex gap-4 text-[#162238] bg-[#F6F8F9] border border-[#E5E9EB] rounded-sm p-3 items-center cursor-pointer font-normal text-sm"
            >
              <input
                type="radio"
                name="check_task"
                value={chi.value}
                onChange={formik.handleChange}
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
        <Button
          className="!bg-primary"
          onClick={onProceed}
          disabled={!formik.isValid || !formik.dirty}
        >
          Proceed
        </Button>
      </div>
    </form>
  );
};

export default TransferImpliedTaskOrWeight;
