import React, { useState } from "react";
import { Input } from "../ui/input";
import Icon from "../icon/Icon";
import { cn } from "@/lib/utils";

type Props = {
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logoName: string | null;
  fileInputRef: any;
  setLogo: (item: any) => void;
  handleRemoveLogo: (item: any) => void;
  label?: string;
  labelClass?: string;
  showFootNote?: boolean;
  containerClass?: string;
};

const LogoUpload = ({
  handleLogoChange,
  logoName,
  setLogo,
  handleRemoveLogo,
  fileInputRef,
  label,
  labelClass,
  showFootNote = true,
  containerClass,
}: Props) => {
  return (
    <div>
      <label
        className={cn(
          "block mb-[0.6875rem] font-medium text-[#162238] text-lg",
          labelClass
        )}
      >
        {label ?? "Logo"}
      </label>
      <div className="flex items-center">
        {logoName ? (
          <div className="flex gap-3.5">
            <p
              className={cn(
                "inline-flex  gap-2 px-4 py-2.5 border-[#008080] border rounded-sm text-sm",
                containerClass
              )}
            >
              <Icon width={18} height={18} name="attachment" /> {logoName}
            </p>
            <button
              type="button"
              className="text-[#CC0905] whitespace-nowrap text-xs"
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
              id="logo_input"
              name={""}
              ref={fileInputRef}
            />
            <label
              htmlFor="logo_input"
              className={cn(
                "cursor-pointer border p-2 w-full text-sm",
                containerClass
              )}
            >
              Choose File
            </label>
          </div>
        )}
      </div>
      {showFootNote && (
        <p className="text-[#84919A] text-xs mt-[0.6875rem]">
          Only standard format are allowed Jpg, png. File must not be more than
          1mb
        </p>
      )}
    </div>
  );
};

export default LogoUpload;
