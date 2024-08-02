import { Button } from "@/components/ui/button";
import { AvatarImg} from "@/public/assets/images";
import Image from "next/image";
import React from "react";

export default function CommentDrawer() {
  return (
    <div className="overflow-y-auto border h-full">
      <div className="w-full bg-custom-gray-2 py-6 flex">
        <div className="flex gap-3 px-6 items-start cursor-pointer ">
          <Image src={AvatarImg} alt="avatar" />
          <div className="w-full">
            <textarea name="comment" id="comment" className="w-full"></textarea>
            <Button className=" float-right" type="button">
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
