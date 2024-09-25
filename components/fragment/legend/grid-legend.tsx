import { cn } from '@/lib/utils';
import React from 'react'

interface GridLegendProps {
    label: string,
    value: number,
    color: "red" | "green" | "yellow" | "blue";
}

const COLORS = {
    red: "#ef4444",
    green: "#22c55e",
    yellow: "#ffdb57",
    blue: "#0452C8",
  };

export default function GridLegend({label, value, color}: GridLegendProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
                <span
                    className={cn(
                        "h-[6px] w-[6px] rounded-[1.06px]"
                    )}
                    style={{ backgroundColor: color }}
                ></span>
                <p className="text-[#6E7C87] text-xs">{label}</p>
            </div>
            <p className={cn(
                "text-sm ml-4"
            )} style={{ color: COLORS[color] }}>
                {value}
            </p>
        </div>
    )
}
