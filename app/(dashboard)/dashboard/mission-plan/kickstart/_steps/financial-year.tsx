import CustomDateInput from '@/components/custom-date-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

const FinancialYear = () => {
    return (
        <div>
            <h1>Financial Year</h1>
            <form className="mt-4">
                <div className='flex items-center gap-5'>
                    <div className='w-[90%]'>
                        <Input
                            label='Title'
                            id=''
                            name=''
                            value=''
                            onChange={() => null}
                            placeholder='2022 Financial Year'
                        />
                    </div>
                    <div className="w-full flex gap-4">
                        <CustomDateInput
                            label='Start Period'
                            id=''
                            selected={new Date()}
                            handleChange={() => null}
                            error=''
                        />
                        <CustomDateInput
                            label='End Period'
                            id=''
                            selected={new Date()}
                            handleChange={() => null}
                            error=''
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <Button
                        className=''
                        type='button'
                    >Save & Continue</Button>
                </div>
            </form>
        </div>
    );
}

export default FinancialYear;
