import React from 'react';
import { FormHeader } from '../_components';
import { Input } from '@/components/ui/input';
import CustomDateInput from '@/components/custom-date-input';
import CustomTimeInput from '@/components/custom-time-picker';

const OperationsParameter = () => {
    return (
        <section className='max-w-[54.625rem]'>
            <FormHeader
                title='Give details of your organizational information and hierarchical
        structure.'
                subTitle='Give details of your organizational information and hierachial
        structure.'
            />
            <div className='h-[calc(100vh_-_22rem)] overflow-y-scroll px-4 scroll-hidden'>
                <div className=" pb-6 border-b mb-6 gap-6">
                    <h3 className="block mb-4 text-sm font-medium text-[#162238]">
                        1. Fiscal Year
                    </h3>
                    <div className="flex gap-6">
                        <div className="basis-1/2">
                            <label className="block text-[#5A5B5F] text-[0.8125rem]">
                                Title
                            </label>
                            <Input
                                type="text"
                                id=''
                                name=''
                                value=''
                                onChange={() => null}
                                placeholder="2022 Financial Year"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300  sm:text-sm"
                            />
                        </div>

                        <div className="basis-1/4">
                            <CustomDateInput
                                id=''
                                label="Start Period"
                                selected={new Date()}
                                handleChange={() => null}
                                error=''
                                className='relative'
                            // iconClass="top-4"
                            />
                        </div>
                        <div className="basis-1/4">
                            <CustomDateInput
                                id=''
                                label=" End Period"
                                selected={new Date()}
                                handleChange={() => null}
                                error=''
                                className='relative'
                            // iconClass="top-4"
                            />
                        </div>
                    </div>
                </div>

                <div className=" pb-6 border-b mb-6 gap-6 ">
                    <h3 className="block mb-2 text-sm font-medium text-[#162238]">
                        2. New Staff Probationary Period
                    </h3>
                    <p className="mb-4 text-sm text-[#6E7C87]">
                        Set the default time range for staff probation
                    </p>
                    <div className="w-[47%]">
                        <label className="block text-[#5A5B5F] text-[0.8125rem]">
                            Period
                        </label>
                        <Input
                            type="text"
                            placeholder="3 Months"
                            id=''
                            name=''
                            value=''
                            onChange={() => null}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300  sm:text-sm"
                        />
                    </div>
                </div>

                <div className=" pb-6 mb-6 gap-6 w-[47%]">
                    <h3 className="block mb-4 text-sm font-medium text-[#162238]">
                        3. Operating Hours
                    </h3>
                    <div className="flex space-x-2 mt-2">
                        <div className="w-1/2">
                            <CustomTimeInput
                                id=''
                                label="Opening Time"
                                selected={new Date()}
                                handleChange={() => null}
                                error=''
                            />
                        </div>
                        <div className="w-1/2">
                            <CustomTimeInput
                                id=''
                                label="Closing Time"
                                selected={new Date()}
                                handleChange={() => null}
                                error=''
                            />
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default OperationsParameter;
