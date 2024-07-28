import React, { useState } from "react";
import { FormHeader } from "../_components";
import { Input } from "@/components/ui/input";
import LogoUpload from "@/components/logoUpload/LogoUpload";

interface BrandIdentityProps {
  formik: any;
}

const BrandIdentity = ({ formik }: BrandIdentityProps) => {
  const [color, setColor] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoName, setLogoName] = useState("");

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const hexCode = e.target.value;
    if (hexCode) {
      setColor(hexCode);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setLogoName(file?.name);

      formik.setFieldValue("logo_input", file?.name);
    }
  };

  return (
    <section className="max-w-[38.8125rem]">
      <FormHeader
        title="Set the look and feel of your organization"
        subTitle="Customize mance to meet your organization taste and brand style."
      />
      <div className="mb-4 border-b pb-6">
        <LogoUpload
          handleLogoChange={handleLogoChange}
          logoName={logoName}
          setLogo={setLogo}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-6">Brand Color</label>
        <p className="mb-[0.7813rem] text-xs text-[#5A5B5F]">
          Current color <sup className="text-[#CC0905]">*</sup>
        </p>
        <div className="border flex max-w-[16.0625rem] items-center">
          <Input
            id="color"
            name="color"
            className="w-[3.3125rem] p-0 m-0 border-0"
            type="color"
            onChange={formik.handleChange}
            touched={formik.touched.color}
            error={formik.errors.color}
          />
          <p className="text-center w-full text-[#252C32] uppercase">{color}</p>
        </div>
      </div>
    </section>
  );
};

export default BrandIdentity;
