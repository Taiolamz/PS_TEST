import Link from "next/link";
import update from "@/public/svgs/update.svg";
import Image from "next/image";

interface missionHeaderProp {
  title: string;
  link: string;
  index: string;
}

const MissionHeader = ({ title, link, index }: missionHeaderProp) => {
  return (
    <div className="w-full flex justify-between text-sm text-[var(--text-gray)] bg-[var(--primary-light-bg)] p-[10px]">
      <div>
        <h4 className="text-sm font-normal">
          <span>{index}. </span>
          <span>{title}</span>
        </h4>
      </div>
      <Link className="pr-[1rem]" href={link}>
        <Image src={update} alt="edit-icon" />
      </Link>
    </div>
  );
};

export default MissionHeader;
