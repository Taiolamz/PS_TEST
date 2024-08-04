import Icon from "@/components/icon/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from "formik";
import { LucidePlusCircle } from "lucide-react";
import { LiaTimesSolid } from "react-icons/lia";
import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";

import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
// import { useAddStrategicIntentMutation } from "@/redux/services/mission-plan/missionPlanApi";
import { usePathname, useRouter } from "next/navigation";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MEASURE_OF_SUCCESS_UNITS } from "../_data";

const validationSchema = Yup.object().shape({
    // mission_plan_id: Yup.string().required("Mission Plan ID is required"),
    // strategic_intent_id: Yup.string().required("Strategic Intent ID is required"),
    allSuccess: Yup.array().of(
        Yup.object().shape({
            success: Yup.string().required("Measure of success is required"),
            unit: Yup.string().required("Unit is required"),
            target: Yup.string().required("Target is required"),
        })
    ),
});

const MeasureofSuccess = () => {
    const location = usePathname();
    const router = useRouter();

    //   const [addStrategicIntent, { isLoading: isLoadingStrategicIntent }] =
    //     useAddStrategicIntentMutation();

    //   const handleSaveStrategicIntent = async () => {
    //     const { intents, mission_plan_id, strategic_intent_id } = formik.values;

    //     const transformedIntents = {
    //       intents: intents.map(
    //         (intent: { intent: any; behaviours: { value: any }[] }) => ({
    //           intent: intent.intent,
    //           behaviours: intent.behaviours.map(
    //             (behaviour: { value: any }) => behaviour.value
    //           ),
    //         })
    //       ),
    //       mission_plan_id,
    //       strategic_intent_id,
    //     };

    //     await addStrategicIntent(transformedIntents);
    //   };

    const handleChange = (
        value: string,
        index: number,
        field: "success" | "unit" | "target"
    ) => {
        formik.setFieldValue(`allSuccess.${index}.${field}`, value);
    };

    const formik = useFormik({
        initialValues: {
            allSuccess: [
                { success: '', unit: '', target: '' },
            ],
        },
        validationSchema,
        onSubmit: values => {
            console.log(values);
        },
    });
    const errorAllSuccess = formik.errors.allSuccess as any;

    return (
        <div>
            <div className="flex items-center gap-x-2 mb-8">
                <h1 className="text-[#3E4345]">Measure of SUccess</h1>
                <span>
                    <BsFillInfoCircleFill color="#84919A" />
                </span>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <FormikProvider value={formik}>
                    <FieldArray name="allSuccess">
                        {({ insert, remove, push }) => (
                            <div>
                                {formik.values.allSuccess?.length > 0 &&
                                    formik.values.allSuccess.map((success: any, index: number) => (
                                        <div key={success.id}
                                            className="w-full mb-5 gap-y-5 relative"
                                        >
                                            <div
                                                className="grid lg:grid-cols-2 items-center space-x-2 w-full  relative"
                                            >
                                                <div className="!ml-0">
                                                    <Input
                                                        id={`success-${success.id}`}
                                                        label={`Measure of Success ${index + 1}`}
                                                        labelClass="text-[#6E7C87] text-[13px] mb-[6px]"
                                                        placeholder="Input measure of success"
                                                        name={`allSuccess.${index}.intent`}
                                                        error={errorAllSuccess?.success}
                                                        onChange={(e) => handleChange(e.target.value, index, "success")}
                                                        className="border p-2 bg-[#F6F8F9]"
                                                        value={formik.values.allSuccess[index].success}
                                                    />
                                                    <ErrorMessage
                                                        name={`allSuccess.${index}.success`}
                                                        className="text-red-500 text-xs"
                                                        component={"div"}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-x-2">
                                                    <div className="col-span-1 -mb-1 pb-0 mt-2">
                                                        <Label htmlFor={`success-${success.id}`} className="text-[#6E7C87] text-[13px] mb-[6px]">Unit</Label>
                                                        <Select>
                                                            <SelectTrigger className="border p-2 outline-0 bg-[#F6F8F9]"
                                                            error={errorAllSuccess?.success}
                                                            >
                                                                <SelectValue
                                                                    placeholder={formik.values.allSuccess[index].unit || "Select Unit"}
                                                                />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <RadioGroup
                                                                    onValueChange={(e) => handleChange(e, index, "unit")}
                                                                    className="flex flex-col space-y-1"
                                                                    value={formik.values.allSuccess[index].unit}
                                                                    id={`success-${success.id}`}
                                                                    name={`allSuccess.${index}.intent`}
                                                                >
                                                                    {MEASURE_OF_SUCCESS_UNITS?.map((item) => (
                                                                        <div key={item} className="flex items-center space-x-3 space-y-0">
                                                                            <RadioGroupItem value={item} id={item} />
                                                                            <Label htmlFor={item} className="text-[#6E7C87] text-[13px] cursor-pointer">{item}</Label>
                                                                        </div>
                                                                    ))}
                                                                </RadioGroup>
                                                            </SelectContent>
                                                        </Select>
                                                        <ErrorMessage
                                                            name={`allSuccess.${index}.unit`}
                                                            className="text-red-500 text-xs"
                                                            component={"div"}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <Input
                                                            id={`target-${success.id}`}
                                                            label={`Target`}
                                                            placeholder="Input number"
                                                            labelClass="text-[#6E7C87] text-[13px] mb-[6px]"
                                                            name={`allSuccess.${index}.target`}
                                                            error={errorAllSuccess?.target}
                                                            onChange={(e) => handleChange(e.target.value, index, "target")}
                                                            className="border p-2 bg-[#F6F8F9]"
                                                            value={formik.values.allSuccess[index].target}
                                                        />
                                                        <ErrorMessage
                                                            name={`allSuccess.${index}.target`}
                                                            className="text-red-500 text-xs"
                                                            component={"div"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-red-500 hover:text-red-700 absolute right-0 -bottom-6 xl:-right-6 xl:bottom-3"
                                            >
                                                <Icon name="remove" width={14.28} height={18.63} />
                                            </button>
                                        </div>
                                    ))}

                                <button
                                    type="button"
                                    onClick={() =>
                                        push({
                                            success: "",
                                            unit: "",
                                            target: "",
                                        })
                                    }
                                    className="flex items-center gap-2 mt-8 text-primary text-sm"
                                >
                                    <LucidePlusCircle color="#04ACAC" size={20} />
                                    Add more level
                                </button>
                            </div>
                        )}
                    </FieldArray>
                    <div className="mt-8 flex gap-x-2 items-center">
                        <Button
                            variant="outline"
                            className={`text-primary py-5 px-2 rounded-sm bg-transparent border border-primary min-w-28`}
                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            //   disabled={isLoadingStrategicIntent}
                            //   loading={isLoadingStrategicIntent}
                            onClick={() => router.push(`${location}?ui=specified-intent`)}
                            loadingText="Save & Continue"
                            className={cn(
                                "w-full",
                                !formik.isValid
                                    // || isLoadingStrategicIntent
                                    ? "opacity-50 cursor-not-allowed w-max"
                                    : "cursor-pointer text-white py-5 px-2 rounded-sm bg-primary border border-primary w-max"
                            )}
                        // className={`text-white py-5 px-2 rounded-sm bg-primary border border-primary min-w-28`}
                        >
                            Save & Continue
                        </Button>
                    </div>
                </FormikProvider>
            </form>
        </div>
    );
};

export default MeasureofSuccess;
