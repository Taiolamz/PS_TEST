import React from "react";

const FormLayout = ({ addText, module, form }: FormLayoutType) => {
  return (
    <div className="mt-10 flex flex-col gap-5 w-[884px] scroll-hidden">
      <p className="text-custom-dark-blue font-normal text-sm">{addText}</p>
      <p className="text-primary font-normal text-xs mt-5">{`${module} Information`}</p>

      {form}
    </div>
  );
};

export default FormLayout;
