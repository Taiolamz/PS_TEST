import { StrategicIntentType } from "@/@types/missionPlan/MissionPlanAprovables";
import { Loader2 } from "lucide-react";
import { EditableLabel } from "@/components/fragment";

type Props = {
  data: StrategicIntentType[];
  loading: boolean;
  setDrawerUserId: (e: string) => void;
  setOpenDrawer: (e: boolean) => void;
};

const SingleStrategicIntent = ({
  data,
  loading,
  setOpenDrawer,
  setDrawerUserId,
}: Props) => {

  return (
    <div className="flex flex-col gap-5 ">
      {loading && (
        <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] text-sm text-[#162238] bg-white">
          <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
            Strategic Intent
          </h2>

          <div className="w-full flex justify-center items-center">
            <Loader2 className="w-6 h-6 animate-spin mr-1" />
          </div>
        </div>
      )}
      {!loading &&
        data?.length !== 0 &&
        data?.map((item, index) => (
          <section
            key={item?.id}
            className="flex w-full justify-between rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] text-sm text-[#162238] bg-white"
          >
            <div>
              <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                Strategic Intent
              </h2>
              <div className="mt-2.5 ml-1.5">
                <h3 className="font-normal">- Strategic Intent {index + 1}</h3>
                <div className="flex justify-between items-end">
                  <div className="ml-3">
                    <p className="mt-2 font-light">
                      <span className="font-normal">Intent:</span>{" "}
                      {item?.intent}
                    </p>
                    <p className="mt-1 font-light">
                      <span className="font-normal">Behaviors: </span>
                      {item?.behaviours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex gap-2.5 ml-[40px] items-center justify-end"
              key={index}
            >
              {item?.status !== "" && item?.status !== undefined && (
                <div className="flex items-end gap-[20px]">
                  {item?.status === "rejected" &&
                    item?.approval_comment_count &&
                    item?.status !== undefined && (
                      <div className="text-xs cursor-pointer ">
                        <p className="flex gap-2 items-center">
                          <span
                            className="text-[#9AA6AC] text-xs font-normal hover:underline"
                            onClick={() => {
                              setDrawerUserId(item?.id);
                              setOpenDrawer(true);
                            }}
                          >
                            View Comments
                          </span>
                          <span className="bg-[#D6130F1A]  text-[#D6130F] p-[3px] px-[6px] rounded-full text-xs">
                            {item?.approval_comment_count}
                          </span>
                        </p>
                      </div>
                    )}
                  <EditableLabel status={item?.status} />
                </div>
              )}
            </div>
          </section>
        ))}
      {!loading && data?.length === 0 && (
        <>
          <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] text-sm text-[#162238] bg-white">
            <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
              Strategic Intent
            </h2>
            <div className="mt-2.5 ml-1.5">
              <h3 className="font-normal">No Strategic Intent Found</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleStrategicIntent;
