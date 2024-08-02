// import { DashboardLayout } from "./_components/dashboard-layout";
import routesPath from "@/utils/routes";
import Link from "next/link";
import DashboardLayout from "../../_layout/DashboardLayout";

const { ADMIN } = routesPath

const OverView = () => {
  return (
    <DashboardLayout headerTitle="Admin Overview">
      <Link
        href={ADMIN.CHECKLIST}
        className=" text-primary font-semibold text-sm"
        >
        <p className="p-4 font-semibold underline bg-[#FFFCC2]">
          Setup Checklist...
        </p>
      </Link>
      </DashboardLayout>
  );
};

export default OverView;
