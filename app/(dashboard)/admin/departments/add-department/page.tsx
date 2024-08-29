"use client";

import Routes from "@/lib/routes/routes";
import { useContext, useState } from "react";
import { ChecklistLayout } from "../_components/checklist-layout";
import FormLayout from "../_components/form-layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CustomSelect from "@/components/custom-select";
import CancelModal from "../_components/cancel-modal";
import DashboardModal from "../_components/checklist-dashboard-modal";
import { useDepartment } from "../_hooks/useDepartment";
import routesPath from "@/utils/routes";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import { findObjectIndexByLabel, processInputAsArray } from "@/utils/helpers";
import { useAppSelector } from "@/redux/store";
import ActionContext from "@/app/(dashboard)/context/ActionContext";

const { ADMIN } = routesPath;

const AddDepartment = () => {
  const actionCtx = useContext(ActionContext);
  const { user, checklist } = useAppSelector((state) => state.auth);
  const cancelRoute = ADMIN.CHECKLIST;
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const {
    formik,
    subsidiaries,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    isCreatingDepartment,
    branches,
    employees,
  } = useDepartment({ cancelPath: cancelRoute });

  const [selectedBranch, setSelectedBranch] = useState("");

  const handleHeadSelectChange = (selectedName: string) => {
    const selectedEmployee = (employees as AllStaff[]).find(
      (emp) => emp.name === selectedName
    );

    if (selectedEmployee) {
      formik.setFieldValue("head_of_department.name", selectedEmployee.name);
      formik.setFieldValue("work_email", selectedEmployee.email);
      formik.setFieldValue("head_of_department.id", selectedEmployee.id);
    } else {
      formik.setFieldValue("head_of_department.name", "");
      formik.setFieldValue("work_email", "");
      formik.setFieldValue("head_of_department.id", "");
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
    } else {
      formik.setFieldValue("subsidiary_id.name", "");
      formik.setFieldValue("subsidiary_id.id", "");
      formik.setFieldValue("branch_id", "");
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
  return (
    <>
      <DashboardLayout back headerTitle="Department">
        <ReusableStepListBox
          btnText="Continue"
          activeStep={
            findObjectIndexByLabel(actionCtx?.listToUse, "Add Department") ||
            "3"
          }
          totalStep={actionCtx?.checkListLength || "4"}
          title="Create Department"
          // btnDisabled={
          //   formik.values.head_of_department.name && formik.values.name
          //     ? false
          //     : true
          // }
          btnDisabled={!formik.isValid || !formik.dirty}
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

                <Input
                  label="Department Email"
                  type="text"
                  placeholder="Department Email"
                  id="department_email"
                  name="department_email"
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
                    placeholder="Select subsidiary"
                    options={[
                      {
                        name: "",
                        id: "",
                        label: "Select subsidiary",
                        value: "",
                      },
                      ...subsidiaries,
                    ]}
                    selected={formik.values.subsidiary_id.name}
                    setSelected={(selectedName) => {
                      handleSubsidiaryChange(selectedName);
                      setSelectedBranch("");
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
                    }}
                    labelClass={labelClassName}
                  />
                )}

                <CustomSelect
                  label="Head of Department"
                  placeholder="Head of Department"
                  options={[
                    {
                      label: "Head of Department",
                      value: "",
                      name: "",
                      id: "",
                    },
                    ...employees,
                  ]}
                  selected={formik.values.head_of_department.name}
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
                  disabled
                />

                <Textarea
                  label="Department Description"
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
