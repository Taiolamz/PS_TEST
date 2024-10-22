import Link from "next/link";
import { Pencil } from "lucide-react";

interface missionHeaderProp {
  title: string;
  link: string;
  index: string;
}

const MissionHeader = ({ title, link, index }: missionHeaderProp) => {
  return (
    <div className="w-full flex justify-between text-sm text-[var(--primary-color)] bg-[var(--primary-accent-color)] p-[10px]">
      <div>
        <h4 className="text-sm font-normal">
          <span>{index} </span>
          <span>{title}</span>
        </h4>
      </div>
      <Link className="pr-[1rem]" href={link}>
        <Pencil size={15} color="var(--primary-color)" />
      </Link>
    </div>
  );
};

export default MissionHeader;
