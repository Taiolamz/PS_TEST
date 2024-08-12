"use client";

import Routes from "@/lib/routes/routes";
import { useContext, useState } from "react";
import { useUnit } from "../_hooks/useUnit";
import { ChecklistLayout } from "../_components/checklist-layout";
import FormLayout from "../_components/form-layout";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/custom-select";
import DashboardModal from "../_components/checklist-dashboard-modal";
import CancelModal from "../_components/cancel-modal";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import routesPath from "@/utils/routes";
import { useAppSelector } from "@/redux/store";
import { findObjectIndexByLabel, processInputAsArray } from "@/utils/helpers";
import ActionContext from "@/app/(dashboard)/context/ActionContext";

const { ADMIN } = routesPath;

const AddUnit = () => {
  const actionCtx = useContext(ActionContext)
  const { user, checklist } = useAppSelector((state) => state.auth);
  const cancelRoute = ADMIN.CHECKLIST;
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
    stateDrop,
    subsidiaryDrop,
    branchDrop,
    departmentDrop,
    employeeDrop,
    employees,
  } = useUnit({ cancelPath: cancelRoute });

  // const [selectedState, setSelectedState] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSubsidiary, setSelectedSubsidiary] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleHeadSelectChange = (selectedName: string) => {
    const selectedEmployee = (employees as AllStaff[]).find(
      (emp) => emp.name === selectedName
    );

    if (selectedEmployee) {
      formik.setFieldValue("head_of_unit.name", selectedEmployee.name);
      formik.setFieldValue("work_email", selectedEmployee.email);
    }
  };

  return (
    <>
      <DashboardLayout back headerTitle="Unit">
        <ReusableStepListBox
          btnText="Continue"
          activeStep={findObjectIndexByLabel(actionCtx?.listToUse, "Add Unit") || '4'}
          totalStep={actionCtx?.checkListLength || '4'}
          title="Create Unit"
          btnDisabled={!formik.isValid || !formik.dirty}
          loading={isCreatingUnit}
          onSave={formik.handleSubmit}
          // onCancel={handleCancelDialog}
        />
        <div
          className=""
          style={{ padding: "0rem 2rem", marginTop: "-1.5rem" }}
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

                {/* <CustomSelect
                  label="State"
                  isRequired
                  placeholder="Branch state"
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
                  label="Head of Unit"
                  isRequired
                  placeholder="Head of Unit"
                  options={[]}
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
                /> */}
                <CustomSelect
                  label="Head of Unit"
                  placeholder="Head of Unit"
                  options={employees}
                  selected={formik.values.head_of_unit.name}
                  setSelected={handleHeadSelectChange}
                  // labelClass={labelClassName}
                  isRequired
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
                    placeholder="Select Subsidiary"
                    options={subsidiaries}
                    selected={selectedSubsidiary}
                    setSelected={(value) => {
                      setSelectedSubsidiary(value);
                      const selectedSubsidiaryId = subsidiaryDrop.filter(
                        (chi) => chi.name === value
                      )[0].id;
                      formik.setFieldValue(
                        "subsidiary_id",
                        selectedSubsidiaryId
                      );
                    }}
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

                {processInputAsArray(user?.organization?.hierarchy)?.includes(
                  "department"
                ) && (
                  <CustomSelect
                    label="Department"
                    isRequired={processInputAsArray(
                      user?.organization?.hierarchy
                    )?.includes("department")}
                    placeholder="Select Department"
                    options={departments}
                    selected={selectedDepartment}
                    setSelected={(value) => {
                      setSelectedDepartment(value);
                      const selectedDepartmentId = departmentDrop.filter(
                        (chi) => chi.name === value
                      )[0].id;
                      formik.setFieldValue(
                        "department_id",
                        selectedDepartmentId
                      );
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
              modalTitle="Subsidiary"
            />
          </DashboardModal>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AddUnit;
