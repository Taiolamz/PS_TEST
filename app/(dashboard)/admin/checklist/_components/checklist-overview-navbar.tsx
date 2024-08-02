import { CircleArrowLeft } from "@/public/assets/icons";
import routesPath from "@/utils/routes";
import Link from "next/link";

const { ADMIN } = routesPath

const ChecklistOverviewNavbar = () => {
  return (
    <div className="bg-custom-gray-scale-white w-full h-[47px] p-3 pl-10 cursor-pointer sticky z-50 top-0">
      <Link href={ADMIN.OVERVIEW} className="flex group gap-2 items-center">
        <CircleArrowLeft className="group-hover:-translate-x-[2px] transition-all duration-300" />
        <p className="text-primary font-light text-sm">Skip to Dashboard</p>
      </Link>
    </div>
  );
};

export default ChecklistOverviewNavbar;
