<<<<<<< HEAD
import React, { useRef, useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> 41ff531 (updates)
import { FormHeader } from "../_components";
import { Input } from "@/components/ui/input";
import LogoUpload from "@/components/logoUpload/LogoUpload";

interface BrandIdentityProps {
  formik: any;
}

const BrandIdentity = ({ formik }: BrandIdentityProps) => {
  const [color, setColor] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
<<<<<<< HEAD
  const [logoName, setLogoName] = useState<string | null>("");

  const fileInputRef = useRef<HTMLInputElement | null>();
=======
  const [logoName, setLogoName] = useState("");

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const hexCode = e.target.value;
    if (hexCode) {
      setColor(hexCode);
    }
  };
>>>>>>> 41ff531 (updates)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setLogoName(file?.name);
<<<<<<< HEAD
      formik.setFieldValue("logo", file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    setLogoName(null);
=======

      formik.setFieldValue("logo_input", file?.name);
    }
>>>>>>> 41ff531 (updates)
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
<<<<<<< HEAD
          handleRemoveLogo={handleRemoveLogo}
          fileInputRef={fileInputRef}
=======
>>>>>>> 41ff531 (updates)
        />
      </div>
      <div className="mb-4">
        <label className="block mb-6">Brand Color</label>
        <p className="mb-[0.7813rem] text-xs text-[#5A5B5F]">
          Current color <sup className="text-[#CC0905]">*</sup>
        </p>
        <div className="border flex max-w-[16.0625rem] items-center">
          <Input
<<<<<<< HEAD
            id="brand_colour"
            name="brand_colour"
            className="w-[3.3125rem] p-0 m-0 border-0"
            type="color"
            onChange={formik.handleChange}
            touched={formik.touched.brand_colour}
            error={formik.errors.brand_colour}
=======
            id="color"
            name="color"
            className="w-[3.3125rem] p-0 m-0 border-0"
            type="color"
            onChange={formik.handleChange}
            touched={formik.touched.color}
            error={formik.errors.color}
>>>>>>> 41ff531 (updates)
          />
          <p className="text-center w-full text-[#252C32] uppercase">{color}</p>
        </div>
      </div>
    </section>
  );
};

export default BrandIdentity;
