import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

interface CustomCheckboxProps {
  id: string;
  label?: string;
  labelClass?: string;
  className?: string;
  name?: string;
  isChecked: boolean;
  handleClick: any;
  itemId?: number;
}

const CustomCheckbox = ({
  className,
  id,
  isChecked,
  handleClick,
  label,
  labelClass,
  name,
  itemId,
}: CustomCheckboxProps) => {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      onClick={handleClick}
    >
      <Checkbox
        name={name}
        id={id}
        checked={isChecked}
        onCheckedChange={() => handleClick(itemId, name)}
      />
      <span className={cn(labelClass)}>{label}</span>
    </div>
  );
};

export default CustomCheckbox;
