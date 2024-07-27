"use client"

import Icon from '@/components/icon/Icon';
import { ArrowLeftCircle } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { HiChevronDoubleLeft } from 'react-icons/hi';
import { BrandIdentity, GradeLevel, OperationsParameter, OrganizationStatement, OrganizationStructure, Preview } from './_steps';
import { Button } from '@/components/ui/button';
import { steps } from './data';


const Onboarding = () => {
    const router = useRouter()
    const location = usePathname()
    const searchParams = useSearchParams()
    const ui = searchParams.get('ui')

    const getCurrentStep = () => {
        const step = Number(searchParams.get("step"))
        return step;
    };



    return (
        <section className="">
            <div className="px-2.5 py-3 bg-[#F4f4f4] w-full mb-10">
                <button
                    type="button"
                    onClick={() => {
                        getCurrentStep() - 1 >= 1 && router.push(`${location}?ui=${ui}&step=${getCurrentStep() - 1}`)
                    }}
                    // disabled={currentStep === 0}
                    className="text-black flex gap-1 items-center text-xs"
                >
                    <HiChevronDoubleLeft width={10} height={10} /> Back
                </button>
            </div>
            <form className="px-10 xl:pl-[9.375rem]">
                <h1 className="text-2xl font-bold text-[#162238] mb-16">
                    {`Welcome ITH Holdings! Let's setup your organization`}
                </h1>
                {getCurrentStep() === 1 && <OrganizationStatement />}
                {getCurrentStep() === 2 && <BrandIdentity />}
                {getCurrentStep() === 3 && <OperationsParameter />}
                {getCurrentStep() === 4 && <OrganizationStructure />}
                {getCurrentStep() === 5 && <GradeLevel />}
                {getCurrentStep() === 6 && <Preview />}
                <div className="flex justify-start items-center gap-[1.625rem] mt-8">
                    <button
                        type="button"
                        // onClick={prevStep}
                        className="text-pry inline-flex gap-1.5"
                    >
                        <ArrowLeftCircle width={24} height={24} /> Skip to Dashboard
                    </button>
                    {getCurrentStep() < steps.length ? (
                        <Button type="button" className="" onClick={() => {
                            getCurrentStep() < steps.length && router.push(`${location}?ui=${ui}&step=${getCurrentStep() + 1}`)
                        }}>
                            Next
                        </Button>
                    ) : (
                        <Button 
                            type="button" 
                            onClick={() => null}>
                            Save
                        </Button>
                    )}
                </div>
            </form>
        </section>
    );
}

export default Onboarding;
