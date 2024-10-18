"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import CustomSelect from "@/components/custom-select";
import CustomDateInput from "@/components/custom-date-input";
import { formatDate } from "@/utils/helpers/date-formatter";
import { useEmployee } from "../../_hooks/useEmployee";
import FormLayout from "../../_components/form-layout";
import DashboardModal from "../../_components/checklist-dashboard-modal";
import CancelModal from "../../_components/cancel-modal";
import routesPath from "@/utils/routes";
import { useGetAllRolesQuery } from "@/redux/services/role/rolesApi";
import { Dictionary } from "@/@types/dictionary";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import { processInputAsArray } from "@/utils/helpers";
import { useAppSelector } from "@/redux/store";
import { trimLongString } from "@/app/(dashboard)/_layout/Helper";
import { useFormik } from "formik";
import { formSchema } from "@/utils/schema/employee";
import { Button } from "@/components/ui/button";
import { COUNTRIES_STATES } from "@/utils/data";
import { useUpdateStaffMutation } from "@/redux/services/employee/employeeApi";
import { toast } from "sonner";

const { ADMIN } = routesPath;

export default function AddEmployee({
    params,
}: {
    params: { employeeId: string };
}) {

    const { employee } = useAppSelector((state) => state.employee)

    const [updateStaff, { isLoading: isUpdatingStaff }] = useUpdateStaffMutation()
    const { data: rolesData, isLoading: isLoadingroles } = useGetAllRolesQuery(
        {}
    );

    // const roleObj = rolesData?.data?.filter((f: Dictionary) => f.name === employee?.role)?.[0] ?? {}
    // const [selectedState, setSelectedState] = useState("");
    const { user, checklist } = useAppSelector((state) => state.auth);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [isNewEmployee, setIsNewEmployee] = useState("");
    const [selectedCountryData, setSelectedCountryData] = useState<Dictionary>(
        {}
    );


    const router = useRouter();
    const route = () => router.push(ADMIN.EMPLOYEES);
    const cancelRoute = ADMIN.CHECKLIST;
    const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";


    const handleUpdateStaff = async (values: Dictionary) => {
        updateStaff({
            staffId: params?.employeeId,
            payload: values
        })
            .unwrap()
            .then(() => {
                toast.success("Employee Updated Successfully")
                router.back()

            })
    }

    const formik = useFormik({
        initialValues: {
            // staffMemberId: params?.employeeId,
            first_name: employee?.name?.split(" ")?.[0] || "",
            middle_name: employee?.middle_name || "",
            last_name: employee?.name?.split(" ")?.[1] || "",
            maiden_name: employee?.maiden_name || "",
            date_of_birth: employee?.date_of_birth || "",
            gender: employee?.gender?.toLowerCase() || "",
            resumption_date: employee?.resumption_date || "",
            level: employee?.level || "",
            subsidiary: {
                name: employee?.subsidiary?.name || "",
                id: employee?.subsidiary?.id || "",
            },
            subsidiary_id: employee?.subsidiary?.id || "",
            line_manager: {
                name: employee?.line_manager_name || "",
                email: employee?.line_manager_email || "",
                id: employee?.line_manager_id || "",
                value: "",
                label: "",
            },
            department: {
                id: employee?.department?.id || "",
                name: employee?.department?.name || "",
            },
            department_id: employee?.department?.id || "",
            branch: {
                name: employee?.branch?.name || "",
                id: employee?.branch?.id || ""
            },
            branch_id: employee?.branch?.id || "",
            branch_name: employee?.branch?.name || "",
            unit_id: employee?.unit?.id || "",
            unit: {
                name: employee?.unit?.name || "",
                id: employee?.unit?.id || ""
            },
            unit_name: employee?.unit?.name || "",
            designation: employee?.designation || "",
            staff_number: employee?.staff_number || "",
            new_employee: employee?.new_employee || "",
            email: employee?.email || "",
            line_manager_email: employee?.line_manager_email || "",
            phone_number: employee?.phone_number || "",
            role: employee?.role || "",
            role_id: "",
            address: employee?.address || "",
            city: employee?.city || "",
            state: employee?.state || "",
            country: employee?.country || "",
            previous_designation: employee?.previous_designation || "",
            previous_designation_start_date: employee?.previous_designation_start_date || "",
            previous_designation_end_date: employee?.previous_designation_end_date || "",
        },
        validationSchema: formSchema,
        onSubmit: handleUpdateStaff,
        enableReinitialize: true
    });

    // console.log(formik?.values)

    const {
        subsidiaries,
        departments,
        branches,
        units,
        genderOptions,
        gradeLevels,
        newEmployeeStatuses,
        newEmployeeDrop,
        handleProceedCancel,
        openCancelModal,
        handleCancelDialog,
        employees,
    } = useEmployee({ path: route, cancelPath: cancelRoute });

    const handleSubsidiaryChange = (selectedName: string) => {
        const selectedSub = (subsidiaries as SubsidiaryData[]).find(
            (emp) => emp.name === selectedName
        );
        if (selectedSub) {
            formik.setFieldValue("subsidiary.name", selectedSub.name);
            formik.setFieldValue("subsidiary.id", selectedSub.id);
            formik.setFieldValue("subsidiary_id", selectedSub.id);
            formik.setFieldValue("branch_id", "");
            formik.setFieldValue("department_id", "");
            formik.setFieldValue("unit_id", "");
        } else {
            formik.setFieldValue("subsidiary.name", "");
            formik.setFieldValue("subsidiary.id", "");
            formik.setFieldValue("subsidiary_id", "");
            formik.setFieldValue("branch_id", "");
            formik.setFieldValue("department_id", "");
            formik.setFieldValue("unit_id", "");
        }
    };

    const BRANCH_OPTION = ({ obj, SubId }: { obj: any; SubId?: string }) => {
        let finalMapValue = [
            {
                value: "",
                label: "Select Option",
            },
        ];
        if (
            processInputAsArray(user?.organization?.hierarchy)?.includes("subsidiary")
        ) {
            const filtered = obj?.filter(
                (item: any) => item?.subsidiary_id === SubId
            );
            finalMapValue = [
                {
                    label: "Select Branch",
                    value: "",
                    name: "",
                    id: "",
                },
                ...filtered?.map((org: { id: string; name: string }) => ({
                    value: org.id,
                    label: org.name,
                })),
            ];
        } else {
            finalMapValue = [
                {
                    label: "Select Branch",
                    value: "",
                    name: "",
                    id: "",
                },
                ...obj?.map((org: { id: string; name: string }) => ({
                    value: org.id,
                    label: org.name,
                })),
            ];
        }
        return finalMapValue;
    };

    const DEPT_OPTION = ({
        obj,
        SubId,
        BranId,
    }: {
        obj: any;
        SubId?: string;
        BranId?: string;
    }) => {
        let finalMapValue = [
            {
                value: "",
                label: "Select Option",
            },
        ];
        if (
            processInputAsArray(user?.organization?.hierarchy)?.includes("branch")
        ) {
            const filtered = obj?.filter((item: any) => item?.branch_id === BranId);
            finalMapValue = [
                {
                    label: "Select Department",
                    value: "",
                    name: "",
                    id: "",
                },
                ...filtered?.map((org: { id: string; name: string }) => ({
                    value: org.id,
                    label: org.name,
                })),
            ];
        } else if (
            processInputAsArray(user?.organization?.hierarchy)?.includes("subsidiary")
        ) {
            const filtered = obj?.filter(
                (item: any) => item?.subsidiary === SubId
            );
            finalMapValue = [
                {
                    label: "Select Department",
                    value: "",
                    name: "",
                    id: "",
                },
                ...filtered?.map((org: { id: string; name: string }) => ({
                    value: org.id,
                    label: org.name,
                })),
            ];
        } else {
            finalMapValue = [
                {
                    label: "Select Department",
                    value: "",
                    name: "",
                    id: "",
                },
                ...obj?.map((org: { id: string; name: string }) => ({
                    value: org.id,
                    label: org.name,
                })),
            ];
        }
        return finalMapValue;
    };

    const UNIT_OPTION = ({
        obj,
        SubId,
        BranId,
        DeptId,
    }: {
        obj: any;
        SubId?: string;
        BranId?: string;
        DeptId?: string;
    }) => {
        let finalMapValue = [
            {
                value: "",
                label: "Select Option",
            },
        ];
        if (
            processInputAsArray(user?.organization?.hierarchy)?.includes("department")
        ) {
            const filtered = obj?.filter(
                (item: any) => item?.department_id === DeptId
            );
            finalMapValue = [
                {
                    label: "Select Unit",
                    value: "",
                    name: "",
                    id: "",
                },
                ...filtered?.map((org: { id: string; name: string }) => ({
                    value: org.id,
                    label: org.name,
                })),
            ];
        } else if (
            processInputAsArray(user?.organization?.hierarchy)?.includes("branch")
        ) {
            const filtered = obj?.filter((item: any) => item?.branch_id === BranId);
            finalMapValue = [
                {
                    label: "Select Unit",
                    value: "",
                    name: "",
                    id: "",
                },
                ...filtered?.map((org: { id: string; name: string }) => ({
                    value: org.id,
                    label: org.name,
                })),
            ];
        } else if (
            processInputAsArray(user?.organization?.hierarchy)?.includes("subsidiary")
        ) {
            const filtered = obj?.filter(
                (item: any) => item?.subsidiary === SubId
            );
            finalMapValue = [
                {
                    label: "Select Unit",
                    value: "",
                    name: "",
                    id: "",
                },
                ...filtered?.map((org: { id: string; name: string }) => ({
                    value: org.id,
                    label: org.name,
                })),
            ];
        } else {
            finalMapValue = [
                {
                    label: "Select Unit",
                    value: "",
                    name: "",
                    id: "",
                },
                ...obj?.map((org: { id: string; name: string }) => ({
                    value: org.id,
                    label: org.name,
                })),
            ];
        }
        return finalMapValue;
    };



    const handleHeadSelectChange = (selectedName: string) => {
        // console.log(selectedName);

        const selectedEmployee = (
            handleFormatNameLabel(employees) as AllStaff[]
        ).find((emp: any) => emp.value === selectedName);
        // console.log(selectedEmployee);

        if (selectedEmployee) {
            formik.setFieldValue("line_manager", selectedEmployee);
            formik.setFieldValue("line_manager_email", selectedEmployee.email);
            formik.setFieldValue("head.id", selectedEmployee.id);
        } else {
            formik.setFieldValue("line_manager.name", "");
            formik.setFieldValue("line_manager_email", "");
            formik.setFieldValue("head.id", "");
        }
    };
    const handleFormatNameLabel = (arr: any) => {
        if (arr?.length > 0) {
            const newList = arr?.map((chi: any) => {
                return {
                    ...chi,
                    // label: `${chi?.name} ( ${
                    //   chi?.name === "Ayomipe Olorunsola"
                    //     ? `stingy girl`
                    //     : trimLongString(chi?.email, 15)
                    // } )`,
                    label: `${chi?.name} ( ${trimLongString(chi?.email, 15)} )`,
                    value: `${chi?.name} ( ${trimLongString(chi?.email, 15)} )`,
                };
            });
            // console.log(newList);
            return newList;
        }
    };

    useEffect(() => {
        if (rolesData?.data) {
            const roleObj = rolesData?.data?.filter((f: Dictionary) => f.name === employee?.role)?.[0] ?? {}

            setSelectedRole(roleObj?.name)
            formik.setFieldValue('role_id', roleObj?.id)
        }
        const countryData = COUNTRIES_STATES?.filter(
            (f: Dictionary) => f.name === employee.country
        )?.[0];
        setSelectedCountryData(countryData);
    }, [rolesData, employee])

    // console.log(formik.isValid)

    return (
        <>
            <DashboardLayout back headerTitle="Edit Employee Information">
                {/* <ReusableStepListBox
                    btnText="Continue"
                    activeStep="1"
                    totalStep="1"
                    title="Create Employee"
                    btnDisabled={!formik.isValid || !formik.dirty}
                    loading={isCreatingEmployee}
                    onSave={formik.handleSubmit}
                // onCancel={handleCancelDialog}
                /> */}
                <div
                    className=""
                    style={{ padding: "0rem 2rem", marginTop: "-1.5rem" }}
                >
                    <FormLayout
                        addText=""
                        module="Employee"
                        form={
                            <form
                                className="grid grid-cols-2 gap-x-10 gap-y-5 items-end mb-14"
                                onSubmit={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <Input
                                    label="First Name"
                                    type="text"
                                    placeholder="First Name"
                                    id="first_name"
                                    name="first_name"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    isRequired
                                />

                                <Input
                                    label="Middle Name"
                                    type="text"
                                    placeholder="Middle Name"
                                    id="middle_name"
                                    name="middle_name"
                                    value={formik.values.middle_name}
                                    onChange={formik.handleChange}
                                // isRequired
                                />

                                <Input
                                    label="Last Name"
                                    type="text"
                                    placeholder="Last Name"
                                    id="last_name"
                                    name="last_name"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    isRequired
                                />

                                <Input
                                    label="Maiden Name"
                                    type="text"
                                    placeholder="Maiden Name"
                                    id="maiden_name"
                                    name="maiden_name"
                                    value={formik.values.maiden_name}
                                    onChange={formik.handleChange}
                                // isRequired
                                />

                                <CustomSelect
                                    label="Gender"
                                    // isRequired
                                    placeholder="Select Gender"
                                    options={[
                                        { label: 'Male', value: 'male' },
                                        { label: 'Female', value: 'female' },
                                        { label: 'Other', value: 'other' }
                                    ]}
                                    selected={formik.values.gender}
                                    setSelected={(value) => formik.setFieldValue("gender", value)}
                                    labelClass={labelClassName}
                                />

                                <CustomDateInput
                                    id="date_of_birth"
                                    label="Date of Birth"
                                    selected={new Date(formik.values.date_of_birth)}
                                    handleChange={(date) => {
                                        formik.setFieldValue("date_of_birth", formatDate(date));
                                    }}
                                    placeholder="YYYY/MM/DD"
                                    error={""}
                                    className="relative"
                                    iconClass="top-[2rem]"
                                // isRequired
                                />

                                <CustomDateInput
                                    id="resumption_date"
                                    label="Resumption Date"
                                    selected={new Date(formik.values.resumption_date)}
                                    handleChange={(date) => {
                                        formik.setFieldValue("resumption_date", formatDate(date));
                                    }}
                                    placeholder="YYYY/MM/DD"
                                    iconClass="top-[2rem]"
                                    error={""}
                                    className="relative"
                                // isRequired
                                />
                                <Input
                                    label="Work Email"
                                    type="text"
                                    placeholder="Work Email"
                                    id="work_email"
                                    name="work_email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    isRequired
                                />

                                <CustomSelect
                                    label="Grade Level"
                                    placeholder="Grade Level"
                                    options={gradeLevels}
                                    selected={formik.values.level}
                                    setSelected={(value) => formik.setFieldValue("level", value)}
                                    labelClass={labelClassName}
                                    isRequired
                                />

                                {/* <CustomSelect
                                label="Line Manager name"
                                placeholder="Grade Level"
                                options={gradeLevels}
                                selected={formik.values.level}
                                setSelected={(value) => formik.setFieldValue("level", value)}
                                labelClass={labelClassName}
                                isRequired
                                /> */}

                                <CustomSelect
                                    label="Line Manager name"
                                    placeholder="Select Line manager"
                                    // options={[
                                    //   {
                                    //     label: "Select Line Manager name",
                                    //     value: "",
                                    //     name: "",
                                    //     id: "",
                                    //   },
                                    //   ...employees as any),
                                    // ]}
                                    options={handleFormatNameLabel(employees)}
                                    selected={formik.values.line_manager.label}
                                    setSelected={handleHeadSelectChange}
                                    selectTwo={formik.values.line_manager.name}
                                    // setSelected={() => {
                                    //   console.log(handleFormatNameLabel(employees));
                                    // }}
                                    labelClass={labelClassName}
                                // isRequired
                                />

                                <Input
                                    label="Line Manager Email"
                                    type="text"
                                    placeholder="Line Manager Email"
                                    id="line_manager_email"
                                    name="line_manager_email"
                                    disabled
                                    value={formik.values.line_manager_email}
                                    onChange={formik.handleChange}
                                // isRequired
                                />

                                {processInputAsArray(user?.organization?.hierarchy)?.includes(
                                    "subsidiary"
                                ) && (
                                        <CustomSelect
                                            label="Subsidiary"
                                            isRequired
                                            placeholder="Select Subsidiary"
                                            options={[
                                                {
                                                    name: "",
                                                    id: "",
                                                    label: "Select Subsidiary",
                                                    value: "",
                                                },
                                                ...subsidiaries,
                                            ]}
                                            // selected={selectedSubsidiary}
                                            selected={formik.values.subsidiary.name}
                                            setSelected={(value) => {
                                                handleSubsidiaryChange(value);
                                                setSelectedBranch("");
                                                setSelectedDepartment("");
                                                setSelectedUnit("");
                                            }}
                                            labelClass={labelClassName}
                                        />
                                    )}

                                {processInputAsArray(user?.organization?.hierarchy)?.includes(
                                    "branch"
                                ) && (
                                        <CustomSelect
                                            label="Branch"
                                            isRequired
                                            placeholder="Select Branch"
                                            options={BRANCH_OPTION({
                                                obj: branches,
                                                SubId: formik?.values?.subsidiary?.id,
                                            })}
                                            disabled={
                                                formik?.values.subsidiary.name?.length === 0 &&
                                                processInputAsArray(
                                                    user?.organization?.hierarchy
                                                )?.includes("subsidiary")
                                            }
                                            selected={formik.values.branch.id}
                                            setSelected={(value) => {
                                                setSelectedBranch(value);
                                                formik.setFieldValue("branch.id", value);
                                                formik.setFieldValue("branch_id", value);
                                                setSelectedDepartment("");
                                                formik.setFieldValue("department_id", "");
                                                setSelectedUnit("");
                                                formik.setFieldValue("unit_id", "");
                                            }}
                                            labelClass={labelClassName}
                                        />
                                    )}

                                {processInputAsArray(user?.organization?.hierarchy)?.includes(
                                    "department"
                                ) && (
                                        <CustomSelect
                                            label="Department"
                                            isRequired
                                            placeholder="Select Department"
                                            options={DEPT_OPTION({
                                                obj: departments,
                                                SubId: formik?.values?.subsidiary?.id,
                                                BranId: formik?.values?.branch_id,
                                            })}
                                            disabled={
                                                (formik?.values.subsidiary.name?.length === 0 &&
                                                    processInputAsArray(
                                                        user?.organization?.hierarchy
                                                    )?.includes("subsidiary")) ||
                                                (formik?.values.branch_id?.length === 0 &&
                                                    processInputAsArray(
                                                        user?.organization?.hierarchy
                                                    )?.includes("branch"))
                                            }
                                            selected={formik.values.department.id}
                                            setSelected={(value) => {
                                                setSelectedDepartment(value);
                                                formik.setFieldValue("department.id", value);
                                                formik.setFieldValue("department_id", value);
                                                setSelectedUnit("");
                                                formik.setFieldValue("unit_id", "");
                                            }}
                                            labelClass={labelClassName}
                                        />
                                    )}

                                {processInputAsArray(user?.organization?.hierarchy)?.includes(
                                    "unit"
                                ) && (
                                        <CustomSelect
                                            label="Unit"
                                            isRequired
                                            placeholder="Select Unit"
                                            options={UNIT_OPTION({
                                                obj: units,
                                                SubId: formik?.values?.subsidiary?.id,
                                                BranId: formik?.values?.branch_id,
                                                DeptId: formik?.values?.department_id,
                                            })}
                                            disabled={
                                                (formik?.values.subsidiary.name?.length === 0 &&
                                                    processInputAsArray(
                                                        user?.organization?.hierarchy
                                                    )?.includes("subsidiary")) ||
                                                (formik?.values.branch_id?.length === 0 &&
                                                    processInputAsArray(
                                                        user?.organization?.hierarchy
                                                    )?.includes("branch")) ||
                                                (formik?.values.department_id?.length === 0 &&
                                                    processInputAsArray(
                                                        user?.organization?.hierarchy
                                                    )?.includes("department"))
                                            }
                                            selected={formik.values.unit.id}
                                            setSelected={(value) => {
                                                setSelectedUnit(value);
                                                formik.setFieldValue("unit.id", value);
                                                formik.setFieldValue("unit_id", value);
                                            }}
                                            labelClass={labelClassName}
                                        />
                                    )}

                                <Input
                                    label="Job Title"
                                    type="text"
                                    placeholder="Job Title"
                                    id="designation"
                                    name="designation"
                                    value={formik.values.designation}
                                    onChange={formik.handleChange}
                                // isRequired
                                />

                                <Input
                                    label="Phone Number"
                                    type="tel"
                                    placeholder="Phone Number"
                                    id="phone_number"
                                    name="phone_number"
                                    maxLength={14}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const filteredValue = value.replace(/[^0-9+]/g, "");
                                        formik.setFieldValue("phone_number", filteredValue);
                                    }}
                                    value={formik.values.phone_number}
                                // isRequired
                                />

                                <Input
                                    label="Staff Number"
                                    type="text"
                                    placeholder="Staff Number"
                                    id="staff_number"
                                    name="staff_number"
                                    value={formik.values.staff_number}
                                    onChange={formik.handleChange}
                                // isRequired
                                />

                                <CustomSelect
                                    label="Role"
                                    placeholder="Select Role"
                                    options={rolesData?.data?.map((role: Dictionary) => {
                                        return {
                                            label: role.name,
                                            value: role.name,
                                        };
                                    })}
                                    selected={selectedRole}
                                    setSelected={(value) => {
                                        setSelectedRole(value);
                                        const selectedRoleId = rolesData?.data?.filter(
                                            (chi: Dictionary) => chi.name === value
                                        )[0].id;
                                        formik.setFieldValue("role_id", selectedRoleId);
                                    }}
                                    isRequired
                                    labelClass={labelClassName}
                                />

                                {/* <CustomSelect
                                    label="New Employee"
                                    placeholder="Select Status"
                                    options={newEmployeeStatuses}
                                    selected={isNewEmployee}
                                    setSelected={(value) => {
                                        setIsNewEmployee(value);
                                        const employeeId = newEmployeeDrop.filter(
                                            (chi) => chi.name === value
                                        )[0].id;
                                        formik.setFieldValue("new_employee", employeeId);
                                    }}
                                    // isRequired
                                    labelClass={labelClassName}
                                /> */}
                                <Input
                                    label="Former Job Title"
                                    type="text"
                                    placeholder="Former Job Title"
                                    id="Former Job Title"
                                    name="previous_designation"
                                    onChange={formik.handleChange}
                                    value={formik.values.previous_designation}
                                // isRequired
                                // disabled
                                />
                                <div
                                    className=""
                                    style={{
                                        width: "100%",
                                        display: "grid",
                                        gridTemplateColumns: "repeat(2, 1fr)",
                                        gap: "1.5rem",
                                    }}
                                >
                                    {" "}
                                    <CustomDateInput
                                        id="start_date"
                                        label="Start Date"
                                        selected={new Date(formik.values.previous_designation_start_date)}
                                        handleChange={(date) => {
                                            formik.setFieldValue("previous_designation_start_date", formatDate(date));
                                        }}
                                        placeholder="YYYY/MM/DD"
                                        error={""}
                                        className="relative"
                                        iconClass="top-[2rem]"
                                    // isRequired
                                    //   disabled
                                    />
                                    <CustomDateInput
                                        id="start_date"
                                        label="End Date"
                                        selected={new Date(formik.values.previous_designation_end_date)}
                                        handleChange={(date) => {
                                            formik.setFieldValue("previous_designation_end_date", formatDate(date));
                                        }}
                                        placeholder="YYYY/MM/DD"
                                        error={""}
                                        className="relative"
                                        iconClass="top-[2rem]"
                                    // isRequired
                                    // disabled
                                    />
                                </div>
                                {/* <h2>Address Information</h2> */}
                                <CustomSelect
                                    label="Country"
                                    labelClass="text-xs"
                                    // isRequired
                                    placeholder="Select country"
                                    options={[
                                        {
                                            label: "Select country",
                                            value: "",
                                        },
                                        ...COUNTRIES_STATES?.map((item) => {
                                            return {
                                                label: item.name,
                                                value: item.name,
                                            };
                                        }),
                                    ]}
                                    selected={formik.values?.country as any}
                                    setSelected={(value) => {
                                        formik.setFieldValue('country', value)
                                        const countryData = COUNTRIES_STATES?.filter(
                                            (f: Dictionary) => f.name === value
                                        )?.[0];
                                        setSelectedCountryData(countryData);
                                    }}
                                // labelClass={labelClassName}
                                />{" "}
                                <CustomSelect
                                    label="State"
                                    labelClass="text-xs"
                                    // isRequired
                                    placeholder="Select state"
                                    options={selectedCountryData?.stateProvinces?.map(
                                        (item: Dictionary) => {
                                            return {
                                                label: item.name,
                                                value: item.name,
                                            };
                                        }
                                    )}
                                    disabled={!formik.values.country}
                                    selected={formik.values?.state as any}
                                    setSelected={(value) => {
                                        formik.setFieldValue('state', value)
                                    }}
                                // labelClass={labelClassName}
                                />
                                <Input
                                    label="City"
                                    type="text"
                                    placeholder="E.g Lekki"
                                    id="cituy name"
                                    name="city"
                                    onChange={formik.handleChange}
                                    value={formik.values.city}
                                // isRequired
                                />
                                <Input
                                    label="Street Address"
                                    type="text"
                                    placeholder="E.g ikoyi"
                                    id="street add"
                                    name="address"
                                    onChange={formik.handleChange}
                                    value={formik.values.address}
                                // onChange={formik.handleChange}
                                // isRequired
                                /> <br />
                                {/* formik.isValid || !formik.dirty */}
                                <Button
                                    className="mt-4 px-6 w-fit"
                                    type="submit"
                                    disabled={isUpdatingStaff}
                                    loading={isUpdatingStaff}
                                    loadingText="Update Information"
                                >Update Information</Button>
                            </form>
                        }
                    />

                </div>
            </DashboardLayout>
        </>
    );
}
