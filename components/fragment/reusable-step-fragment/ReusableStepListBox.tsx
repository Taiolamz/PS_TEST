"use client";

import { ManceLoader } from "@/components/custom-loader";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import { formatChecklistPercent } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import React from "react";
// import { Button } from "react-scroll";
import style from "./ReusableStepListBox.module.css";

interface myComponentProps {
  activeStep?: string;
  totalStep?: string;
  back?: boolean;
  onBack?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  loading?: boolean;
  btnText?: string;
  title?: string;
  hideStep?: boolean;
  btnDisabled?: boolean;
  btnClass?: string;
  fixed?: boolean;
}

const backIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    fill="none"
    viewBox="0 0 24 25"
    className={style.img}
  >
    <path
      fill="#6E7C87"
      d="M11.53 15.22a.75.75 0 01-1.06 1.06l-3.25-3.25a.75.75 0 010-1.06l3.25-3.25a.75.75 0 011.06 1.06L8.81 12.5l2.72 2.72zm-.06-2.19l4.25 4.25a.75.75 0 001.06-1.06l-3.72-3.72 3.72-3.72a.75.75 0 00-1.06-1.06l-4.25 4.25a.75.75 0 000 1.06z"
    ></path>
  </svg>
);

const ReusableStepListBox = ({
  activeStep,
  back,
  btnText,
  loading,
  onBack,
  onCancel,
  onSave,
  title,
  totalStep,
  hideStep,
  btnClass,
  btnDisabled,
  fixed,
}: myComponentProps) => {
  const router = useRouter();
  const { checklist } = useAppSelector((state) => state.auth);
  return (
    <div
      className={`${style.reusable_step_list_box_index_wrap} ${
        fixed && style.reusable_step_list_box_index_wrap_fixed
      }`}
    >
      {back && (
        <>
          <div
            onClick={() => {
              if (window?.history?.length > 1) {
                router.back();
              }
            }}
            className={`${style.back_box}`}
          >
            <figure className={style.img_box}>{backIcon}</figure>
            <p className={style.text}>Back</p>
          </div>
        </>
      )}
      {/* title here  */}
      {title && <p className={style.title}>{title}</p>}
      {/* title here  */}
      {/* step info here  */}
      {!hideStep  && formatChecklistPercent(checklist?.completion_percent) !== 100 && (
        <>
          <div className={style?.step_box}>
            <p className={style?.step}>{`Step ${activeStep || ""}  of ${
              totalStep || ""
            }`}</p>
          </div>
        </>
      )}
      {/* step info end here */}

      {/* btn box start */}
      <div className={style.btn_box}>
        <Button
          variant={"outline"}
          className={`border-primary text-primary font-light  hover:text-primary ${btnClass}`}
          onClick={() => {
            if (!onCancel) {
              router?.back();
            } else {
              onCancel && onCancel();
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSave && onSave();
          }}
          className={`${btnClass}  font-light ${
            btnDisabled || loading
              ? "border  border-custom-divider font-medium  bg-custom-bg  text-custom-gray-scale-300 hover:bg-transparent cursor-not-allowed"
              : ""
          } `}
          disabled={btnDisabled || loading ? btnDisabled : false}
        >
          {loading ? <ManceLoader /> : btnText ? btnText : "Save"}
        </Button>
      </div>
      {/* btn box end */}
    </div>
  );
};

export default ReusableStepListBox;
