"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import CustomSelect from "@/components/custom-select";
import { useContext, useEffect, useRef, useState } from "react";
import routesPath from "@/utils/routes";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { useEditBranch } from "./_hooks/useEditBranch";
import { Button } from "@/components/ui/button";
import { Dictionary } from "@/@types/dictionary";
import { COUNTRIES_STATES } from "@/utils/data";
import { Textarea } from "@/components/ui/textarea";
import { processInputAsArray } from "@/utils/helpers";
import { useAppSelector } from "@/redux/store";
import FormLayout from "../../_components/form-layout";

export default function Edit({
  params,
}: {
  params: {
    branchesId: string;
  };
}) {
  const actionCtx = useContext(ActionContext);
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const router = useRouter();
  const {
    formik,
    subsidiaries,
    employees,
    isLoadingSubsidiaries,
    isLoadingStates,
    branchInfo,
    handleSubmit,
    isUpdating,
  } = useEditBranch({ id: params.branchesId });
  const { user, checklist } = useAppSelector((state) => state.auth);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSubsidiary, setSelectedSubsidiary] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCountryData, setSelectedCountryData] = useState<Dictionary>(
    {}
  );

  useEffect(() => {
    if (branchInfo?.country) {
      const countryData = COUNTRIES_STATES?.filter(
        (f: Dictionary) => f.name === branchInfo?.country
      )?.[0];
      setSelectedCountryData(countryData);
    }
  }, [branchInfo]);

  const handleSubsidiaryChange = (selectedName: string) => {
    const selectedSub = (subsidiaries as SubsidiaryData[]).find(
      (emp) => emp.name === selectedName
    );
    if (selectedSub) {
      formik.setFieldValue("subsidiary_id.name", selectedSub.name);
      formik.setFieldValue("subsidiary_id.id", selectedSub.id);
    } else {
      formik.setFieldValue("subsidiary_id.name", "");
      formik.setFieldValue("subsidiary_id.id", "");
    }
  };

  const handleHeadSelectChange = (selectedName: string) => {
    const selectedEmployee = (employees as any[]).find(
      (emp) => emp.name === selectedName
    );

    if (selectedEmployee) {
      formik.setFieldValue("head.name", selectedEmployee.name);
      formik.setFieldValue("", selectedEmployee.email);
      formik.setFieldValue("head.email", selectedEmployee.email);
      formik.setFieldValue("head.id", selectedEmployee.id);
    } else {
      formik.setFieldValue("head.name", "");
      formik.setFieldValue("", "");
      formik.setFieldValue("head.id", "");
    }
  };

  return (
    <DashboardLayout back headerTitle="Edit Branch">
      <div className="" style={{ padding: "0rem 2rem", marginTop: "-1.5rem" }}>
        {/* <form
          className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3 mb-14"
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
          <Input
            label="Branch Name"
            type="text"
            placeholder="Branch Name"
            id="name"
            name="name"
            onChange={formik.handleChange}
            isRequired
          />
          <Input
            label="Branch Email"
            type="email"
            placeholder="Branch Email"
            id="branch_email"
            name="branch_email"
            onChange={formik.handleChange}
          />
          <Input
            label="Branch Address"
            type="text"
            placeholder="Branch address"
            id="address"
            name="address"
            onChange={formik.handleChange}
            isRequired
          />

          <CustomSelect
            label="Branch Country"
            isRequired
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
            selected={formik.values.country}
            setSelected={(value) => {
              formik.setFieldValue("country", value);
              const countryData = COUNTRIES_STATES?.filter(
                (f: Dictionary) => f.name === value
              )?.[0];
              formik.setFieldValue("state", "");
              setSelectedCountryData(countryData);
            }}
            // labelClass={labelClassName}
          />

          <CustomSelect
            label="Branch State"
            isRequired
            placeholder="Branch state"
            options={selectedCountryData?.stateProvinces?.map(
              (item: Dictionary) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              }
            )}
            selected={formik.values.state}
            setSelected={(value) => formik.setFieldValue("state", value)}
            disabled={formik?.values?.country.length === 0}
          />

          <CustomSelect
            label="Head of Branch"
            placeholder="Head of Branch"
            options={[
              {
                label: "Head of Branch",
                value: "",
                name: "",
                id: "",
              },
              ...employees,
            ]}
            selected={formik.values.head.name}
            setSelected={handleHeadSelectChange}
            labelClass={labelClassName}
            // isRequired
          />
          <Input
            label="Head of Branch Email"
            type="text"
            placeholder="Head of Branch"
            id=""
            value={formik.values.}
            name=""
            onChange={formik.handleChange}
            // isRequired
            disabled
          />
          {processInputAsArray(user?.organization?.hierarchy)?.includes(
            "subsidiary"
          ) && (
            <CustomSelect
              label="Subsidiary"
              isRequired={processInputAsArray(
                user?.organization?.hierarchy
              )?.includes("subsidiary")}
              placeholder="Select subsidiary"
              options={[
                {
                  name: "",
                  id: "",
                  label: "Select subsidiary",
                  value: "",
                },
                ...subsidiaries,
              ]}
              selected={formik.values.subsidiary_id.name}
              setSelected={handleSubsidiaryChange}
              // setSelected={(value) =>
              //   formik.setFieldValue("subsidiary.", value)
              // }
              labelClass={labelClassName}
            />
          )}
          <Textarea
            label="Branch Description"
            rows={3}
            id="description"
            name="description"
            placeholder="Description"
            className="mt-1 block px-3 py-2 border outline-none border-gray-300 rounded-md shadow-sm sm:text-sm"
            onChange={formik.handleChange}
            touched={formik.touched.description}
            value={formik.values.description}
            error={formik.errors.description}
          />
          <Button className="w-[170px] my-10" type="submit">
            Update Information
          </Button>
        </form> */}
        <FormLayout
          // addText="Add areas or regions to your organization account, by setting them up here."
          module="Branches"
          form={
            <form
              // className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3 mb-14"
              onSubmit={formik.handleSubmit}
              autoComplete="off"
            >
              <div className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3 mb-14">
                <Input
                  label="Branch Name"
                  type="text"
                  placeholder="Branch Name"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  isRequired
                />
                <Input
                  label="Branch Email"
                  type="email"
                  placeholder="Branch Email"
                  id="branch_email"
                  name="branch_email"
                  value={formik.values.branch_email}
                  onChange={formik.handleChange}
                />
                <Input
                  label="Branch Address"
                  type="text"
                  placeholder="Branch address"
                  id="address"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  isRequired
                />

                <CustomSelect
                  label="Branch Country"
                  isRequired
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
                  selected={formik.values.country}
                  setSelected={(value) => {
                    formik.setFieldValue("country", value);
                    const countryData = COUNTRIES_STATES?.filter(
                      (f: Dictionary) => f.name === value
                    )?.[0];
                    formik.setFieldValue("state", "");
                    setSelectedCountryData(countryData);
                  }}
                  // labelClass={labelClassName}
                />

                <CustomSelect
                  label="Branch State"
                  isRequired
                  placeholder="Branch state"
                  options={selectedCountryData?.stateProvinces?.map(
                    (item: Dictionary) => {
                      return {
                        label: item.name,
                        value: item.name,
                      };
                    }
                  )}
                  selected={formik.values.state}
                  setSelected={(value) => formik.setFieldValue("state", value)}
                  disabled={formik?.values?.country.length === 0}
                />

                <CustomSelect
                  label="Head of Branch"
                  placeholder="Head of Branch"
                  options={[
                    {
                      label: "Head of Branch",
                      value: "",
                      name: "",
                      id: "",
                    },
                    ...employees,
                  ]}
                  selected={formik.values.head.name}
                  setSelected={handleHeadSelectChange}
                  labelClass={labelClassName}
                  // isRequired
                />
                <Input
                  label="Head of Branch Email"
                  type="text"
                  placeholder="Head of Branch"
                  id=""
                  value={formik.values.head.email}
                  name=""
                  onChange={formik.handleChange}
                  // isRequired
                  disabled
                />
                {/* {processInputAsArray(user?.organization?.hierarchy)?.includes(
                  "subsidiary"
                ) && (
                  <CustomSelect
                    label="Subsidiary"
                    isRequired={processInputAsArray(
                      user?.organization?.hierarchy
                    )?.includes("subsidiary")}
                    placeholder="Select subsidiary"
                    options={[
                      {
                        name: "",
                        id: "",
                        label: "Select subsidiary",
                        value: "",
                      },
                      ...subsidiaries,
                    ]}
                    selected={formik.values.subsidiary_id.name}
                    setSelected={handleSubsidiaryChange}
                    // setSelected={(value) =>
                    //   formik.setFieldValue("subsidiary.", value)
                    // }
                    labelClass={labelClassName}
                  />
                )} */}
                {processInputAsArray(user?.organization?.hierarchy)?.includes(
                  "subsidiary"
                ) && (
                  <CustomSelect
                    label="Subsidiary"
                    isRequired={processInputAsArray(
                      user?.organization?.hierarchy
                    )?.includes("subsidiary")}
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
                    selected={formik.values.subsidiary_id.name}
                    setSelected={(selectedName) => {
                      handleSubsidiaryChange(selectedName);
                      setSelectedBranch("");
                      setSelectedDepartment("");
                    }}
                    labelClass={labelClassName}
                  />
                )}
                <Textarea
                  label="Branch Description"
                  rows={3}
                  id="description"
                  name="description"
                  placeholder="Description"
                  className="mt-1 block px-3 py-2 border outline-none border-gray-300 rounded-md shadow-sm sm:text-sm"
                  onChange={formik.handleChange}
                  touched={formik.touched.description as boolean}
                  value={formik.values.description}
                  error={formik.errors.description as string}
                />
              </div>
              <Button
                className="w-[170px] my-10"
                type="submit"
                onClick={handleSubmit}
                disabled={isUpdating}
                loading={isUpdating}
              >
                Update Information
              </Button>
            </form>
          }
        />
      </div>
    </DashboardLayout>
  );
}
