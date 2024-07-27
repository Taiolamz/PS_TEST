import CustomSelect from '@/components/custom-select';
import PasswordChecker from '@/components/password-checker';
import TogglePassword from '@/components/toggle-password';
import { Input } from '@/components/ui/input';
import { COUNTRIES, NUMBER_OF_EMPLOYEES, STATES } from '@/utils/data';
import { passwordValidations } from '@/utils/schema';
import { CheckIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import { passwordValidation as pv } from "@/utils/schema";

interface OrganizationInformationProps {
    formik: any
}

const OrganizationInformation = ({ formik }: OrganizationInformationProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            <div className="flex flex-col gap-5">
                <Input
                    label="Organization Name"
                    id="organization_name"
                    name="organization_name"
                    value={formik.values.organization_name}
                    onChange={formik.handleChange}
                    touched={formik.touched.organization_name}
                    error={formik.errors.organization_name}
                    placeholder="Enter Full Name"
                />
                <CustomSelect
                    label="Number of Employees"
                    options={NUMBER_OF_EMPLOYEES}
                    selected={formik.values.employees_range}
                    setSelected={(selected) => {
                        formik.setFieldValue("employees_range", selected)
                    }}
                    touched={formik.touched.employees_range}
                    error={formik.errors.employees_range}
                />
            </div>
            <div className="mt-6 flex flex-col gap-3">
                <Input
                    label="Location"
                    id="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    touched={formik.touched.address}
                    error={formik.errors.address}
                    placeholder="Enter Address"
                />
                <Input
                    id="City"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    touched={formik.touched.city}
                    error={formik.errors.city}
                    placeholder="Enter City"
                />
                <div className="grid grid-cols-2 gap-4">
                    <CustomSelect
                        options={COUNTRIES}
                        selected={formik.values.country}
                        setSelected={(selected) => formik.setFieldValue("country", selected)}
                        touched={formik.touched.country}
                        error={formik.errors.country}
                        placeholder="Select Country"
                    />
                    <CustomSelect
                        options={STATES}
                        selected={formik.values.state}
                        setSelected={(selected) => formik.setFieldValue("state", selected)}
                        touched={formik.touched.state}
                        error={formik.errors.state}
                        placeholder="Select State"
                    />
                </div>
            </div>
            <div className="mt-9 relative">
                <Input
                    label="Password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    touched={formik.touched.password}
                    error={formik.errors.password}
                    placeholder="Input Password"
                    type={showPassword ? 'text' : 'password'}
                />
                <TogglePassword
                    showPassword={showPassword}
                    setShowPassword={() => setShowPassword(!showPassword)}
                    className="top-8"
                />
                <div className="mt-3 flex flex-col gap-2">
                    {passwordValidations.map((validation, idx) => (
                        <PasswordChecker key={idx} isValid={pv(formik.values.password, validation)} title={validation} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrganizationInformation;
