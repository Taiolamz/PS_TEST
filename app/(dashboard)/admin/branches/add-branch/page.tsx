"use client";

import Routes from "@/lib/routes/routes";
import { useContext, useState } from "react";
import { useBranch } from "../_hooks/useBranch";
import { ChecklistLayout } from "../_components/checklist-layout";
import FormLayout from "../_components/form-layout";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/custom-select";
import DashboardModal from "../_components/checklist-dashboard-modal";
import CancelModal from "../_components/cancel-modal";
import routesPath from "@/utils/routes";
import { Dictionary } from "@/@types/dictionary";
import { COUNTRIES_STATES } from "@/utils/data";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import { findObjectIndexByLabel, processInputAsArray } from "@/utils/helpers";
import { useAppSelector } from "@/redux/store";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { Textarea } from "@/components/ui/textarea";

const { ADMIN } = routesPath;

const AddBranch = () => {
  const actionCtx = useContext(ActionContext);
  const { user, checklist } = useAppSelector((state) => state.auth);
  const cancelRoute = ADMIN.CHECKLIST;
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const {
    formik,
    subsidiaries,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    isCreatingBranch,
    isLoadingSubsidiaries,
    employees,
  } = useBranch({ cancelPath: cancelRoute });

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
    } else {
      formik.setFieldValue("head.name", "");
      formik.setFieldValue("work_email", "");
      formik.setFieldValue("head.id", "");
    }
  };

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

  return (
    <DashboardLayout back headerTitle="Branch">
      <ReusableStepListBox
        btnText="Continue"
        activeStep={
          findObjectIndexByLabel(actionCtx?.listToUse, "Add Branches") || "2"
        }
        totalStep={actionCtx?.checkListLength || "4"}
        title="Create Branch"
        btnDisabled={!formik.isValid || !formik.dirty}
        loading={isCreatingBranch}
        onSave={formik.handleSubmit}
      />

      <div className="" style={{ padding: "0rem 2rem", marginTop: "-1.5rem" }}>
        {" "}
        <FormLayout
          addText="Add areas or regions to your organization account, by setting them up here."
          module="Branches"
          form={
            <form
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
                id="work_email"
                value={formik.values.work_email}
                name="work_email"
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
            </form>
          }
        />
      </div>

      <DashboardModal
        className={"w-[420px]"}
        open={openCancelModal}
        onOpenChange={handleCancelDialog}
      >
        <CancelModal onProceed={handleProceedCancel} modalTitle="Branch" />
      </DashboardModal>
    </DashboardLayout>
  );
};

export default AddBranch;
