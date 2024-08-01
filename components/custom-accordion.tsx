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
  title: ReactNode | string;
  content: ReactNode | string;
}

export function CustomAccordion({ className, title, content }: Prop) {
  return (
    <Accordion type="single" collapsible className={(cn("w-full"), className)}>
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className={cn("border-b-0 hover:no-underline")}>
          {title}
        </AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
