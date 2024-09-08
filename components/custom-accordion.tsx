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
