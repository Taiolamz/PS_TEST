import React, { useContext, useRef, useState } from "react";
import { FormHeader } from "../_components";
import { Input } from "@/components/ui/input";
import LogoUpload from "@/components/logoUpload/LogoUpload";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { Dictionary } from "@/@types/dictionary";
import { useOnClickOutside } from "@/app/(dashboard)/_layout/UseOutsideClick";

interface BrandIdentityProps {
  formik: any;
}

const BrandIdentity = ({ formik }: BrandIdentityProps) => {
  const [color, setColor] = useColor("hex", "#008080");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [logo, setLogo] = useState<File | string>();
  const [logoName, setLogoName] = useState<string | null>(
    formik.values.logo ? formik.values.logo.name : null
  );

  const actionCtx = useContext(ActionContext);
  const fileInputRef = useRef<HTMLInputElement | string>();
  // const [color, setColor] = useColor("hex", "#121212");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        // 1MB in bytes
        formik.setFieldError("logo", "Logo size should be at most 1MB");
        return;
      }
      setLogo(file);
      setLogoName(file?.name);
      formik.setFieldValue("logo", file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo("");
    setLogoName(null);
  };

  const pickerref = useOnClickOutside(() => {
    setShowColorPicker(false);
  });

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
          handleRemoveLogo={handleRemoveLogo}
          fileInputRef={fileInputRef}
        />
        {formik.errors.logo && (
          <p className="text-red-500 text-xs">{formik.errors.logo}</p>
        )}
      </div>
      <div ref={pickerref} className="mb-4">
        <label className="block mb-6  font-medium text-[#162238] text-lg">
          Brand Color
        </label>
        <p className="mb-[0.7813rem] text-xs text-[#5A5B5F]">
          Current color <sup className="text-[#CC0905]">*</sup>
        </p>
        <div
          style={{
            position: "relative",
            height: "2.4rem",
            borderRadius: ".2rem",
            cursor: "pointer",
          }}
          className="border flex max-w-[16.0625rem] items-center"
        >
          <div
            style={{
              width: "30%",
              height: "100%",
              backgroundColor: `var(--primary-color)`,
            }}
            className="color-box"
            onClick={() => {
              setShowColorPicker(true);
            }}
          ></div>
          {showColorPicker && (
            <div className="color-picker-wrapper-index">
              <ColorPicker
                // id="brand_colour"
                // name="brand_colour"
                width={300}
                height={200}
                color={color}
                // hideHEX

                hideHSV
                hideRGB
                onChange={(e) => {
                  const color = e.hex;
                  setColor(e);
                  actionCtx?.setPrimaryColorVals(color);
                  formik.setFieldValue("brand_colour", color);
                }}
              />
            </div>
          )}

          {!showColorPicker && (
            <p
              onClick={() => {
                setShowColorPicker(true);
              }}
              className="text-center w-full text-[#252C32] uppercase"
            >
              {color?.hex}
            </p>
          )}
        </div>
        <p className="text-[#84919A] text-xs mt-[0.6875rem]">
          Click on the color palette to select your preffered color
        </p>
      </div>
    </section>
  );
};

export default BrandIdentity;

// actionCtx?.setPrimaryColorVals(color);
