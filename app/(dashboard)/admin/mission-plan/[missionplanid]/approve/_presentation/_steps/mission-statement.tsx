import React from "react";
import MeasureOfSuccessTable from "../../../../_components/measureOfSuccessTable";
import {
  measureColumns,
  measuresData,
} from "@/utils/data/dashboard/missionplan/dummy";

type Props = {};

const MissionStatement = (props: Props) => {
  return (
    <div>
      <section className="border-[0.0313rem] border-[#f7f7f7] shadow-md w-full mx-auto text-center mb-10 pb-[1.375rem] pt-[2.625rem]">
        {" "}
        <h2 className="text-primary font-medium text-2xl">Mission Statement</h2>
        <div className="mt-5 flex flex-col gap-3">
          <p className="w-3/5 mx-auto  text-[#6E7C87]">
            My MISSION PLAN Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Feugiat sit sed at neque. Semper suspendisse diam habitant
            pulvinar arcu, mi.
          </p>
          <p className="w-3/5 mx-auto  text-[#6E7C87]">
            My MISSION PLAN Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Feugiat sit sed at neque. Semper suspendisse diam habitant
            pulvinar arcu, mi.
          </p>
          <p className="w-3/5 mx-auto  text-[#6E7C87]">
            My MISSION PLAN Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Feugiat sit sed at neque. Semper suspendisse diam habitant
            pulvinar arcu, mi.
          </p>
        </div>
      </section>
      <section className="border-[0.0313rem] border-[#f7f7f7]  shadow-md w-full mx-auto text-center mb-10 pb-[1.375rem] pt-[2.625rem]">
        {" "}
        <h2 className="text-primary font-medium text-2xl">
          Measure of Success
        </h2>
        <div className="w-[76%] mx-auto mt-9">
          <MeasureOfSuccessTable
            data={measuresData}
            columns={measureColumns}
            isPresentationView
          />
        </div>{" "}
      </section>
    </div>
  );
};

export default MissionStatement;
