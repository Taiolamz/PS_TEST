import { MissionItems, MissionWrapper } from "@/components/fragment";
import React from "react";
import MeasureOfSuccessTable from "../../_components/measure-of-success-table";
import {
  measureColumns,
  measuresData,
} from "@/utils/data/dashboard/missionplan/dummy";
import {
  constraints,
  freedom,
  impliedTask,
  specificTask,
  strategicIntent,
} from "@/utils/data/mission-plan-template";

const Preview = () => {
  return (
    <div className="flex flex-col gap-[12px]">
      <MissionWrapper title="Mission Statement" status="approved" comment="2">
        <p className="leading-relaxed  text-sm">
          My MISSION PLAN Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Feugiat sit sed at neque. Semper suspendisse diam habitant
          pulvinar arcu, mi.
        </p>
      </MissionWrapper>

      <MissionWrapper title="Measure of Success" status="approved" comment="2">
        <MeasureOfSuccessTable data={measuresData} columns={measureColumns} />
      </MissionWrapper>
      <MissionWrapper title="Strategic Intent" status="approved">
        <MissionItems data={strategicIntent} />
      </MissionWrapper>
      <MissionWrapper title="Specified Task 1" status="approved">
        <MissionItems data={specificTask} />
      </MissionWrapper>
      <MissionWrapper title="Implied Task 1" status="approved">
        <MissionItems data={impliedTask} />
      </MissionWrapper>
      <MissionWrapper title="Freedom" status="approved">
        <div className="flex flex-col gap-[1rem]">
          <MissionItems data={freedom} />
          <div>
            <div className="text-[var(--primary-color)] font-[500] leading-relaxed pb-[11px]">
              <h4>Constraints</h4>
            </div>
            <MissionItems data={constraints} />
          </div>
        </div>
      </MissionWrapper>
    </div>
  );
};

export default Preview;
