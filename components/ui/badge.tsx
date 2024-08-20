import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        danger: "border-transparent bg-[#FFEFEB] text-[#CC0905]",
        success: "border-transparent bg-[#EBFBEE] text-[#119C2B]",
        purple: "border-transparent bg-[#7E10E51A] text-[#7E10E5]",
        successborder:
          "border-transparent bg-[#EBFBEE] text-[#119C2B] border border-[#119C2B] border-opacity-10",
        pending: "border-transparent bg-[#FFC0431A] text-[#FFC043]",
        pendingborder:
          "border-transparent bg-[#FFC0431A] text-[#FFC043] border border-[#FFC043] border-opacity-10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
