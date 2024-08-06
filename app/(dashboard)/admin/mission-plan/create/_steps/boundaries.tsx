import { Button } from "@/components/ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import MissionDetailPreview from "./preview";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { LucidePlusCircle } from "lucide-react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { LiaTimesSolid } from "react-icons/lia";
import Icon from "@/components/icon/Icon";
import { boundariesSchema } from "@/utils/schema/mission-plan";

const initialValues = {
  constraints: ["", ""],
  freedoms: ["", ""],
};


const Boundaries = () => {
  const router = useRouter();
  const location = usePathname();
  const step = useSearchParams().get("step");
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: boundariesSchema,
    onSubmit: (values) => {
      console.log("Form data", values);
      router.push(`${location}?ui=boundaries&step=preview`);
    },
  });

  return (
    <>
      {step !== "preview" && (
        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            autoComplete="off"
            className="space-y-8"
          >
            {/* Constraints */}
            <div>
              <div className="flex items-center gap-x-2 mb-8">
                <h1 className="text-[#3E4345]">Constraints</h1>
                <span>
                  <BsFillInfoCircleFill color="#84919A" />
                </span>
              </div>
              <FieldArray name="constraints">
                {({ push, remove }) => (
                  <div className="max-w-5xl grid grid-cols-2 gap-y-4 items-center gap-x-5 relative">
                    {formik.values.constraints.map((_, index) => (
                      <div key={index} className="w-full">
                        <div className=" relative">
                          <Input
                            type="text"
                            id={`constraints.${index}`}
                            name={`constraints.${index}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.constraints[index]}
                            placeholder="Input constraint"
                            label={`Constraint ${index + 1}`}
                            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-[var(--input-bg)]"
                          />
                          {index !== 1 && index !== 0 && (
                            <span onClick={() => remove(index)} className="">
                              <Icon
                                name="remove"
                                width={14.28}
                                height={18.63}
                                className="absolute cursor-pointer text-red-600 right-[20px] bottom-[10px]"
                              />
                            </span>
                          )}
                        </div>
                        <div className="text-red-500 text-xs mt-1">
                          {formik?.touched.constraints &&
                          formik.errors.constraints?.[index]
                            ? formik.errors.constraints[index]
                            : null}
                        </div>
                      </div>
                    ))}
                    <div className="w-full ">
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="flex items-center gap-2 mt-8 text-[var(--primary-color)] text-sm"
                      >
                        <LucidePlusCircle
                          style={{ color: "var(--primary-color)" }}
                          size={20}
                        />
                        Add new Constraints
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </div>
            {/* Freedoms */}
            <div>
              <div className="flex items-center gap-x-2 mb-8">
                <h1 className="text-[#3E4345]">Freedoms</h1>
                <span>
                  <BsFillInfoCircleFill color="#84919A" />
                </span>
              </div>
              <FieldArray name="freedoms">
                {({ push, remove }) => (
                  <div className="max-w-5xl grid grid-cols-2 gap-y-4 items-center gap-x-5 relative">
                    {formik.values.freedoms.map((_, index) => (
                      <div key={index} className="w-full">
                        <div className=" relative">
                          <Input
                            type="text"
                            id={`freedoms.${index}`}
                            name={`freedoms.${index}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.freedoms[index]}
                            label="Freedom 1"
                            placeholder="Input freedom"
                            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-[var(--input-bg)]"
                          />
                          {index !== 1 && index !== 0 && (
                            <span onClick={() => remove(index)} className="">
                              <Icon
                                name="remove"
                                width={14.28}
                                height={18.63}
                                className="absolute cursor-pointer text-red-600 right-[20px] bottom-[10px]"
                              />
                            </span>
                          )}
                        </div>
                        <div className="text-red-500 text-xs mt-1">
                          {formik.touched.freedoms &&
                          formik.errors.freedoms?.[index]
                            ? formik.errors.freedoms[index]
                            : null}
                        </div>
                      </div>
                    ))}
                    <div className="w-full ">
                      <button
                        onClick={() => push("")}
                        type="button"
                        className="flex items-center gap-2 mt-8 text-[var(--primary-color)] text-sm"
                      >
                        <LucidePlusCircle
                          style={{ color: "var(--primary-color)" }}
                          size={20}
                        />
                        Add new Freedom
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </div>
            {/* Button */}
            <div className="mt-8 flex gap-x-2 items-center">
              <Button
                variant="outline"
                className={`text-[var(--primary-color)] py-5 px-2 rounded-sm bg-transparent border border-[var(--primary-color)] min-w-28`}
              >
                Back
              </Button>
              <Button
                className={cn(
                  "w-full",
                  !formik.isValid || !formik.dirty
                    ? "opacity-50 cursor-not-allowed w-max py-5 px-2 rounded-sm "
                    : "cursor-pointer text-white py-5 px-2 rounded-sm  w-max"
                )}
                disabled={!formik.isValid || !formik.dirty}
                type="submit"
              >
                Save & Continue
              </Button>
            </div>
          </form>
        </FormikProvider>
      )}
      {step === "preview" && <MissionDetailPreview />}
    </>
  );
};

export default Boundaries;
