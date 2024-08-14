import { formatBehaviours } from "@/utils/helpers";

interface missionItems {
  title: string;
  description: [
    {
      key: string;
      value: string;
    }
  ];
  impliedTask?: [];
}
interface dataProp {
  data: any;
  lastColumn?: boolean;
  index?: number;
}

const SpecifiedMission = ({ data, lastColumn, index }: dataProp) => {
  const { title, description }: missionItems = data;
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <div key={index} className="text-[var(--text-secondary)] text-sm">
        {title !== null && title !== undefined && (
          <div className="text-sm font-normal leading-relaxed capitalize">
            <h4>- {title}</h4>
          </div>
        )}
        <div className="gap-[5px] flex flex-col pt-[5px]">
          {description !== undefined &&
            description.map(({ key, value }, index) => {
              return (
                <div className="pl-[1rem] leading-relaxed " key={index}>
                  <p className="flex gap-[5px] leading-relaxed text-sm">
                    <span className="font-[400] capitalize">
                      {key}
                      {lastColumn === true ? (
                        <span> : </span>
                      ) : index + 1 !== description.length ? (
                        <span> : </span>
                      ) : (
                        ""
                      )}
                    </span>
                    <span className="font-[300]">
                      {formatBehaviours(value)}
                    </span>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SpecifiedMission;
