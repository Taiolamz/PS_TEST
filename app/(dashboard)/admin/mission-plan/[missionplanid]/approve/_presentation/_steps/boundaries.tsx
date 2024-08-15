import React from "react";

type Props = {};

const Boundaries = (props: Props) => {
  return (
    <div className="border rounded-[0.5rem] w-full mx-auto text-left mb-10 pb-[1.375rem] pt-[2.375rem] pl-[7.625rem]">
      <h2 className="text-2xl font-medium">Boundaries</h2>
      <div className="flex gap-14 w-3/4 xl:w-1/2">
        <div className="basis-1/2">
          <h3 className="font-medium mt-4 mb-3">Freedoms</h3>
          <ul className="flex flex-col gap-2 text-sm text-[#162238] font-normal list-inside list-disc">
            <li>Supporting Behaviour</li>
            <li>Supporting Behaviour</li>
            <li>Supporting Behaviour</li>
            <li>Supporting Behaviour</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mt-4 mb-3">Constraints</h3>
          <ul className="flex flex-col gap-2 text-sm text-[#162238] font-normal list-inside list-disc">
            <li>Supporting Behaviour</li>
            <li>Supporting Behaviour</li>
            <li>Supporting Behaviour</li>
            <li>Supporting Behaviour</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Boundaries;
