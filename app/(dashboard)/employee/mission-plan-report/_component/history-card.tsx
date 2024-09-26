interface HistoryCardProps {
  month: string;
  status: string;
  title: string;
  percentage: string;
  target: string;
  achievement: string;
}

const HistoryCard = ({
  month,
  status,
  title,
  percentage,
  target,
  achievement,
}: HistoryCardProps) => {
  return (
    <div className="border border-[#E5E9EB] rounded-[5px] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-x-2">
          <p className="#252C32 font-medium text-sm">{month}</p>
          <p className="text-[#07A287] text-[8px]">{status}</p>
        </div>
        <p className="text-[#EC1410] font-medium">{percentage}</p>
      </div>
      <div>
        <p className="mb-3 text-[#9AA6AC] text-xs">{title}</p>
        <div className="flex items-center justify-between">
          <p className="text-[#6E7C87] text-xs font-bold">{target}</p>
          <p className="text-[#008080] text-xs font-bold"> {achievement}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
