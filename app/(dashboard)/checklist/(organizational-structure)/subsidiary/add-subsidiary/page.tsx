"use client";

import Routes from "@/lib/routes/routes";
import { useSubsidiary } from "../../../_hooks/useSubsidiary";
import { ChecklistLayout } from "../../../_components/checklist-layout";

// import { ChecklistLayout } from "@/components/checklist/layout";
// import { useCreateSubsidiary } from "@/hooks";
// import FormLayout from "@/components/dashboard/layout/FormLayout";
// import React, { useState } from "react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { CancelModal, DashboardModal } from "@/components/dashboard/pages";
// import { Routes } from "@/utilities";

const AddSubsidary = () => {
  const route = Routes.ChecklistRoute.SubsidiaryRoute();
  const cancelRoute = Routes.ChecklistRoute.ChecklistOverview();
  const {
    formik,
    // handleSubmit,
    countries,
    states,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    // loading,
  } = useSubsidiary({ path: route, cancelPath: cancelRoute });
//   const { formState, setValue } = formik;
//   const { isValid } = formState;

  const labelClass =
    "font-light text-[5px] text-[13px] flex text-custom-gray-scale-400 placeholder:text-custom-gray-scale-400 translate-y-1";
  const inputClass =
    "placeholder:text-custom-gray-scale-400 bg-white text-custom-dark-blue font-light text-xs focus:border-0 placeholder:font-light outline-none border-custom-gray focus:border-[#008080] focus:outline-none";
  const errorClass = "text-custom-red text-xs";

  return (
    <ChecklistLayout
      onCancel={handleCancelDialog}
      title="Subsidiaries"
      onProceedBtn={formik.handleSubmit}
      showBtn
      step={`Step 1 of 4`}
    //   btnDisabled={!isValid}
    //   loading={loading}
    >
      <FormLayout
        addText="Add a new subsidiary to your organization account, by setting them up here."
        module="Subsidiary"
        form={
          <Form {...form}>
            <form
              className="grid grid-cols-2 gap-x-10 gap-y-5 translate-y-3 "
              onSubmit={form.handleSubmit(handleSubmit)}
              autoComplete="off"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>
                      Name <span className="text-custom-red ml-1">*</span>
                    </FormLabel>
                    {/* </div> */}
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Subsidiary name"
                        className={inputClass}
                      />
                    </FormControl>
                    <FormMessage className={errorClass}>
                      {/* {form.formState.errors.name &&
                        form.formState.errors.name.message} */}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>
                      Address <span className="text-custom-red ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Subsidiary address"
                        className={inputClass}
                      />
                    </FormControl>
                    <FormMessage className={errorClass}>
                      {/* {form.formState.errors.address &&
                        form.formState.errors.address.message} */}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>
                      Country <span className="text-custom-red ml-1">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className={inputClass}>
                          <SelectValue
                            placeholder="Select country"
                            className={inputClass}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className={labelClass}>
                        {countries.map((chi, idx) => {
                          const { label, value } = chi;
                          return (
                            <div key={idx}>
                              <SelectItem
                                value={label}
                                onClick={() => setValue("country", value)}
                                // className={`${labelClass} ${
                                //   formState.defaultValues === value
                                //     ? "bg-red-500"
                                //     : ""
                                // }`}
                              >
                                {label}
                              </SelectItem>
                            </div>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage className={errorClass}>
                      {/* {form.formState.errors.country &&
                        form.formState.errors.country.message} */}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>
                      State <span className="text-custom-red ml-1">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className={inputClass}>
                          <SelectValue
                            placeholder="Select state"
                            className={inputClass}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className={labelClass}>
                        {states.map((chi, idx) => {
                          const { label, value } = chi;
                          return (
                            <div key={idx}>
                              <SelectItem
                                value={label}
                                onClick={() => setValue("state", value)}
                                // className={`${labelClass} ${
                                //   formState.defaultValues === value
                                //     ? "bg-red-500"
                                //     : ""
                                // }`}
                              >
                                {label}
                              </SelectItem>
                            </div>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage className={errorClass}>
                      {/* {form.formState.errors.state &&
                        form.formState.errors.state.message} */}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="head_of_subsidiary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>
                      Head of Subsidiary{" "}
                      <span className="text-custom-red ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Head of Subsidiary"
                        className={inputClass}
                      />
                    </FormControl>
                    <FormMessage className={errorClass}>
                      {form.formState.errors.head_of_subsidiary &&
                        form.formState.errors.head_of_subsidiary.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="work_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>
                      Work Email <span className="text-custom-red ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Work Email"
                        className={inputClass}
                      />
                    </FormControl>
                    <FormMessage className={errorClass}>
                      {form.formState.errors.work_email &&
                        form.formState.errors.work_email.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
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
