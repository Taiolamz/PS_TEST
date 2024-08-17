"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import CustomSelect from "@/components/custom-select";
import CustomDateInput from "@/components/custom-date-input";
import { formatDate } from "@/utils/helpers/date-formatter";
import { useEmployee } from "../_hooks/useEmployee";
import FormLayout from "../_components/form-layout";
import DashboardModal from "../_components/checklist-dashboard-modal";
import CancelModal from "../_components/cancel-modal";
import routesPath from "@/utils/routes";
import { useGetAllRolesQuery } from "@/redux/services/role/rolesApi";
import { Dictionary } from "@/@types/dictionary";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import { processInputAsArray } from "@/utils/helpers";
import { useAppSelector } from "@/redux/store";

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
    units,
    isCreatingEmployee,
    genderOptions,
    gradeLevels,
    newEmployeeStatuses,
    newEmployeeDrop,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
  } = useEmployee({ path: route, cancelPath: cancelRoute });

  const handleSubsidiaryChange = (selectedName: string) => {
    const selectedSub = (subsidiaries as SubsidiaryData[]).find(
      (emp) => emp.name === selectedName
    );
    if (selectedSub) {
      formik.setFieldValue("subsidiary_id.name", selectedSub.name);
      formik.setFieldValue("subsidiary_id.id", selectedSub.id);
      formik.setFieldValue("branch_id", "");
      formik.setFieldValue("department_id", "");
      formik.setFieldValue("unit_id", "");
    } else {
      formik.setFieldValue("subsidiary_id.name", "");
      formik.setFieldValue("subsidiary_id.id", "");
      formik.setFieldValue("branch_id", "");
      formik.setFieldValue("department_id", "");
      formik.setFieldValue("unit_id", "");
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
    } else if (
      processInputAsArray(user?.organization?.hierarchy)?.includes("subsidiary")
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

  const UNIT_OPTION = ({
    obj,
    SubId,
    BranId,
    DeptId,
  }: {
    obj: any;
    SubId?: string;
    BranId?: string;
    DeptId?: string;
  }) => {
    let finalMapValue = [
      {
        value: "",
        label: "Select Option",
      },
    ];
    if (
      processInputAsArray(user?.organization?.hierarchy)?.includes("department")
    ) {
      const filtered = obj?.filter(
        (item: any) => item?.department_id === DeptId
      );
      finalMapValue = [
        {
          label: "Select Unit",
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
      processInputAsArray(user?.organization?.hierarchy)?.includes("branch")
    ) {
      const filtered = obj?.filter((item: any) => item?.branch_id === BranId);
      finalMapValue = [
        {
          label: "Select Unit",
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
          label: "Select Unit",
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
          label: "Select Unit",
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

  // const [selectedState, setSelectedState] = useState("");
  const { user, checklist } = useAppSelector((state) => state.auth);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isNewEmployee, setIsNewEmployee] = useState("");

  const { data: rolesData, isLoading: isLoadingroles } = useGetAllRolesQuery(
    {}
  );
  return (
    <>
      <DashboardLayout back headerTitle="Employee">
        <ReusableStepListBox
          btnText="Continue"
          activeStep="1"
          totalStep="1"
          title="Create Employee"
          btnDisabled={!formik.isValid || !formik.dirty}
          loading={isCreatingEmployee}
          onSave={formik.handleSubmit}
          // onCancel={handleCancelDialog}
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
                className="grid grid-cols-2 gap-x-10 gap-y-5 items-end mb-14"
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
                  // isRequired
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
                  // isRequired
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
                  isRequired
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

                {processInputAsArray(user?.organization?.hierarchy)?.includes(
                  "subsidiary"
                ) && (
                  <CustomSelect
                    label="Subsidiary"
                    isRequired
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
                    // selected={selectedSubsidiary}
                    selected={formik.values.subsidiary_id.name}
                    setSelected={(value) => {
                      handleSubsidiaryChange(value);
                      setSelectedBranch("");
                      setSelectedDepartment("");
                      setSelectedUnit("");
                    }}
                    labelClass={labelClassName}
                  />
                )}

                {processInputAsArray(user?.organization?.hierarchy)?.includes(
                  "branch"
                ) && (
                  <CustomSelect
                    label="Branch"
                    isRequired
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
                      setSelectedUnit("");
                      formik.setFieldValue("unit_id", "");
                    }}
                    labelClass={labelClassName}
                  />
                )}

                {processInputAsArray(user?.organization?.hierarchy)?.includes(
                  "department"
                ) && (
                  <CustomSelect
                    label="Department"
                    isRequired
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
                      setSelectedUnit("");
                      formik.setFieldValue("unit_id", "");
                    }}
                    labelClass={labelClassName}
                  />
                )}

                {processInputAsArray(user?.organization?.hierarchy)?.includes(
                  "unit"
                ) && (
                  <CustomSelect
                    label="Unit"
                    isRequired
                    placeholder="Select Unit"
                    options={UNIT_OPTION({
                      obj: units,
                      SubId: formik?.values?.subsidiary_id?.id,
                      BranId: formik?.values?.branch_id,
                      DeptId: formik?.values?.department_id,
                    })}
                    disabled={
                      (formik?.values.subsidiary_id.name?.length === 0 &&
                        processInputAsArray(
                          user?.organization?.hierarchy
                        )?.includes("subsidiary")) ||
                      (formik?.values.branch_id?.length === 0 &&
                        processInputAsArray(
                          user?.organization?.hierarchy
                        )?.includes("branch")) ||
                      (formik?.values.department_id?.length === 0 &&
                        processInputAsArray(
                          user?.organization?.hierarchy
                        )?.includes("department"))
                    }
                    selected={selectedUnit}
                    setSelected={(value) => {
                      setSelectedUnit(value);
                      formik.setFieldValue("unit_id", value);
                    }}
                    labelClass={labelClassName}
                  />
                )}

                <Input
                  label="Job Title"
                  type="text"
                  placeholder="Job Title"
                  id="designation"
                  name="designation"
                  onChange={formik.handleChange}
                  isRequired
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Phone Number"
                  id="phone_number"
                  name="phone_number"
                  maxLength={14}
                  onChange={(e) => {
                    const value = e.target.value;
                    const filteredValue = value.replace(/[^0-9+]/g, "");
                    formik.setFieldValue("phone_number", filteredValue);
                  }}
                  value={formik.values.phone_number}
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
                  selected={isNewEmployee}
                  setSelected={(value) => {
                    setIsNewEmployee(value);
                    const employeeId = newEmployeeDrop.filter(
                      (chi) => chi.name === value
                    )[0].id;
                    formik.setFieldValue("new_employee", employeeId);
                  }}
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
        </div>
      </DashboardLayout>
    </>
  );
}
