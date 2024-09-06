import { Dictionary } from '@/@types/dictionary';
import CustomDateInput from '@/components/custom-date-input';
import CustomSelect from '@/components/custom-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateFinancialYearDetails } from '@/redux/features/mission-plan/missionPlanSlice';
import { useCreateFinancialYearMutation } from '@/redux/services/mission-plan/missionPlanApi';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { removeCharFromString } from '@/utils/helpers';
import { formatDate } from '@/utils/helpers/date-formatter';
import { fiscalYearSchema } from '@/utils/schema/mission-plan';
import { useFormik } from 'formik';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const FinancialYearUpdate = () => {

    const [createFinancialYear, { isLoading }] = useCreateFinancialYearMutation()
    const { fy_info: { financial_year }, mission_plan } = useAppSelector((state) => state.mission_plan)

    console.log(mission_plan?.active_fy_info)

    const location = usePathname()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleFormSubmit = async (values: Dictionary
    ) => {
        const DATE_DIFFERENCE = Number(removeCharFromString(values.end_date, "-")) - Number(removeCharFromString(values.start_date, "-"))
        if (DATE_DIFFERENCE <= 0) {
            toast.info("End date must be a future date")
            return
        }
        let payload = {
            ...mission_plan?.active_fy_info,
            ...values
        }
        
        // createFinancialYear(values)
        //     .unwrap()
        //     .then(() => {
        //         toast.success("Financial Year Created Successfully")
        //         // router.push(`${ADMIN.KICK_START_MISSION_PLAN}?ui=mission-vision`)
        //     })
    }


    const formik = useFormik({
        initialValues: {
            title: (mission_plan?.active_fy_info?.title as string) || "",
            start_date: (mission_plan?.active_fy_info?.start_date as string) || "",
            end_date: (mission_plan?.active_fy_info?.end_date as string) || "",
            review_period: (mission_plan?.active_fy_info?.review_period as string) || "",
            template_id: mission_plan?.active_fy_info?.template_id || ""
        },
        validationSchema: fiscalYearSchema,
        onSubmit: handleFormSubmit,
        enableReinitialize: true
    })

    // useEffect(() => {
    //     dispatch(updateFinancialYearDetails({ slug: "financial_year", data: formik.values }))
    // }, [formik.values])

    return (
        <div className="w-full">
            <h1>Financial Year</h1>
            <form className="mt-4"
                onSubmit={formik.handleSubmit}
                autoComplete="off"
            >
                <div className='flex items-center gap-5'>
                    <div className='w-[40rem]'>
                        <Input
                            label='Title'
                            id='title'
                            name='title'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            touched={formik.touched.title}
                            error={formik.errors.title}
                            placeholder='2022 Financial Year'
                            isRequired
                        />
                    </div>
                    <div className="w-full flex gap-4 items-center">
                        <CustomDateInput
                            label='Start Period'
                            id='start_date'
                            selected={new Date(formik.values.start_date)}
                            handleChange={(selected) => {
                                formik.setFieldValue('start_date', formatDate(selected))
                            }}
                            touched={formik.touched.start_date}
                            error={formik.errors.start_date as string}
                            placeholder='YYYY-MM-DD'
                            isRequired
                            iconClass='top-10'
                        />
                        <CustomDateInput
                            label='End Period'
                            id='end_date'
                            selected={new Date(formik.values.end_date)}
                            handleChange={(selected) => {
                                formik.setFieldValue('end_date', formatDate(selected))
                            }}
                            touched={formik.touched.end_date}
                            error={formik.errors.end_date as string}
                            placeholder='YYYY-MM-DD'
                            isRequired
                            iconClass='top-10'
                        />
                    </div>
                </div>
                <div className="mt-3 w-1/4">
                    <CustomSelect
                        label="Review Period"
                        id=""
                        options={[
                            {label: "Monthly", value: "monthly"},
                            {label: "Quarterly", value: "buarterly"},
                            {label: "Bi-Annual (twice/year)", value: "bi-annual"},
                        ]}
                        selected={formik.values.review_period}
                        setSelected={(selected) => formik.setFieldValue('review_period', selected)}
                        isRequired
                    />
                </div>
                <div className="mt-5">
                    <Button
                        disabled={!formik.values.title
                            || !formik.values.start_date
                            || !formik.values.end_date || !formik.values.review_period || isLoading
                        }
                        className=''
                        type='submit'
                        loading={isLoading}
                        loadingText='Save Changes'
                    >Save Changes</Button>
                </div>
            </form>
        </div>
    );
}

export default FinancialYearUpdate;
