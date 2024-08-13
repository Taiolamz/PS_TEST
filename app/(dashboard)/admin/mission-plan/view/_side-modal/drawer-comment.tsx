import { PageLoader } from "@/components/custom-loader";
import { ReusableDrawer } from "@/components/fragment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  useAddMssionPlanCommentMutation,
  useAllMssionPlanCommentsMutation,
  useLazyGetCommentableTypeQuery,
} from "@/redux/services/mission-plan/missionPlanCommentApi";
import { useAppSelector } from "@/redux/store";
import { returnInitial } from "@/utils/helpers";
import { commentSchema } from "@/utils/schema/mission-plan";
import { useFormik } from "formik";
import React, { useEffect } from "react";

export default function DrawerComment({
  show,
  handleClose,
  userId,
}: {
  show: boolean;
  handleClose: () => void;
  userId?: string;
}) {
  const { user } = useAppSelector((state) => state.auth);

  const [
    allMissionPlanComments,
    { isLoading: loadingComment, error: allCommenterror, data: allComment },
  ] = useAllMssionPlanCommentsMutation();

  const [addMissionPlanComments, { isLoading: loadingAddComment }] =
    useAddMssionPlanCommentMutation();

  const [getCommentableType] = useLazyGetCommentableTypeQuery();

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentSchema,
    onSubmit: (values) => {
      addMissionPlanComments({
        ...values,
        commentable_id: userId,
        commentable_type: "mission-plan",
      })
        .unwrap()
        .then((data) => {
          clearForm();
          allMissionPlanComments({
            commentable_id: userId,
            commentable_type: "mission-plan",
          });
        })
        .catch((error) => {});
    },
  });

  const clearForm = () => {
    formik.setValues({ comment: "" });
    formik.setErrors({ comment: "" });
    formik.setTouched({});
  };

  useEffect(() => {
    clearForm();
    if (show && userId) {
      allMissionPlanComments({
        commentable_id: userId,
        commentable_type: "mission-plan",
      });
      getCommentableType({})
        .unwrap()
        .then((data) => {});
    }
  }, [userId]);

  return (
    <ReusableDrawer
      title="Comment"
      show={show}
      handleClose={handleClose}
      closeOnClickOutside={false}
    >
      <section className="">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-custom-gray-2 px-6 pt-7 pb-5"
        >
          <div className="flex space-x-3">
            <div className="">
              <div className="size-6 rounded-full bg-[var(--primary-color)] grid place-content-center">
                <span className="text-white font-semibold uppercase text-xs">
                  {returnInitial(user?.name as any)}
                </span>
              </div>
            </div>
            <div className="w-full">
              {/* <textarea name="comment" id="comment"></textarea> */}
              <Textarea
                rows={3}
                id="comment"
                name="comment"
                placeholder="type here your comment"
                className="mt-1 w-full !bg-white block px-3 py-2 border outline-none border-gray-300 bg-[var(--input-bg)] rounded-md shadow-sm sm:text-sm"
                onChange={formik.handleChange}
                touched={formik.touched.comment}
                value={formik.values.comment}
                error={formik.errors.comment}
              />
              <Button
                type="submit"
                disabled={loadingAddComment}
                //   loading={isLoadingStrategicIntent}
                loadingText="Save & Continue"
                className={cn(
                  "w-full mt-3.5 float-right",
                  !formik.isValid
                    ? // || isLoadingStrategicIntent
                      "opacity-50 cursor-not-allowed w-max"
                    : "cursor-pointer text-white py-3 px-2 rounded-sm bg-[var(--primary-color)] border border-[var(--primary-color)] w-max"
                )}
                // className={`text-white py-5 px-2 rounded-sm bg-[var(--primary-color)] border border-[var(--primary-color)] min-w-28`}
              >
                {loadingAddComment ? "Sending" : "Comment"}
              </Button>
            </div>
          </div>
        </form>

        <main className="pl-4 pt-3">
          <h3 className="text-sm mb-4">Previous Comments</h3>
          <section className="space-y-4 h-[53vh] overflow-y-auto pr-3">
            {allCommenterror ? (
              <></>
            ) : loadingComment ? (
              <PageLoader />
            ) : allComment?.data?.length === 0 ? (
              <div className="text-center mt-16">
                <p className="text-custom-gray-scale-400 font-medium text-sm">
                  No Comments Yet
                </p>
              </div>
            ) : (
              allComment?.data?.map((item: any) => (
                <div
                  key={item}
                  className="border border-custom-divider bg-custom-bg rounded-md p-[15px]"
                >
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-x-[7px]">
                      <div className="size-6 rounded-full bg-[var(--primary-color)] grid place-content-center">
                        <span className="text-white font-semibold uppercase text-xs">
                          {returnInitial(item?.staff_member?.name)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-custom-dark-gray">
                          {item?.staff_member?.name}
                        </h3>
                        <p className="text-[10px] font-light text-custom-gray-scale-400">
                          {item?.created_at}
                        </p>
                      </div>
                    </div>
                    <span className="size-1.5 bg-custom-red rounded-full" />
                  </div>
                  <div className="text-[13px] text-custom-ash">
                    {item?.comment}
                  </div>
                </div>
              ))
            )}
          </section>
        </main>
      </section>
    </ReusableDrawer>
  );
}
