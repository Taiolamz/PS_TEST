import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Prop {
  className?: string;
  triggerClass?: string;
  contentWrapperClass?: string;
  headerClassName?: string;
  contentClass?: string;
  title: ReactNode | string;
  content: ReactNode | string;
  type?: "single" | "multiple";
  defaultValue?: any;
}

export function CustomAccordion({
  className,
  title,
  content,
  triggerClass,
  contentClass,
  contentWrapperClass,
  type,
  defaultValue,
  headerClassName,
}: Prop) {
  return (
    <Accordion
      type={type || "single"}
      collapsible
      className={(cn("w-full"), className)}
      defaultValue={defaultValue}
    >
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger
          className={cn("border-b-0 hover:no-underline", triggerClass)}
          headerClassName={headerClassName}
        >
          {title}
        </AccordionTrigger>
        <AccordionContent
          className={cn("", contentClass)}
          contentWrapperClass={contentWrapperClass}
        >
          {content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
