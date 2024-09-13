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
import { useGetGradeLevelsQuery } from "@/redux/services/onboarding/gradeLevelApi";

type Prop = {
  cancelPath: string;
};

type Select = {
  label: string | number;
  value: string | number;
};

interface Approval {
  title: string;
  approvals: string[];
}

interface FormValues {
  title: string;
  order_of_approvals: Approval[];
  head_of_organization: string;
}

const formSchema = yup.object().shape({
  order_of_approvals: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required("Title is required"),
        approvals: yup
          .array()
          .of(yup.string().required("Approval is required"))
          .min(1, "At least one approval is required")
          .required("Approvals are required"),
      })
    )
    .required("Order of approvals is required"),
});
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

  const router = useRouter();
  const user = useAppSelector(selectUser);

  const { organization } = user;

  // console.log(organization, "organization");

  const [createMissionFlow, { isLoading: isCreatingMissionFlow }] =
    useCreateMissionFlowMutation();

  const { data: gradeLevelData, isLoading: isLoadingGradeLevel } =
    useGetGradeLevelsQuery({});
  const gradeLevels = gradeLevelData ?? [];

  const handleSubmit = async () => {
    // const newApprovals = [...formik.values.order_of_approvals];
    // newApprovals.push({
    //   // title: "Organization Head",
    //   // approvals: [formik.values.head_of_organization],
    // });
    const newApprovals = [...formik.values.order_of_approvals];

    const payload = {
      // order_of_approvals: formik.values.order_of_approvals,
      // ...formik.values,
      title: formik.values.title,
      order_of_approvals: newApprovals,
      organization_id: organization?.id,
    };

    await createMissionFlow(payload)
      .unwrap()
      .then(() => {
        toast.success("Approval Flow Created Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            router.push(ADMIN.CHECKLIST);
            // router.push(BranchRoute);
          }, 2000);
        });
      });
  };

  const location = usePathname();
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");
  const approvalArray = (organization as any)?.approval_flows
    ? (organization as any)?.approval_flows
    : gradeLevels;
  //     initialValues: {
  //   order_of_approvals:
  //     (organization as any)?.approval_flows?.map((chi: any) => ({
  //       title: chi.title,
  //       approvals: chi?.approvals || [],
  //     })) || [],
  //   head_of_organization: "",
  // },
  const handleFormatGradeLevel = () => {
    const newData = approvalArray?.map((chi: any) => ({
      title: chi?.name || chi?.title || "",
      approvals: chi?.approvals || [],
    }));
    return newData;
  };

  const formik = useFormik<any>({
    initialValues: {
      order_of_approvals: handleFormatGradeLevel(),
      // head_of_organization: "",
    },
    enableReinitialize: true,
    // validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  const levelOptions: Select[] = Array.from({ length: 10 }, (_, i) => ({
    value: i.toString(),
    label: i.toString(),
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
    // reviewers: handleFormatDropdown(reviewers),
    // handleProceed,
    isCreatingMissionFlow,
    ui,
    organization,
    isLoadingGradeLevel,
  };
};
