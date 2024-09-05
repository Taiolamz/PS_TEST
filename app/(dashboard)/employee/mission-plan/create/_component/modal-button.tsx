import { DialogClose, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

interface PropType {
  children: React.ReactNode;
}

export const ModalButtonOpen = ({ children }: PropType) => {
  return <DialogTrigger asChild>{children}</DialogTrigger>;
};

export const ModalButtonClose = ({ children }: PropType) => {
  return <DialogClose asChild>{children}</DialogClose>;
};
