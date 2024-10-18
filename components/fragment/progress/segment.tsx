import { Dictionary } from "@/@types/dictionary";
import React from "react";

/*
    ========= Usage ============== 
  <ReusableSegmentProgress
        value={50}
        segments={[
        { percentage: 10, color: "#00a699" },
        { percentage: 10, color: "#6a00ff" }, 
        { percentage: 80, color: "#0052cc" }, 
        ]}
        height={10}
        borderRadius={2}
    />
*/

type ReusableSegmentProgressProps = {
    value: number;
    segments: { percentage?: number; color?: string }[];
    width?: number,
    height?: number,
    borderRadius?: number,
};

const ReusableSegmentProgress = ({ value, segments, width, height, borderRadius }: ReusableSegmentProgressProps) => {
    const totalProgress = value;

    return (
        <div className="relative flex h-5 w-full bg-secondary rounded-full overflow-hidden"
            style={{
                width: `${width}rem`,
                height,
                borderRadius: `${borderRadius}px`,
            }}
        >
            {segments.map((segment: Dictionary, index: number) => {
                const segmentWidth = (segment.percentage / 100) * totalProgress;

                return (
                    <div
                        key={index}
                        className="h-full"
                        style={{
                            backgroundColor: segment.color,
                            width: `${segmentWidth}%`,
                            height,
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

export default ReusableSegmentProgress;
