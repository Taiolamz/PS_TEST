import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  formik: any;
};

const HeadDetails = ({ formik }: Props) => {
  return (
    <section className="max-w-[35rem]">
      <div>
        <Input
          label="Email of Head of Organization"
          type="text"
          id="head_organization_email"
          name="head_organization_email"
          onChange={formik.handleChange}
          value={formik.values.head_organization_email}
          touched={formik.touched.head_organization_email}
          onBlur={formik.handleBlur}
          error={formik.errors.head_organization_email}
          placeholder="Email of head of organization"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 sm:text-sm"
        />
      </div>
      <div className="mt-6">
        <Input
          label="First Name of Head of Organization"
          type="text"
          id="head_organization_first_name"
          name="head_organization_first_name"
          onChange={formik.handleChange}
          value={formik.values.head_organization_first_name}
          touched={formik.touched.head_organization_first_name}
          onBlur={formik.handleBlur}
          error={formik.errors.head_organization_first_name}
          placeholder="Name of head of organization"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 sm:text-sm"
        />
      </div>
      <div className="mt-6">
        <Input
          label="Last Name of Head of Organization"
          type="text"
          id="head_organization_last_name"
          name="head_organization_last_name"
          onChange={formik.handleChange}
          value={formik.values.head_organization_last_name}
          touched={formik.touched.head_organization_last_name}
          onBlur={formik.handleBlur}
          error={formik.errors.head_organization_last_name}
          placeholder="Name of head of organization"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 sm:text-sm"
        />
      </div>
    </section>
  );
};

export default HeadDetails;
