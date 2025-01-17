"use client";

import { useContext, useState } from "react";
import { useUnit } from "../_hooks/useUnit";
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
import { Textarea } from "@/components/ui/textarea";

const { ADMIN } = routesPath;

const AddUnit = () => {
  const actionCtx = useContext(ActionContext);
  const { user, checklist } = useAppSelector((state) => state.auth);
  const cancelRoute = ADMIN.CHECKLIST;
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const {
    formik,
    subsidiaries,
    branches,
    departments,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    isCreatingUnit,
    isLoadingDropdown,
    employees,
  } = useUnit({ cancelPath: cancelRoute });

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleHeadSelectChange = (selectedName: string) => {
    const selectedEmployee = (employees as AllStaff[]).find(
      (emp) => emp.name === selectedName
    );

    if (selectedEmployee) {
      formik.setFieldValue("head_of_unit.name", selectedEmployee.name);
      formik.setFieldValue("work_email", selectedEmployee.email);
      formik.setFieldValue("head_of_unit.id", selectedEmployee.id);
    } else {
      formik.setFieldValue("head_of_unit.name", "");
      formik.setFieldValue("work_email", "");
      formik.setFieldValue("head_of_unit.id", "");
    }
  };

  const handleSubsidiaryChange = (selectedName: string) => {
    const selectedSub = (subsidiaries as SubsidiaryData[]).find(
      (emp) => emp.name === selectedName
    );
    if (selectedSub) {
      formik.setFieldValue("subsidiary_id.name", selectedSub.name);
      formik.setFieldValue("subsidiary_id.id", selectedSub.id);
      formik.setFieldValue("branch_id", "");
      formik.setFieldValue("department_id", "");
    } else {
      formik.setFieldValue("subsidiary_id.name", "");
      formik.setFieldValue("subsidiary_id.id", "");
      formik.setFieldValue("branch_id", "");
      formik.setFieldValue("department_id", "");
    }
  };

  const BRANCH_OPTION = ({ obj, SubId }: { obj: any; SubId?: string }) => {
    let finalMapValue = [
      {
        value: "",
        label: "Select Option",
      },
    ];
    if (
      processInputAsArray(user?.organization?.hierarchy)?.includes("subsidiary")
    ) {
      const filtered = obj?.filter(
        (item: any) => item?.subsidiary_id === SubId
      );
      finalMapValue = [
        {
          label: "Select Branch",
          value: "",
          name: "",
          id: "",
        },
        ...filtered?.map((org: { id: string; name: string }) => ({
          value: org.id,
          label: org.name,
        })),
      ];
    } else {
      finalMapValue = [
        {
          label: "Select Branch",
          value: "",
          name: "",
          id: "",
        },
        ...obj?.map((org: { id: string; name: string }) => ({
          value: org.id,
          label: org.name,
        })),
      ];
    }
    return finalMapValue;
  };

  const DEPT_OPTION = ({
    obj,
    SubId,
    BranId,
  }: {
    obj: any;
    SubId?: string;
    BranId?: string;
  }) => {
    let finalMapValue = [
      {
        value: "",
        label: "Select Option",
      },
    ];
    if (
      processInputAsArray(user?.organization?.hierarchy)?.includes("branch")
    ) {
      const filtered = obj?.filter((item: any) => item?.branch_id === BranId);
      finalMapValue = [
        {
          label: "Select Department",
          value: "",
          name: "",
          id: "",
        },
        ...filtered?.map((org: { id: string; name: string }) => ({
          value: org.id,
          label: org.name,
        })),
      ];
    } else if (
      processInputAsArray(user?.organization?.hierarchy)?.includes("subsidiary")
    ) {
      const filtered = obj?.filter(
        (item: any) => item?.subsidiary_id === SubId
      );
      finalMapValue = [
        {
          label: "Select Department",
          value: "",
          name: "",
          id: "",
        },
        ...filtered?.map((org: { id: string; name: string }) => ({
          value: org.id,
          label: org.name,
        })),
      ];
    } else {
      finalMapValue = [
        {
          label: "Select Department",
          value: "",
          name: "",
          id: "",
        },
        ...obj?.map((org: { id: string; name: string }) => ({
          value: org.id,
          label: org.name,
        })),
      ];
    }
    return finalMapValue;
  };

  return (
    <>
      <DashboardLayout back headerTitle="Unit">
        <ReusableStepListBox
          btnText="Continue"
          activeStep={
            findObjectIndexByLabel(actionCtx?.listToUse, "Add Unit") || "4"
          }
          totalStep={actionCtx?.checkListLength || "4"}
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

                <Input
                  label="Unit Email"
                  type="email"
                  placeholder="Unit Email"
                  id="unit_email"
                  name="unit_email"
                  onChange={formik.handleChange}
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
                    options={[
                      {
                        name: "",
                        id: "",
                        label: "Select Subsidiary",
                        value: "",
                      },
                      ...subsidiaries,
                    ]}
                    selected={formik.values.subsidiary_id.name}
                    setSelected={(selectedName) => {
                      handleSubsidiaryChange(selectedName);
                      setSelectedBranch("");
                      setSelectedDepartment("");
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
                    options={BRANCH_OPTION({
                      obj: branches,
                      SubId: formik?.values?.subsidiary_id?.id,
                    })}
                    disabled={
                      formik?.values.subsidiary_id.name?.length === 0 &&
                      processInputAsArray(
                        user?.organization?.hierarchy
                      )?.includes("subsidiary")
                    }
                    selected={selectedBranch}
                    setSelected={(value) => {
                      setSelectedBranch(value);
                      formik.setFieldValue("branch_id", value);
                      setSelectedDepartment("");
                      formik.setFieldValue("department_id", "");
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
                    options={DEPT_OPTION({
                      obj: departments,
                      SubId: formik?.values?.subsidiary_id?.id,
                      BranId: formik?.values?.branch_id,
                    })}
                    disabled={
                      (formik?.values.subsidiary_id.name?.length === 0 &&
                        processInputAsArray(
                          user?.organization?.hierarchy
                        )?.includes("subsidiary")) ||
                      (formik?.values.branch_id?.length === 0 &&
                        processInputAsArray(
                          user?.organization?.hierarchy
                        )?.includes("branch"))
                    }
                    selected={selectedDepartment}
                    setSelected={(value) => {
                      setSelectedDepartment(value);
                      formik.setFieldValue("department_id", value);
                    }}
                    labelClass={labelClassName}
                  />
                )}

                <CustomSelect
                  label="Head of Unit"
                  placeholder="Head of Unit"
                  options={[
                    {
                      label: "Head of Unit",
                      value: "",
                      name: "",
                      id: "",
                    },
                    ...employees,
                  ]}
                  selected={formik.values.head_of_unit.name}
                  setSelected={handleHeadSelectChange}
                  labelClass={labelClassName}
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

                <Textarea
                  label="Unit Description"
                  rows={3}
                  id="description"
                  name="description"
                  placeholder="Description"
                  className="mt-1 block px-3 py-2 border outline-none border-gray-300 rounded-md shadow-sm sm:text-sm"
                  onChange={formik.handleChange}
                  touched={formik.touched.description}
                  value={formik.values.description}
                  error={formik.errors.description}
                />
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
