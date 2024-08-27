"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import MissionStatement from "./_steps/mission-statement";
import { presentationSteps } from "../../_data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Boundaries from "./_steps/boundaries";
import Tasks from "./_steps/tasks";
import StrategicIntent from "./_steps/strategic-intent";
import MissionPlanApprovablesType from "@/@types/missionPlan/MissionPlanAprovables";

type Props = {
  data?: MissionPlanApprovablesType;
  loading: boolean;
  name: string;
};

const PresentationView = ({ data, loading, name }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = usePathname();
  const ui = searchParams.get("ui");

  const getCurrentStep = () => {
    const step = Number(searchParams.get("step"));
    return step;
  };

  const nextView = () => {
    getCurrentStep() < presentationSteps.length + 1 &&
      router.push(`${location}?ui=${ui}&step=${getCurrentStep() + 1}`);
  };

  const previousView = () => {
    getCurrentStep() > 1 &&
      router.push(`${location}?ui=${ui}&step=${getCurrentStep() - 1}`);
  };

  return (
    <div className="py-6 pl-[1.625rem] pr-14 bg-white">
      <div className="flex justify-between mb-7">
        <div className="flex items-center gap-[0.5625rem]">
          <h1 className="font-semibold text-lg text-[#3E4345] capitalize">
            {name} Mission Plan
          </h1>
        </div>
        <Button
          variant="outline"
          className="text-primary hover:text-primary border-primary"
        >
          <Link href={`${location}`}>Close</Link>
        </Button>
      </div>

      {getCurrentStep() === 1 && (
        <MissionStatement data={data} isLoading={loading} />
      )}
      {getCurrentStep() === 2 && (
        <StrategicIntent
          data={data?.strategic_intents ?? []}
          isLoading={loading}
        />
      )}
      {getCurrentStep() === 3 && (
        <Tasks data={data?.specified_tasks ?? []} isLoading={loading} />
      )}
      {getCurrentStep() === 4 && (
        <Boundaries data={data?.boundaries ?? []} isLoading={loading} />
      )}
      <div className="flex justify-start items-center gap-[1.625rem] mt-8">
        {getCurrentStep() > 1 && (
          <Button
            type="button"
            onClick={previousView}
            variant="outline"
            className="text-primary hover:text-primary border-primary"
          >
            Back
          </Button>
        )}
        <Button
          type="button"
          onClick={nextView}
          className={`${
            getCurrentStep() >= presentationSteps.length &&
            "bg-[#F6F8F9] text-[#9AA6AC] border-[#E5E9EB] border-[0.0313rem]"
          }`}
          disabled={getCurrentStep() >= presentationSteps.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PresentationView;
