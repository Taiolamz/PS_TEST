import { cn } from "@/lib/utils";
import { Calendar } from "iconsax-react";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/teal.css";

interface CustomDateInputProps {
  label?: string;
  id: string;
  name?: string;
  labelClass?: string;
  className?: string;
  onOpenPickNewDate?: boolean;
  isRequired?: boolean;
  handleChange: (arg: any) => void;
  selected?: Date;
  error: string;
  touched?: boolean;
  disabled?: boolean;
  showIcon?: boolean;
  iconClass?: string;
}

export default function CustomDateInput({
  label,
  id,
  name,
  className,
  labelClass,
  iconClass,
  onOpenPickNewDate = false,
  isRequired,
  handleChange,
  selected,
  error,
  touched,
  disabled,
  showIcon = true,
}: CustomDateInputProps) {
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={label}
          className={cn(
            "block text-xs text-[#6E7C87] font-normal pb-1",
            labelClass
          )}
        >
          {" "}
          {label}
          {isRequired && (
            <span className="inline-block text-red-400 text-lg pl-1 mt-">
              *
            </span>
          )}{" "}
        </label>
      )}
      <DatePicker
        id={id}
        name={name}
        placeholder="MM/DD/YY"
        inputClass={cn(
          "border rounded-[4px] bg-[#F6F8F9] px-3 py-[7px] text-[.85rem] w-full focus:outline-none",
          error && touched && "border-red-500"
        )}
        containerClassName="w-full"
        onOpenPickNewDate={onOpenPickNewDate}
        onChange={handleChange}
        value={selected}
        className={cn("teal", className)}
        disabled={disabled}
      />
      {showIcon && (
        <Calendar
          size={16}
          className={cn("absolute right-3 top-8 text-isGray400", iconClass)}
        />
      )}
      <span className={cn("text-xs text-red-500 hidden", error && "block")}>
        {error && touched && error}
      </span>
    </div>
  );
}
