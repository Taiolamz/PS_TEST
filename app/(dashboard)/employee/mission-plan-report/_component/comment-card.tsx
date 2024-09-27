import Image from "next/image";

interface HistoryCardProps {
  name: string;
  date: string;
  comment: string;
  img: string;
}

const CommentCard = ({ name, date, comment, img }: HistoryCardProps) => {
  return (
    <div className="bg-[#F6F8F9] border border-[#E5E9EB] rounded-[5px] px-4 py-3">
      <div className="flex items-center gap-x-2 mb-[5px]">
        <Image src={img} alt="avatar" />
        <div className="grid gap-y-1">
          <p className="text-[#252C32] font-medium text-sm">{name}</p>
          <p className="text-[#6E7C87] font-light text-[10px]">{date}</p>
        </div>
      </div>
      <p className="text-[#5B6871] text-sm">{comment}</p>
    </div>
  );
};

export default CommentCard;
