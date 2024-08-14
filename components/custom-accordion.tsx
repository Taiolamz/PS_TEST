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
  onAccordionChange?: () => void;
  collapsible?: boolean;
}

export function CustomAccordion({
  className,
  title,
  content,
  triggerClass,
  contentClass,
  contentWrapperClass,
  collapsible,
  onAccordionChange,
}: Prop) {
  return (
    <Accordion
      type="single"
      defaultValue="khk"
      collapsible={collapsible}
      onValueChange={onAccordionChange}
      className={(cn("w-full"), className)}
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
