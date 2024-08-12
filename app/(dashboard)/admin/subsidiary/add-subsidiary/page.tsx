"use client";

import Routes from "@/lib/routes/routes";
import CustomSelect from "@/components/custom-select";
import { useContext, useState } from "react";
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

  const handleHeadSelectChange = (selectedName: string) => {
    const selectedEmployee = (employees as AllStaff[]).find(
      (emp) => emp.name === selectedName
    );

    if (selectedEmployee) {
      formik.setFieldValue("head.name", selectedEmployee.name);
      formik.setFieldValue("work_email", selectedEmployee.email);
      formik.setFieldValue("head.id", selectedEmployee.id);
    }
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
                  label="Name"
                  type="text"
                  placeholder="Subsidiary name"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  isRequired
                />
                <Input
                  label="Address"
                  type="text"
                  placeholder="Subsidiary address"
                  id="address"
                  name="address"
                  onChange={formik.handleChange}
                  isRequired
                />
                <CustomSelect
                  label="Country"
                  isRequired
                  placeholder="Select country"
                  options={COUNTRIES_STATES?.map((item) => {
                    return {
                      label: item.name,
                      value: item.name,
                    };
                  })}
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
                  label="State"
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
                  options={employees}
                  selected={formik.values.head.name}
                  setSelected={handleHeadSelectChange}
                  // labelClass={labelClassName}
                  // isRequired
                />
                <Input
                  label="Work Email"
                  type="text"
                  placeholder="Work Email"
                  id="work_email"
                  value={formik.values.work_email}
                  name="work_email"
                  onChange={formik.handleChange}
                  // isRequired
                  disabled
                />

                {/* <CustomSelect
                  label="Head of Subsidiary"
                  // isRequired
                  placeholder="Head of subsidiary"
                  options={[]}
                  selected={formik.values.head}
                  setSelected={(value) =>
                    formik.setFieldValue("head", value)
                  }
                  labelClass={labelClassName}
                />
                <Input
                  label="Work Email"
                  type="text"
                  placeholder="Work Email"
                  id="work_email"
                  name="work_email"
                  onChange={formik.handleChange}
                  isRequired
                /> */}
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
