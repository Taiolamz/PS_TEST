"use client";

import Routes from "@/lib/routes/routes";
import { ChecklistLayout } from "../../../_components/checklist-layout";
import FormLayout from "../../../_components/form-layout";
import { Input } from "@/components/ui/input";
import DashboardModal from "../../../_components/checklist-dashboard-modal";
import CancelModal from "../../../_components/cancel-modal";
import CustomSelect from "@/components/custom-select";
import { useBranch } from "../../../_hooks/useBranch";

const AddBranch = () => {
  const cancelRoute = Routes.ChecklistRoute.ChecklistOverview();
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const {
    formik,
    countries,
    states,
    subsidiaries,
    // branches,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    isCreatingBranch,
    isLoadingSubsidiaries,
    // headOfBranches,
  } = useBranch({ cancelPath: cancelRoute });
  return (
    <ChecklistLayout
      onCancel={handleCancelDialog}
      title="Branches"
      onProceedBtn={formik.handleSubmit}
      showBtn
      step={`Step 2 of 4`}
      btnDisabled={!formik.isValid || !formik.dirty}
      loading={isCreatingBranch}
    >
      <FormLayout
        addText="Add areas or regions to your organization account, by setting them up here."
        module="Branches"
        form={
          <form
            className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3 "
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <Input
              label="Name"
              type="text"
              placeholder="Branch name"
              id="name"
              name="name"
              onChange={formik.handleChange}
              isRequired
            />
            <Input
              label="Address"
              type="text"
              placeholder="Branch address"
              id="address"
              name="address"
              onChange={formik.handleChange}
              isRequired
            />
            <CustomSelect
              label="Country"
              placeholder="Select country"
              isRequired
              options={countries}
              selected={formik.values.country}
              setSelected={(value) => formik.setFieldValue("country", value)}
              labelClass={labelClassName}
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
              label="Head of Branch"
              isRequired
              placeholder="Head of Branch"
              options={[]}
              selected={formik.values.head}
              setSelected={(value) => formik.setFieldValue("head", value)}
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

export default AddBranch;
