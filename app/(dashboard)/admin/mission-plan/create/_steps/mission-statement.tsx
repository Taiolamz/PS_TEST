import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { missionStatementSchema } from "@/utils/schema/mission-plan";

const MissionStatement = () => {
  const router = useRouter();
  const location = usePathname();
  const formik = useFormik({
    initialValues: { missionstatement: "" },
    validationSchema: missionStatementSchema,
    onSubmit: (values, { setSubmitting, setErrors, setValues }) => {
      // console.log("Form data", values);
      // setValues({ missionstatement: "" });
      // setErrors({ missionstatement: "" });
      router.push(`${location}?ui=measure-success`);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="w-full ">
      {/* Mission and Vision */}
      <div className="mb-8">
        <div className="flex items-center gap-x-2 mb-6">
          <h1 className="text-[#3E4345]">Mission statement</h1>
          <span>
            <BsFillInfoCircleFill color="#84919A" />
          </span>
        </div>
        <div className="w-full flex-1">
          <label
            htmlFor="missionstatement"
            className=" text-xs text-[#6E7C87] font-normal pb-2"
          >
            Set Mission Statement
          </label>
          <textarea
            rows={3}
            id="missionstatement"
            name="missionstatement"
            placeholder="Input Mission Statement"
            className="mt-1 md:min-w-[500px] block px-3 py-2 border outline-none border-gray-300 bg-[var(--input-bg)] rounded-md shadow-sm sm:text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.missionstatement}
          />
          {formik.errors.missionstatement &&
            formik.touched.missionstatement && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.missionstatement}
              </div>
            )}
        </div>
      </div>

      <div className="mt-8 flex gap-x-2 items-center">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push(`${location}?ui=overview`)}
          className={`text-[var(--primary-color)] py-5 px-2 rounded-sm bg-transparent border border-[var(--primary-color)] min-w-28`}
        >
          Back
        </Button>
        <Button
          type="submit"
          //   disabled={isLoadingStrategicIntent}
          //   loading={isLoadingStrategicIntent}
          loadingText="Save & Continue"
          className={cn(
            "w-full",
            !formik.isValid || !formik.dirty
              ? "opacity-50 cursor-not-allowed w-max py-5 px-2 rounded-sm "
              : "cursor-pointer text-white py-5 px-2 rounded-sm bg-[var(--primary-color)] border border-[var(--primary-color)] w-max"
          )}
        >
          Save & Continue
        </Button>
      </div>
    </form>
  );
};

export default MissionStatement;
