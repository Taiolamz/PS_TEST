import BadgeComponent from "@/components/badge/BadgeComponents";
import CustomDrawer, { CustomDrawerProp } from "@/components/custom-drawer";
import { PageLoader } from "@/components/custom-loader";
import React from "react";

interface ChallengeDrawerProp extends CustomDrawerProp {
  id?: string;
  loading?: boolean;
}

export default function ChallengeDrawer({
  open,
  onClose,
  id,
  loading,
}: ChallengeDrawerProp) {
  return (
    <CustomDrawer title="Challenges" open={open} onClose={onClose}>
      <div className="sr-only">This is the id to fetch this challenge {id}</div>
      <div className="h-[calc(100vh-66px)] grid overflow-y-auto">
        {loading ? (
          <div className="place-content-center">
            <PageLoader />
          </div>
        ) : (
          challengesData.map((data) => (
            <div
              className="px-5 pt-5 pb-7 border-b border-[var(--input-border)]"
              key={data?.id}
            >
              <div className="flex justify-between items-center gap-x-6">
                <h3 className="text-[var(--footer-link-color)] font-medium text-sm">
                  {data?.title}
                </h3>
                <BadgeComponent
                  className="!rounded"
                  text={data?.priority}
                  color={data?.priorityColor}
                />
              </div>
              <p className="w-full text-[var(--error-color)] text-xs mt-5">
                {data?.description}
              </p>
              <p className="w-full text-[var(--text-color4)] text-sm mt-5">
                Recommendation:{" "}
                <span className="text-[var(--text-color)]">
                  {data?.recommendation}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </CustomDrawer>
  );
}

const challengesData = [
  {
    id: 1,
    title: "Incomplete Implied Tasks for Q1",
    priority: "High",
    priorityColor: "red", // Can be used to set the background of the status label
    description:
      "Please look through your implied tasks, not complete. I have informed OED to decline it",
    recommendation: "remove user from the team",
  },
  {
    id: 2,
    title: "Incomplete Implied Tasks for Q2",
    priority: "Mid",
    priorityColor: "yellow",
    description: "Please look through your implied tasks, not complete",
    recommendation: "remove user from the team",
  },
  {
    id: 3,
    title: "Incomplete Implied Tasks for Q3",
    priority: "Low",
    priorityColor: "green",
    description: "Please look through your implied tasks, not complete",
    recommendation: "remove user from the team",
  },
  {
    id: 4,
    title: "Incomplete Implied Tasks for Q4",
    priority: "High",
    priorityColor: "red",
    description: "Please look through your implied tasks, not complete",
    recommendation: "remove user from the team",
  },
];
