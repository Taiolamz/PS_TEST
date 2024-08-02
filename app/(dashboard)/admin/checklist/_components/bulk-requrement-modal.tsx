import { Button } from "@/components/ui/button";
import { BtnPlusIcon, CircleTimes } from "@/public/assets/icons";
import Image from "next/image";
import React from "react";

interface Prop {
  onTemplateDownload: () => void;
  onCancel: () => void;
}

export const bulkRequirements = [
  "Download the template below",
  "If you’re using Excel, ensure to save or export as .csv",
  "Upload document by clicking on the Bulk upload button",
];

const BulkRequirementModal = ({ onTemplateDownload, onCancel }: Prop) => {
  const btn = (
    <div className="mt-5">
      <Button className="px-5" onClick={onTemplateDownload}>
        <div className="flex items-center gap-3">
          <Image src={BtnPlusIcon} alt="add" />
          <p className="text-custom-bg font-medium">Download Template</p>
        </div>
      </Button>
    </div>
  );
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-custom-dark-gray font-medium text-sm">
          Bulk Upload Requirement
        </p>
        <Image
          src={CircleTimes}
          alt="cancel"
          className="cursor-pointer"
          onClick={onCancel}
        />
      </div>
      <div className="mt-5 flex flex-col ">
        {bulkRequirements.map((chi, idx) => (
          <div className="flex gap-4 items-center  " key={idx}>
            <p className="text-custom-red mt-1">*</p>
            <p className="text-custom-ash font-light text-xs ">{chi}</p>
          </div>
        ))}
      </div>
      {btn}
      <div className="flex gap-2 items-center mt-10">
        <p className="font-light text-xs">Having issues with bulk upload?</p>
        <p className="text-custom-light-blue font-medium text-xs cursor-pointer">
          Send us an email
        </p>
      </div>
    </div>
  );
};

export default BulkRequirementModal;
