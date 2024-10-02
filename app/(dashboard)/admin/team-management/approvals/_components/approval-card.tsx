"use client";
import React, { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import threelines from "@/public/assets/icons/threelines.svg";
import Icon from "@/components/icon/Icon";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import routesPath from "@/utils/routes";

const { ADMIN } = routesPath;

interface ApprovalCardProps {
  id: string;
  title: string;
}
const ApprovalCard = ({ id, title }: ApprovalCardProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const divRef = useRef<any>(null);

  return (
    <div className="border border-[#E5E9EB] hover:border-primary transition-all ease-in duration-75 bg-[#FAFAFA] pt-4 px-6 w-max pb-12">
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        // modal={modalPopover}
      >
        <PopoverTrigger asChild ref={divRef}>
          <div className="flex justify-end mb-5 cursor-pointer">
            <BsThreeDotsVertical color="#9AA6AC" />
          </div>
        </PopoverTrigger>

        <Link href={ADMIN.SINGLE_APPROVAL(id)}>
          <PopoverContent
            className="w-40 rounded-[2px] py-1 px-2 cursor-pointer"
            align="end"
          >
            <Button className="text-xs bg-transparent text-[#9AA6AC] h-0 px-0 shadow-none hover:text-primary font-normal">
              Edit
            </Button>
          </PopoverContent>
        </Link>
      </Popover>
      <p className="mb-2 font-medium text-sm w-2/3">{title}</p>
      <Image src={threelines} alt="" />
    </div>
  );
};

export default ApprovalCard;
