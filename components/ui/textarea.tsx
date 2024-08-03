import * as React from "react";

import { cn } from "@/lib/utils";
import { Field } from "formik";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  labelClass?: string;
  isRequired?: boolean;
  id: string;
  name: string;
  value?: string;
  handleBlur?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  touched?: boolean;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      labelClass,
      id,
      name,
      isRequired,
      onChange,
      error,
      value,
      touched,
      handleBlur,
      rows,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={label}
            className={cn(
              "block text-xs text-[#6E7C87] font-normal pb-2",
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
        <Field
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          rows={rows}
          as="textarea"
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          error={error}
          touched={touched}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
