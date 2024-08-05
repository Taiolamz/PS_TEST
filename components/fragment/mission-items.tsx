interface missionItems {
  title: string;
  description: [
    {
      key: string;
      value: string;
    }
  ];
}
interface dataProp {
  data: any;
}

const MissionItems = ({ data }: dataProp) => {
  return (
    <div className="w-full">
      {data?.map(({ title, description }: missionItems, index: string) => {
        return (
          <div key={index} className="text-[var(--text-secondary)] text-sm">
            <div className="text-sm font-normal leading-relaxed">
              <h4>- {title}</h4>
            </div>
            <div className="gap-[5px] flex flex-col pt-[5px]">
              {description !== undefined &&
                description.map(({ key, value }, index) => {
                  return (
                    <div
                      className="pl-[1rem] leading-relaxed "
                      key={index}
                    >
                      <p className="flex gap-[5px] leading-relaxed">
                        <span className="text-sm font-[400]">
                          {key}
                          {index + 1 !== description.length ? (
                            <span> : </span>
                          ) : (
                            ""
                          )}
                        </span>
                        <span className="font-[300]">{value}</span>
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MissionItems;
