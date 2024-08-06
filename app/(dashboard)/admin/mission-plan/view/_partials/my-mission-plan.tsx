import { PageLoader } from '@/components/custom-loader';
import { EmptyState } from '@/components/fragment';
import { Button } from '@/components/ui/button';
import { useGetMyMissionPlanQuery } from '@/redux/services/mission-plan/missionPlanApi';
import { useAppSelector } from '@/redux/store';
import { getAvailableTabs, SUPER_ADMIN } from '@/utils/helpers';
import routesPath from '@/utils/routes';
import { useRouter } from 'next/navigation';
import React from 'react';

const { ADMIN } = routesPath

const MyMissionPlan = () => {
    const { data: my_mission_plan, isLoading, } = useGetMyMissionPlanQuery({})
    const user_info = useAppSelector((state) => state?.auth?.user);

    const router = useRouter()

    // console.log(my_mission_plan)

    return (
        <div className='p-5'>
            {
                isLoading ? (
                    <div className='h-[70vh] grid place-content-center'>
                        <PageLoader />
                    </div>
                ) :
                    (
                        !my_mission_plan?.data?.mission_plan ? (
                            <EmptyState
                                text="Create your Mission plan by using the button below"
                            >
                                <div className="flex flex-col gap-3">
                                    <Button
                                        onClick={() => router.push(`${ADMIN.CREATE_MISSION_PLAN}?ui=overview`)}
                                    >Create Mission Plan </Button>
                                    {user_info?.role !== SUPER_ADMIN && <Button variant="outline"> Assign Task </Button>}
                                </div>
                            </EmptyState>
                        ) :
                            <> My Mission Plan </>
                    )

            }
        </div>
    );
}

export default MyMissionPlan;
