import { Dictionary } from '@/@types/dictionary';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { updateFinancialYearDetails } from '@/redux/features/mission-plan/missionPlanSlice';
import { useCreateMissionAndVisionMutation } from '@/redux/services/mission-plan/missionPlanApi';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import routesPath from '@/utils/routes';
import { missionVissionSchema } from '@/utils/schema/mission-plan';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

const { ADMIN } = routesPath

const MissionVision = () => {

    const [createMissionAndVision, { isLoading }] = useCreateMissionAndVisionMutation()
    const { fy_info: { mission_vision } } = useAppSelector((state) => state.mission_plan)

    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleFormSubmit = async (values: Dictionary
    ) => {
        createMissionAndVision(values)
            .unwrap()
            .then(() => {
                toast.success("Mission and Vision Created Successfully")
                router.push(`${ADMIN.KICK_START_MISSION_PLAN}?ui=strategic-pillar`)
            })
    }


    const formik = useFormik({
        initialValues: {
            mission: (mission_vision?.mission as string) || "",
            vision: (mission_vision?.vision as string) || "",
        },
        validationSchema: missionVissionSchema,
        onSubmit: handleFormSubmit,
        enableReinitialize: true
    })

    useEffect(() => {
        dispatch(updateFinancialYearDetails({ slug: "mission_vision", data: formik.values }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values])

    return (
        <div className='w-[40vw]'>
            <h1>Mission and Vision</h1>
            <form className="mt-4" onSubmit={formik.handleSubmit}>
                <div className='gap-5'>
                    <div className=''>
                        <Textarea
                            label='1. Company Vision'
                            id='vision'
                            name='vision'
                            rows={5}
                            value={formik.values.vision}
                            onChange={formik.handleChange}
                            touched={formik.touched.vision}
                            error={formik.errors.vision}
                            placeholder='To be a pacesetter in digital transformation and software solutions in West Africa by 2025'
                            className='bg-white'
                        />
                    </div>

                    <div className='mt-5'>
                        <Textarea
                            label='2. Company Mission'
                            id='mission'
                            name='mission'
                            rows={5}
                            value={formik.values.mission}
                            onChange={formik.handleChange}
                            touched={formik.touched.mission}
                            error={formik.errors.mission}
                            placeholder='Providing you with innovative software solutions that exceed your expectations.'
                            className='bg-white'
                        />
                    </div>
                </div>
                <div className="mt-5 flex gap-4 items-center">
                    <Button
                        className='border border-primary text-primary px-10 shadow-none bg-white hover:bg-none'
                        type='button'
                        onClick={() => router.push(`${ADMIN.KICK_START_MISSION_PLAN}?ui=financial-year`)}
                    >Back</Button>
                    <Button
                        className='border'
                        type='submit'
                        disabled={isLoading || !formik.values.vision || !formik.values.mission}
                        loading={isLoading}
                        loadingText='Save & Continue'
                    >Save & Continue</Button>
                </div>
            </form>
        </div>
    );
}

export default MissionVision;
