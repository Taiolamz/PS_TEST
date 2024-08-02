"use client";

import Routes from "@/lib/routes/routes";
import { useSubsidiary } from "../../../_hooks/useSubsidiary";
import { ChecklistLayout } from "../../../_components/checklist-layout";
import FormLayout from "../../../_components/form-layout";
import { Input } from "@/components/ui/input";
import DashboardModal from "../../../_components/checklist-dashboard-modal";
import CancelModal from "../../../_components/cancel-modal";
import CustomSelect from "@/components/custom-select";
import { useState } from "react";

const AddSubsidary = () => {
  const cancelRoute = Routes.ChecklistRoute.ChecklistOverview();
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const {
    formik,
    countries,
    states,
    // stateDrop,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    isCreatingSubsidiary,

  } = useSubsidiary({ cancelPath: cancelRoute });

  const [selectedState, setSelectedState] = useState("");
  return (
    <ChecklistLayout
      onCancel={handleCancelDialog}
      title="Subsidiaries"
      onProceedBtn={formik.handleSubmit}
      showBtn
      step={`Step 1 of 4`}
      btnDisabled={!formik.isValid || !formik.dirty}
      loading={isCreatingSubsidiary}
    >
      <FormLayout
        addText="Add a new subsidiary to your organization account, by setting them up here."
        module="Subsidiary"
        form={
          <form
            className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3 "
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <Input
              label="Name"
              type="text"
              placeholder="Subsidiary name"
              id="name"
              name="name"
              onChange={formik.handleChange}
              isRequired
            />
            <Input
              label="Address"
              type="text"
              placeholder="Subsidiary address"
              id="address"
              name="address"
              onChange={formik.handleChange}
              isRequired
            />
            <CustomSelect
              label="Country"
              isRequired
              placeholder="Select country"
              options={countries}
              selected={formik.values.country}
              setSelected={(value) => formik.setFieldValue("country", value)}
              labelClass={labelClassName}
            />

            <CustomSelect
              label="State"
              isRequired
              placeholder="Subsidiary state"
              options={states}
              selected={formik.values.state}
              setSelected={(value) => formik.setFieldValue("state", value)}
              labelClass={labelClassName}
            />

            <CustomSelect
              label="Head of Subsidiary"
              isRequired
              placeholder="Head of subsidiary"
              options={[]}
              selected={formik.values.head_of_subsidiary}
              setSelected={(value) =>
                formik.setFieldValue("head_of_subsidiary", value)
              }
              labelClass={labelClassName}
            />
            <Input
              label="Work Email"
              type="text"
              placeholder="Work Email"
              id="work_email"
              name="work_email"
              onChange={formik.handleChange}
              isRequired
            />
          </form>
        }
      />

      <DashboardModal
        className={"w-[420px]"}
        open={openCancelModal}
        onOpenChange={handleCancelDialog}
      >
        <CancelModal onProceed={handleProceedCancel} modalTitle="Subsidiary" />
      </DashboardModal>
    </ChecklistLayout>
  );
};

export default AddSubsidary;
