interface missionItems {
  item: string;
}
interface dataProp {
  data: any;
}

const MissionSingleItem = ({ data }: dataProp) => {
  return (
    <div className="w-full">
      {data?.map(({ item }: missionItems, index: string) => {
        return (
          <div key={index} className="text-[var(--text-secondary)] text-sm">
            <div className="gap-[5px] flex flex-col pt-[5px]">
              <div className="pl-[1rem] leading-relaxed " key={index}>
                <p className="flex gap-[5px] leading-relaxed text-sm">
                  <span className="font-[400]">-</span>
                  <span className="font-[300] capitalize">{item}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MissionSingleItem;
