/* eslint-disable @next/next/no-img-element */
"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import CustomSelect from "@/components/custom-select";
import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { COUNTRIES_STATES } from "@/utils/data";
import { Dictionary } from "@/@types/dictionary";
import { useRouter } from "next/navigation";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import LogoUpload from "@/components/logoUpload/LogoUpload";
import { Textarea } from "@/components/ui/textarea";
import { useEditSubsidiary } from "./_hooks/useEditSubsidiary";
import { Button } from "@/components/ui/button";
import { useSubsidiaryById } from "../../_hooks/useSubsidiaryById";

export default function Edit({ params }: { params: { subsidiaryId: string } }) {
  const router = useRouter();
  const actionCtx = useContext(ActionContext);
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const [selectedCountryData, setSelectedCountryData] = useState<Dictionary>(
    {}
  );

  const { formik, employees, isUpdatingSubsidiary } = useEditSubsidiary({
    id: params.subsidiaryId,
  });

  // fetching initial value
  const { subDetailsData } = useSubsidiaryById(params?.subsidiaryId ?? "");

  // This sets the state dropdown from the initial value of country
  useEffect(() => {
    if (subDetailsData?.country) {
      const countryData = COUNTRIES_STATES?.filter(
        (f: Dictionary) => f.name === subDetailsData?.country
      )?.[0];
      setSelectedCountryData(countryData);
    }
  }, [subDetailsData]);

  const [logo, setLogo] = useState<File | string>();
  const [logoName, setLogoName] = useState<string | null>(
    formik.values.logo ? formik.values.logo.name : null
  );
  const fileInputRef = useRef<HTMLInputElement | string>();

  const handleHeadSelectChange = (selectedName: string) => {
    const selectedEmployee = (employees as AllStaff[]).find(
      (emp) => emp.name === selectedName
    );

    if (selectedEmployee) {
      formik.setFieldValue("head.name", selectedEmployee.name);
      formik.setFieldValue("head.email", selectedEmployee.email);
      formik.setFieldValue("head.id", selectedEmployee.id);
    } else {
      formik.setFieldValue("head.name", "");
      formik.setFieldValue("head.email", "");
      formik.setFieldValue("head.id", "");
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        // 1MB in bytes
        formik.setFieldError("logo", "Logo size should be at most 1MB");
        return;
      }
      setLogo(file);
      setLogoName(file?.name);
      formik.setFieldValue("logo", file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo("");
    setLogoName(null);
  };

  return (
    <DashboardLayout back headerTitle="Edit Subsidiary">
      <div className="" style={{ padding: "0rem 2rem", marginTop: "-1.5rem" }}>
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          className="mt-10 flex flex-col gap-5 w-[884px] scroll-hidden"
        >
          <p className="text-primary font-normal text-xs mt-5 flex gap-[0.4063rem] items-center">
            Subsidiary Information
          </p>
          <section className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3 ">
            <Input
              label="Name of Subsidiary"
              type="text"
              placeholder="Subsidiary name"
              id="name"
              name="name"
              value={formik?.values?.name}
              onChange={formik.handleChange}
              isRequired
            />
            <Input
              label="Subsidiary Email"
              type="email"
              placeholder="Subsidiary Email Address"
              id="work_email"
              name="work_email"
              value={formik?.values?.work_email}
              onChange={formik.handleChange}
            />
            <Input
              label="Subsidiary Address"
              type="text"
              placeholder="Subsidiary address"
              id="address"
              name="address"
              value={formik?.values?.address}
              onChange={formik.handleChange}
              isRequired
            />
            <CustomSelect
              label="Subsidiary Country"
              isRequired
              placeholder="Select country"
              options={[
                {
                  label: "Select Country",
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
              labelClass={labelClassName}
            />

            <CustomSelect
              label="Subsidiary State"
              isRequired
              placeholder="Subsidiary state"
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
              labelClass={labelClassName}
            />

            <CustomSelect
              label="Head of Subsidiary"
              placeholder="Head of Subsidiary"
              options={[
                {
                  label: "Select Head of Subsidiary",
                  value: "",
                  name: "",
                  id: "",
                },
                ...employees,
              ]}
              selected={formik.values.head.name}
              setSelected={handleHeadSelectChange}
              labelClass={labelClassName}
            />

            <Input
              label="Head of Subsidiary Email"
              type="text"
              placeholder="Work Email"
              id="hos_email"
              value={formik.values.head.email}
              name="hos_email"
              disabled
              className="disabled:opacity-100"
            />

            <LogoUpload
              showFootNote={formik.errors.logo ? true : false}
              handleLogoChange={handleLogoChange}
              logoName={logoName}
              setLogo={setLogo}
              handleRemoveLogo={handleRemoveLogo}
              fileInputRef={fileInputRef}
              label="Upload Subsidiary Logo"
              containerClass="border-[#E5E9EB] py-2 px-4 text-[#6E7C87] bg-white transition-all duration-300 ease-in-out hover:px-8"
              labelClass="block relative text-xs mb-0 text-[#6E7C87] font-normal pb-2"
            />
            <Textarea
              rows={3}
              id="description"
              name="description"
              placeholder="Description"
              label="Subsidiary Description"
              value={formik.values.description}
              className=" w-full  block px-4 py-2 border outline-none border-gray-300 bg-[var(--input-bg)] rounded-md shadow-sm sm:text-sm bg-white"
              onChange={formik.handleChange}
            />

            <div>
              {subDetailsData?.logo && !logo && subDetailsData?.logo?.[0] && (
                <img
                  src={subDetailsData?.logo}
                  alt="subsidiary logo"
                  width={30}
                  height={30}
                  className="size-20 rounded object-contain"
                />
              )}
            </div>
          </section>
          <Button
            className="max-w-[200px] my-10"
            type="submit"
            loading={isUpdatingSubsidiary}
            disabled={isUpdatingSubsidiary}
            loadingText="Updating Information"
          >
            Update Information
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
