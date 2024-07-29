"use client";

import { ArrowLeftCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { HiChevronDoubleLeft } from "react-icons/hi";
import {
  BrandIdentity,
  GradeLevel,
  OperationsParameter,
  OrganizationStatement,
  OrganizationStructure,
  Preview,
} from "./_steps";
import { Button } from "@/components/ui/button";
import { steps } from "./data";
import { FormikProvider, useFormik } from "formik";
import { OnbaordingSchema } from "@/utils/schema/onboarding";
import { useOnboardingMutation } from "@/redux/services/onboarding/onboardingApi";
import { toast } from "sonner";

const Onboarding = () => {
  const router = useRouter();
  const location = usePathname();
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");

  const getCurrentStep = () => {
    const step = Number(searchParams.get("step"));
    return step;
  };

  const [
    onboarding,
    {
      isLoading: isOnboardingLoading,
      isSuccess: onboardingSuccess,
      reset: onboardingReset,
    },
  ] = useOnboardingMutation();

  const keyMapping: Record<string, string> = {
    vision: "vision",
    mission: "mission",
    brand_colour: "brand_colour",
    logo: "logo",
    end_fy: "end_fy",
    start_fy: "start_fy",
    probation_duration: "probation_duration",
    opening_time: "opening_time",
    fy_title: "fy_title",
    closing_time: "closing_time",
    hierarchy: "hierarchy",
    staff_levels: "staff_levels",
  };

  const onSubmit = async () => {
    const formDataToSend = new FormData();

    Object.entries(formik.values).forEach(([key, value]) => {
      const mappedKey = keyMapping[key] || key;

      if (key === "logo" && logo) {
        formDataToSend.append(mappedKey, logo);
      } else if (Array.isArray(value) || typeof value === "object") {
        formDataToSend.append(mappedKey, JSON.stringify(value));
      } else {
        formDataToSend.append(mappedKey, value as string);
      }
    });

    // Might be added later from the backend
    const appraisalCycle = "annual";
    formDataToSend.append("appraisal_cycle", appraisalCycle);

    try {
      // const response = await setupOrganization(formDataToSend);

      onboarding(formDataToSend)
        .unwrap()
        .then((payload) => {
          toast.success("Account Registered Successfully");
        });
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: {
      vision: "",
      mission: "",
      brand_colour: "",
      logo: null,
      end_fy: "",
      start_fy: "",
      probation_duration: "",
      opening_time: "",
      fy_title: "",
      closing_time: "",
      hierarchy: "",
      staff_levels: [{ name: "", position: "" }],
    },
    validationSchema: OnbaordingSchema,
    onSubmit: onSubmit,
  });

  const logo = formik.values.logo;

  return (
    <section className="">
      <div className="px-2.5 py-3 bg-[#F4f4f4] w-full mb-10">
        <button
          type="button"
          onClick={() => {
            getCurrentStep() - 1 >= 1 &&
              router.push(`${location}?ui=${ui}&step=${getCurrentStep() - 1}`);
          }}
          // disabled={currentStep === 0}
          className="text-black flex gap-1 items-center text-xs"
        >
          <HiChevronDoubleLeft width={10} height={10} /> Back
        </button>
      </div>
      <FormikProvider value={formik}>
        <form className="px-10 xl:pl-[9.375rem]" onSubmit={formik.handleSubmit}>
          <h1 className="text-2xl font-bold text-[#162238] mb-16">
            {`Welcome ITH Holdings! Let's setup your organization`}
          </h1>
          {getCurrentStep() === 1 && <OrganizationStatement formik={formik} />}
          {getCurrentStep() === 2 && <BrandIdentity formik={formik} />}
          {getCurrentStep() === 3 && <OperationsParameter formik={formik} />}
          {getCurrentStep() === 4 && <OrganizationStructure formik={formik} />}
          {getCurrentStep() === 5 && <GradeLevel formik={formik} />}
          {getCurrentStep() === 6 && <Preview />}
          <div className="flex justify-start items-center gap-[1.625rem] mt-8">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="text-pry inline-flex gap-1.5"
            >
              <ArrowLeftCircle width={24} height={24} /> Skip to Dashboard
            </button>
            {getCurrentStep() < steps.length ? (
              <Button
                type="button"
                className=""
                onClick={() => {
                  getCurrentStep() < steps.length &&
                    router.push(
                      `${location}?ui=${ui}&step=${getCurrentStep() + 1}`
                    );
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                type="button"
                onClick={onSubmit}
                loading={isOnboardingLoading}
                loadingText="Save"
                disabled={isOnboardingLoading}
              >
                Save
              </Button>
            )}
          </div>
        </form>
      </FormikProvider>
    </section>
  );
};

export default Onboarding;
