import { Dictionary } from "@/@types/dictionary";
import CustomDateInput from "@/components/custom-date-input";
import CustomSelect from "@/components/custom-select";
import { CardContainer } from "@/components/fragment";
import { RadioButtonLabel } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { REVIEW_PERIOD_OPTIONS } from "../_data";

const OutcomeTargetSettings = () => {
    const [submissionOptions, setSubmissionOptions] = useState({
        expected_outcome: [
            { id: 1, title: 'Submission Only', isSelected: false, type: "submission_only" },
            { id: 2, title: 'Submission and Approval', isSelected: false, type: "submission_and_approval" },
        ],
        actual_outcome: [
            { id: 1, title: 'Submission Only', isSelected: false, type: "submission_only" },
            { id: 2, title: 'Submission and Approval', isSelected: false, type: "submission_and_approval" },
        ],
    })
    const actionTypes = useMemo(() => submissionOptions,
        [submissionOptions]
    )

    const handleOptionChange = (key: string, id: number) => {
        setSubmissionOptions((prevState: any) => {
            let newObj = prevState[key]?.map((item: Dictionary) => {
                return {
                    ...item,
                    isSelected: item.id === id
                }
            })
            return {
                ...prevState,
                [key]: newObj
            }

        })
    }

    const formik = useFormik({
        initialValues: {
            expect_outcome: {
                submission: {
                    review_period: ""
                },
                submission_approval: {
                    submission_review_period: "",
                    approval_review_period: "",
                },
            },
            actual_outcome: {
                submission: {
                    review_period: ""
                },
                submission_approval: {
                    submission_review_period: "",
                    approval_review_period: "",
                },
            },
            action_type: {
                expected_outcome: "",
                actual_outcome: ""
            }
        },
        onSubmit: (values) => { }
    })

    // console.log(submissionOptions)

    return (
        <section className="">
            <CardContainer className="mt-6"
                title="Expected Outcome and Target Setting Period"
                subTitle="Select below if you want to accept submissions or allow line manager review and approve submissions of expected outcomes and targets"
            >
                <div className="mt-7">
                    <form>
                        <div className="w-1/3 flex items-center justify-between">
                            {
                                actionTypes?.expected_outcome?.map((item: Dictionary, index) => (
                                    <RadioButtonLabel key={item?.id} isActive={item?.isSelected} label={item?.title} onClick={() => {
                                        handleOptionChange("expected_outcome", item.id)
                                        formik.setFieldValue('action_type.expected_outcome', item?.type)
                                    }} />
                                ))
                            }
                        </div>

                        {formik.values?.action_type?.expected_outcome === "submission_only" &&
                            <div className="mt-8 lg:w-2/5">
                                <h2 className="text-sm">Set when submission should occur</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <CustomSelect
                                        label="Review Period"
                                        options={REVIEW_PERIOD_OPTIONS}
                                        selected={formik.values?.expect_outcome?.submission?.review_period}
                                        setSelected={(selected) => {
                                            formik.setFieldValue('expect_outcome.submission.review_period', selected)
                                        }}
                                    />

                                </div>
                            </div>
                        }

                        {formik.values?.action_type?.expected_outcome === "submission_and_approval" &&
                            <div className="mt-8 lg:w-2/5">
                                <h2 className="text-sm">Set when submission should occur</h2>
                                <div className="mt-3 grid grid-cols-2 gap-4">
                                    <CustomSelect
                                        label="Review Period"
                                        options={REVIEW_PERIOD_OPTIONS}
                                        selected={formik.values?.expect_outcome?.submission_approval?.submission_review_period}
                                        setSelected={(selected) => {
                                            formik.setFieldValue('expect_outcome.submission_approval.submission_review_period', selected)
                                        }}
                                    />
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-sm">Set when approval should occur</h2>
                                    <div className="mt-3 grid grid-cols-2 gap-4">
                                        <CustomSelect
                                            label="Review Period"
                                            options={REVIEW_PERIOD_OPTIONS}
                                            selected={formik.values?.expect_outcome?.submission_approval?.approval_review_period}
                                            setSelected={(selected) => {
                                                formik.setFieldValue('expect_outcome.submission_approval.approval_review_period', selected)
                                            }}
                                        />

                                    </div>
                                </div>
                            </div>
                        }

                        <Button className="mt-7">Save Preferences</Button>
                    </form>
                </div>
            </CardContainer>

            <CardContainer className="mt-6"
                title="Actual Outcomes and Achievements Submission Period"
                subTitle="Select below if you want to accept submissions or allow line manager review and approve submitting of actual outcomes and achievements"
            >
                <div className="mt-7">
                    <form>
                        <div className="w-1/3 flex items-center justify-between">
                            {
                                actionTypes?.actual_outcome?.map((item: Dictionary, index) => (
                                    <RadioButtonLabel key={item?.id} isActive={item?.isSelected} label={item?.title} onClick={() => {
                                        handleOptionChange("actual_outcome", item.id)
                                        formik.setFieldValue('action_type.actual_outcome', item?.type)
                                    }} />
                                ))
                            }
                        </div>

                        {formik.values?.action_type?.actual_outcome === "submission_only" &&
                            <div className="mt-8 lg:w-2/5">
                                <h2 className="text-sm">Set when submission should occur</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <CustomSelect
                                        label="Review Period"
                                        options={REVIEW_PERIOD_OPTIONS}
                                        selected={formik.values?.actual_outcome?.submission?.review_period}
                                        setSelected={(selected) => {
                                            formik.setFieldValue('actual_outcome.submission.review_period', selected)
                                        }}
                                    />

                                </div>
                            </div>
                        }

                        {formik.values?.action_type?.actual_outcome === "submission_and_approval" &&
                            <div className="mt-8 lg:w-2/5">
                                <h2 className="text-sm">Set when submission should occur</h2>
                                <div className="mt-3 grid grid-cols-2 gap-4">
                                    <CustomSelect
                                        label="Review Period"
                                        options={REVIEW_PERIOD_OPTIONS}
                                        selected={formik.values?.actual_outcome?.submission_approval?.submission_review_period}
                                        setSelected={(selected) => {
                                            formik.setFieldValue('actual_outcome.submission_approval.submission_review_period', selected)
                                        }}
                                    />
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-sm">Set when approval should occur</h2>
                                    <div className="mt-3 grid grid-cols-2 gap-4">
                                        <CustomSelect
                                            label="Review Period"
                                            options={REVIEW_PERIOD_OPTIONS}
                                            selected={formik.values?.actual_outcome?.submission_approval?.approval_review_period}
                                            setSelected={(selected) => {
                                                formik.setFieldValue('actual_outcome.submission_approval.approval_review_period', selected)
                                            }}
                                        />

                                    </div>
                                </div>
                            </div>
                        }

                        <Button className="mt-7">Save Preferences</Button>
                    </form>
                </div>
            </CardContainer>
        </section>
    );
}

export default OutcomeTargetSettings;
