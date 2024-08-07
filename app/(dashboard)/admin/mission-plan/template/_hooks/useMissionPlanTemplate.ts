import * as yup from "yup";
import useDisclosure from "./useDisclosure";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useCreateMissionPlanTemplateMutation } from "@/redux/services/checklist/missionPlanTemplateApi";
import Routes from "@/lib/routes/routes";
import { toast } from "sonner";
import { useGetUnitsQuery } from "@/redux/services/checklist/unitApi";
import routesPath from "@/utils/routes";

type Prop = {
  cancelPath: string;
};

const units = [
  { label: "unit1", value: "unit1" },
  { label: "unit2", value: "unit2" },
  { label: "unit3", value: "unit3" },
];
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
export const useMissionPlanTemplate = ({ cancelPath }: Prop) => {
  const { data: unitsData, isLoading: isLoadingUnits } = useGetUnitsQuery({
    to: 0,
    total: 0,
    per_page: 50,
    currentPage: 0,
    next_page_url: "",
    prev_page_url: "",
  });

  const units = unitsData ?? [];
  const user = useAppSelector(selectUser);

  const handleFormatDropdown = (items: UnitData[]) => {
    const data = items.map((chi) => {
      return {
        ...chi,
        label: chi?.name,
        value: chi?.name,
      };
    });
    return data;
  };

  const { organization } = user;

  const MissionPlanTemplateRoute = ADMIN.MISSION_PLAN_TEMPLATE;
  const [
    createMissionPlanTemplate,
    { isLoading: isCreatingMissionPlanTemplate },
  ] = useCreateMissionPlanTemplateMutation();

  const handleSubmit = async () => {
    const payload = {
      ...formik.values,
      // name: formik.values.strategic_intent,
      name: formik.values.template_title,
      organization_id: organization?.id,
    };
    await createMissionPlanTemplate(payload)
      .unwrap()
      .then(() => {
        toast.success("Mission Plan Template Created Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            router.push(MissionPlanTemplateRoute);
          }, 2000);
        });
      });
  };
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      template_title: "",
      financial_year: {
        title: "",
        start_period: new Date(),
        end_period: new Date(),
        // end_period: new Date(),
      },
      mission_statement: "",
      measure_of_success: {
        measure_of_success: "",
        unit: "",
        target: "",
      },
      implied_task: "",
      specified_task: "",
      freedom_and_constraints: {
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
    isLoadingUnits,
    handleProceedCancel,
    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
    units: handleFormatDropdown(units),
  };
};
