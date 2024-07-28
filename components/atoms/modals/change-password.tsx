import PasswordChecker from '@/components/password-checker';
import TogglePassword from '@/components/toggle-password';
import { Input } from '@/components/ui/input';
import { ResetPasswordSchema, passwordValidations, passwordValidation as pv } from "@/utils/schema";
import { useFormik } from 'formik';
import { useState } from 'react';
import ConfirmationModal from './confirm';
import { Button } from '@/components/ui/button';

interface ChangePasswordModalProps {
    show: boolean,
    loading?: boolean,
    formik: any,
    handleClose: () => void,
    hasCloseButton?: boolean
    handleClick: () => void,
}

const ChangePasswordModal = ({ show, formik, loading, handleClose, handleClick, hasCloseButton }: ChangePasswordModalProps) => {
    const [showPassword, setShowPassword] = useState(false)

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
                    <form>
                        <div className="mt-9 relative w-[80%] mx-auto">
                            <div className='relative'>
                                <Input
                                    label="Password"
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    touched={formik.touched.password}
                                    error={formik.errors.password}
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
                                    value={formik.values.password_confirmation}
                                    onChange={formik.handleChange}
                                    touched={formik.touched.password_confirmation}
                                    error={formik.errors.password_confirmation}
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
                                    <PasswordChecker key={idx} isValid={pv(formik.values.password, validation)} title={validation} />
                                ))}
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Button
                                    type='submit'
                                    loading={loading}
                                    disabled={loading}
                                    className="w-fit rounded-sm p-3 px-9 mx-auto font-normal"
                                    onClick={handleClick}
                                >
                                    Save Password
                                </Button>
                            </div>
                        </div>
                    </form>
                </>}
                actionBtnLoading={loading}
            />
        </>
    );
}

export default ChangePasswordModal;
