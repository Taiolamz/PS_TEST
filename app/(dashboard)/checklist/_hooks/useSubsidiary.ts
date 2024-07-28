import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { HomeIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import useDisclosure from "./useDisclosure";
import { useFormik } from "formik";
// import { useSubsidiaryService } from "./api";
// import { useUserStore } from "@/providers/user-store-provider";

type Prop = {
  path: string;
  cancelPath: string;
};

// DUMMY DATA
const countries = [
  { label: "Nigeria", value: "Nigera", icon: HomeIcon },
  { label: "Germany", value: "Germany", icon: HomeIcon },
  { label: "South Africa", value: "South Africa", icon: HomeIcon },
];
const states = [
  {
    label: "Lagos",
    value: "Lagos",
  },
  {
    label: "Ogun",
    value: "Ogun",
  },
];

const handleFormatArray = (items: SelectFormType) => {
  const array = items.map((item) => item.label);
  return array;
};

const formSchema = yup.object().shape({
  name: yup.string().min(1, "Name is required").required("Name is required"),
  address: yup
    .string()
    .min(1, "Address is required")
    .required("Address is required"),
  country: yup
    .string()
    .oneOf(handleFormatArray(countries), "Country is required")
    .required("Country is required"),
  state: yup
    .string()
    .oneOf(handleFormatArray(states), "State is required")
    .required("State is required"),
  head_of_subsidiary: yup
    .string()
    .min(1, "Head of subsidiary is required")
    .required("Head of subsidiary is required"),
  work_email: yup
    .string()
    .min(1, "Work Email is required")
    .required("Work Email is required"),
});

export const useSubsidiary = ({ path, cancelPath }: Prop) => {
  //   const { createSubsidiary, loading } = useSubsidiaryService();
  //   const user = useUserStore((state) => state.user);
  //   const { organization } = user?.user;
  const router = useRouter();
  const formik = useFormik({
    // Uncomment and configure resolver if using form validation
    // resolver: zodResolver(formSchema),
    initialValues: {
      name: "",
      address: "",
      country: "",
      state: "",
      head_of_subsidiary: "",
      work_email: "",
    },
    // Optionally, you can add onSubmit and other handlers here
    onSubmit: (values) => {
      console.log("Form values:", values);
      // Perform form submission logic here
    },
  });

  //   const formik = useFormik({
  //     // resolver: zodResolver(formSchema),
  //     initialValues: {
  //       name: "",
  //       address: "",
  //       country: "",
  //       state: "",
  //       head_of_subsidiary: "",
  //       work_email: "",
  //     },
  //   });

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

  //   const handleSubmit = (values: z.infer<typeof formSchema>) => {
  //     const obj = { ...values, organization_id: organization?.id, city: "lagos" };
  //     createSubsidiary(obj);
  //     // router.push(path);
  //   };

  const handleProceedCancel = () => {
    router.push(cancelPath);
  };

  return {
    formik,
    // loading,
    // handleSubmit,
    countries,
    handleProceedCancel,
    states,
    openCancelModal,
    onOpenCancelModal,
    closeCancelModal,
    handleCancelDialog,
  };
};
