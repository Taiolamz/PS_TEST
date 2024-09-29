import React from "react";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { LoaderCircle, X } from "lucide-react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ModalContainer from "@/components/modal-container";
export default function RejectModal({
  show,
  handleClose,
  loading,
  handleSubmit,
}: {
  show: boolean;
  handleClose: () => void;
  loading?: boolean;
  handleSubmit: (value: { message: string }) => void;
}) {
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: (value) => handleSubmit(value),
    validationSchema: Yup.object({
      message: Yup.string()
        .min(10, "Message must be at least 10 characters") // Minimum 10 characters
        .required("Please provide a valid reason"),
    }),
  });

  React.useEffect(() => {
    formik.resetForm();
  }, [show]);

  return (
    <ModalContainer
      show={show}
      handleClose={handleClose}
      modalClass="min-h-[331px] !w-[423px] rounded "
    >
      <div className="absolute top-0">
        <form onSubmit={formik.handleSubmit} className="w-full p-4 px-6 ">
          <div className="flex justify-between items-center mt-3 mb-[18px]">
            <h4 className="text-[var(--bg-red-100)]">Reject Submission</h4>
            <X className="size-[18px] cursor-pointer" onClick={handleClose} />
          </div>
          <Textarea
            id="message"
            name="message"
            className="w-full h-[100px] resize-none my-2"
            onChange={formik.handleChange}
            value={formik.values.message}
            error={formik.errors.message}
            touched={formik.touched.message}
          />

          <p className="text-[var(--text-color4)] text-sm text-left">
            You’re about to reject this submission. This action will send a
            notification to the user with your comment. Press the button below
            to proceed?
          </p>
          <div className="flex items-center justify-end space-x-4">
            <Button
              type="button"
              onClick={handleClose}
              disabled={loading}
              variant={"outline"}
              className={cn(
                "font-light rounded mt-5 border-[var(--primary-color)] text-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-[var(--primary-accent-color)]"
              )}
            >
              No
            </Button>
            <Button
              type="submit"
              loading={loading}
              loadingText="Yes, Reject"
              disabled={loading}
              className={cn(
                "font-light ml-4 rounded mt-5 bg-[var(--bg-red-100)]"
              )}
            >
              Yes, Reject
            </Button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}
