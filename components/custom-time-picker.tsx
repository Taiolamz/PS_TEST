import { cn } from "@/lib/utils";
import { Calendar } from "iconsax-react";
import { Timer } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/teal.css";

interface CustomTimeInputProps {
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
  showIcon?: boolean;
  iconClass?: string;
}

export default function CustomTimeInput({
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
  showIcon = true,
}: CustomTimeInputProps) {
  // console.log(selected);
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
        onChange={handleChange}
        className={cn( "date-picker", className)}
        disableDayPicker
        format="hh:mm:ss A"
        plugins={[<TimePicker key={id} />]}
      />
      {showIcon && (
        <Timer
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
