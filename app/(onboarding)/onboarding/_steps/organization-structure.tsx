"use client"

import { Input } from "@/components/ui/input";
import { FormHeader } from "../_components";
import CustomCheckbox from "@/components/custom-checkbox";
import { useState } from "react";
import { HIERARCHY_DATA } from "../data";

const OrganizationStructure = () => {
    const [currentHierarchy, setCurrentHierarchy] = useState(HIERARCHY_DATA)
    return (
        <section className='max-w-[55.875rem]'>
            <FormHeader
                title='Setup Default Organization Hierarchy'
                subTitle='Set organization operating Hierarchy'
            />
                <h3 className="block mb-1.5 text-sm font-medium text-[#5A5B5F]">
                    1. Organizational Hierarchy
                </h3>
                <p className="text-gray-600">
                    Does your organization structure have any of the following? Enable any
                    of the fields below as it applies to your organization.
                </p>
            <div className="mt-4">
                {
                    currentHierarchy.map(({ id, title, isChecked }) => (
                        <div key={id} className="flex items-center mb-2">
                            <CustomCheckbox
                                key={id}
                                id="sub"
                                label={title}
                                isChecked={isChecked}
                                handleClick={() => null}
                            />
                        </div>
                    ))
                }
            </div>
        </section>
    );
}

export default OrganizationStructure;
