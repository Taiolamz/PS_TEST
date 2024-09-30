import CustomSelect from "@/components/custom-select";
import ReusableModalContainer from "@/components/reusable-modal-container";
import { Button } from "@/components/ui/button";
import { REVIEW_PERIOD_OPTIONS } from "../../_data";
import { useFormik } from "formik";
import { Textarea } from "@/components/ui/textarea";
import ConfirmationModal from "@/components/atoms/modals/confirm";
import { useState } from "react";
import { monthNames } from "@/utils/helpers";

interface ModalContainerProps {
    show: boolean;
    handleClose: () => void;
    // loading?: boolean;
    // disabled?: boolean;
    // children?: React.ReactNode;
    // style?: string;
    // handleSubmit: () => void;
}

export default function ExtendSubmissionModal({ show, handleClose }: ModalContainerProps) {
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const formik = useFormik({
        initialValues: {
            period: ""
        },
        onSubmit: (values) => { }
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
                    <form>
                        <div className="mb-4">
                            <CustomSelect
                                label="Period"
                                options={REVIEW_PERIOD_OPTIONS}
                                selected={formik.values?.period}
                                setSelected={(selected) => {
                                    formik.setFieldValue('period', selected)
                                }}
                                className="w-1/2"
                            />
                        </div>
                        <div className="mb-6">
                            <Textarea
                                id="note"
                                name="note"
                                label="Add Note"
                                rows={4}

                            />
                        </div>
                        <Button
                            className="w-fit rounded-sm p-5 px-9 font-normal transition-all duration-200"
                            //   loading={loading}
                            //   disabled={disabled || loading}
                            loadingText="Extend Period"
                            type="button"
                            onClick={() => {
                                handleClose()
                                setShowSuccessModal(true)
                            }}
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </ReusableModalContainer>

            <ConfirmationModal
                icon="/assets/images/success.gif"
                iconClass="w-40"
                title="Changes Have been Saved!"
                message="Congratulations! your changes have been saved. Click below to continue"
                show={showSuccessModal}
                handleClose={() => setShowSuccessModal(false)}
                handleClick={() => setShowSuccessModal(false)}
                actionBtnTitle="Complete"
                modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
            />
        </>
    )
}
