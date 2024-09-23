"use client"

import { cn } from "@/lib/utils";


/*
    ========= Usage ============== 
   <ReusableProgress
        value={40}
        color="yellow"
        height={16}
        valuePosition="float-left"
    />
    <ReusableProgress
        value={65}
        color="yellow"
        height={10}
        borderRadius={10}
        valuePosition="left"
        width={10}
    />
    <ReusableProgress
        value={80}
        color="purple"
        height={5}
    />
*/


type POSITION_TYPE = 'left' | 'right' | 'float-left' | 'float-right'

interface ReusableProgressProps {
    className?: string,
    value: number,
    bgColor?: string,
    hasBackground?: boolean,
    width?: number,
    height?: number,
    borderRadius?: number,
    color?: 'red' | 'green' | 'yellow' | 'purple' | 'brown' | 'default',
    valueClass?: string,
    valueColor?: string,
    valuePosition?: POSITION_TYPE
}

const COLORS = {
    red: '#EC1410CC',
    green: '#07A287',
    yellow: '#FFC043E5',
    purple: '#7E10E5',
    brown: '#835101CC',
    blue: '#0452C8',
    default: '#6E7C87',
}

const ReusableProgress = ({ className, hasBackground = true, value, height, borderRadius, color, valueClass, valuePosition, width, valueColor }: ReusableProgressProps) => {

    const VALUE_COLOR = valueColor ? valueColor : color ? COLORS[color] : COLORS.default

    const ValueLabel = ({ position }: { position: POSITION_TYPE }) => {

        return position === "left" || position === "right" ? (
            <span className={cn(
                "w-fit text-sm"
            )} style={{
                color: VALUE_COLOR,
            }}>{value}%</span>
        ) :
            <span className={cn(
                "w-full text-sm",
            )} style={{
                color: position === "float-left" ? 'white' : VALUE_COLOR,
                position: "absolute",
                left: position === "float-left" ? `${Number(value) - 3}%` : `${Number(value) + 1}%`
            }}>{value}%</span>
    }

    return (
        <div className={cn(
            "relative flex items-center gap-1"
        )} style={{
            width: `${width}rem`
        }}>
            {valuePosition === "left" && <ValueLabel position="left" />}
            <div
                className={cn(
                    "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
                    className,
                    hasBackground ? "bg-secondary" : "bg-transparent"
                )}
                style={{
                    height,
                    borderRadius: `${borderRadius}px`,
                }}
            >
                <div
                    className={cn(
                        "h-full w-full flex-1 transition-all bg-primary",

                    )}
                    style={{
                        transform: `translateX(-${100 - (value || 0)}%)`,
                        background: color ? COLORS[color] : COLORS.default
                    }}
                >

                </div>
            </div>
            {valuePosition === "float-left" && <ValueLabel position="float-left" />}
            {valuePosition === "float-right" && <ValueLabel position="float-right" />}

            {valuePosition === "right" && <ValueLabel position="right" />}
        </div>
    );
}

export default ReusableProgress;


export { ReusableProgress };

