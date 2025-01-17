import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { selectUser } from "@/redux/features/auth/authSlice";
import { resetFinancialYearDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import { useCreateMissionPlanTemplateMutation } from "@/redux/services/checklist/missionPlanTemplateApi";
// import { useGetUnitsQuery } from "@/redux/services/checklist/unitApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";
import useDisclosure from "./useDisclosure";

type Prop = {
  cancelPath: string;
  templateID?: string;
};

interface Section {
  isRequired?: boolean;
  id: string;
  title: string;
  displayName: string;
  mapTitle: string;
  content: () => JSX.Element;
  isSelected?: boolean;
}

type SectionKeys =
  | "financial_year"
  | "mission_statement"
  | "success_measures"
  | "strategic_intents"
  | "boundaries"
  | "specified_tasks"
  | "implied_tasks"
  | "duration";

// const units = [
//   { label: "unit1", value: "unit1" },
//   { label: "unit2", value: "unit2" },
//   { label: "unit3", value: "unit3" },
// ];
const handleFormatArray = (items: SelectFormType) => {
  const array = items.map((item) => item.label);
  return array;
};

// still in development
const financialYearSchema = yup.object().shape({
  title: yup.string().min(1, "Financial year title is required"),
  start_period: yup
    .string()
    .min(1, "Financial start period is required")
    .optional(),
  end_period: yup
    .string()
    .min(1, "Financial end period is required")
    .optional(),
});
const freedomAndConstraints = yup.object({
  constraint: yup.string().min(1, "Constraint is required"),
  freedom: yup.string().min(1, "Freedom is required"),
});

const measureOfSuccessSchema = yup.object({
  measure_of_success: yup.string().min(1, "Measure of success is required"),
  //   unit: yup.string().oneOf((val) => handleFormatArray(units).includes(val), {
  //     message: "Unit is required",
  //   }),
  unit: yup.string(),
  target: yup.string().min(1, "Target must be at least 1"),
});

const formSchema = yup.object({
  template_title: yup.string().min(1, "Template title is required"),
  financial_year: financialYearSchema,
  mission_statement: yup.string().min(1, "Mission statement is required"),
  measure_of_success: measureOfSuccessSchema,
  implied_task: yup.string().min(1, "Implied task is required"),
  specified_task: yup.string().min(1, "Specified task is required"),
  freedom_and_constraints: freedomAndConstraints,
  strategic_intent: yup.string().min(1, "Strategic intent is required"),
  strategic_pillar: yup.string().min(1, "Strategic pillar is required"),
});
const { ADMIN } = routesPath;
export const useMissionPlanTemplate = ({ cancelPath, templateID }: Prop) => {
  // const { data: unitsData, isLoading: isLoadingUnits } = useGetUnitsQuery({
  //   to: 0,
  //   total: 0,
  //   per_page: 50,
  //   currentPage: 0,
  //   next_page_url: "",
  //   prev_page_url: "",
  // });
  const [sections, setSections] = useState<Section[]>([]);

  // console.log(unitsData, "unit data");

  // const units = unitsData?.data?.data ?? [];
  const user = useAppSelector(selectUser);
  const actionCtx = useContext(ActionContext);

  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleFormatDropdown = (items: UnitData[]) => {
    const data = items?.map((chi) => {
      return {
        ...chi,
        label: chi?.name,
        value: chi?.name,
      };
    });
    return data;
  };

  const transformData = (input: any) => {
    const payload = {
      id: templateID || "",
      assignees: [],
      name: input.template_title,
    };

    sections.forEach((section, index) => {
      (payload as any)[section.mapTitle] = {
        order: index + 1,
        ...input[section.mapTitle],
        ...section,
      };
    });

    return payload;
  };
  const location = usePathname();

  const MissionPlanTemplateRoute = ADMIN.MISSION_PLAN_TEMPLATE;
  const [
    createMissionPlanTemplate,
    { isLoading: isCreatingMissionPlanTemplate },
  ] = useCreateMissionPlanTemplateMutation();

  const handleSubmit = async () => {
    const payload = transformData(formik.values);
    await createMissionPlanTemplate(payload).unwrap();
    actionCtx?.triggerUpdateChecklist();
    if (searchParams.get("qs") === "kick-start-fy") {
      toast.success("Mission Plan Template Created Successfully");
      router.back();
      return;
    } else if (searchParams.get("qs") === "template") {
      dispatch(resetFinancialYearDetails());
      toast.success("Mission Plan Template Created Successfully");
      router.push(`${ADMIN.KICK_START_MISSION_PLAN}?ui=financial-year`);
      return;
    }
    if (templateID && location === ADMIN.VIEW_MISSION_PLAN_TEMPLATE) {
      toast.success("Mission Plan Template Updated Successfully");
    } else {
      toast.success("Mission Plan Template Created Successfully");
    }

    new Promise(() => {
      setTimeout(() => {
        toast.dismiss();
        router.push(MissionPlanTemplateRoute);
        // toast.success("Mission Plan Template Created Successfully");
        if (searchParams.get("qs") === "kick-start-fy") {
          router.back();
          return;
        }
        if (searchParams.get("qs") === "template") {
          dispatch(resetFinancialYearDetails());
          router.push(`${ADMIN.KICK_START_MISSION_PLAN}?ui=financial-year`);
          return;
        }
      }, 2000);
    });
  };

  const formik = useFormik({
    initialValues: {
      template_title: "",
      financial_year: {
        title: "",
        start_period: new Date(),
        end_period: new Date(),
      },
      mission_statement: "",
      success_measures: {
        measure_of_success: "",
        unit: "",
        target: "",
      },
      implied_tasks: "",
      specified_tasks: "",
      boundaries: {
        constraint: "",
        freedom: "",
      },
      strategic_intent: "",
      strategic_pillar: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  const {
    isOpen: openCancelModal,
    open: onOpenCancelModal,
    close: closeCancelModal,
  } = useDisclosure();

  const handleCancelDialog = () => {
    onOpenCancelModal();
    if (openCancelModal) {
      closeCancelModal();
    }
  };

  const handleProceedCancel = () => {
    router.push(cancelPath);
  };

  return {
    formik,
    isCreatingMissionPlanTemplate,
    // isLoadingUnits,
    handleProceedCancel,
    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
    // units: handleFormatDropdown(units),
    sections,
    setSections,
  };
};
