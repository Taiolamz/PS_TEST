import * as yup from "yup";
import { useRouter } from "next/navigation";
import useDisclosure from "./useDisclosure";
import { useFormik } from "formik";
import { toast } from "sonner";
import Routes from "@/lib/routes/routes";

type Prop = {
  cancelPath: string;
};

type Select = {
  label: string | number;
  value: string | number;
};

const numOptions = [
  {
    label: 1,
    value: 1,
  },
  {
    label: 2,
    value: 2,
  },
  {
    label: 3,
    value: 3,
  },
  {
    label: 4,
    value: 4,
  },
  {
    label: 5,
    value: 5,
  },
];

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

export const useMissionApprovalFlow = ({ cancelPath }: Prop) => {
  const handleFormatDropdown = (items: Select[]) => {
    const data = items.map((chi) => {
      return {
        ...chi,
        label: chi?.label,
        value: chi?.label, //has to change to id
      };
    });
    return data;
  };

  const handleFormatArray = (items: Select[]) => {
    const array = items.map((item) => item.label);
    return array;
  };

  const formSchema = yup.object().shape({
    // level: yup
    //   .string()
    //   .oneOf(handleFormatArray(numOptions), "level is required")
    //   .required("State is required"),
    // head_of_department: yup
    //   .string()
    //   .min(1, "Head of Department is required")
    //   .required("Head of Department is required"),
    // work_email: yup
    //   .string()
    //   .min(1, "Work Email is required")
    //   .required("Work Email is required"),
    // subsidiary: yup
    //   .string()
    //   .oneOf(
    //     handleFormatArray(handleFormatDropdown(subsidiries)),
    //     "Subsidiary is required"
    //   )
    //   .required("Subsidiaryi s required"),
  });
  const router = useRouter();

  const handleSubmit = async () => {
    console.log({ ...formik.values });
  };
  const formik = useFormik({
    initialValues: {
      level: "",
      reviewers: "",
      //   head_of_department: "",
      //   work_email: "",
      //   subsidiary: "",
      //   branch: "",
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
    handleProceedCancel,
    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
    level: handleFormatDropdown(numOptions),
    reviewers: handleFormatDropdown(reviewers),
  };
};
