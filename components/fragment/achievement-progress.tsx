import React from "react";
import ReusableProgress from "./progress/reusable-progress";
import { cn } from "@/lib/utils";

/*
    ========= Usage ============== 
  <AchievementProgress
        title="Revenue"
        progress_value={65}
        color="yellow"
        target="1,000,000,000,000 $"
        targetColor="#6B51DF"
    />
    <AchievementProgress
        title="Platinum Customer Acquisition"
        progress_value={40}
        color="red"
        target="15"
        targetColor="#6B51DF"
    /> 
*/

interface AchievementProgressProps {
  title: string | React.ReactNode;
  progress_value: number;
  color: "red" | "green" | "yellow" | "purple" | "brown" | "default" | "base";
  target?: string;
  targetColor?: string;
  titleClassName?: string;
  barClassName?: string;
  targetClassName?: string;
}

const AchievementProgress = ({
  title,
  progress_value,
  color,
  target,
  targetColor,
  titleClassName,
  barClassName,
  targetClassName,
}: AchievementProgressProps) => {
  return (
    <div>
      <span className={cn("text-[#5A5B5F] text-sm", titleClassName)}>
        {title}
      </span>
      <ReusableProgress
        value={progress_value}
        color={color}
        valuePosition="float-right"
        borderRadius={2}
        height={16}
        hasBackground={false}
        className={barClassName}
      />
      <div
        className={cn(
          "mt-1 bg-[#FCF0FF] text-[10px] font-semibold",
          targetClassName
        )}
        style={{
          color: targetColor,
        }}
      >
        {target}
      </div>
    </div>
  );
};

export default AchievementProgress;
