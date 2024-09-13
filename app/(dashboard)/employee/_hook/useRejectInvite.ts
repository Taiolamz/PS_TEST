import {
  useGetInvitedEmployeesQuery,
  useRejectEmployeeInvitationMutation,
} from "@/redux/services/employee/employeeApi";
import { useAppSelector } from "@/redux/store";
import { checkUserRole } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import * as yup from "yup";

export const useRejectEmployeeInvite = () => {
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

  const [
    rejectEmployeeInvitation,
    { isLoading: isRejectingInvitation, isSuccess: isRejectSuccess },
  ] = useRejectEmployeeInvitationMutation();

  const searchParams = useSearchParams();
  const invitedID = searchParams.get("id");

  const { data: invitedUsersData, isLoading: isLoadingInvitedUsers } =
    useGetInvitedEmployeesQuery(String(invitedID));

  const invitedUser = invitedUsersData ?? [];

  const handleSubmit = async () => {
    const payload = {
      ...formik.values,
      reason: formik?.values?.reason || formik?.values?.others,
    };
    const id = invitedID;

    try {
      await rejectEmployeeInvitation({ id, payload }).unwrap();
      toast.success("Invitation Rejected Successfully");
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    } catch (error) {
      console.error("Failed to reject invitation:", error);
      // toast.error("Failed to reject invitation");
    }
  };

  const validationSchema = yup.object().shape({
    reason: yup
      .string()
      .test(
        "reason-required",
        "Either reason or others is required.",
        function (value) {
          const { others } = this.parent;
          return value || others;
        }
      ),
    others: yup
      .string()
      .test(
        "others-required",
        "Either reason or others is required.",
        function (value) {
          const { reason } = this.parent;
          return value || reason;
        }
      ),
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
    isRejectSuccess,
    invitedUser,
  };
};
