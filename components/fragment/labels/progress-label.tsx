import { convertStringToNumber, getProgressColorByValue } from "@/utils/helpers";

interface ReusableProgressLabelProps {
    value: number;
    title?: string
}
export default function ReusableProgressLabel({ value, title }: ReusableProgressLabelProps) {
    return (
        <div className="flex gap-2 items-center">
            <span
                style={{
                    color: getProgressColorByValue(value),
                }}
                className="text-[#EC1410] font-bold text-2xl"
            >
                {`${value}%`}
            </span>
            {title && <span className="text-[#6E7C87] font-bold text-sm">
                {title}
            </span>}
        </div>
    )
}
