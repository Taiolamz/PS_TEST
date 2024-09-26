import { Dictionary } from "@/@types/dictionary";
import CustomDateInput from "@/components/custom-date-input";
import CustomSelect from "@/components/custom-select";
import { CardContainer } from "@/components/fragment";
import { RadioButtonLabel } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { useMemo, useState } from "react";

const OutcomeTargetSettings = () => {
    const [submissionOptions, setSubmissionOptions] = useState([
        { id: 1, title: 'Submission Only', isSelected: true, type: "submission_only" },
        { id: 2, title: 'Submission and Approval', isSelected: false, type: "submission_and_approval" },
    ])
    const actionTypes = useMemo(() => submissionOptions,
        [submissionOptions]
    )

    const handleOptionChange = (id: number) => {
        setSubmissionOptions((prevState) => prevState.map((item) => {
            return {
                ...item,
                isSelected: item.id === id
            }
        }))
    }

    const formik = useFormik({
        initialValues: {
            submission_start_date: "",
            submission_end_date: "",
            approval_start_date: "",
            approval_end_date: "",
            action_type: ""
        },
        onSubmit: (values) => { }
    })

    return (
        <section className="">
            <CardContainer className="mt-6"
                title="Action Type"
                subTitle="Select below if you want to accept submissions or allow line manager review and approve submissions of expected outcomes and targets"
            >
                <div className="mt-7">
                    <form>
                        <div className="w-1/3 flex items-center justify-between">
                            {
                                actionTypes.map((item: Dictionary, index) => (
                                    <RadioButtonLabel key={item?.id} isActive={item?.isSelected} label={item?.title} onClick={() => {
                                        handleOptionChange(item.id)
                                        formik.setFieldValue('action_type', item?.type)
                                    }} />
                                ))
                            }
                        </div>

                        {formik.values.action_type === "submission_only" &&
                            <div className="mt-8 lg:w-1/3">
                                <h2 className="text-sm">Set when submission should occur</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <CustomSelect
                                        label="Review Period"
                                        options={[]}
                                        selected=""
                                        setSelected={() => null}
                                    />
                                    
                                </div>
                            </div>
                        }

                        {formik.values.action_type === "submission_and_approval" &&
                            <div className="mt-8 lg:w-1/3">
                                <h2 className="text-sm">Set when submission should occur</h2>
                                <div className="mt-3 grid grid-cols-2 gap-4">
                                    <CustomSelect
                                        label="Review Period"
                                        options={[]}
                                        selected=""
                                        setSelected={() => null}
                                    />
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-sm">Set when approval should occur</h2>
                                    <div className="mt-3 grid grid-cols-2 gap-4">
                                        <CustomSelect
                                            label="Review Period"
                                            options={[]}
                                            selected=""
                                            setSelected={() => null}
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
                                actionTypes.map((item: Dictionary, index) => (
                                    <RadioButtonLabel key={item?.id} isActive={item?.isSelected} label={item?.title} onClick={() => {
                                        handleOptionChange(item.id)
                                        formik.setFieldValue('action_type', item?.type)
                                    }} />
                                ))
                            }
                        </div>

                        {formik.values.action_type === "submission_only" &&
                            <div className="mt-8 lg:w-1/3">
                                <h2 className="text-sm">Set when submission should occur</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <CustomSelect
                                        label="Review Period"
                                        options={[]}
                                        selected=""
                                        setSelected={() => null}
                                    />
                                    
                                </div>
                            </div>
                        }

                        {formik.values.action_type === "submission_and_approval" &&
                            <div className="mt-8 lg:w-1/3">
                                <h2 className="text-sm">Set when submission should occur</h2>
                                <div className="mt-3 grid grid-cols-2 gap-4">
                                    <CustomSelect
                                        label="Review Period"
                                        options={[]}
                                        selected=""
                                        setSelected={() => null}
                                    />
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-sm">Set when approval should occur</h2>
                                    <div className="mt-3 grid grid-cols-2 gap-4">
                                        <CustomSelect
                                            label="Review Period"
                                            options={[]}
                                            selected=""
                                            setSelected={() => null}
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
