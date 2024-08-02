import { useRejectEmployeeInvitationMutation } from "@/redux/services/employee/employeeApi";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as yup from "yup";

export const useRejectEmployeeInvite = () => {
  const router = useRouter();
  const reasons = [
    {
      label: "I do not work at this company",
      value: "I do not work at this company",
    },
    {
      label: "I don’t know this individual",
      value: "I don’t know this individual",
    },
  ];

  const [rejectEmployeeInvitation, { isLoading: isRejectingInvitation }] =
    useRejectEmployeeInvitationMutation();

  const handleSubmit = async () => {
    const payload = {
      ...formik.values,
    };
    await rejectEmployeeInvitation(payload)
      .unwrap()
      .then(() => {
        // toast.success("Logged in Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            router.push("/dashboard");
          }, 2000);
        });
      });
  };
  const validationSchema = yup.object().shape({
    reason: yup.string().required(),
    others: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      reason: "",
      others: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return {
    formik,
    reasons,
    loading: isRejectingInvitation,
  };
};
