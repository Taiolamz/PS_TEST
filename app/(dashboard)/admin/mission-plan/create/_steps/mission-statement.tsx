import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const MissionStatement = () => {
  const router = useRouter();
  const location = usePathname();
  return (
    <div className="w-full ">
      {/* Mission and Vision */}
      <div className="mb-8">
        <div className="flex items-center gap-x-2 mb-6">
          <h1 className="text-[#3E4345]">Mission statement</h1>
          <span>
            <BsFillInfoCircleFill color="#84919A" />
          </span>
        </div>
        <div className="w-full flex-1">
          <label
            htmlFor="missionstatement"
            className=" text-xs text-[#6E7C87] font-normal pb-2"
          >
            Set Mission Statement
          </label>
          <textarea
            rows={3}
            id="missionstatement"
            name="missionstatement"
            placeholder="Input Staff Name"
            className="mt-1 md:min-w-[500px] block px-3 py-2 border border-gray-300 bg-[var(--input-bg)] rounded-md shadow-sm sm:text-sm"
            value=""
          />
        </div>
      </div>

      <div className="mt-8 flex gap-x-2 items-center">
        <Button
          variant="outline"
          onClick={() => router.push(`${location}?ui=overview`)}
          className={`text-primary py-5 px-2 rounded-sm bg-transparent border border-primary min-w-28`}
        >
          Back
        </Button>
        <Button
          type="submit"
          //   disabled={isLoadingStrategicIntent}
          //   loading={isLoadingStrategicIntent}
          onClick={() => router.push(`${location}?ui=measure-success`)}
          loadingText="Save & Continue"
          className={cn(
            "w-full",
            // !formik.isValid || isLoadingStrategicIntent
            //   ? "opacity-50 cursor-not-allowed w-max"
            //   :
            "cursor-pointer text-white py-5 px-2 rounded-sm bg-primary border border-primary w-max"
          )}
          // className={`text-white py-5 px-2 rounded-sm bg-primary border border-primary min-w-28`}
        >
          Save & Continue
        </Button>
      </div>
    </div>
  );
};

export default MissionStatement;
