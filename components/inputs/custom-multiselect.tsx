import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoSquareOutline, IoCheckbox } from "react-icons/io5";

import { ErrorMessage } from "formik";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../ui/Multiselect";

type CustomSelectType = {
  values: any[];
  onValuesChange: (value: any) => void;
  loop?: boolean;
  options: any[];
  label: string;
  labelClass: string;
  error?: boolean;
  touched?: boolean;
  onBlur: (event: any) => void;
  triggerClass: string;
  placeholder: string;
  inputClass: string;
  errorClass: string;
  itemValue?: any;
  key?: any;
  itemLabel?: string;
  name: any;
};

export default function CustomMultiSelect({
  values,
  onValuesChange,
  loop = false,
  options,
  label,
  labelClass,
  onBlur,
  triggerClass,
  placeholder,
  inputClass,
  errorClass,
  name,
  error,
  touched,
}: CustomSelectType) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleClickOutside = (event: { target: any }) => {
    if (divRef.current && !divRef.current?.contains(event.target as Node)) {
      handleBlur();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <label htmlFor="label" className={cn(labelClass)}>
        {label}
      </label>
      <MultiSelector
        values={values}
        onValuesChange={onValuesChange}
        loop={false}
        options={options}
        onBlur={onBlur}
      >
        <MultiSelectorTrigger
          ref={divRef}
          onFocus={handleFocus}
          tabIndex={0}
          className={cn(
            triggerClass,
            isFocused && "border-[var(--primary-color)]",
            error &&
              touched &&
              "border-red-500 focus-visible:ring-transparent focus-visible:ring-0"
          )}
        >
          <MultiSelectorInput
            placeholder={placeholder}
            className={cn(inputClass)}
          />
        </MultiSelectorTrigger>
        <MultiSelectorContent>
          <MultiSelectorList>
            {options.map((option) => (
              <MultiSelectorItem
                value={option?.value}
                key={option.value}
                option={option}
                checkedIcon={
                  <IoCheckbox
                    color="#008080"
                    size={18}
                    style={{ color: "var(--primary-color)" }}
                  />
                }
                notCheckedIcon={<IoSquareOutline color="#e0e4e6" size={17} />}
              >
                {option.label}
              </MultiSelectorItem>
            ))}
          </MultiSelectorList>
        </MultiSelectorContent>
      </MultiSelector>

      <ErrorMessage name={name} className={cn(errorClass)} component={"div"} />
    </div>
  );
}
