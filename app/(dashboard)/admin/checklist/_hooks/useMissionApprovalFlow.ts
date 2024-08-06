import * as yup from "yup";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDisclosure from "./useDisclosure";
import { useFormik } from "formik";
import { toast } from "sonner";
import Routes from "@/lib/routes/routes";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import routesPath from "@/utils/routes";
import { useCreateMissionFlowMutation } from "@/redux/services/checklist/missionFlowApi";

type Prop = {
  cancelPath: string;
};

type Select = {
  label: string | number;
  value: string | number;
};

const reviewers = [
  {
    label: "Super Admin",
    value: "Super Admin",
  },
  {
    label: "Admin",
    value: "Admin",
  },
  {
    label: "Line Manager",
    value: "Line Manager",
  },
  {
    label: "HR Admin",
    value: "HR Admin",
  },
  {
    label: "Strategy",
    value: "Strategy",
  },
  {
    label: "None",
    value: "None",
  },
];
const { ADMIN } = routesPath;
export const useMissionApprovalFlow = ({ cancelPath }: Prop) => {
  const handleFormatDropdown = (items: Select[]) => {
    const data = items.map((chi) => {
      return {
        ...chi,
        label: chi?.label,
        value: chi?.label,
      };
    });
    return data;
  };

  const handleFormatArray = (items: Select[]) => {
    const array = items.map((item) => item.label);
    return array;
  };

  // const formSchema = yup.object().shape({});
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const { organization } = user;
  // const BranchRoute = ADMIN.BRANCHES;
  const [createMissionFlow, { isLoading: isCreatingMissionFlow }] =
    useCreateMissionFlowMutation();

  const handleSubmit = async () => {
    console.log(formik.values.order_of_approvals, "values");
    const payload = {
      order_of_approvals: formik.values.order_of_approvals,
      organization_id: organization?.id,
    };
    await createMissionFlow(payload)
      .unwrap()
      .then(() => {
        toast.success("Branch Created Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            // router.push(BranchRoute);
          }, 2000);
        });
      });
  };

  const location = usePathname();
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");

  const handleProceed = () => {
    if (ui === "approval-flow-step-two") {
      handleSubmit();
      // router.push(ADMIN.CHECKLIST);
    } else {
      router.push(`${location}?ui=approval-flow-step-two`);
    }
  };
  const formik = useFormik({
    initialValues: {
      level: "",
      reviewers: "",
      order_of_approvals: [{ title: "", approvals: [""] }],
    },
    // validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  const levelOptions: Select[] = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

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
    handleProceedCancel,
    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
    level: handleFormatDropdown(levelOptions),
    reviewers: handleFormatDropdown(reviewers),
    handleProceed,
    isCreatingMissionFlow,
    ui,
  };
};
