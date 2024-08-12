"use client";

import Routes from "@/lib/routes/routes";
import { useContext, useState } from "react";
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
import { findObjectIndexByLabel, processInputAsArray } from "@/utils/helpers";
import { useAppSelector } from "@/redux/store";
import ActionContext from "@/app/(dashboard)/context/ActionContext";

const { ADMIN } = routesPath;

const AddBranch = () => {
  const actionCtx = useContext(ActionContext)
  const { user, checklist } = useAppSelector((state) => state.auth);
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
    employeeDrop,
    employees,
  } = useBranch({ cancelPath: cancelRoute });

  const [selectedCountryData, setSelectedCountryData] = useState<Dictionary>(
    {}
  );

  const handleHeadSelectChange = (selectedName: string) => {
    const selectedEmployee = (employees as AllStaff[]).find(
      (emp) => emp.name === selectedName
    );

    if (selectedEmployee) {
      formik.setFieldValue("head.name", selectedEmployee.name);
      formik.setFieldValue("work_email", selectedEmployee.email);
    }
  };

  return (
    <DashboardLayout back headerTitle="Branch">
      <ReusableStepListBox
        btnText="Continue"
        activeStep={findObjectIndexByLabel(actionCtx?.listToUse, "Add Branches") || '2'}
        totalStep={actionCtx?.checkListLength || '4'}
        title="Create Branch"
        btnDisabled={!formik.isValid || !formik.dirty}
        loading={isCreatingBranch}
        onSave={formik.handleSubmit}
      />

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
                // labelClass={labelClassName}
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
                // labelClass={labelClassName}
              />

              {/* <CustomSelect
                label="Head of Branch"
                placeholder="Head of Branch"
                options={employees as AllStaff[]}
                selected={formik.values.head.name}
                // setSelected={(value) => {
                //   // console.log(formik.values.head.email, "value");
                //   // formik.setFieldValue("head.name", value);
                //   // formik.setFieldValue("work_email", formik.values.head.email);
                //   // const selectedEmail = (employeeDrop as AllStaff[]).map(
                //   //   (chi) => chi
                //   // )[0].id;
                //   // formik.setFieldValue("branch_id", selectedEmail);

                //   // const selectedEmail =  employeeDrop.
                // }}
                setSelected={handleHeadSelectChange}
                //   setSelectedHead(value);
                //   const selectedBranchId = employeeDrop.filter(
                //     (chi) => chi.name === value
                //   )[0].id;
                //   formik.setFieldValue("branch_id", selectedBranchId);
                // setSelected={(value) => {
                // }}
                labelClass={`${labelClassName} mb-2`}
              />
              <Input
                label="Work Email"
                type="text"
                placeholder="Work Email"
                id="work_email"
                value={formik.values.head.email}
                name="work_email"
                onChange={formik.handleChange}
                isRequired
              /> */}
              <CustomSelect
                label="Head of Branch"
                placeholder="Head of Branch"
                options={employees}
                selected={formik.values.head.name}
                setSelected={handleHeadSelectChange}
                // labelClass={labelClassName}
                // isRequired
              />
              <Input
                label="Work Email"
                type="text"
                placeholder="Work Email"
                id="work_email"
                value={formik.values.work_email}
                name="work_email"
                onChange={formik.handleChange}
                // isRequired
                disabled
              />
              {processInputAsArray(user?.organization?.hierarchy)?.includes(
                "subsidiary"
              ) && (
                <CustomSelect
                  label="Subsidiary"
                  isRequired={processInputAsArray(
                    user?.organization?.hierarchy
                  )?.includes("subsidiary")}
                  placeholder="Select subsidiary"
                  options={subsidiaries}
                  selected={formik.values.subsidiary}
                  setSelected={(value) =>
                    formik.setFieldValue("subsidiary", value)
                  }
                  // labelClass={labelClassName}
                />
              )}
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
  );
};

export default AddBranch;
