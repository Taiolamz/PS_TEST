import { Badge } from "@/components/ui/badge";
import EditableLabel from "./editable-label";

interface missionProp {
  title: string;
  status?: string;
  comment?: string;
  children: any;
  childWidth?: string;
}

const MissionWrapper = ({
  title,
  status,
  comment,
  children,
  childWidth,
}: missionProp) => {
  return (
    <div className="border rounded-[5px] p-[22px] w-full text-sm  bg-white">
      <div className=" text-[var(--primary-color)] text-sm font-[500]">
        <h4>{title}</h4>
      </div>
      <div className="w-full grid pt-[1rem] grid-flow-col grid-cols-1 items-center">
        <div className={`${childWidth !== undefined ? childWidth : "w-[80%]"}`}>
          {children}
        </div>
        <div className="capitalize grid-cols-2">
          {status !== "" && status !== undefined && (
            <div className="flex  flex-col items-end gap-[10px]">
              <EditableLabel status={status} />

              {status === "rejected" && comment && status !== undefined && (
                <div className="text-xs">
                  <p className="flex gap-2 items-center">
                    <span className="text-[#9AA6AC] text-xs font-normal">
                      View Comments
                    </span>
                    <span className="bg-[#D6130F1A]  text-[#D6130F] p-[3px] px-[6px] rounded-full text-xs">
                      {comment}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionWrapper;
