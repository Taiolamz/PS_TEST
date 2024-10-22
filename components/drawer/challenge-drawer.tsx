import BadgeComponent from "@/components/badge/BadgeComponents";
import CustomDrawer, { CustomDrawerProp } from "@/components/custom-drawer";
import { PageLoader } from "@/components/custom-loader";
import React from "react";
import { LottieAnimation } from "../fragment";
import { LottieEmptyState } from "@/lottie";

export type CHALLENGES_DATA_TYPE = {
  id: number | string;
  title: string;
  risk_level: string;
  priorityColor: string;
  description: string;
  recommendations: string;
};

interface ChallengeDrawerProp extends CustomDrawerProp {
  id?: string;
  loading?: boolean;
  data: CHALLENGES_DATA_TYPE[];
}

export default function ChallengeDrawer({
  open,
  onClose,
  id,
  loading,
  data,
}: ChallengeDrawerProp) {
  return (
    <CustomDrawer title="Challenges" open={open} onClose={onClose}>
      <div className="sr-only">This is the id to fetch this challenge {id}</div>
      <div className="h-[calc(100vh-66px)] grid overflow-y-auto">
        {loading ? (
          <div className="place-content-center">
            <PageLoader />
          </div>
        ) : data?.length > 0 ? (
          <div className="">
            {data?.map((data) => (
              <div
                className="px-5 pt-5 pb-7 border-b border-[var(--input-border)] h-fit"
                key={data?.id}
              >
                <div className="flex justify-between items-center gap-x-6">
                  <h3 className="text-[var(--footer-link-color)] font-medium text-sm">
                    {data?.title}
                  </h3>
                  <BadgeComponent
                    className="!rounded"
                    text={data?.risk_level}
                    color={valueColor(data?.risk_level)}
                  />
                </div>
                <p className="w-full text-[var(--error-color)] text-xs mt-5">
                  {data?.description}
                </p>
                <p className="w-full text-[var(--text-color4)] text-sm mt-5">
                  Recommendation:{" "}
                  <span className="text-[var(--text-color)]">
                    {data?.recommendations || "---- ----"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden place-content-center text-center">
            <LottieAnimation animationData={LottieEmptyState} height={"8rem"} />
            <p className="text-sm text-[var(--text-color2)]">
              No Challenge Available
            </p>
          </div>
        )}
      </div>
    </CustomDrawer>
  );
}

const valueColor = (text: string): "red" | "yellow" | "green" => {
  if (text?.toLowerCase() === "low") {
    return "green";
  } else if (
    text?.toLowerCase() === "medium" ||
    text?.toLowerCase() === "mid"
  ) {
    return "yellow";
  } else {
    return "red";
  }
};
