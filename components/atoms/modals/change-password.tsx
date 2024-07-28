import React, { useState } from 'react';
import ConfirmationModal from './confirm';
import { Input } from '@/components/ui/input';
import { useFormik } from 'formik';
import { passwordValidation as pv } from "@/utils/schema";
import { passwordValidations } from '@/utils/schema';
import TogglePassword from '@/components/toggle-password';
import PasswordChecker from '@/components/password-checker';

interface ChangePasswordModalProps {
    show: boolean,
    handleClose: () => void,
    hasCloseButton?: boolean
    handleClick: () => void,
}

const ChangePasswordModal = ({ show, handleClose, handleClick, hasCloseButton }: ChangePasswordModalProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const { values, errors, handleChange, touched } = useFormik({
        initialValues: {
            password: "",
            password_confirmation: "",
        },
        // validationSchema: ,
        onSubmit: handleClick
    })
    return (
        <>
            {/* Change Password Modal */}
            <ConfirmationModal
                show={show}
                handleClose={() => null}
                hasCloseButton={hasCloseButton}
                title="Create New Password"
                message="Ensure your new password is eight (8) characters long, contain at least one number."
                content={<>
                    <div className="mt-9 relative w-[80%] mx-auto">
                        <div className='relative'>
                            <Input
                                label="Password"
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                touched={touched.password}
                                error={errors.password}
                                placeholder="Enter Password"
                                type={showPassword ? 'text' : 'password'}
                            />
                            <TogglePassword
                                showPassword={showPassword}
                                setShowPassword={() => setShowPassword(!showPassword)}
                                className="top-8"
                            />
                        </div>
                        <div className="my-4 relative">
                            <Input
                                label="New Password"
                                id="new-password"
                                name="password_confirmation"
                                value={values.password_confirmation}
                                onChange={handleChange}
                                touched={touched.password_confirmation}
                                error={errors.password_confirmation}
                                placeholder="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                            />
                            <TogglePassword
                                showPassword={showPassword}
                                setShowPassword={() => setShowPassword(!showPassword)}
                                className="top-8"
                            />
                        </div>
                        <div className="mt-3 flex flex-col gap-2">
                            {passwordValidations.map((validation, idx) => (
                                <PasswordChecker key={idx} isValid={pv(values.password, validation)} title={validation} />
                            ))}
                        </div>
                    </div>
                </>}
                handleClick={() => {
                    // resetRegistration()
                    // setShowVerifyOTP(true)
                }}
                actionBtnTitle="Save Password"
            />
        </>
    );
}

export default ChangePasswordModal;
