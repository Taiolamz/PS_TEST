import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

interface CustomCheckboxProps {
    id: string,
    label?: string, 
    labelClass?: string, 
    className?: string, 
    isChecked: boolean,
    handleClick: () => void
}

const CustomCheckbox = ({className, id, isChecked, handleClick, label, labelClass}: CustomCheckboxProps) => {
    return (
        <div className={cn(
            "flex items-center gap-2",
            className
        )}
            onClick={handleClick}
        >
            <Checkbox
                id={id}
                checked={isChecked}
                onCheckedChange={handleClick}
            />
            <span className={cn(
                labelClass
            )}>{label}</span>
        </div>
    );
}

export default CustomCheckbox;
