import { CheckIcon, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

type CustomSelectType = {
  options: Record<string, any>[];
  id?: string | number,
  selected: string;
  label?: string;
  labelClass?: string;
  className?: string;
  disabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  canSearch?: boolean;
  setSelected: (event: any) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  touched?: any;
  error?: any;
};

export default function CustomSelect({
  options,
  selected,
  disabled,
  label,
  id,
  labelClass,
  setSelected,
  onBlur,
  canSearch = true,
  className,
  touched,
  error,
  isRequired,
  placeholder
}: CustomSelectType) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="mt-1">
      {label && (
        <label
          htmlFor={label}
          className={cn("block font-normal text-[.8rem] pb-1 text-[#616161] md:text-[14px]", labelClass)}
        >
          {label}
          {isRequired && <span className="inline-block text-red-400 text-lg pl-1 mt-">*</span>}{" "}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between bg-[#F6F8F9] relative",
              className,
              selected ? "text-[#162238]" : "!text-[#9AA6AC] !font-light",
              error && touched && "border-red-500",
            )}
            ref={buttonRef}
            disabled={disabled}
            onBlur={onBlur}
          >
            {options && options[0]?.label === options[0]?.value
              ? selected
                ? options?.filter(
                    (option) => option?.value?.toString().toLowerCase() === selected?.toString().toLowerCase()
                  )[0]?.label
                : placeholder ? placeholder : "Select..."
              : selected
              ? options?.filter(
                  (option) => option?.label?.toString().toLowerCase() === selected?.toString().toLowerCase()
                )[0]?.label
              : placeholder ? placeholder : "Select..."}
            {/* {
                            selected ? options?.filter((option) => (option?.value?.toString().toLowerCase() || option?.label?.toString().toLowerCase()) === selected?.toString().toLowerCase())[0]?.label : "Select..."
                        } */}
            <ChevronDown className="absolute right-2 ml-2 h-6 w-6 text-[#8F8F8F] shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" style={{ width: `${buttonRef?.current?.offsetWidth}px` }}>
          <Command className="">
            {canSearch && <CommandInput placeholder={`Search`} className="h-9" />}
            <CommandEmpty>No Record Found.</CommandEmpty>
            <CommandGroup className="h-56 overflow-y-auto scroll-hidden" style={{ overflowY: "auto" }}>
              <CommandList>
                {options?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setSelected(currentValue);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <CheckIcon
                      className={cn("ml-auto h-4 w-4", selected === option.value ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <span className={cn("text-xs text-red-500 hidden", error && "block")}>{error && touched && error}</span>
    </div>
  );
}
