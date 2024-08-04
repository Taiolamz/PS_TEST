import { useRejectEmployeeInvitationMutation } from "@/redux/services/employee/employeeApi";
import { useAppSelector } from "@/redux/store";
import { checkUserRole } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as yup from "yup";

export const useRejectEmployeeInvite = () => {
  const { user } = useAppSelector((state) => state.auth);
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
            if (checkUserRole(user?.role as string) === "ADMIN") {
              router.push(routesPath?.ADMIN.OVERVIEW);
            } else {
              router.push(routesPath?.EMPLOYEE.OVERVIEW);
            }
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
