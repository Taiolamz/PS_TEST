import React from "react";
import { BsInfoCircle, BsInfoCircleFill } from "react-icons/bs";

interface FormHeaderProps {
  title: string;
  subTitle: string;
}

const FormHeader = ({ title, subTitle }: FormHeaderProps) => {
  return (
    <>
      <h2 className="text-primary text-xl font-semibold mb-2 flex gap-[0.4063rem] items-center">
        {title} <BsInfoCircleFill fill="#6E7C87" size={16} />
      </h2>
      <p className="text-foreground mb-6">{subTitle}</p>
    </>
  );
};

export default FormHeader;
