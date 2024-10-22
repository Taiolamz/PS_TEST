import { cn } from "@/lib/utils";

interface prop {
  children: React.ReactNode;
  className?: string
}
const MissionPlanWrapper = ({ className, children }: prop) => {
  return <div className={cn(
    "flex flex-col gap-[10px] select-none",
    className
  )}>{children}</div>;
};

export default MissionPlanWrapper