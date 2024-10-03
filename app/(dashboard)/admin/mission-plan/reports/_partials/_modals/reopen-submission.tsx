import CustomSelect from "@/components/custom-select";
import ReusableModalContainer from "@/components/reusable-modal-container";
import { Button } from "@/components/ui/button";
import { EXTEND_PERIOD_OPTIONS, REVIEW_PERIOD_OPTIONS } from "../../_data";
import { useFormik } from "formik";
import { Textarea } from "@/components/ui/textarea";
import ConfirmationModal from "@/components/atoms/modals/confirm";
import { useEffect, useMemo, useState } from "react";
import { monthNames } from "@/utils/helpers";
import { RadioButtonLabel } from "@/components/inputs";
import { Dictionary } from "@/@types/dictionary";
import { CustomMultipleSelect } from "@/components/inputs/custom-multiple-select";
import { cn } from "@/lib/utils";

interface ModalContainerProps {
    show: boolean;
    handleClose: () => void;
    // loading?: boolean;
    // disabled?: boolean;
    // children?: React.ReactNode;
    // style?: string;
    // handleSubmit: () => void;
}

const SUBMISSION_OPTIONS = [
    {
        id: 1,
        title: 'Individual',
        isSelected: false,
        hide: false
    },
    {
        id: 2,
        title: 'All Staff',
        isSelected: false,
        hide: false
    },
    {
        id: 3,
        title: 'Department',
        isSelected: false,
        hide: false
    },
    {
        id: 4,
        title: 'Unit',
        isSelected: false,
        hide: false
    },
    {
        id: 5,
        title: 'Branches',
        isSelected: false,
        hide: false
    },
    {
        id: 6,
        title: 'Subsidiary',
        isSelected: false,
        hide: false
    },
]

export default function ReopenSubmissionModal({ show, handleClose }: ModalContainerProps) {
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const [currentOptions, setCurrentOptions] = useState(SUBMISSION_OPTIONS)

    const OPTIONS = useMemo(() => {
        return currentOptions
    },[currentOptions])

    const getSelectedOption = () => {
        return OPTIONS?.filter((f: Dictionary) => f.isSelected === true)?.[0]
    }

    const handleOptionChange = (id: number) => {
        setCurrentOptions((prevState) => prevState.map((item: any) => {
            return {
                ...item,
                isSelected: item.id === id
            }
        }))
    }

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
                handleClose={() => {
                    setCurrentOptions(SUBMISSION_OPTIONS)
                    handleClose()
                }}
                hasCloseButton={true}
                title={`Reopen ${monthNames[new Date().getMonth()]} Submission`}
                modalClass={`md:w-[50rem] md:max-w-[50rem]`}
            >

                <div className="px-6 pb-5">
                    <span className="block mb-5 text-gray-400 text-sm font-light">You are about to reopen submission and approval of mission plan reports for your employees </span>
                    <form>
                        <div className="mb-4">
                            <CustomSelect
                                label="Period"
                                options={EXTEND_PERIOD_OPTIONS}
                                selected={formik.values?.period}
                                setSelected={(selected) => {
                                    formik.setFieldValue('period', selected)
                                }}
                                className="w-1/3"
                            />
                        </div>
                        <div className="my-6">
                            <span className="text-sm text-gray-600">Select Staff</span>
                            <div className="my-2 flex items-center gap-6">
                                {
                                    OPTIONS?.map(({id, title, isSelected, hide}) => (
                                        <RadioButtonLabel 
                                            key={id} 
                                            label={title} 
                                            isActive={isSelected}
                                            onClick={() => handleOptionChange(id)}
                                        />
                                    ))
                                }
                            </div>
                            <div className="mt-4 mb-7">
                               { getSelectedOption()?.title === "Individual" && <CustomMultipleSelect
                                    label="Individual"
                                    options={[
                                        { label: "Ayomide", value: "123"},
                                        { label: "Dada", value: "1234"},
                                        { label: "Lola", value: "12345"},
                                    ]}
                                    onValueChange={(selected) => console.log(selected)}
                                    className={cn(
                                        "w-2/5", 
                                    )}
                                />}
                               { getSelectedOption()?.title === "Department" && <CustomMultipleSelect
                                    label="Department"
                                    options={[
                                        { label: "P&C", value: "123"},
                                        { label: "Engineering", value: "1234"},
                                        { label: "HR", value: "12345"},
                                    ]}
                                    onValueChange={(selected) => console.log(selected)}
                                    className={cn(
                                        "w-2/5", 
                                    )}
                                />}
                               { getSelectedOption()?.title === "Unit" && <CustomMultipleSelect
                                    label="Unit"
                                    options={[
                                        { label: "Unit A", value: "123"},
                                        { label: "Unit B", value: "1234"},
                                        { label: "Unit C", value: "12345"},
                                    ]}
                                    onValueChange={(selected) => console.log(selected)}
                                    className={cn(
                                        "w-2/5", 
                                    )}
                                />}
                               { getSelectedOption()?.title === "Branches" && <CustomMultipleSelect
                                    label="Branches"
                                    options={[
                                        { label: "Ugbowo", value: "123"},
                                        { label: "Ikeja", value: "1234"},
                                        { label: "Opic`", value: "12345"},
                                    ]}
                                    onValueChange={(selected) => console.log(selected)}
                                    className={cn(
                                        "w-2/5", 
                                    )}
                                />}
                               { getSelectedOption()?.title === "Subsidiary" && <CustomMultipleSelect
                                    label="Subsidiary"
                                    options={[
                                        { label: "Toms Ltd.", value: "123"},
                                        { label: "Tony Ventures", value: "1234"},
                                        { label: "Bright Models", value: "12345"},
                                    ]}
                                    onValueChange={(selected) => console.log(selected)}
                                    className={cn(
                                        "w-2/5", 
                                    )}
                                />}
                            </div>
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
