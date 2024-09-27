/* eslint-disable react-hooks/exhaustive-deps */
import { PageLoader } from "@/components/custom-loader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { returnInitial } from "@/utils/helpers";
import { formatTimestamp } from "@/utils/helpers/date-formatter";
import { commentSchema } from "@/utils/schema/mission-plan";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import CustomDrawer, { CustomDrawerProp } from "@/components/custom-drawer";
import { Dictionary } from "@/@types/dictionary";
import { LottieAnimation } from "../fragment";
import { LottieEmptyState } from "@/lottie";

type COMMENT_DATA_TYPE = {
  id: number | string,
  staff_member: Dictionary,
  created_at: string,
  comment: string,
}

interface CommentDrawerProp extends CustomDrawerProp {
  id: string;
  loadingAddComment?: boolean;
  loadingComment?: boolean;
  error?: any;
  data: COMMENT_DATA_TYPE[],
  handleSubmit: (value: {
    comment: string;
    component_type: string;
    component_id: string;
  }) => void;
  commentType:
  | "mission-statement"
  | "boundary"
  | "strategic-intent"
  | "specified-task"
  | "implied-task"
  | "strategic-pillar"
  | "success-measure";
}

export default function CustomCommentDrawer({
  open,
  onClose,
  id,
  loadingComment,
  loadingAddComment,
  error,
  commentType,
  handleSubmit,
  data
}: CommentDrawerProp) {
  const { user } = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentSchema,
    onSubmit: (value) => {
      handleSubmit({
        comment: value.comment,
        component_type: commentType,
        component_id: id,
      });
    },
  });

  //  Empty form if id changes
  useEffect(() => {
    const clearForm = () => {
      formik.setValues({ comment: "" });
      formik.setErrors({ comment: "" });
      formik.setTouched({});
    };
    clearForm();
  }, [id]);

  return (
    <CustomDrawer title="Comments" open={open} onClose={onClose}>
      <div className="sr-only">This is the id to fetch this challenge {id}</div>
      <section className="h-[calc(100vh-66px)] grid">
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
              <Textarea
                rows={3}
                id="comment"
                disabled={loadingComment}
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
                disabled={loadingAddComment || loadingComment}
                loading={loadingAddComment}
                loadingText="Comment"
                className={cn(
                  "w-full mt-3.5 float-right",
                  !formik.isValid
                    ? "opacity-50 cursor-not-allowed w-max"
                    : "cursor-pointer text-white py-3 px-2 rounded-sm bg-[var(--primary-color)] border border-[var(--primary-color)] w-max"
                )}
              >
                Comment
              </Button>
            </div>
          </div>
        </form>

        <main className="pl-4 pt-3 flex-1 flex flex-col">
          <h3 className="text-sm mb-4">Previous Comments</h3>
          <section className="space-y-4 h-[calc(100vh-296px)] grid overflow-y-auto pr-3 pb-3">
            {error ? (
              <></>
            ) : loadingComment ? (
              <div className="place-content-center">
                <PageLoader />
              </div>
            ) : (
              <div className="space-y-4 place-content-center">
                {
                  data?.length ?
                    data?.map((item: any) => (
                      <div
                        key={item?.id}
                        className="border border-custom-divider w-full h-fit overflow-y-auto bg-custom-bg rounded-md p-[15px]"
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
                                {formatTimestamp(item?.created_at)}
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
                    :
                    <div className="overflow-hidden">
                      <LottieAnimation
                        animationData={LottieEmptyState}
                        height={"8rem"}
                      />
                    </div>
                }
          </div>
            )}
      </section>
    </main>
      </section >
    </CustomDrawer >
  );
}

const allComment = [
  {
    id: "34eef",
    staff_member: { name: "Inioluwa Alake" },
    created_at: "2024-01-01T14:30:45",
    comment: "Discuss with your driect LM on this ",
  },
  {
    id: "243423",
    staff_member: { name: "Adeyinka Balagun" },
    created_at: "2024-09-22T14:30:45",
    comment: "Check your specified unit. Its wrong",
  },
  {
    id: "2334gr",
    staff_member: { name: "Charles Uwaje" },
    created_at: "2024-09-27T02:30:45",
    comment: "21 savage is goated take it or leave it",
  },
];
