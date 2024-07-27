"use client"

import { Textarea } from '@/components/ui/textarea';
import { FormHeader } from '../_components';

const OrganizationStatement = () => {
    return (
        <section className='max-w-[38.8125rem]'>
            <FormHeader
                title='What does your organization believe in?'
                subTitle=' Enter your business or organizational mission and vision statement below.'
            />
            <div className="flex flex-col gap-6">
                <div>
                    <label className="block mb-1.5 text-sm font-normal text-[#5A5B5F]">
                        1. Vision Statement
                    </label>
                    <Textarea
                        rows={4}
                        id=""
                        name=""
                        onChange={() => null}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1.5 text-sm font-normal text-[#5A5B5F]">
                        2. Mission Statement
                    </label>
                    <Textarea
                        rows={4}
                        id=""
                        name=""
                        onChange={() => null}
                        className="border p-2 w-full"
                    />
                </div>
            </div>
        </section>
    );
}

export default OrganizationStatement;
