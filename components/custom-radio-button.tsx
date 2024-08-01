import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface RadioGroupOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  defaultValue?: string;
  options: RadioGroupOption[];
  className?: string;
//   value: string;
  //   onChange: (value: any) => void;
}

export function CustomRadioButton({
  defaultValue,
  options,
  className,
//   value,
}: //   onChange,
RadioGroupProps) {
  return (
    <RadioGroup defaultValue={defaultValue}>
      <div className="flex flex-col space-y-5">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label
              htmlFor={option.value}
              className={
                (cn("text-custom-secondary cursor-pointer font-light text-sm"),
                className)
              }
            >
              {option.label}
            </Label>
          </div>
        ))}
        
      </div>
    </RadioGroup>
  );
}
