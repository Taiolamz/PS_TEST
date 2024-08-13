"use client";

import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
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
import { useOnboardingMutation } from "@/redux/services/onboarding/onboardingApi";
import { toast } from "sonner";
import routesPath from "@/utils/routes";
import { OnboardingSchema } from "@/utils/schema/onboarding";
import { useLazyGetAuthUserDetailsQuery } from "@/redux/services/auth/authApi";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { useAppSelector } from "@/redux/store";
import { trimLongString } from "@/app/(dashboard)/_layout/Helper";
import { isDateAfter } from "@/utils/date";

const { ADMIN } = routesPath;
interface FormValues {
  vision: string;
  mission: string;
  brand_colour: string;
  logo: File | string;
  end_fy: string;
  start_fy: string;
  probation_duration: string;
  opening_time: string;
  fy_title: string;
  closing_time: string;
  hierarchy: string;
  staff_levels: { name: string; level: string }[];
}

const Onboarding = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const location = usePathname();
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");
  const { ONBOARDING } = routesPath;
  const [fyDate, setFyDate] = useState("");
  const [time, setTime] = useState("");
  const actionCtx = useContext(ActionContext);

  const [getAuthUserDetails, { isLoading }] = useLazyGetAuthUserDetailsQuery(
    {}
  );
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

  const onSubmit = async () => {
    // if (!isEndDateLater) {
    //   toast.error("End date must be a future date!");
    //   return;
    // }

    if (!formik.isValid) {
      toast.error(
        "Please fill in the required fiscal year title field before submitting."
      );
      return;
    }

    const formDataToSend = new FormData();

    Object.entries(formik.values).forEach(([key, value]) => {
      if (key === "logo" && logo instanceof File) {
        formDataToSend.append(key, logo);
      } else if (Array.isArray(value) || typeof value === "object") {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, value as string);
      }
    });

    // Might be added later from the backend
    const appraisalCycle = "annual";
    formDataToSend.append("appraisal_cycle", appraisalCycle);

    try {
      onboarding(formDataToSend)
        .unwrap()
        .then((payload) => {
          // handleGetAuthUser()
          actionCtx.triggerUpdateUser();
          toast.success("Organization Created Successfully");
          router.push(ADMIN.OVERVIEW);
        });
    } catch (error) {}
  };

  const handleGetAuthUser = async () => {
    getAuthUserDetails({})
      .unwrap()
      .then(() => {});
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      vision: "",
      mission: "",
      brand_colour: "#008080",
      logo: "",
      end_fy: "",
      start_fy: "",
      probation_duration: "",
      opening_time: "",
      fy_title: "",
      closing_time: "",
      hierarchy: "",
      staff_levels: [{ name: "", level: "" }],
    },
    validationSchema: OnboardingSchema,
    onSubmit: onSubmit,
  });

  const isEndDateLater = isDateAfter(
    formik.values.end_fy,
    formik.values.start_fy
  );
  useEffect(() => {
    console.log(isEndDateLater);
    if (isEndDateLater === false) {
      formik.setFieldError("end_fy", "End date must be a future date");
    }
  }, [formik.values.end_fy, formik.values.start_fy, isEndDateLater]);

  const logo = formik.values.logo;
  console.log({ formik1234: formik.errors });

  useEffect(() => {
    if (!ui) {
      router.replace(`${ONBOARDING}?ui=get-started&step=1`);
    }
  }, [ui, location, router]);

  return (
    <section className="">
      <div className="px-2.5 py-3 bg-[#F4f4f4] w-full mb-10">
        <button
          type="button"
          onClick={() => {
            getCurrentStep() - 1 >= 1 &&
              router.push(`${location}?ui=${ui}&step=${getCurrentStep() - 1}`);
          }}
          className="text-black flex gap-1 items-center text-xs"
        >
          <HiChevronDoubleLeft width={10} height={10} /> Back
        </button>
      </div>
      <FormikProvider value={formik}>
        <form
          className="px-10 xl:pl-[9.375rem] max-h-full  pb-20"
          onSubmit={formik.handleSubmit}
        >
          <div className="h-[calc(100vh_-_16rem)] overflow-y-scroll px-4 scroll-hidden">
            <h1 className="text-2xl font-bold text-[--primary-color] mb-16">
              {`Welcome ${
                trimLongString(user?.organization?.name, 25) || ""
              }! Let's setup your organization`}
            </h1>
            {getCurrentStep() === 1 && (
              <OrganizationStatement formik={formik} />
            )}
            {getCurrentStep() === 2 && <BrandIdentity formik={formik} />}
            {getCurrentStep() === 3 && (
              <OperationsParameter
                formik={formik}
                setFyDate={setFyDate}
                fyDate={fyDate}
                time={time}
                setTime={setTime}
              />
            )}
            {getCurrentStep() === 4 && (
              <OrganizationStructure formik={formik} />
            )}
            {getCurrentStep() === 5 && <GradeLevel formik={formik} />}
            {getCurrentStep() === 6 && <Preview formik={formik} />}
          </div>
          <div className="flex justify-start items-center gap-[1.625rem] mt-8">
            <button
              type="button"
              onClick={() => router.push(routesPath?.ADMIN?.OVERVIEW)}
              className="text-pry inline-flex gap-1.5 items-center"
            >
              <FaRegArrowAltCircleLeft width={24} height={24} /> Skip to
              Dashboard
            </button>
            {getCurrentStep() < steps.length ? (
              <Button
                type="button"
                className=""
                disabled={
                  (!formik.isValid && getCurrentStep() === 3) ||
                  isOnboardingLoading
                }
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
