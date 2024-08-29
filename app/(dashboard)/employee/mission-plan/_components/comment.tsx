import React, { useContext, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "@radix-ui/react-icons";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { FaX } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { addAlphaToHex } from "@/utils/helpers/add-alpha-to-hex";

type CommentType = {
  id?: string;
  title?: string;
  author?: string;
  // text: string;
  comment?: string[];
  date?: string;
  time?: string;
};

type Props = {
  id?: string;
  name?: string;
  label?: string;
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
  // comments: string[];
  comments: CommentType;
  formik?: any;
};

const Comment = ({
  id,
  name,
  label,
  showTextArea,
  setShowTextArea,
  comments,
  formik,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { primaryColorHexValue } = useContext(ActionContext);
  const colorWithAlpha = primaryColorHexValue
    ? addAlphaToHex(primaryColorHexValue, 0.05)
    : "";

  const handleNext = () => {
    if (comments?.comment?.length && comments?.comment?.length > 0) {
      if (currentIndex < comments?.comment?.length - (showTextArea ? 1 : 2)) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAddComment = () => {
    setShowTextArea(true);
  };

  return (
    <section className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] bg-[#F6F8F9]">
      <div className="flex justify-between items-center mb-2.5">
        <div className="flex gap-3 items-center">
          <h2 className="text-[var(--primary-color)] text-sm text-medium">
            Comments
          </h2>
          <p
            className="inline-flex py-0.5 px-2 text-xs rounded-full text-[var(--primary-color)] bg-[#0080801A]"
            style={{
              backgroundColor: colorWithAlpha,
            }}
          >
            {comments?.comment?.length || 0}
          </p>
        </div>
        <div className="flex gap-3.5 items-center">
          <p
            className="flex gap-2.5 items-center text-[#6E7C87] text-sm cursor-pointer"
            onClick={handleAddComment}
          >
            <PlusIcon width={24} height={24} /> Add comment
          </p>
          {/* {comments?.comment?.length && ( */}
          <div className="flex items-center gap-2">
            <MdChevronLeft
              onClick={handlePrev}
              className={`border-[0.0938rem] border-[#9AA6AC] text-[#9AA6AC] rounded-sm cursor-pointer ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              size={24}
            />
            <MdChevronRight
              onClick={handleNext}
              size={24}
              className={`border-[0.0938rem] border-[#9AA6AC] text-[#9AA6AC] rounded-sm cursor-pointer ${
                comments?.comment?.length &&
                currentIndex >=
                  comments?.comment?.length - (showTextArea ? 1 : 2)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            />
          </div>
          {/* )} */}
        </div>
      </div>
      <div className="flex gap-3.5">
        {showTextArea && (
          <div className="basis-1/2 p-2 rounded-[0.3125rem] border bg-white border-[var(--primary-color)]">
            <div className="flex justify-between items-center mb-0.5 ">
              <label className="uppercase px-3 py-1 text-[0.625rem]  text-[#6E7C87]">
                {label}
              </label>
              <div className="flex items-center gap-1">
                <BsArrowUpCircleFill
                  color="text-primary"
                  className="text-[var(--primary-color)] "
                  onClick={() => {
                    formik?.handleSubmit();
                    setShowTextArea(false);
                  }}
                />
              </div>
            </div>
            <Textarea
              id="newComment"
              name="newComment"
              placeholder="Input Comment"
              value={formik?.values.newComment}
              onChange={formik?.handleChange}
              touched={formik?.touched.newComment}
              error={formik?.errors.newComment}
              rows={3}
              className="bg-white border-0 focus:border-0 focus-visible:ring-0 text-sm"
            />
          </div>
        )}
        {comments?.comment
          ?.slice(currentIndex, currentIndex + (showTextArea ? 1 : 2))
          .map((item, index) => (
            <div
              // key={comments?.id}
              key={index}
              className="basis-1/2 pt-3 pb-3.5 pr-8 pl-5 border-[#E5E9EB] border bg-white rounded-sm"
            >
              <div className="flex justify-between items-center mb-[0.4375rem]">
                <div className="flex gap-1.5 items-center">
                  <h3 className="text-[0.625rem]  text-[#6E7C87] uppercase">
                    {comments?.title?.replace(/-/g, " ")}
                  </h3>
                  <Badge className="text-[0.5rem] text-[#7E10E5] bg-[#7E10E51A]">
                    {comments?.author}
                  </Badge>
                </div>
                <HiDotsHorizontal />
              </div>
              <p className="text-xs font-light text-[#162238]">
                {/* {comments?.text} */}
                {item}
              </p>
              <div className="flex gap-[0.4375rem] justify-end">
                <p className="font-light text-[0.625rem] text-[#6E7C87] tracking-tighter">
                  {comments?.date}
                </p>
                <p className="font-light text-[0.625rem] text-[#6E7C87] tracking-tighter">
                  {comments?.time}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Comment;
