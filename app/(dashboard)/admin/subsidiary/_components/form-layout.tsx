import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";

const FormLayout = ({ addText, module, form }: FormLayoutType) => {
  return (
    <div className="mt-10 flex flex-col gap-5 w-[884px] scroll-hidden">
      <p className="text-custom-dark-blue font-normal text-sm">{addText}</p>
      <p className="text-primary font-normal text-xs mt-5 flex gap-[0.4063rem] items-center">
        {`${module} Information`} <BsInfoCircleFill fill="#6E7C87" size={12} />
      </p>

      {form}
    </div>
  );
};

export default FormLayout;
