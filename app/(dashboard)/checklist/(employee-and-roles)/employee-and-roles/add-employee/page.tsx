"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEmployee } from "../../../_hooks/useEmployee";
import CustomSelect from "@/components/custom-select";
import CustomDateInput from "@/components/custom-date-input";
import { formatRMDatePicker } from "@/utils/helpers/date-formatter";
import Routes from "@/lib/routes/routes";
import { ChecklistLayout } from "../../../_components/checklist-layout";
import FormLayout from "../../../_components/form-layout";
import DashboardModal from "../../../_components/checklist-dashboard-modal";
import CancelModal from "../../../_components/cancel-modal";

export default function AddEmployee() {
  const router = useRouter();
  const route = () =>
    router.push(Routes.ChecklistRoute.SetupEmployeesAndRolesRoute());
  const cancelRoute = Routes.ChecklistRoute.ChecklistOverview();
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const {
    formik,
    subsidiaries,
    departments,
    branches,
    roles,
    isLoadingSubsidiaries,
    isLoadingBranches,
    isLoadingDepartments,
    isLoadingUnits,
    units,
    isCreatingEmployee,
    genderOptions,
    jobTitles,
    gradeLevels,
    newEmployeeStatuses,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
  } = useEmployee({ path: route, cancelPath: cancelRoute });

  return (
    <ChecklistLayout
      title="Employee"
      showBtn
      step={`Step 1 - 1`}
      btnDisabled={!formik.isValid || !formik.dirty}
      onCancel={handleCancelDialog}
      onProceedBtn={formik.handleSubmit}
      loading={isCreatingEmployee}
    >
      <FormLayout
        addText="Add employees to departments and units within your organization account, by setting them up here."
        module="Employee"
        form={
          <form
            className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3 mb-14"
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <Input
              label="First Name"
              type="text"
              placeholder="First Name"
              id="first_name"
              name="first_name"
              onChange={formik.handleChange}
              isRequired
            />

            <Input
              label="Middle Name"
              type="text"
              placeholder="Middle Name"
              id="middle_name"
              name="middle_name"
              onChange={formik.handleChange}
              isRequired
            />

            <Input
              label="Last Name"
              type="text"
              placeholder="Last Name"
              id="last_name"
              name="last_name"
              onChange={formik.handleChange}
              isRequired
            />

            <Input
              label="Maiden Name"
              type="text"
              placeholder="Maiden Name"
              id="maiden_name"
              name="maiden_name"
              onChange={formik.handleChange}
              isRequired
            />

            <CustomSelect
              label="Gender"
              isRequired
              placeholder="Select Gender"
              options={genderOptions}
              selected={formik.values.gender}
              setSelected={(value) => formik.setFieldValue("gender", value)}
              labelClass={labelClassName}
            />

            <CustomDateInput
              id="date_of_birth"
              label="Date of Birth"
              selected={formik.values.date_of_birth}
              handleChange={(date) =>
                formik.setFieldValue("date_of_birth", formatRMDatePicker(date))
              }
              error={""}
              className="relative"
              iconClass="top-[2.7rem]"
              isRequired
            />

            <CustomDateInput
              id="resumption_date"
              label="Resumption Date"
              selected={formik.values.resumption_date}
              handleChange={(date) =>
                formik.setFieldValue(
                  "resumption_date",
                  formatRMDatePicker(date)
                )
              }
              iconClass="top-[2.7rem]"
              error={""}
              className="relative"
              isRequired
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
              label="Grade Level"
              placeholder="Grade Level"
              options={gradeLevels}
              selected={formik.values.level}
              setSelected={(value) => formik.setFieldValue("level", value)}
              labelClass={labelClassName}
            />

            <Input
              label="Line Manager Email"
              type="text"
              placeholder="Line Manager Email"
              id="line_manager_email"
              name="line_manager_email"
              onChange={formik.handleChange}
              isRequired
            />

            <CustomSelect
              label="Subsidiary"
              placeholder="Select Subsidiary"
              options={subsidiaries}
              selected={formik.values.subsidiary}
              setSelected={(value) => formik.setFieldValue("subsidiary", value)}
              isRequired
              labelClass={labelClassName}
            />

            <CustomSelect
              label="Branch"
              placeholder="Select Branches"
              options={branches}
              selected={formik.values.branch}
              setSelected={(value) => formik.setFieldValue("branch", value)}
              isRequired
              labelClass={labelClassName}
            />

            <CustomSelect
              label="Department"
              placeholder="Select Department"
              options={departments}
              selected={formik.values.department}
              setSelected={(value) => formik.setFieldValue("department", value)}
              isRequired
              labelClass={labelClassName}
            />

            <CustomSelect
              label="Unit"
              placeholder="Select Unit"
              options={roles} //change to unit
              selected={formik.values.unit}
              setSelected={(value) => formik.setFieldValue("unit", value)}
              isRequired
              labelClass={labelClassName}
            />

            <CustomSelect
              label="Job Title"
              placeholder="Select Job Title"
              options={jobTitles}
              selected={formik.values.designation}
              setSelected={(value) =>
                formik.setFieldValue("designation", value)
              }
              isRequired
              labelClass={labelClassName}
            />

            <Input
              label="Phone Number"
              type="phone"
              placeholder="Phone Number"
              id="phone_number"
              name="phone_number"
              onChange={formik.handleChange}
              isRequired
            />

            <Input
              label="Staff Number"
              type="text"
              placeholder="Staff Number"
              id="staff_number"
              name="staff_number"
              onChange={formik.handleChange}
              isRequired
            />

            <CustomSelect
              label="Role"
              placeholder="Select Role"
              options={roles}
              selected={formik.values.role}
              setSelected={(value) => formik.setFieldValue("role", value)}
              isRequired
              labelClass={labelClassName}
            />

            <CustomSelect
              label="New Employee"
              placeholder="Select Status"
              options={newEmployeeStatuses}
              selected={formik.values.new_employee}
              setSelected={(value) =>
                formik.setFieldValue("new_employee", value)
              }
              isRequired
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
        <CancelModal onProceed={handleProceedCancel} modalTitle="Employee" />
      </DashboardModal>
    </ChecklistLayout>
  );
}
