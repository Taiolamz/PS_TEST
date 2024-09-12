import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";

const FormLayout = ({ addText, module, form }: FormLayoutType) => {
  return (
    <div className="mt-10 flex flex-col gap-5 w-[884px] scroll-hidden">
      <p className="text-custom-dark-blue font-normal text-sm">{addText}</p>
      <p className="text-primary font-normal inline-flex text-xs mt-5">
        {`${module} Information`}
        <span className="ml-2 cursor-pointer">
          <BsFillInfoCircleFill color="#84919A" />
        </span>
      </p>

      {form}
    </div>
  );
};

export default FormLayout;
