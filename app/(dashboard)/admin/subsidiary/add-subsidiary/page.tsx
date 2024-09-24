"use client";

import Routes from "@/lib/routes/routes";
import CustomSelect from "@/components/custom-select";
import { useContext, useRef, useState } from "react";
import routesPath from "@/utils/routes";
import { useSubsidiary } from "../_hooks/useSubsidiary";
import { ChecklistLayout } from "../_components/checklist-layout";
import FormLayout from "../_components/form-layout";
import { Input } from "@/components/ui/input";
import DashboardModal from "../_components/checklist-dashboard-modal";
import CancelModal from "../_components/cancel-modal";
import { COUNTRIES_STATES } from "@/utils/data";
import { Dictionary } from "@/@types/dictionary";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import { useRouter } from "next/navigation";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import LogoUpload from "@/components/logoUpload/LogoUpload";
import { Textarea } from "@/components/ui/textarea";

const { ADMIN } = routesPath;

const AddSubsidary = () => {
  const actionCtx = useContext(ActionContext);
  const cancelRoute = ADMIN.CHECKLIST;
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const router = useRouter();
  const {
    formik,
    countries,
    states,
    // stateDrop,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    isCreatingSubsidiary,
    employeeDrop,
    employees,
  } = useSubsidiary({ cancelPath: cancelRoute });

  const [selectedCountryData, setSelectedCountryData] = useState<Dictionary>(
    {}
  );

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
      formik.setFieldValue("work_email", selectedEmployee.email);
      formik.setFieldValue("head.id", selectedEmployee.id);
    } else {
      formik.setFieldValue("head.name", "");
      formik.setFieldValue("work_email", "");
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
    <>
      <DashboardLayout back headerTitle="Create Subsidiary">
        <ReusableStepListBox
          btnText="Continue"
          activeStep="1"
          totalStep={actionCtx?.checkListLength || "4"}
          title="Create Subsidiary"
          btnDisabled={!formik.isValid || !formik.dirty}
          loading={isCreatingSubsidiary}
          onSave={formik.handleSubmit}
        />
        <div
          className=""
          style={{ padding: "0rem 2rem", marginTop: "-1.5rem" }}
        >
          <FormLayout
            addText="Add a new subsidiary to your organization account, by setting them up here."
            module="Subsidiary"
            form={
              <form
                className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3 "
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
                  isRequired
                />
                <Input
                  label="Subsidiary Address"
                  type="text"
                  placeholder="Subsidiary address"
                  id="address"
                  name="address"
                  onChange={formik.handleChange}
                  isRequired
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
                  // isRequired
                />
                <Input
                  label="Head of Subsidiary Email"
                  type="text"
                  placeholder="Work Email"
                  id="work_email"
                  value={formik.values.work_email}
                  name="work_email"
                  onChange={formik.handleChange}
                  // isRequired
                  disabled
                  className="disabled:opacity-100"
                />
                <LogoUpload
                  showFootNote={false}
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
                  className=" w-full  block px-4 py-2 border outline-none border-gray-300 bg-[var(--input-bg)] rounded-md shadow-sm sm:text-sm bg-white"
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
            <CancelModal
              onProceed={handleProceedCancel}
              modalTitle="Subsidiary"
            />
          </DashboardModal>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AddSubsidary;
