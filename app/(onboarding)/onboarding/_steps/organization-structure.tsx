"use client";

import { FormHeader } from "../_components";
import { Checkbox } from "@/components/ui/checkbox";

interface OrganizationStructureProps {
  formik: any;
}

export type CheckboxOption = {
  name: string;
  label: string;
  id: number;
};

const currentHierarchy: CheckboxOption[] = [
  { name: "subsidiary", label: "Subsidiary", id: 1 },
  { name: "branch", label: "Branch", id: 2 },
  { name: "department", label: "Department", id: 3 },
  { name: "unit", label: "Unit", id: 4 },
];

const OrganizationStructure = ({ formik }: OrganizationStructureProps) => {
  const handleCheckboxChange = (name: string) => {
    const currentSelections = formik.values.hierarchy
      ? formik.values.hierarchy.split(",")
      : [];
    const isChecked = currentSelections.includes(name);

    const updatedSelections = isChecked
      ? currentSelections.filter((item: string) => item !== name)
      : [...currentSelections, name];

    formik.setFieldValue("hierarchy", updatedSelections.join(","));
  };

  return (
    <section className="max-w-[55.875rem] mb-[1.125rem]">
      <FormHeader
        title="Setup Default Organization Hierarchy"
        subTitle="Set organization operating Hierarchy"
      />
      <h3 className="block mb-1.5 text-sm font-medium text-[#162238]">
        1. Organizational Hierarchy
      </h3>
      <p className="text-[#6E7C87] text-sm pb-2">
        Does your organization structure have any of the following? Enable any
        of the fields below as it applies to your organization.
      </p>
      <div>
        {currentHierarchy.map(({ id, name, label }) => (
          <div className="flex items-center mt-4" key={name}>
            <Checkbox
              id="hierarchy"
              key={id}
              name={name}
              className=""
              onCheckedChange={() => handleCheckboxChange(name)}
              checked={formik.values.hierarchy.includes(name)}
            />
            <label className="ml-2 block text-[#6E7C87] text-sm">{label}</label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrganizationStructure;
