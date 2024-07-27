import React from 'react';
import { DashboardLayout } from './_components/DashboardLayout';
import Link from 'next/link';
import Routes from '@/app/_Routes/routes';

const Dashboard = () => {
    return (
      <DashboardLayout>
        <Link
          href={Routes.ChecklistRoute.ChecklistOverview()}
          className=" text-primary font-semibold text-sm"
        >
          <p className="p-4 font-semibold underline bg-[#FFFCC2]">Setup Checklist...</p>
        </Link>
      </DashboardLayout>
    );
}

export default Dashboard;
