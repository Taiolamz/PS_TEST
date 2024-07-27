import CustomSelect from '@/components/custom-select';
import TogglePassword from '@/components/toggle-password';
import { Input } from '@/components/ui/input';
import { COUNTRIES, NUMBER_OF_EMPLOYEES, STATES } from '@/utils/data';
import { CheckIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';

interface EmployeeInformationProps {
    formik: any
}

const EmployeeInformation = ({ formik }: EmployeeInformationProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            <div className="flex flex-col gap-5">
                <Input
                    label="First Name"
                    id="first_name"
                    name="first_name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    touched={formik.touched.first_name}
                    error={formik.errors.first_name}
                    placeholder="Enter First Name"
                />
                <Input
                    label="Last Name"
                    id="last_name"
                    name="last_name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    touched={formik.touched.last_name}
                    error={formik.errors.last_name}
                    placeholder="Enter Last Name"
                />
                <Input
                    label="Work Mail"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    touched={formik.touched.email}
                    error={formik.errors.email}
                    placeholder="Work Mail"
                />
                <Input
                    label="Designation"
                    id="designation"
                    name="designation"
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                    touched={formik.touched.designation}
                    error={formik.errors.designation}
                    placeholder="Designation"
                />
            </div>
        </div>
    );
}

export default EmployeeInformation;
