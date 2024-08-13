import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdCancel, MdChevronLeft, MdChevronRight } from "react-icons/md";

const comments = [
  {
    id: 1,
    title: "MISSION STATEMENT",
    author: "Bayo Taiwo",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "08/10/2024",
    time: "11:30pm",
  },
  {
    id: 2,
    title: "MISSION STATEMENT",
    author: "Bayo Taiwo",
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    date: "08/10/2024",
    time: "11:30pm",
  },
  {
    id: 3,
    title: "MISSION STATEMENT",
    author: "Bayo Taiwo",
    text: "When an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    date: "08/10/2024",
    time: "11:30pm",
  },
];

type Props = {
  id?: string;
  name?: string;
  label?: string;
};

const Comment = ({ id, name, label }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTextArea, setShowTextArea] = useState(false);

  const handleNext = () => {
    if (currentIndex < comments.length - (showTextArea ? 1 : 2)) {
      setCurrentIndex(currentIndex + 1);
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
          <h2 className="text-[var(--primary-color)] text-sm">Comments</h2>
          <p className="inline-flex py-0.5 px-2 text-xs rounded-full text-[var(--primary-color)] bg-[#0080801A]">
            {comments.length}
          </p>
        </div>
        <div className="flex gap-3.5 items-center">
          <p
            className="flex gap-2.5 items-center text-[#6E7C87] text-sm cursor-pointer"
            onClick={handleAddComment}
          >
            <PlusIcon width={24} height={24} /> Add comment
          </p>
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
                currentIndex >= comments.length - (showTextArea ? 1 : 2)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3.5">
        {showTextArea && (
          <div className="basis-1/2 p-2 rounded-[0.3125rem] border bg-white border-[var(--primary-color)]">
            <div className="flex justify-between items-center mb-0.5 ">
              <label className="uppercase px-3 py-1 text-xs">{label}</label>
              <div className="flex items-center gap-1">
                <MdCancel
                  color="red"
                  size={19}
                  onClick={() => setShowTextArea(false)}
                />
                <BsArrowUpCircleFill
                  color="text-primary"
                  className="text-[var(--primary-color)] "
                />
              </div>
            </div>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Input Comment"
              rows={4}
              className="bg-white border-0 focus:border-0 outline-none focus:outline-none"
            />
          </div>
        )}
        {comments
          .slice(currentIndex, currentIndex + (showTextArea ? 1 : 2))
          .map((comment) => (
            <div
              key={comment.id}
              className="basis-1/2 pt-3 pb-3.5 pr-8 pl-5 border-[#E5E9EB] border bg-white rounded-sm"
            >
              <div className="flex justify-between items-center mb-[0.4375rem]">
                <div className="flex gap-1.5 items-center">
                  <h3 className="text-[0.625rem]  text-[#6E7C87]">
                    {comment.title}
                  </h3>
                  <Badge className="text-[0.5rem] text-[#7E10E5] bg-[#7E10E51A]">
                    {comment.author}
                  </Badge>
                </div>
                <HiDotsHorizontal />
              </div>
              <p>{comment.text}</p>
              <div className="flex gap-[0.4375rem] justify-end">
                <p className="font-light text-[0.625rem] text-[#6E7C87] tracking-tighter">
                  {comment.date}
                </p>
                <p className="font-light text-[0.625rem] text-[#6E7C87] tracking-tighter">
                  {comment.time}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Comment;
