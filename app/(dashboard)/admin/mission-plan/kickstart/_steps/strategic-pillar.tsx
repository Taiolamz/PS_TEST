import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import FinancialYearPreview from './preview';
import routesPath from '@/utils/routes';

const { ADMIN } = routesPath

const StrategicPillar = () => {
    const location = usePathname()
    const router = useRouter()
    const ui = useSearchParams().get('ui')
    const step = useSearchParams().get('step')

    return (
        <>
            { step !== 'preview' &&
                <div className='w-[30vw]'>
                    <h1>Strategic Pillar</h1>
                    <form className="mt-4">
                        <div className='gap-5'>
                            <div className=''>
                                <Input
                                    label='Pillar 1'
                                    id='aj'
                                    name=''
                                    value=''
                                    onChange={() => null}
                                    touched={false}
                                    error={''}
                                    placeholder='Input Strategic Pillar'
                                />
                            </div>

                            <div className='mt-5'>
                                <Input
                                    label='Pillar 2'
                                    id='aj'
                                    name=''
                                    value=''
                                    onChange={() => null}
                                    touched={false}
                                    error={''}
                                    placeholder='Input Strategic Pillar'
                                />
                            </div>

                            <div className='mt-5'>
                                <Input
                                    label='Pillar 3'
                                    id='aj'
                                    name=''
                                    value=''
                                    onChange={() => null}
                                    touched={false}
                                    error={''}
                                    placeholder='Input Strategic Pillar'
                                />
                            </div>

                            <span className='my-7 text-[var(--primary-color)] flex gap-1.5 items-center text-xs'> <span className='w-6 h-6 rounded-full border border-[var(--primary-color)] grid place-content-center'><Plus size={15} /></span> Add New Pillar </span>
                        </div>
                        <div className="mt-5 flex gap-4 items-center">
                            <Button
                                className='border border-[var(--primary-color)] text-[var(--primary-color)] px-10 shadow-none bg-white hover:bg-none'
                                type='button'
                                onClick={() => router.push(`${ADMIN.KICK_START_MISSION_PLAN}?ui=mission-vision`)}
                            >Back</Button>
                            <Button
                                className='border'
                                type='button'
                                onClick={() => router.push(`${ADMIN.KICK_START_MISSION_PLAN}?ui=strategic-pillar&step=preview`)}
                            >Save & Continue</Button>
                        </div>
                    </form>
                </div>
            }
            {step === 'preview' && <FinancialYearPreview />}
        </>
    );
}

export default StrategicPillar;
