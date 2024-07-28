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
      <Field
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        rows={rows}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        error={error}
        touched={touched}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
