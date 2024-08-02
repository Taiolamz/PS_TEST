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
  };
};
