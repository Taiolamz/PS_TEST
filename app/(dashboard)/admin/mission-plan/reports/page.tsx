"use client"
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import CustomTab from "@/components/custom-tab";
import { REPORT_PAGE_TABS } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { OrganizationReports, OutcomeTargetSettings } from "./_partials";

export default function Reports (){
    const [showChart, setShowChart] = useState(false)
    const searchParam = useSearchParams()
    const ui = searchParam.get('ui')

    const getView = () => {
        switch(ui) {
            case 'set-outcome-target':
                return <OutcomeTargetSettings/>
                default:
                    return <OrganizationReports/>
            }
    }

    return (
        <DashboardLayout headerTitle="Business Performance Overview"
        >   
            <div className="p-5 w-full overflow-x-hidden">
                <CustomTab options={REPORT_PAGE_TABS.ADMINS} slug="ui" />
                {getView()}
            </div>
        </DashboardLayout>
    );
}
