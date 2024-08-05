import React from "react";

type Props = {};

const StrategicIntentView = (props: Props) => {
  return (
    <div className="border-[0.0313rem] border-[#f7f7f7] shadow-md w-full mx-auto text-center mb-10 pb-[4.25rem] pt-[2.625rem]">
      <section className="">
        {" "}
        <h2 className="text-primary font-medium text-2xl mb-[1.375rem]">
          Strategic Intent
        </h2>
        <div className=" flex flex-col gap-3">
          <h3 className=" font-medium text-2xl text-[#1E1E1E]">Intent 1</h3>
          <p className="w-3/5 mx-auto text-sm text-[#6E7C87]">
            My MISSION PLAN Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Feugiat sit sed at neque. Semper suspendisse diam habitant
            pulvinar arcu, mi.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <h3 className=" font-medium text-2xl text-[#1E1E1E]">Intent 2</h3>
          <p className="w-3/5 mx-auto text-sm text-[#6E7C87]">
            My MISSION PLAN Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Feugiat sit sed at neque. Semper suspendisse diam habitant
            pulvinar arcu, mi.
          </p>
        </div>
      </section>
      <section className="text-left w-3/5 mx-auto mt-[3.625rem]">
        <h3 className=" font-medium text-2xl text-[#1E1E1E] mb-4">
          Behaviours
        </h3>
        <ul className="flex flex-col gap-2 text-sm text-[#162238] font-normal list-inside list-disc">
          <li>Supporting Behaviour</li>
          <li>Supporting Behaviour</li>
          <li>Supporting Behaviour</li>
          <li>Supporting Behaviour</li>
        </ul>
      </section>
    </div>
  );
};

export default StrategicIntentView;
