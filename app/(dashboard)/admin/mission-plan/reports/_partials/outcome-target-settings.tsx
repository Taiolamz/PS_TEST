import { Dictionary } from "@/@types/dictionary";
import CustomDateInput from "@/components/custom-date-input";
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
        <section>
            <CardContainer className="mt-6"
                title="Action Type"
                subTitle="Select below if you want to accept submissions or allow line manager review and approve"
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

                        {formik.values.action_type === "submission_and_approval" &&
                            <div className="mt-8 lg:w-1/3">
                                <h2 className="text-sm">Submission Period</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <CustomDateInput
                                        label="Start Period"
                                        id="creation_start_date"
                                        // selected={new Date(formik.values.creation_start_date)}
                                        handleChange={(selected) => {
                                            // formik.setFieldValue(
                                            //     "creation_start_date",
                                            //     formatDate(selected)
                                            // );
                                        }}
                                        // touched={formik.touched.creation_start_date}
                                        // error={formik.errors.creation_start_date as string}
                                        placeholder="YYYY-MM-DD"
                                        isRequired

                                    />
                                    <CustomDateInput
                                        label="End Period"
                                        id="creation_start_date"
                                        // selected={new Date(formik.values.creation_start_date)}
                                        handleChange={(selected) => {
                                            // formik.setFieldValue(
                                            //     "creation_start_date",
                                            //     formatDate(selected)
                                            // );
                                        }}
                                        // touched={formik.touched.creation_start_date}
                                        // error={formik.errors.creation_start_date as string}
                                        placeholder="YYYY-MM-DD"
                                        isRequired

                                    />
                                </div>

                                <div className="mt-6">
                                    <h2 className="text-sm">Approval Period</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <CustomDateInput
                                            label="Start Period"
                                            id="creation_start_date"
                                            // selected={new Date(formik.values.creation_start_date)}
                                            handleChange={(selected) => {
                                                // formik.setFieldValue(
                                                //     "creation_start_date",
                                                //     formatDate(selected)
                                                // );
                                            }}
                                            // touched={formik.touched.creation_start_date}
                                            // error={formik.errors.creation_start_date as string}
                                            placeholder="YYYY-MM-DD"
                                            isRequired

                                        />
                                        <CustomDateInput
                                            label="End Period"
                                            id="creation_start_date"
                                            // selected={new Date(formik.values.creation_start_date)}
                                            handleChange={(selected) => {
                                                // formik.setFieldValue(
                                                //     "creation_start_date",
                                                //     formatDate(selected)
                                                // );
                                            }}
                                            // touched={formik.touched.creation_start_date}
                                            // error={formik.errors.creation_start_date as string}
                                            placeholder="YYYY-MM-DD"
                                            isRequired

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
                title="Expected Outcome and Target Setting Period"
                subTitle="Set the periods to start and end the submission of expected outcomes and targets"
            >
                <form>
                    <div className="mt-8 lg:w-1/3">
                        <div className="grid grid-cols-2 gap-4">
                            <CustomDateInput
                                label="Start Period"
                                id="creation_start_date"
                                // selected={new Date(formik.values.creation_start_date)}
                                handleChange={(selected) => {
                                    // formik.setFieldValue(
                                    //     "creation_start_date",
                                    //     formatDate(selected)
                                    // );
                                }}
                                // touched={formik.touched.creation_start_date}
                                // error={formik.errors.creation_start_date as string}
                                placeholder="YYYY-MM-DD"
                                isRequired

                            />
                            <CustomDateInput
                                label="End Period"
                                id="creation_start_date"
                                // selected={new Date(formik.values.creation_start_date)}
                                handleChange={(selected) => {
                                    // formik.setFieldValue(
                                    //     "creation_start_date",
                                    //     formatDate(selected)
                                    // );
                                }}
                                // touched={formik.touched.creation_start_date}
                                // error={formik.errors.creation_start_date as string}
                                placeholder="YYYY-MM-DD"
                                isRequired

                            />
                        </div>
                    </div>

                    <Button className="mt-7 px-8">Save</Button>
                </form>
            </CardContainer>

            <CardContainer className="mt-6"
                title="Actual Outcomes and Achievements Submission Period"
                subTitle="Set the periods to start and end the submitting of actual outcomes and achievements"
            >
                <form>
                    <div className="mt-8 lg:w-1/3">
                        <div className="grid grid-cols-2 gap-4">
                            <CustomDateInput
                                label="Start Period"
                                id="creation_start_date"
                                // selected={new Date(formik.values.creation_start_date)}
                                handleChange={(selected) => {
                                    // formik.setFieldValue(
                                    //     "creation_start_date",
                                    //     formatDate(selected)
                                    // );
                                }}
                                // touched={formik.touched.creation_start_date}
                                // error={formik.errors.creation_start_date as string}
                                placeholder="YYYY-MM-DD"
                                isRequired

                            />
                            <CustomDateInput
                                label="End Period"
                                id="creation_start_date"
                                // selected={new Date(formik.values.creation_start_date)}
                                handleChange={(selected) => {
                                    // formik.setFieldValue(
                                    //     "creation_start_date",
                                    //     formatDate(selected)
                                    // );
                                }}
                                // touched={formik.touched.creation_start_date}
                                // error={formik.errors.creation_start_date as string}
                                placeholder="YYYY-MM-DD"
                                isRequired

                            />
                        </div>
                    </div>

                    <Button className="mt-7 px-8">Save</Button>
                </form>
            </CardContainer>
        </section>
    );
}

export default OutcomeTargetSettings;
