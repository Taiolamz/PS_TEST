"use client";

// DEPRECATED: USE THE SUBSIDIARY UNDER ADMIN

import Routes from "@/lib/routes/routes";
import { useSubsidiary } from "../../../_hooks/useSubsidiary";
import { ChecklistLayout } from "../../../_components/checklist-layout";
import FormLayout from "../../../_components/form-layout";
import { Input } from "@/components/ui/input";
import DashboardModal from "../../../_components/checklist-dashboard-modal";
import CancelModal from "../../../_components/cancel-modal";
import CustomSelect from "@/components/custom-select";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import LogoUpload from "@/components/logoUpload/LogoUpload";

const AddSubsidary = () => {
  const cancelRoute = Routes.ChecklistRoute.ChecklistOverview();
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const {
    formik,
    countries,
    states,
    // stateDrop,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    isCreatingSubsidiary,
  } = useSubsidiary({ cancelPath: cancelRoute });

  const [selectedState, setSelectedState] = useState("");
  const [logo, setLogo] = useState<File | string>();
  const [logoName, setLogoName] = useState<string | null>(
    formik.values.logo ? formik.values.logo.name : null
  );
  const fileInputRef = useRef<HTMLInputElement | string>();

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
    <ChecklistLayout
      onCancel={handleCancelDialog}
      title="Subsidiaries"
      onProceedBtn={formik.handleSubmit}
      showBtn
      step={`Step 1 of 4`}
      btnDisabled={!formik.isValid || !formik.dirty}
      loading={isCreatingSubsidiary}
    >
      <FormLayout
        addText="Add a new subsidiary to your organization account, by setting them up here."
        module="Subsidiary"
        form={
          <form
            className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3"
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <Input
              label="Name of Subsidiary"
              type="text"
              placeholder="Subsidiary name"
              id="name"
              name="name"
              onChange={formik.handleChange}
              className="px-4 py-2"
              isRequired
            />
            {/* <Input
              label="Subsidiary Email"
              type="text"
              placeholder="Subsidiary Email Address"
              id="name"
              name="name"
              onChange={formik.handleChange}
              className="px-4 py-2"
            /> */}
            <Input
              label="Subsidiary Address"
              type="text"
              placeholder="Subsidiary address"
              id="address"
              name="address"
              onChange={formik.handleChange}
              className="px-4 py-2"
              isRequired
            />
            <CustomSelect
              label="Subsidiary Country"
              isRequired
              placeholder="Select country"
              options={countries}
              selected={formik.values.country}
              setSelected={(value) => formik.setFieldValue("country", value)}
              labelClass={labelClassName}
              className="px-4 py-2"
            />
            <CustomSelect
              label="Subsidiary State"
              isRequired
              placeholder="Subsidiary state"
              options={states}
              selected={formik.values.state}
              setSelected={(value) => formik.setFieldValue("state", value)}
              labelClass={labelClassName}
              className="px-4 py-2"
            />
            <CustomSelect
              label="Head of Subsidiary"
              placeholder="Head of subsidiary"
              options={[]}
              selected={formik.values.head}
              setSelected={(value) =>
                formik.setFieldValue("head_of_subsidiary", value)
              }
              labelClass={labelClassName}
              className="px-4 py-2"
            />
            <Input
              label="Head of Subsidiary Email"
              type="text"
              placeholder="Work Email"
              id="work_email"
              name="work_email"
              onChange={formik.handleChange}
              className="px-4 py-2"
            />
            <LogoUpload
              showFootNote={false}
              handleLogoChange={handleLogoChange}
              logoName={logoName}
              setLogo={setLogo}
              handleRemoveLogo={handleRemoveLogo}
              fileInputRef={fileInputRef}
              label="Upload Subsidiary Logo"
              containerClass="border-[#E5E9EB] py-2 text-[#6E7C87]"
              labelClass="block relative text-xs mb-0 text-[#6E7C87] font-normal pb-2"
            />
            <Textarea
              rows={3}
              id="description"
              name="description"
              placeholder="Description"
              label="Subsidiary Description"
              className="mt-1 w-full !bg-white block px-4 py-2 border outline-none border-gray-300 bg-[var(--input-bg)] rounded-md shadow-sm sm:text-sm"
              onChange={formik.handleChange}
            />
          </form>
        }
      />

      <DashboardModal
        className={"w-[420px]"}
        open={openCancelModal}
        onOpenChange={handleCancelDialog}
      >
        <CancelModal onProceed={handleProceedCancel} modalTitle="Subsidiary" />
      </DashboardModal>
    </ChecklistLayout>
  );
};

export default AddSubsidary;
