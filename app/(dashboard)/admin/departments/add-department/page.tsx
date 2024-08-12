"use client";

import Routes from "@/lib/routes/routes";
import { useContext, useState } from "react";
import { ChecklistLayout } from "../_components/checklist-layout";
import FormLayout from "../_components/form-layout";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/custom-select";
import DashboardModal from "../_components/checklist-dashboard-modal";
import CancelModal from "../_components/cancel-modal";
import { useDepartment } from "../_hooks/useDepartment";
import routesPath from "@/utils/routes";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import { findObjectIndexByLabel, processInputAsArray } from "@/utils/helpers";
import { useAppSelector } from "@/redux/store";
import ActionContext from "@/app/(dashboard)/context/ActionContext";

const { ADMIN } = routesPath;

const AddDepartment = () => {
  const actionCtx = useContext(ActionContext)
  const { user, checklist } = useAppSelector((state) => state.auth);
  const cancelRoute = ADMIN.CHECKLIST;
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const {
    formik,
    states,
    stateDrop,
    subsidiaries,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    isCreatingDepartment,
    isLoadingSubsidiaries,
    branches,
    branchDrop,
    headOfDepartment,
    employeeDrop,
    employees,
  } = useDepartment({ cancelPath: cancelRoute });

  // const [selectedState, setSelectedState] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const handleHeadSelectChange = (selectedName: string) => {
    const selectedEmployee = (employees as AllStaff[]).find(
      (emp) => emp.name === selectedName
    );

    if (selectedEmployee) {
      formik.setFieldValue("head_of_department.name", selectedEmployee.name);
      formik.setFieldValue("work_email", selectedEmployee.email);
      formik.setFieldValue("head_of_department.id", selectedEmployee.id);
    }
  };

  return (
    <>
      <DashboardLayout back headerTitle="Department">
        <ReusableStepListBox
          btnText="Continue"
          activeStep={findObjectIndexByLabel(actionCtx?.listToUse, "Add Department") || '3'}
          totalStep={actionCtx?.checkListLength || '4'}
          title="Create Department"
          // btnDisabled={
          //   formik.values.head_of_department.name && formik.values.name
          //     ? false
          //     : true
          // }
          btnDisabled={!formik.isValid || !formik.dirty }
          loading={isCreatingDepartment}
          onSave={formik.handleSubmit}
          // onCancel={handleCancelDialog}
        />
        <div
          className=""
          style={{ padding: "0rem 2rem", marginTop: "-1.5rem" }}
        >
          <FormLayout
            addText="Add departments to your organization account, by setting them up here."
            module="Department"
            form={
              <form
                className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3 "
                onSubmit={formik.handleSubmit}
                autoComplete="off"
              >
                <Input
                  label="Name of Department"
                  type="text"
                  placeholder="Name of Department"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  isRequired
                />
                {/* 
                <CustomSelect
                  label="State"
                  isRequired
                  placeholder="Department state"
                  options={states}
                  selected={selectedState}
                  setSelected={(value) => {
                    setSelectedState(value);
                    const selectedStateId = stateDrop.filter(
                      (chi) => chi.name === value
                    )[0].id;
                    formik.setFieldValue("state_id", selectedStateId);
                  }}
                  labelClass={labelClassName}
                /> */}

                {/* <CustomSelect
                  label="Head of Department"
                  // isRequired
                  placeholder="Head of Department"
                  options={[]}
                  selected={formik.values.head_of_department}
                  setSelected={(value) =>
                    formik.setFieldValue("head_of_department", value)
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
                /> */}
                <CustomSelect
                  label="Head of Department"
                  placeholder="Head of Department"
                  options={employees}
                  selected={formik.values.head_of_department.name}
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
                  isRequired
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
                    labelClass={labelClassName}
                  />
                )}

                {processInputAsArray(user?.organization?.hierarchy)?.includes(
                  "branch"
                ) && (
                  <CustomSelect
                    label="Branch"
                    isRequired={processInputAsArray(
                      user?.organization?.hierarchy
                    )?.includes("branch")}
                    placeholder="Select Branch"
                    options={branches}
                    selected={selectedBranch}
                    setSelected={(value) => {
                      setSelectedBranch(value);
                      const selectedBranchId = branchDrop.filter(
                        (chi) => chi.name === value
                      )[0].branch_id;
                      formik.setFieldValue("branch_id", selectedBranchId);
                    }}
                    labelClass={labelClassName}
                  />
                )}
              </form>
            }
          />

          <DashboardModal
            className={"w-[420px]"}
            open={openCancelModal}
            onOpenChange={handleCancelDialog}
          >
            <CancelModal
              onProceed={handleProceedCancel}
              modalTitle="Department"
            />
          </DashboardModal>
        </div>
      </DashboardLayout>
      {/* </ChecklistLayout> */}
    </>
  );
};

export default AddDepartment;
