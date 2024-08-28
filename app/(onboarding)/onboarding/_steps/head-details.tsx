import { Input } from "@/components/ui/input";
import React from "react";
import { FormHeader } from "../_components";

type Props = {
  formik: any;
};

const HeadDetails = ({ formik }: Props) => {
  return (
    <section>
      <div className="max-w-[35rem]">
        <FormHeader
          title="Who is your Head of Organization?"
          subTitle="Give details on who heads your organization and creates your organization mission plan"
        />
      </div>
      <div className="w-[54.625rem] ">
        <div className="w-full">
          <h2 className="text-sm font-medium text-[#162238] mb-2.5">
            Head of Organization Name
          </h2>
          <div className="flex gap-[2.125rem] w-full">
            <Input
              label="First Name"
              type="text"
              id="head_organization_first_name"
              name="head_organization_first_name"
              onChange={formik.handleChange}
              value={formik.values.head_organization_first_name}
              touched={formik.touched.head_organization_first_name}
              onBlur={formik.handleBlur}
              error={formik.errors.head_organization_first_name}
              placeholder="Input First Name"
              className=" px-3 py-2 border border-gray-300 sm:text-sm"
              containerClass="w-1/2 "
            />
            <Input
              label="Last Name"
              type="text"
              id="head_organization_last_name"
              name="head_organization_last_name"
              onChange={formik.handleChange}
              value={formik.values.head_organization_last_name}
              touched={formik.touched.head_organization_last_name}
              onBlur={formik.handleBlur}
              error={formik.errors.head_organization_last_name}
              placeholder="Input Last Name"
              className=" px-3 py-2 border border-gray-300 sm:text-sm"
              containerClass="w-1/2"
            />
          </div>
        </div>
        <div className="w-1/2 mt-6 max-w-[26.5625rem]">
          <h2 className="text-sm font-medium text-[#162238] mb-2.5">
            Head of Organization Email
          </h2>
          <Input
            label="Work Email"
            type="text"
            id="head_organization_email"
            name="head_organization_email"
            onChange={formik.handleChange}
            value={formik.values.head_organization_email}
            touched={formik.touched.head_organization_email}
            onBlur={formik.handleBlur}
            error={formik.errors.head_organization_email}
            placeholder="Input Email"
            className=" block w-full px-3 py-2 border border-gray-300 sm:text-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default HeadDetails;
