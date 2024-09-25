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
    subsidiaryDrop,
    branchDrop,
    departmentDrop,
  } = useEditUnit({ id: params.unitsId });

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSubsidiary, setSelectedSubsidiary] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");




  return (
    <DashboardLayout back headerTitle="Edit Unit">
      <div className="" style={{ padding: "0rem 2rem", marginTop: "-1.5rem" }}>
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          className="mt-10 flex flex-col gap-5 w-[884px] scroll-hidden"
        >
          <p className="text-primary font-normal text-xs mt-5 flex gap-[0.4063rem] items-center">
            Unit Information
          </p>
          <section className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3 ">
            <Input
              label="Name of Unit"
              type="text"
              placeholder="Name of unit"
              id="name"
              name="name"
              onChange={formik.handleChange}
              isRequired
            />
             <Input
              label="Head of Unit"
              type="text"
              placeholder="Head of unit"
              id="hou"
              name="hou"
              onChange={formik.handleChange}
              isRequired
            />
            <Input
              label="Work Email"
              type="email"
              placeholder="Subsidiary Email Address"
              id="email"
              name="email"
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
          </section>
          <Button className="w-[170px] my-10" type="submit">
            Update Information
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
