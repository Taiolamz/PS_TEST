import { Dictionary } from "@/@types/dictionary";
import CustomDateInput from "@/components/custom-date-input";
import CustomSelect from "@/components/custom-select";
import { CardContainer } from "@/components/fragment";
import { RadioButtonLabel } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { REVIEW_PERIOD_OPTIONS } from "../_data";
import { cn } from "@/lib/utils";
import ExtendSubmissionModal from "./_modals/extend-submission";
import ReopenSubmissionModal from "./_modals/reopen-submission";
import { useFetchReportSubmissionSettingsQuery, useSetActualOutcomeSubmissionMutation, useSetExpectedOutcomeSubmissionMutation } from "@/redux/services/mission-plan/reports/admin/targetOutcomeApi";
import { toast } from "sonner";
import { PageLoader } from "@/components/custom-loader";

const OutcomeTargetSettings = () => {
    const [showExtendSubmissionModal, setShowExtendSubmissionModal] = useState(false)
    const [showReopenSubmissionModal, setShowReopenSubmissionModal] = useState(false)
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

    const [setExpectedOutcomeSubmission, { isLoading: isSettingExpectedOutcome }] = useSetExpectedOutcomeSubmissionMutation()

    const [setActualOutcomeSubmission, { isLoading: isSettingActualOutcome }] = useSetActualOutcomeSubmissionMutation()

    const {data: report_submission_preference, isLoading, isFetching, refetch} = useFetchReportSubmissionSettingsQuery({})
    
    console.log(report_submission_preference)

    const getPayloadData = (data: Dictionary) => {
        const { action_type, outcome: { submission, submission_approval } } = data
        const { review_period } = submission
        const { approval_review_period, submission_review_period } = submission_approval

        return {
            report_submission_target_approval: action_type === "submission_and_approval",
            report_submission_target_duration: action_type === "submission_only" ? review_period : submission_review_period,
            report_submission_target_approval_duration: action_type === "submission_only" ? "" : approval_review_period
        }
    }

    const handleSubmitExpectedOutcome = async (values: Dictionary) => {
        const PAYLOAD = getPayloadData(values)
        setExpectedOutcomeSubmission(PAYLOAD)
            .unwrap()
            .then(() => {
                toast.success("Expected Outcome and Target Setting Saved")
            })
    }


    const handleSubmitActualOutcome = async (values: Dictionary) => {
        const PAYLOAD = getPayloadData(values)
        const {
            report_submission_target_approval,
            report_submission_target_duration,
            report_submission_target_approval_duration
        } = PAYLOAD

        const FORMATTED_PAYLOAD = {
            report_submission_outcome_approval: report_submission_target_approval,
            report_submission_outcome_duration: report_submission_target_duration,
            report_submission_outcome_approval_duration: report_submission_target_approval_duration
          }
        setActualOutcomeSubmission(FORMATTED_PAYLOAD)
            .unwrap()
            .then(() => {
                toast.success("Actual Outcome and Target Setting Saved")
            })
    }

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

    // Expected Outcome and Target
    const formik = useFormik({
        initialValues: {
            outcome: {
                submission: {
                    review_period: report_submission_preference?.data?.report_submission_target_duration || ""
                },
                submission_approval: {
                    submission_review_period: report_submission_preference?.data?.report_submission_target_duration || "",
                    approval_review_period: report_submission_preference?.data?.report_submission_target_approval_duration || "",
                },
            },
            action_type: report_submission_preference?.data?.report_submission_target_approval ?
                    "submission_and_approval" : "submission_only"
        },
        onSubmit: handleSubmitExpectedOutcome,
        enableReinitialize: true
    })

    // Actual outcome and Achievement
    const formik_1 = useFormik({
        initialValues: {
            outcome: {
                submission: {
                    review_period: report_submission_preference?.data?.report_submission_outcome_duration || ""
                },
                submission_approval: {
                    submission_review_period: report_submission_preference?.data?.report_submission_outcome_duration || "",
                    approval_review_period: report_submission_preference?.data?.report_submission_outcome_approval_duration || "",
                },
            },
            action_type: report_submission_preference?.data?.report_submission_outcome_approval ?
                    "submission_and_approval" : "submission_only"
        },
        onSubmit: handleSubmitActualOutcome,
        enableReinitialize: true
    })


    useEffect(() => {
        if (report_submission_preference) {
            const { data } = report_submission_preference
            setSubmissionOptions((item: any) => {
                const expected_outcome = item?.expected_outcome?.map((d: Dictionary) => {
                    return {
                        ...d,
                        isSelected: d.type === "submission_only" ? data?.report_submission_target_approval ? false : true : data?.report_submission_target_approval ? true : false
                    }
                })
                const actual_outcome = item?.actual_outcome?.map((d: Dictionary) => {
                    return {
                        ...d,
                        isSelected: d.type === "submission_only" ? data?.report_submission_outcome_approval ? false : true : data?.report_submission_outcome_approval ? true : false
                    }
                })
                // console.log(expected_outcome)
                return {
                    expected_outcome: expected_outcome,
                    actual_outcome: actual_outcome
                }
            })
        }
    },[report_submission_preference])

    return (
        <section className="">
            {
                isLoading || isFetching ? (
                   <div className="h-screen grid place-content-center">
                        <PageLoader/>
                   </div>
                ) : 
                <>
                    <div className="flex justify-end gap-2">
                        <Button
                            className={cn(
                                "border border-[var(--primary-color)] text-[var(--primary-color)] hover:text-primary/5 disabled:opacity-30"
                            )}
                            variant="outline"
                            // disabled={active_fy_info?.status !== "active" || HAS_NO_PERMISSION()}
                            onClick={() => setShowReopenSubmissionModal(true)}
                        >
                            Reopen Submission Period
                        </Button>
                        <Button
                            className={cn(
                                "border border-[var(--primary-color)] text-[var(--primary-color)] hover:text-primary/5 disabled:opacity-30"
                            )}
                            variant="outline"
                            // disabled={active_fy_info?.status !== "active" || HAS_NO_PERMISSION()}
                            onClick={() => setShowExtendSubmissionModal(true)}
                        >
                            Extend Submission Period
                        </Button>
                    </div>
                    <CardContainer className="mt-6"
                        title="Expected Outcome and Target Setting Period"
                        subTitle="Select below if you want to accept submissions or allow line manager review and approve submissions of expected outcomes and targets"
                    >
                        <div className="mt-7">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="w-1/3 flex items-center justify-between">
                                    {
                                        actionTypes?.expected_outcome?.map((item: Dictionary, index) => (
                                            <RadioButtonLabel key={item?.id} isActive={item?.isSelected} label={item?.title} onClick={() => {
                                                handleOptionChange("expected_outcome", item.id)
                                                formik.setFieldValue('action_type', item?.type)
                                            }} />
                                        ))
                                    }
                                </div>

                                {formik.values?.action_type === "submission_only" &&
                                    <div className="mt-8 lg:w-2/5">
                                        <h2 className="text-sm">Set when submission should occur</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <CustomSelect
                                                label="Review Period"
                                                options={REVIEW_PERIOD_OPTIONS}
                                                selected={formik.values?.outcome?.submission?.review_period}
                                                setSelected={(selected) => {
                                                    formik.setFieldValue('outcome.submission.review_period', selected)
                                                }}
                                            />

                                        </div>
                                    </div>
                                }

                                {formik.values?.action_type === "submission_and_approval" &&
                                    <div className="mt-8 lg:w-2/5">
                                        <h2 className="text-sm">Set when submission should occur</h2>
                                        <div className="mt-3 grid grid-cols-2 gap-4">
                                            <CustomSelect
                                                label="Review Period"
                                                options={REVIEW_PERIOD_OPTIONS}
                                                selected={formik.values?.outcome?.submission_approval?.submission_review_period}
                                                setSelected={(selected) => {
                                                    formik.setFieldValue('outcome.submission_approval.submission_review_period', selected)
                                                }}
                                            />
                                        </div>

                                        <div className="mt-8">
                                            <h2 className="text-sm">Set when approval should occur</h2>
                                            <div className="mt-3 grid grid-cols-2 gap-4">
                                                <CustomSelect
                                                    label="Review Period"
                                                    options={REVIEW_PERIOD_OPTIONS}
                                                    selected={formik.values?.outcome?.submission_approval?.approval_review_period}
                                                    setSelected={(selected) => {
                                                        formik.setFieldValue('outcome.submission_approval.approval_review_period', selected)
                                                    }}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                }

                                <Button
                                    className="mt-7"
                                    type="submit"
                                    loading={isSettingExpectedOutcome}
                                    disabled={isSettingExpectedOutcome ||
                                        actionTypes?.expected_outcome?.every((f: Dictionary) => f.isSelected === false)
                                    }
                                    loadingText="Save Preferences"
                                >Save Preferences</Button>
                            </form>
                        </div>
                    </CardContainer>

                    <CardContainer className="mt-6"
                        title="Actual Outcomes and Achievements Submission Period"
                        subTitle="Select below if you want to accept submissions or allow line manager review and approve submitting of actual outcomes and achievements"
                    >
                        <div className="mt-7">
                            <form onSubmit={formik_1.handleSubmit}>
                                <div className="w-1/3 flex items-center justify-between">
                                    {
                                        actionTypes?.actual_outcome?.map((item: Dictionary, index) => (
                                            <RadioButtonLabel key={item?.id} isActive={item?.isSelected} label={item?.title} onClick={() => {
                                                handleOptionChange("actual_outcome", item.id)
                                                formik_1.setFieldValue('action_type', item?.type)
                                            }} />
                                        ))
                                    }
                                </div>

                                {formik_1.values?.action_type === "submission_only" &&
                                    <div className="mt-8 lg:w-2/5">
                                        <h2 className="text-sm">Set when submission should occur</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <CustomSelect
                                                label="Review Period"
                                                options={REVIEW_PERIOD_OPTIONS}
                                                selected={formik_1.values?.outcome?.submission?.review_period}
                                                setSelected={(selected) => {
                                                    formik_1.setFieldValue('outcome.submission.review_period', selected)
                                                }}
                                            />

                                        </div>
                                    </div>
                                }

                                {formik_1.values?.action_type === "submission_and_approval" &&
                                    <div className="mt-8 lg:w-2/5">
                                        <h2 className="text-sm">Set when submission should occur</h2>
                                        <div className="mt-3 grid grid-cols-2 gap-4">
                                            <CustomSelect
                                                label="Review Period"
                                                options={REVIEW_PERIOD_OPTIONS}
                                                selected={formik_1.values?.outcome?.submission_approval?.submission_review_period}
                                                setSelected={(selected) => {
                                                    formik_1.setFieldValue('outcome.submission_approval.submission_review_period', selected)
                                                }}
                                            />
                                        </div>

                                        <div className="mt-8">
                                            <h2 className="text-sm">Set when approval should occur</h2>
                                            <div className="mt-3 grid grid-cols-2 gap-4">
                                                <CustomSelect
                                                    label="Review Period"
                                                    options={REVIEW_PERIOD_OPTIONS}
                                                    selected={formik_1.values?.outcome?.submission_approval?.approval_review_period}
                                                    setSelected={(selected) => {
                                                        formik_1.setFieldValue('outcome.submission_approval.approval_review_period', selected)
                                                    }}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                }

                                <Button
                                    className="mt-7"
                                    type="submit"
                                    loading={isSettingActualOutcome}
                                    disabled={isSettingActualOutcome ||
                                        actionTypes?.actual_outcome?.every((f: Dictionary) => f.isSelected === false)
                                    }
                                    loadingText="Save Preferences"
                                >Save Preferences</Button>
                            </form>
                        </div>
                    </CardContainer>

                    <ExtendSubmissionModal show={showExtendSubmissionModal} handleClose={() => setShowExtendSubmissionModal(false)} />

                    <ReopenSubmissionModal show={showReopenSubmissionModal} handleClose={() => setShowReopenSubmissionModal(false)} />
                </>
            }
        </section>
    );
}

export default OutcomeTargetSettings;
