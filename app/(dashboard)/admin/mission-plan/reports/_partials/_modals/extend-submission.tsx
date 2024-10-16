import CustomSelect from "@/components/custom-select";
import ReusableModalContainer from "@/components/reusable-modal-container";
import { Button } from "@/components/ui/button";
import { EXTEND_PERIOD_OPTIONS, EXTENSION_PERIOD_OPTIONS, REVIEW_PERIOD_OPTIONS } from "../../_data";
import { useFormik } from "formik";
import { Textarea } from "@/components/ui/textarea";
import ConfirmationModal from "@/components/atoms/modals/confirm";
import { useState } from "react";
import { monthNames } from "@/utils/helpers";
import * as yup from "yup"
import { Dictionary } from "@/@types/dictionary";
import { useExtendTargetSubmissionMutation } from "@/redux/services/mission-plan/reports/admin/targetOutcomeApi";

interface ModalContainerProps {
    show: boolean;
    handleClose: () => void;
    setShowSuccessModal: (arg: boolean) => void
    // loading?: boolean;
    // disabled?: boolean;
    // children?: React.ReactNode;
    // style?: string;
    // handleSubmit: () => void;
}

export default function ExtendSubmissionModal({ show, handleClose, setShowSuccessModal }: ModalContainerProps) {

    const [extendTargetSubmission, { isLoading }] = useExtendTargetSubmissionMutation()

    const handleExendSubmission = async (values: Dictionary) => {
        extendTargetSubmission(values)
            .unwrap()
            .then(() => {
                setShowSuccessModal(true)
                handleClose()
            })
    }

    const formik = useFormik({
        initialValues: {
            report_submission_new_duration: "",
            note: ""
        },
        onSubmit: handleExendSubmission,
        validationSchema: yup.object().shape({
            report_submission_new_duration: yup.string().required('Choose new duration period'),
            note: yup.string().required('Enter reason for extension')
        })
    })

    return (
        <>
            <ReusableModalContainer
                show={show}
                handleClose={handleClose}
                hasCloseButton={true}
                title={`Extend ${monthNames[new Date().getMonth()]} Submission`}
                modalClass={`md:w-[38rem] md:max-w-[38rem]`}
            >

                <div className="px-6 pb-5">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <CustomSelect
                                label="Period"
                                options={EXTENSION_PERIOD_OPTIONS}
                                selected={formik.values?.report_submission_new_duration}
                                setSelected={(selected) => {
                                    formik.setFieldValue('report_submission_new_duration', selected)
                                }}
                                className="w-1/2"
                                error={formik.errors.report_submission_new_duration}
                                touched={formik.touched.report_submission_new_duration}
                            />
                        </div>
                        <div className="mb-6">
                            <Textarea
                                id="note"
                                name="note"
                                label="Add Note"
                                rows={4}
                                onChange={formik.handleChange}
                                value={formik.values.note}
                                error={formik.errors.note}
                                touched={formik.touched.note}
                            />
                        </div>
                        <Button
                            className="w-fit rounded-sm p-5 px-9 font-normal transition-all duration-200"
                            loading={isLoading}
                            disabled={isLoading}
                            loadingText="Extend Period"
                            type="submit"
                        // onClick={() => {
                        //     handleClose()
                        //     setShowSuccessModal(true)
                        // }}
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </ReusableModalContainer>

        </>
    )
}
