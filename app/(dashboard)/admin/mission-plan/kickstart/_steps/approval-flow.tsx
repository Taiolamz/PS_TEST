import { Dictionary } from "@/@types/dictionary";
import { CustomAccordion } from "@/components/custom-accordion";
import CustomSelect from "@/components/custom-select";
import { Button } from "@/components/ui/button";
import { useGetAllApproverListQuery } from "@/redux/services/employee/employeeApi";
import { useAppSelector } from "@/redux/store";
import { FieldArray, Form, Formik, useFormik } from "formik";
import { useEffect, useState } from "react";

const LEVEL = {
    title: '',
    approvals: [],
    approval_levels: 0
}

type Select = {
    label: string | number;
    value: string | number;
};

const levelOptions: Select[] = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
}));

const ApprovalFlow = () => {
    const [initialApprovalFlowData, setInitialApprovalFlowData] = useState<Dictionary>({
        staff_levels: []
    })

    const { organization }: any = useAppSelector((state) => state.auth.user)

    const { data: rolesData, isLoading: isLoadingApprovalroles } =
        useGetAllApproverListQuery();

    // const formik = useFormik()
    const handleFormSubmit = (values: any) => {
        // console.log(values)
    }

    useEffect(() => {
        if (organization.staff_levels) {
            let STAFF_LEVELS = typeof(organization?.staff_levels) === 'string' ? JSON.parse(organization?.staff_levels) : organization?.staff_levels
            const LEVELS = STAFF_LEVELS?.map((item: any) => {
                return {
                    title: item.name,
                    approvals: [],
                    approval_levels: 0
                }
            })

            setInitialApprovalFlowData({ staff_levels: LEVELS })
        }
    }, [organization])
    return (
        <section className="w-full">
            <h1>Set FY Approval Flow</h1>
            <section className="mt-6">
                <Formik
                    initialValues={initialApprovalFlowData}
                    onSubmit={handleFormSubmit}
                    // validationSchema={}
                    enableReinitialize={true}
                >
                    {
                        (formik) => {
                            return (
                                <Form>
                                    <FieldArray
                                        name='staff_levels'
                                    >
                                        {({ push, remove }: { push: any, remove: any }) => (
                                            formik?.values?.staff_levels?.length > 0 &&
                                            formik.values.staff_levels.map((item: any, idx: number) => (
                                                <div key={idx} className="flex flex-col gap-10 mt-2">
                                                    <CustomAccordion
                                                        key={1}
                                                        className="w-full bg-white mb-4 p-5 border border-custom-divider rounded flex flex-col gap-1"
                                                        title={
                                                            <p className="font-medium text-sm">
                                                                {idx + 1}. How many levels of approval should be for <span className="text-primary capitalize">{item.title}</span>  before the final approval?
                                                            </p>
                                                        }
                                                        content={
                                                            <>
                                                                <CustomSelect
                                                                    options={levelOptions}
                                                                    selected={formik?.values?.staff_levels?.[idx].approval_levels ? formik?.values?.staff_levels?.[idx].approval_levels.toString() : ''}
                                                                    setSelected={(value) => {
                                                                        formik.setFieldValue(`staff_levels.${idx}.approvals`, [])
                                                                        formik.setFieldValue(`staff_levels.${idx}.approval_levels`, value)
                                                                    }}
                                                                    className="w-[10rem]"
                                                                    placeholder="Select..."
                                                                />
                                                                <div className="flex flex-col gap-2 mt-6">
                                                                    <FieldArray
                                                                        name='approvals'
                                                                    >
                                                                        {({ push, remove }: { push: any, remove: any }) => (
                                                                            formik?.values?.staff_levels?.[idx].approval_levels ?
                                                                                Array.from({ length: formik?.values?.staff_levels?.[idx].approval_levels }, (_, index) => (
                                                                                    <div key={index} className="mb-4">
                                                                                {index === 0 && <span>Who should be the first approval</span>}
                                                                                {index > 0 && index < (Number(formik?.values?.staff_levels?.[idx].approval_levels) - 1) && <span>Who should be the next approval</span>}
                                                                                {Number(formik?.values?.staff_levels?.[idx].approval_levels) > 1 && Number(formik?.values?.staff_levels?.[idx].approval_levels) === index + 1 && <span>Who has the final approval power</span>}
                                                                                <CustomSelect
                                                                                    key={index}
                                                                                    options={rolesData?.map((item) => {
                                                                                return {
                                                                                    label: item,
                                                                                    value: item
                                                                                }
                                                                                            }) || []}
                                                                                    selected={formik?.values?.staff_levels?.[idx].approvals?.[index]}
                                                                                    setSelected={(value) => {
                                                                            formik.setFieldValue(`staff_levels.${idx}.approvals.${index}`, value)
                                                                                }}
                                                                                className="w-[15rem]"
                                                                                placeholder="Select..."
                                                                                        />
                                                                                    </div>
                                                                                )) : ''
                                                                        )
                                                                        }
                                                                    </FieldArray>
                                                                </div>
                                                            </>
                                                        }
                                                    />
                                                </div>

                                            ))
                                        )
                                        }
                                    </FieldArray>

                                    <div className="mt-5">
                                        <Button
                                            // disabled={!formik.values.title
                                            //     || !formik.values.start_date
                                            //     || !formik.values.end_date || !formik.values.review_period || isLoading
                                            // }
                                            className=''
                                            type='submit'
                                            // loading={isLoading}
                                            loadingText='Save & Continue'
                                        >Save & Continue</Button>
                                    </div>

                                </Form>
                            )
                        }
                    }
                </Formik>
            </section>
        </section >
    );
}

export default ApprovalFlow;
