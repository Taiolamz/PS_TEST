import { Dictionary } from '@/@types/dictionary';
import Icon from '@/components/icon/Icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateFinancialYearDetails } from '@/redux/features/mission-plan/missionPlanSlice';
import { useCreateStrategicPillarsMutation } from '@/redux/services/mission-plan/missionPlanApi';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import routesPath from '@/utils/routes';
import { FieldArray, Form, Formik } from 'formik';
import { LucidePlusCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import FinancialYearPreview from './preview';

const { ADMIN } = routesPath

const StrategicPillar = () => {
    const { fy_info: { strategic_pillars } } = useAppSelector((state) => state.mission_plan)
    const [initialValues, setInitialValues] = useState(strategic_pillars)
    const [createStrategicPillars, {isLoading}] = useCreateStrategicPillarsMutation()
    
    const router = useRouter()
    const dispatch = useAppDispatch()
    const ui = useSearchParams().get('ui')
    const step = useSearchParams().get('step')

    const handleFormSubmit = (values: Dictionary) => {
        dispatch(updateFinancialYearDetails({ slug: "strategic_pillars", data: values }))
        const pillars = values.strategic_pillars.map((d: Dictionary) => {
            return d.pillar
        })
        createStrategicPillars({
            strategic_pillars: pillars
        })
        .unwrap()
        .then(() => {
            toast.success("Strategic Pillars Created Successfully")
            router.push(`${ADMIN.KICK_START_MISSION_PLAN}?ui=strategic-pillar&step=preview`)
        })

    }
    

    return (
        <>
            {step !== 'preview' &&
                <div className='w-[30vw]'>
                    <h1>Strategic Pillar</h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleFormSubmit}
                        // validationSchema={strategicPillarSchema}
                        enableReinitialize={true}
                    >
                        {
                            (formik: any) => {
                                return (
                                    <Form>
                                        <FieldArray name="strategic_pillars">
                                            {({ insert, remove, push }) => (
                                                <div className='flex flex-col gap-5'>
                                                    {formik.values.strategic_pillars?.length > 0 &&
                                                        formik.values.strategic_pillars.map((pillar: any, idx: number) => (
                                                            <div key={idx}>
                                                                <div className='relative'>
                                                                    <Input
                                                                        label={`Pillar ${idx + 1}`}
                                                                        id='aj'
                                                                        name={`strategic_pillars.${idx}.pillar`}
                                                                        value={formik.values.strategic_pillars[idx].pillar}
                                                                        onChange={(e) => {
                                                                            formik.setFieldValue(`strategic_pillars.${idx}.pillar`, e.target.value)
                                                                        }}
                                                                        error={formik?.errors?.strategic_pillars?.[idx]?.pillar}
                                                                        touched={formik?.touched?.strategic_pillars?.[idx]?.pillar}
                                                                        placeholder='Input Strategic Pillar'
                                                                        className='bg-white'
                                                                    />

                                                                  {formik.values.strategic_pillars.length > 1 &&  <button
                                                                        type="button"
                                                                        onClick={() => remove(idx)}
                                                                        className="text-red-500 hover:text-red-700 absolute -right-5 top-8 xl:right- xl:top-8"
                                                                    >
                                                                        <Icon name="remove" width={14.28} height={18.63} />
                                                                    </button>
                                                                    }
                                                                </div>

                                                                {Number(formik?.values?.strategic_pillars?.length) === idx + 1 && <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        push({ pillar: "" })
                                                                    }
                                                                    className="text-left flex items-center gap-x-2 relative mt-4 text-primary text-sm"
                                                                >
                                                                    <LucidePlusCircle
                                                                        size={20}
                                                                        style={{ color: "var(--primary-color)" }}
                                                                    />
                                                                    Add New Pillar
                                                                </button>}
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </FieldArray>
                                        <div className="mt-7 flex gap-4 items-center">
                                            <Button
                                                className='border border-[var(--primary-color)] text-[var(--primary-color)] px-10 shadow-none bg-white hover:bg-none'
                                                type='button'
                                                onClick={() => router.push(`${ADMIN.KICK_START_MISSION_PLAN}?ui=mission-vision`)}
                                            >Back</Button>
                                            <Button
                                                className='border'
                                                type='submit'
                                                disabled={isLoading || formik?.values?.strategic_pillars.some((d: Dictionary) => d.pillar === "")}
                                                loading={isLoading}
                                                loadingText='Save & Continue'
                                            >Save & Continue</Button>
                                        </div>
                                    </Form>
                                )
                            }
                        }

                    </Formik>
                </div>
            }
            {step === 'preview' && <FinancialYearPreview />}
        </>
    );
}

export default StrategicPillar;
