"use client";

import { Input } from "@/components/ui/input";
import { FormHeader } from "../_components";
import CustomCheckbox from "@/components/custom-checkbox";
import { useState } from "react";
import { HIERARCHY_DATA } from "../data";

interface OrganizationStructureProps {
  formik: any;
}

const OrganizationStructure = ({ formik }: OrganizationStructureProps) => {
  const [currentHierarchy, setCurrentHierarchy] = useState(HIERARCHY_DATA);

  // const handleCheckboxClick = (id: number, name: any) => {
  //   setCurrentHierarchy((prevHierarchy) =>
  //     prevHierarchy.map((item) =>
  //       item.id === id ? { ...item, isChecked: !item.isChecked } : item
  //     )
  //   );
  //   formik.setFieldValue(
  //     name,
  //     currentHierarchy.map((item) => {
  //       item.isChecked;
  //     })
  //   );
  // };

  const handleCheckboxClick = (id: number) => {
    const updatedHierarchy = currentHierarchy.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );

    setCurrentHierarchy(updatedHierarchy);

    const updatedFormikValues = updatedHierarchy.reduce((acc, item) => {
      acc[item.title.toLowerCase()] = item.isChecked;
      return acc;
    }, {} as { [key: string]: boolean });

    formik.setFieldValue("hierarchy", updatedFormikValues);
  };

  return (
    <section className="max-w-[55.875rem]">
      <FormHeader
        title="Setup Default Organization Hierarchy"
        subTitle="Set organization operating Hierarchy"
      />
      <h3 className="block mb-1.5 text-sm font-medium text-[#5A5B5F]">
        1. Organizational Hierarchy
      </h3>
      <p className="text-gray-600">
        Does your organization structure have any of the following? Enable any
        of the fields below as it applies to your organization.
      </p>
      <div className="mt-4">
        {currentHierarchy.map(({ id, title, isChecked }) => (
          <div key={id} className="flex items-center mb-2">
            <CustomCheckbox
              key={id}
              id="hierarchy"
              name={`hierarchy.${title.toLowerCase()}`}
              label={title}
              isChecked={isChecked}
              itemId={id}
              handleClick={handleCheckboxClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrganizationStructure;
