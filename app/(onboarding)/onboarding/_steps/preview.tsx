import React from 'react';
import { FormHeader } from '../_components';
import { steps } from '../data';
import Icon from '@/components/icon/Icon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Preview = () => {
    const router = useRouter()
    const location = usePathname()
    const searchParams = useSearchParams()
    const ui = searchParams.get('ui')

    const getCurrentStep = () => {
        const step = Number(searchParams.get("step"))
        return step;
    };

    return (
        <section className='max-w-[27.375rem]'>
            <FormHeader
                title='Preview Organization Onboarding'
                subTitle='Filled Information'
            />
            <div className="flex flex-col gap-3">
                {steps.map((item, index) => (
                    <div
                        key={item}
                        className="flex items-center justify-between bg-[#00808008] p-2"
                    >
                        <p className="text-sm"> {`${index + 1}. ${item}`}</p>
                        <button type="button" onClick={() => router.push(`${location}?ui=${ui}&step=${index + 1}`)}>
                            <Icon name="edit" height={22.69} width={22.69} />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Preview;
