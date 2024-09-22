import { cn } from "@/lib/utils";


/*
    ========= Usage ============== 
    <Legend title="Target" color="yellow" />
    <Legend
        title="Completed"
        color="green"
        value={<ReusableLabel value="24" />}
        barWidth={20}
        barHeight={4}
    />
*/

interface LegendProps {
    title: string,
    color: 'red' | 'green' | 'yellow' | 'purple' | 'brown' | 'default',
    titleColor?: string | 'default',
    titleClass?: string,
    barClass?: string,
    barWidth?: number,
    barHeight?: number,
    value?: string | React.ReactNode
}

const COLORS = {
    red: '#ef4444',
    green: '#22c55e',
    yellow: '#eab308',
    purple: '#a855f7',
    brown: '#835101CC',
    default: '#6b7280',
}

const Legend = ({ title, color, titleColor, titleClass, barClass, barHeight, barWidth, value }: LegendProps) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                <span className={cn(
                    "w-8 h-1.5 rounded-[1px]",
                    barClass
                )} style={{
                    background: COLORS[color],
                    width: barWidth,
                    height: barHeight,
                }}></span>
                <span className={cn(
                    "text-gray-500 text-sm",
                    titleClass
                )} style={{
                    color: titleColor === "default" ? "#6E7C87" : titleColor || COLORS[color]
                }}>{title}</span>
                {value && value}
            </div>
        </div>
    );
}

export default Legend;
