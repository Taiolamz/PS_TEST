import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { commentData, historyData } from "../_data/data";
import HistoryCard from "../../../_component/history-card";
import { SearchIcon } from "@/public/assets/icons";
import CommentCard from "../../../_component/comment-card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import avatar from "@/public/svgs/avatar.svg";

const Comment = () => {
  return (
    <div>
      <div className="flex gap-x-2 items-start relative mb-4 bg-[#F4F5F7] p-8">
        <Image src={avatar} alt="avatar" />
        <div className="w-full">
          <Textarea
            //   type="text"
            placeholder="type here your comment"
            id="financial_year.title"
            name="financial_year.title"
            // onChange={formik.handleChange}
            className={`h-[105px] p-0 pt-0 px-3 py-4 text-sm  transition-colors bg-[#F6F8F9]`}
          />
          <div className="flex w-full justify-end mt-4">
            <Button className="bg-primary">Comment</Button>
          </div>
        </div>
      </div>
      <div className="py-2 px-[18px]">
        <h2 className="mb-2">Previous Comments</h2>
        <div className="grid gap-y-3 h-[55vh] overflow-auto">
          {commentData.map((item, idx) => (
            <div className="" key={idx}>
              <CommentCard
                name={item.name}
                date={item.date}
                comment={item.comment}
                img={item.img}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
