import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  formik: any;
};

const HeadDetails = ({ formik }: Props) => {
  return (
    <section className="max-w-[35rem]">
      <div>
        <label className="block text-[#5A5B5F] text-[0.8125rem]">
          Email of Head of Organization
        </label>
        <Input
          type="text"
          id="head_email"
          name="head_email"
          onChange={formik.handleChange}
          value={formik.values.head_email}
          touched={formik.touched.head_email}
          onBlur={formik.handleBlur}
          error={formik.errors.head_email}
          placeholder="Email of head of organization"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 sm:text-sm"
        />
      </div>
      <div className="mt-6">
        <label className="block text-[#5A5B5F] text-[0.8125rem]">
          Name of Head of Organization
        </label>
        <Input
          type="text"
          id="head_name"
          name="head_name"
          onChange={formik.handleChange}
          value={formik.values.head_name}
          touched={formik.touched.head_name}
          onBlur={formik.handleBlur}
          error={formik.errors.head_name}
          placeholder="Name of head of organization"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 sm:text-sm"
        />
      </div>
    </section>
  );
};

export default HeadDetails;
