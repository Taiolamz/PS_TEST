"use client"
import { PageSidebar } from '@/components/atoms';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardLayout } from '../../dashboard/_components/dashboard-layout';
import DashboardNavContent from '../../dashboard/_components/dashboard-layout/dashboard-nav-content';
import { Boundaries, ImpliedTask, MeasureOfSuccess, MissionPlanOverview, MissionStatement, SpecifiedTask, StrategicIntent } from './_steps';
import { CREATE_MISSION_PLAN_LINKS } from './_data';

const CreateMissionPlan = () => {
    const queryParams = useSearchParams()
    const ui = queryParams.get('ui')

    const router = useRouter()

    return (
        <DashboardLayout
            dynamiccontent={<DashboardNavContent title="Mission Plan" showBack handleGoBack={() => router.push('/mission-plan?ui=mission-plan')} />}
        >
            <section className="flex">
                <PageSidebar
                    title="Create Mission Plan"
                    menu_items={CREATE_MISSION_PLAN_LINKS}
                    slug="ui"
                />
                <aside className="p-5 w-[100vw_-_201px]">
                    {ui === "overview" && <MissionPlanOverview />}
                    {ui === "mission-statement" && <MissionStatement />}
                    {ui === "measure-success" && <MeasureOfSuccess />}
                    {ui === "strategic-intent" && <StrategicIntent />}
                    {ui === "specified-intent" && <SpecifiedTask />}
                    {ui === "implied-task" && <ImpliedTask />}
                    {ui === "boundaries" && <Boundaries />}
                </aside>
            </section>
        </DashboardLayout>
    );
}

export default CreateMissionPlan;
