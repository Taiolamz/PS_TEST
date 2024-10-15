"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import CustomSelect from "@/components/custom-select";
import { useContext, useRef, useState } from "react";
import routesPath from "@/utils/routes";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { useEditUnit } from "./_hooks/useEditUnit";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { processInputAsArray } from "@/utils/helpers";
import { useAppSelector } from "@/redux/store";
import FormLayout from "../../_components/form-layout";

export default function Edit({ params }: { params: { unitsId: string } }) {
  const actionCtx = useContext(ActionContext);
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const router = useRouter();
  const {
    formik,
    subsidiaries,
    departments,
    branches,
    employees,
    employeeDrop,
    subsidiaryDrop,
    handleSubmit,
    branchDrop,
    departmentDrop,
    isUpdating,
  } = useEditUnit({ id: params.unitsId });

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSubsidiary, setSelectedSubsidiary] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

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

  const handleHeadSelectChange = (selectedName: string) => {
    const selectedEmployee = (employees as AllStaff[]).find(
      (emp) => emp.name === selectedName
    );

    if (selectedEmployee) {
      formik.setFieldValue("head_of_unit.name", selectedEmployee.name);
      formik.setFieldValue("work_email", selectedEmployee.email);
      formik.setFieldValue("head_of_unit.email", selectedEmployee.email);
      formik.setFieldValue("head_of_unit.id", selectedEmployee.id);
      // formik.setFieldValue("head_of_department.name", selectedEmployee.name);
      // formik.setFieldValue("work_email", selectedEmployee.email);
      // formik.setFieldValue("head_of_department.id", selectedEmployee.id);
    } else {
      formik.setFieldValue("head_of_unit.name", "");
      formik.setFieldValue("work_email", "");
      formik.setFieldValue("head_of_unit.id", "");
      // formik.setFieldValue("head_of_department.name", "");
      // formik.setFieldValue("work_email", "");
      // formik.setFieldValue("head_of_department.id", "");
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

  const { user, checklist } = useAppSelector((state) => state.auth);

  return (
    <DashboardLayout back headerTitle="Edit Unit">
      {/* <div className="" style={{ padding: "0rem 2rem", marginTop: "-1.5rem" }}>
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          className="mt-10 flex flex-col gap-5 w-[884px] scroll-hidden"
        >
          <p className="text-primary font-normal text-xs mt-5 flex gap-[0.4063rem] items-center">
            Unit Information
          </p>
          <section className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3">
            <Input
              label="Name of Unit"
              type="text"
              placeholder="Name of unit"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              isRequired
            />
            <Input
              label="Head of Unit"
              type="text"
              placeholder="Head of unit"
              id="hou"
              name="hou"
              value={formik.values.hou}
              onChange={formik.handleChange}
              isRequired
            />

            <Input
              label="Work Email"
              type="email"
              placeholder="Unit Email Address"
              id="work_email"
              value={formik.values.work_email}
              name="work_email"
              onChange={formik.handleChange}
            />

            <CustomSelect
              label="Subsidiary"
              isRequired
              placeholder="Select Subsidiary"
              options={subsidiaries}
              selected={selectedSubsidiary}
              setSelected={(value) => {
                setSelectedSubsidiary(value);
                const selectedSubsidiaryId = subsidiaryDrop.find(
                  (chi) => chi.name === value
                )?.id; 
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
                const selectedBranchId = branchDrop.find(
                  (chi) => chi.name === value
                )?.branch_id; // Use optional chaining
                formik.setFieldValue("branch_id", selectedBranchId);
              }}
              labelClass={labelClassName}
            />

            <CustomSelect
              label="Department"
              isRequired
              placeholder="Select Department"
              options={departments}
              selected={selectedDepartment || formik.values.department.name} // Make sure this accesses the right property
              setSelected={(value) => {
                setSelectedDepartment(value);
                const selectedDepartmentId = departmentDrop.find(
                  (chi) => chi.name === value
                )?.id; // Use optional chaining
                formik.setFieldValue("department_id", selectedDepartmentId);
              }}
              labelClass={labelClassName}
            />
          </section>
          <Button
            className="w-[170px] my-10"
            type="submit"
            // onClick={handleSubmit}
            disabled={isUpdating}
          >
            Update Information
          </Button>
        </form>
      </div> */}
      <div className="" style={{ padding: "0rem 2rem", marginTop: "-1.5rem" }}>
        <FormLayout
          module="Unit"
          form={
            <form onSubmit={formik.handleSubmit} autoComplete="off">
              <div className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3 ">
                <Input
                  label="Name of Unit"
                  type="text"
                  placeholder="Unit Name"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  isRequired
                />

                <Input
                  label="Unit Email"
                  type="email"
                  placeholder="Unit Email"
                  value={formik.values.unit_email}
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
                    selected={formik.values.branch_id || selectedBranch}
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
                    selected={formik.values.department_id || selectedDepartment}
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
                  value={formik.values.head_of_unit.email}
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
                  touched={formik.touched.description as boolean}
                  value={formik.values.description}
                  error={formik.errors.description as string}
                />
              </div>
              <br />

              <Button
                className="w-[170px] my-10"
                type="submit"
                onClick={handleSubmit}
                disabled={isUpdating}
                loading={isUpdating}
                loadingText="Updating..."
              >
                Update Information
              </Button>
            </form>
          }
        />
      </div>
    </DashboardLayout>
  );
}
