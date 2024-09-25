"use client";

import Image from "next/image";
import { ActionIcon } from "@/public/assets/icons";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import useDisclosure from "../../_hooks/useDisclosure";

export const useSubsidiaryColumnData = (loading?: boolean) => {
  const {
    isOpen: openDeleteModal,
    open: onOpenDeleteModal,
    close: closeDeleteModal,
  } = useDisclosure();
  const [data, setData] = useState({});

  const handleDeleteDialog = (rowData: SubsidiaryData) => {
    setData(rowData);
    onOpenDeleteModal();
    if (openDeleteModal) {
      closeDeleteModal();
    }
  };

  const subsidiaryColumns: ColumnDef<SubsidiaryData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="border-custom-gray-scale-white border-0 bg-white outline-none"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="border-custom-gray-scale-white border-0 outline-none"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">
          {loading ? (
            <Skeleton className="h-4 w-[150px]" />
          ) : (
            row.getValue("name") || "------"
          )}
        </div>
      ),
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => (
        <div className="capitalize text-right">
          {loading ? (
            <Skeleton className="h-4 w-[150px]" />
          ) : (
            row.getValue("country") || "------"
          )}
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
        <div className="capitalize text-nowrap">
          {loading ? (
            <Skeleton className="h-4 w-[150px]" />
          ) : (
            row.getValue("address") || "------"
          )}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-center">Action</div>,
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Image src={ActionIcon} alt="Action icon" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border rounded-sm"
              align="end"
              style={{ width: "170px" }}
            >
              <DropdownMenuItem
                className="font-light text-sm cursor-pointer text-custom-gray-scale-400"
                onClick={() => {
                  // Your edit action here
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-custom-red font-light cursor-pointer text-sm"
                onClick={() => handleDeleteDialog(row.original)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return {
    subsidiaryColumns,
    data,
    openDeleteModal,
    handleDeleteDialog,
  };
};
