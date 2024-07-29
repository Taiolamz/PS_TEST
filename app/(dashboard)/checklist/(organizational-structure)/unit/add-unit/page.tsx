"use client";

import Routes from "@/lib/routes/routes";
import { ChecklistLayout } from "../../../_components/checklist-layout";
import FormLayout from "../../../_components/form-layout";
import { Input } from "@/components/ui/input";
import DashboardModal from "../../../_components/checklist-dashboard-modal";
import CancelModal from "../../../_components/cancel-modal";
import CustomSelect from "@/components/custom-select";
import { useUnit } from "../../../_hooks/useUnit";

const AddUnit = () => {
  const cancelRoute = Routes.ChecklistRoute.ChecklistOverview();
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const {
    formik,
    states,
    subsidiaries,
    branches,
    departments,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    isCreatingUnit,
    isLoadingSubsidiaries,
    headOfUnit,
  } = useUnit({ cancelPath: cancelRoute });

  return (
    <ChecklistLayout
      onCancel={handleCancelDialog}
      title="Unit"
      onProceedBtn={formik.handleSubmit}
      showBtn
      step={`Step 4 of 4`}
      btnDisabled={!formik.isValid || !formik.dirty}
      loading={isCreatingUnit}
    >
      <FormLayout
        addText="Add units to departments within your organization account, by setting them up here."
        module="Unit"
        form={
          <form
            className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3 "
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <Input
              label="Name of Unit"
              type="text"
              placeholder="Unit Name"
              id="name"
              name="name"
              onChange={formik.handleChange}
              isRequired
            />

            <CustomSelect
              label="State"
              isRequired
              placeholder="Branch state"
              options={states}
              selected={formik.values.state}
              setSelected={(value) => formik.setFieldValue("state", value)}
              labelClass={labelClassName}
            />

            <CustomSelect
              label="Head of Unit"
              isRequired
              placeholder="Head of Unit"
              options={headOfUnit}
              selected={formik.values.head_of_unit}
              setSelected={(value) =>
                formik.setFieldValue("head_of_unit", value)
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

            <CustomSelect
              label="Subsidiary"
              isRequired
              placeholder="Select subsidiary"
              options={subsidiaries}
              selected={formik.values.subsidiary}
              setSelected={(value) => formik.setFieldValue("subsidiary", value)}
              labelClass={labelClassName}
            />

            <CustomSelect
              label="Branch"
              isRequired
              placeholder="Select Branch"
              options={branches}
              selected={formik.values.branch}
              setSelected={(value) => formik.setFieldValue("branch", value)}
              labelClass={labelClassName}
            />

            <CustomSelect
              label="Department"
              isRequired
              placeholder="Select Department"
              options={departments}
              selected={formik.values.department}
              setSelected={(value) => formik.setFieldValue("department", value)}
              labelClass={labelClassName}
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

export default AddUnit;
