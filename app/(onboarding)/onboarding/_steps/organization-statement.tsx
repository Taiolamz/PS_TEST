"use client";

import { Textarea } from "@/components/ui/textarea";
import { FormHeader } from "../_components";

interface OrganizationStatementProps {
  formik: any;
}

const OrganizationStatement = ({ formik }: OrganizationStatementProps) => {
  return (
    <section className="max-w-[38.8125rem]">
      <FormHeader
        title="What does your organization believe in?"
        subTitle=" Enter your business or organizational mission and vision statement below."
      />
      <div className="flex flex-col gap-6">
        <div>
          <label className="block mb-1.5 text-sm font-normal text-[#5A5B5F]">
            1. Vision Statement
          </label>
          <Textarea
            rows={4}
            id="vision"
            name="vision"
            onChange={formik.handleChange}
            className="border p-2 w-full"
            value={formik.values.vision}
            touched={formik.touched.vision}
            error={formik.errors.vision}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1.5 text-sm font-normal text-[#5A5B5F]">
            2. Mission Statement
          </label>
          <Textarea
            rows={4}
            id="mision"
            name="mision"
            onChange={formik.handleChange}
            className="border p-2 w-full"
            value={formik.values.mision}
            touched={formik.touched.mision}
            error={formik.errors.mision}
          />
        </div>
      </div>
    </section>
  );
};

export default OrganizationStatement;
