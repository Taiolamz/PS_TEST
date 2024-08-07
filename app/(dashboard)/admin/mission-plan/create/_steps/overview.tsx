import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import routesPath from "@/utils/routes";
import { useAppSelector } from "@/redux/store";
import { Dictionary } from '@/@types/dictionary';
import { Textarea } from "@/components/ui/textarea";

const { ADMIN } = routesPath

const MissionPlanOverview = () => {
  const { active_fy_info } = useAppSelector((state) => state?.mission_plan?.mission_plan)

  const router = useRouter();
  const location = usePathname();

  return (
    <div className="w-full ">
      {/* Financial Year Overview */}
      <div className="">
        <div className="flex items-center gap-x-2 mb-8">
          <h1 className="text-[#3E4345]">Financial Year</h1>
          <span>
            <BsFillInfoCircleFill color="#84919A" />
          </span>
        </div>
        <div className="grid gap-y-3 items-center space-x-2 relative">
          <div className="max-w-5xl flex flex-col md:flex-row gap-x-3 gap-y-5 justify-between mb-8 items-start relative">
            <div className="w-full min-w-[290px] flex-1">
              <Input
                readOnly
                type="text"
                id="title"
                name=""
                label="Title"
                placeholder="Input Staff Name"
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-white"
                value={active_fy_info?.title}
              />
            </div>
            <div className="w-full max-w-[200px]">
              <Input
                readOnly
                type="text"
                id="start_period"
                name=""
                label="Start Period"
                placeholder="Input Staff Name"
                className="px-3 py-2 border disabled:border-gray-300 rounded-md shadow-sm sm:text-sm bg-white"
                value={active_fy_info?.start_date}
              />
            </div>
            <div className="w-full max-w-[200px]">
              <Input
                readOnly
                type="text"
                id="end_period"
                name=""
                label="End Period"
                placeholder="Input Staff Name"
                className="px-3 py-2 border disabled:border-gray-300 rounded-md shadow-sm sm:text-sm bg-white"
                value={active_fy_info?.end_date}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mission and Vision */}
      <div className="mb-8">
        <div className="flex items-center gap-x-2 mb-6">
          <h1 className="text-[#3E4345]">Mission and Vision</h1>
          <span>
            <BsFillInfoCircleFill color="#84919A" />
          </span>
        </div>
        <div className="grid gap-y-3 items-center space-x-2 relative">
          <div className="max-w-5xl space-y-5">
            <div className="w-full flex-1">
              <h3 className="text-sm text-[var(--text-color4)] font-normal">
                1. Company Vision
              </h3>
              <Textarea
                readOnly
                rows={3}
                id="title"
                name=""
                placeholder="Input Staff Name"
                className="mt-1.5 w-4/5 block px-3 py-2 border disabled:border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
                value={active_fy_info?.vision}
              />
            </div>
            <div className="w-full flex-1">
              <h3 className="text-sm text-[var(--text-color4)] font-normal">
                2. Company Mission
              </h3>
              <Textarea
                readOnly
                rows={3}
                id="title"
                name=""
                placeholder="Input Staff Name"
                className="mt-1.5 w-4/5 block px-3 py-2 border disabled:border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
                value={active_fy_info?.mission}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Strategic Pillar */}
      <div className="w-3/5">
        <div className="flex items-center gap-x-2 mb-6">
          <h1 className="text-[#3E4345]">Strategic Pillars</h1>
          <span>
            <BsFillInfoCircleFill color="#84919A" />
          </span>
        </div>
        <div className="space-y-7 items-center">
          {
            active_fy_info?.strategic_pillars?.map((item: Dictionary, idx: number) => (
              <div key={idx}>
                <Input
                  readOnly
                  type="text"
                  id="Pillar_one"
                  name=""
                  label={`Pillar ${idx + 1}`}
                  className="mt-1 block px-3 py-2 border disabled:border-gray-300 bg-white rounded-md shadow-sm sm:text-sm read"
                  value={item?.title}
                />
              </div>
            ))
          }
        </div>
      </div>
      <div className="mt-8 mb-4 flex gap-x-2 items-center">
        <Button
          onClick={() => router.push(`${ADMIN.CREATE_MISSION_PLAN}?ui=mission-statement`)}
          className={`bg-[var(--primary-color)] py-5 px-2 rounded-sm border text-white min-w-28`}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MissionPlanOverview;
