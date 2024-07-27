import React, { useState } from "react";
import { Input } from "../ui/input";
import Icon from "../icon/Icon";

type Props = {
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logoName: string;
};

const LogoUpload = ({ handleLogoChange, logoName }: Props) => {

  const handleRemoveLogo = () => {
    // setLogo("");
  };
  return (
    <div>
      <label className="block mb-1">Logo</label>
      <div className="flex items-center">
        {logoName ? (
          <div className="flex gap-3.5">
            <p className="inline-flex  gap-2 px-4 py-2.5 border-[#008080] border rounded-sm text-sm">
              <Icon width={18} height={18} name="attachment" /> {logoName}
            </p>
            <button
              type="button"
              className="text-[#CC0905] whitespace-nowrap"
              onClick={handleRemoveLogo}
            >
              remove logo
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <Input
              type="file"
              accept=".jpg,.png,.jpeg"
              onChange={handleLogoChange}
              className="hidden"
              id="logo-input" 
              name={""} 
            />
            <label
              htmlFor="logo-input"
              className="cursor-pointer border p-2 w-full text-sm"
            >
              Choose File
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoUpload;
