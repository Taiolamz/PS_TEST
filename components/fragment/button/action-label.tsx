import { cn } from "@/lib/utils"

interface ActionLabel {
    icon?: string | React.ReactNode,
    iconPosition?: 'left' | 'right',
    className?: string,
    label?: string,
    labelClass?: string,
    onClick?: () => void,
}

export default function ActionLabel({ icon, className, label, labelClass, onClick, iconPosition = 'left' }: ActionLabel) {
    return (
        <div className={cn(
            "flex gap-2 items-center cursor-pointer",
            className
        )}
            onClick={onClick}
        >
            {iconPosition === 'left' && icon && icon}
            {label && <span className={cn(
                "text-[#1E1E1E] font-medium text-[14px]",
                labelClass
            )}>{label}</span>}
            {iconPosition === 'right' && icon && icon}
        </div>
    )
}
