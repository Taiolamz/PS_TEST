"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import CustomSelect from "@/components/custom-select";
import CustomDateInput from "@/components/custom-date-input";
import { formatDate, formatRMDatePicker } from "@/utils/helpers/date-formatter";
import Routes from "@/lib/routes/routes";
import { useEmployee } from "../_hooks/useEmployee";
import { ChecklistLayout } from "../_components/checklist-layout";
import FormLayout from "../_components/form-layout";
import DashboardModal from "../_components/checklist-dashboard-modal";
import CancelModal from "../_components/cancel-modal";
import routesPath from "@/utils/routes";
import { useGetAllRolesQuery } from "@/redux/services/role/rolesApi";
import { Dictionary } from "@/@types/dictionary";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";

const { ADMIN } = routesPath;

export default function AddEmployee() {
  const router = useRouter();
  const route = () => router.push(ADMIN.EMPLOYEES);
  const cancelRoute = ADMIN.CHECKLIST;
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const {
    formik,
    subsidiaries,
    departments,
    branches,
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
    // stateDrop,
    subsidiaryDrop,
    branchDrop,
    departmentDrop,
    unitsDrop,
  } = useEmployee({ path: route, cancelPath: cancelRoute });

  // const [selectedState, setSelectedState] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSubsidiary, setSelectedSubsidiary] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const { data: rolesData, isLoading: isLoadingroles } = useGetAllRolesQuery(
    {}
  );

  return (
    <>
      <DashboardLayout back headerTitle="Employee">
        {/* <ChecklistLayout
          title="Employee"
          showBtn
          step={`Step 1 - 1`}
          btnDisabled={!formik.isValid || !formik.dirty}
          onCancel={handleCancelDialog}
          onProceedBtn={formik.handleSubmit}
          loading={isCreatingEmployee}
        > */}
        <ReusableStepListBox
          btnText="Continue"
          activeStep="1"
          totalStep="1"
          title="Create Employee"
          btnDisabled={!formik.isValid || !formik.dirty}
          loading={isCreatingEmployee}
          onSave={formik.handleSubmit}
          onCancel={handleCancelDialog}
          // back
          // hideStep
          // fixed
        />
        <div
          className=""
          style={{ padding: "0rem 2rem", marginTop: "-1.5rem" }}
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
                  selected={new Date(formik.values.date_of_birth)}
                  handleChange={(date) => {
                    formik.setFieldValue("date_of_birth", formatDate(date));
                  }}
                  placeholder="YYYY/MM/DD"
                  error={""}
                  className="relative"
                  iconClass="top-[2.7rem]"
                  isRequired
                />

                <CustomDateInput
                  id="resumption_date"
                  label="Resumption Date"
                  selected={new Date(formik.values.resumption_date)}
                  handleChange={(date) => {
                    formik.setFieldValue("resumption_date", formatDate(date));
                  }}
                  placeholder="YYYY/MM/DD"
                  iconClass="top-[2.7rem]"
                  error={""}
                  className="relative"
                  isRequired
                />

                <Input
                  label="Work Email"
                  type="text"
                  placeholder="Work Email"
                  id="email"
                  name="email"
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
                  isRequired
                  placeholder="Select Subsidiary"
                  options={subsidiaries}
                  selected={selectedSubsidiary}
                  setSelected={(value) => {
                    setSelectedSubsidiary(value);
                    const selectedSubsidiaryId = subsidiaryDrop.filter(
                      (chi) => chi.name === value
                    )[0].id;
                    formik.setFieldValue("subsidiary_id", selectedSubsidiaryId);
                  }}
                  labelClass={labelClassName}
                />

                <CustomSelect
                  label="Branch"
                  isRequired
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

                <CustomSelect
                  label="Department"
                  isRequired
                  placeholder="Select Department"
                  options={departments}
                  selected={selectedDepartment}
                  setSelected={(value) => {
                    setSelectedDepartment(value);
                    const selectedDepartmentId = departmentDrop.filter(
                      (chi) => chi.name === value
                    )[0].id;
                    formik.setFieldValue("department_id", selectedDepartmentId);
                  }}
                  labelClass={labelClassName}
                />

                <CustomSelect
                  label="Unit"
                  isRequired
                  placeholder="Select Unit"
                  options={units}
                  selected={selectedUnit}
                  setSelected={(value) => {
                    setSelectedUnit(value);
                    const selectedUnitId = unitsDrop.filter(
                      (chi) => chi.name === value
                    )[0].id;
                    formik.setFieldValue("unit_id", selectedUnitId);
                  }}
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
                  options={rolesData?.data?.map((role: Dictionary) => {
                    return {
                      label: role.name,
                      value: role.name,
                    };
                  })}
                  selected={selectedRole}
                  setSelected={(value) => {
                    setSelectedRole(value);
                    const selectedRoleId = rolesData?.data?.filter(
                      (chi: Dictionary) => chi.name === value
                    )[0].id;
                    formik.setFieldValue("role_id", selectedRoleId);
                  }}
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
            <CancelModal
              onProceed={handleProceedCancel}
              modalTitle="Employee"
            />
          </DashboardModal>
          {/* </ChecklistLayout> */}
        </div>
      </DashboardLayout>
    </>
  );
}
