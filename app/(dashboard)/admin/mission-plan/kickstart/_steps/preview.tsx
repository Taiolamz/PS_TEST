import ConfirmationModal from '@/components/atoms/modals/confirm';
import CustomDateInput from '@/components/custom-date-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import routesPath from '@/utils/routes';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const FinancialYearPreview = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const router = useRouter()

    const { ADMIN } = routesPath 
    
    return (
        <div className='w-[60vw]'>
            <h1 className='text-primary'>Preview Financial Year Information</h1>
            <span className='block mt-1 text-[#6E7C87] text-sm'>Filled Information</span>
            <div className="mt-4">
                <div className='mb-4'>
                    <div className='bg-[#00808008] p-1 px-2 flex items-center justify-between gap-5'>
                        <span className='text-sm text-[#6E7C87] font-light'>1. Financial Year</span>
                        <span className='text-primary w-8 h-8 grid place-content-center rounded-full bg-[#0080801A] cursor-pointer'><Pencil size={15} color='var(--primary-color)' /></span>
                    </div>
                    <div className='mt-4 border rounded-[5px] p-5'>
                        <div className="flex items-center gap-4">
                            <div className='w-[55%]'>
                                <Input
                                    label='Title'
                                    id=''
                                    name=''
                                    value='2022 Financial Year'
                                    onChange={() => null}
                                    readOnly
                                    disabled
                                />
                            </div>
                            <CustomDateInput label='Start Period' id="" selected={new Date()} handleChange={() => null} error='' disabled/>
                            <CustomDateInput label='End Period' id="" selected={new Date()} handleChange={() => null} error='' disabled/>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <Button
                        className='px-7'
                        type='button'
                        onClick={() => setShowSuccessModal(true)}
                    >Save</Button>
                </div>
            </div>
            <ConfirmationModal
                icon='/assets/images/success.gif'
                iconClass='w-40'
                title='Financial Year Begins!!!'
                message="Congratulations ! you have successfully kickstarted your financial year. Click on the button below to continue"
                show={showSuccessModal}
                handleClose={() => setShowSuccessModal(false)}
                handleClick={() => router.push(ADMIN.MISSION_PLAN)}
                actionBtnTitle="Proceed to Dashboard"
                modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
            />
        </div>
    );
}

export default FinancialYearPreview;
