"use client";

import Routes from "@/lib/routes/routes";
import { useState } from "react";
import { useBranch } from "../_hooks/useBranch";
import { ChecklistLayout } from "../_components/checklist-layout";
import FormLayout from "../_components/form-layout";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/custom-select";
import DashboardModal from "../_components/checklist-dashboard-modal";
import CancelModal from "../_components/cancel-modal";
import routesPath from "@/utils/routes";
import { Dictionary } from "@/@types/dictionary";
import { COUNTRIES_STATES } from "@/utils/data";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";

const { ADMIN } = routesPath;

const AddBranch = () => {
  const cancelRoute = ADMIN.CHECKLIST;
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const {
    formik,
    countries,
    states,
    stateDrop,
    subsidiaries,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    isCreatingBranch,
    isLoadingSubsidiaries,
  } = useBranch({ cancelPath: cancelRoute });

  const [selectedCountryData, setSelectedCountryData] = useState<Dictionary>(
    {}
  );
  return (
    // <ChecklistLayout
    //   onCancel={handleCancelDialog}
    //   title="Branches"
    //   onProceedBtn={formik.handleSubmit}
    //   showBtn
    //   step={`Step 2 of 4`}
    //   btnDisabled={!formik.isValid || !formik.dirty}
    //   loading={isCreatingBranch}
    // >
    <DashboardLayout back headerTitle="Branch">
      {/* step list button start */}
      <ReusableStepListBox
        btnText="Continue"
        activeStep="2"
        totalStep="4"
        title="Create Branch"
        btnDisabled={!formik.isValid || !formik.dirty}
        loading={isCreatingBranch}
        onSave={formik.handleSubmit}
        onCancel={() => {
          // cancel function here-----
        }}
        back
        hideStep
        // fixed
      />
      {/* step list button end */}
      <div className="" style={{ padding: "0rem 2rem", marginTop: "-1.5rem" }}>
        {" "}
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
                isRequired
                placeholder="Select country"
                options={COUNTRIES_STATES?.map((item) => {
                  return {
                    label: item.name,
                    value: item.name,
                  };
                })}
                selected={formik.values.country}
                setSelected={(value) => {
                  formik.setFieldValue("country", value);
                  const countryData = COUNTRIES_STATES?.filter(
                    (f: Dictionary) => f.name === value
                  )?.[0];
                  formik.setFieldValue("state", "");
                  setSelectedCountryData(countryData);
                }}
                labelClass={labelClassName}
              />

              <CustomSelect
                label="State"
                isRequired
                placeholder="Branch state"
                options={selectedCountryData?.stateProvinces?.map(
                  (item: Dictionary) => {
                    return {
                      label: item.name,
                      value: item.name,
                    };
                  }
                )}
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
                setSelected={(value) =>
                  formik.setFieldValue("subsidiary", value)
                }
                labelClass={labelClassName}
              />
            </form>
          }
        />
      </div>

      <DashboardModal
        className={"w-[420px]"}
        open={openCancelModal}
        onOpenChange={handleCancelDialog}
      >
        <CancelModal onProceed={handleProceedCancel} modalTitle="Branch" />
      </DashboardModal>
    </DashboardLayout>

    // </ChecklistLayout>
  );
};

export default AddBranch;
