import { PageLoader } from "@/components/custom-loader";
import { Button } from "@/components/ui/button";
import { FileIcon } from "@/public/assets/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmptyState = ({
  textTitle,
  btnTitle,
  onBulkUpload,
  href,
  create,
  icon,
  isNotBulkUpload,
  loading,
  viewText,
  onBtnClick,
}: EmptyStateType) => {
  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center">
          {!create ? (
            <Image src={FileIcon} alt="file" />
          ) : (
            <Image src={icon} alt="file" />
          )}
          <p className="text-custom-gray-scale-400 font-medium text-sm">{`${
            !create ? "Create your" : "Add"
          } ${textTitle} by using the button below`}</p>

          <Button
            className="text-custom-gray-scale-white px-8"
            onClick={onBtnClick}
          >
            <Link href={href}>{`${
              !create ? viewText || "Create" : "Add"
            } ${btnTitle}`}</Link>
          </Button>

          {!isNotBulkUpload ? (
            <p
              className="text-xs text-primary cursor-pointer hover:font-medium transition-all duration-300"
              onClick={onBulkUpload}
            >
              Click to bulk upload
            </p>
          ) : null}
        </div>
      )}
    </>
  );
};

export default EmptyState;
