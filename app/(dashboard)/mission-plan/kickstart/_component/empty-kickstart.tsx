import { Button } from "@/components/ui/button";
import { FileIcon } from "@/public/assets/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function EmptyKickstart({ href }: { href: string }) {
  return (
    <div className="h-[75vh] flex flex-col gap-4 items-center justify-center">
      <Image src={FileIcon} alt="file icon" />
      <p className="text-custom-gray-scale-400 font-medium text-sm">
        Create your Mission plan by using the button below
      </p>
      <Link href={href}>
        <Button className="text-custom-gray-scale-white px-3">
          Kickstart Financial Year
        </Button>
      </Link>
    </div>
  );
}
