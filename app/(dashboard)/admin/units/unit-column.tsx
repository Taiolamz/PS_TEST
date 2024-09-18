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
import useDisclosure from "./_hooks/useDisclosure";
import React, { useState } from "react";
import { useAppSelector } from "@/redux/store";
import { processInputAsArray } from "@/utils/helpers";

export const useUnitColumnData = (loading?: boolean) => {
  const {
    isOpen: openDeleteModal,
    open: onOpenDeleteModal,
    close: closeDeleteModal,
  } = useDisclosure();
  const [data, setData] = useState({});
  const { user } = useAppSelector((state) => state.auth);

  const handleDeleteDialog = (rowData: UnitData) => {
    setData(rowData);
    onOpenDeleteModal();
    if (openDeleteModal) {
      closeDeleteModal();
    }
  };

  const unitColumns: ColumnDef<UnitData>[] = [
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
      header: "Unit Name",
      cell: ({ row }) => (
        <div className="capitalize">
          {loading ? (
            <Skeleton className="h-4 w-[250px]" />
          ) : (
            row.getValue("name") || "------"
          )}
        </div>
      ),
    },
    {
      accessorKey: "head_of_unit",
      // header: "Head of Unit",
      header: () => <div className="text-right">Head of Unit</div>,
      cell: ({ row }) => {
        const head_of_unit = row.getValue("head_of_unit") as ObjType;
        return (
          <div className="capitalize text-right">
            {loading ? (
              <Skeleton className="h-4 w-[250px]" />
            ) : (
              head_of_unit?.name || "------"
            )}
          </div>
        );
      },
    },
    // {
    //   accessorKey: "hou",
    //   header: "HOU",
    //   cell: ({ row }) => (
    //     <div className="capitalize">
    //       {loading ? (
    //         <Skeleton className="h-4 w-[250px]" />
    //       ) : (
    //         row.getValue("head_of_unit") || "------"
    //       )}
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "department",
    //   header: () => <div className="text-right mr-24">Deparment</div>,
    //   cell: ({ row }) => (
    //     <div className="capitalize text-right mr-24">
    //       {loading ? (
    //         <Skeleton className="h-4 w-[250px]" />
    //       ) : (
    //         row.getValue("head_of_unit") || "------"
    //       )}
    //     </div>
    //   ),
    // },

    {
      accessorKey: processInputAsArray(user?.organization?.hierarchy)?.includes(
        "department"
      )
        ? "deparment"
        : " ",
      header: () => {
        if (
          !processInputAsArray(user?.organization?.hierarchy)?.includes(
            "department"
          )
        ) {
          return <React.Fragment></React.Fragment>;
        }
        return <div className="text-right mr-24">Department</div>;
      },
      cell: ({ row }) => {
        const department = row.getValue("deparment") as ObjType;
        if (
          !processInputAsArray(user?.organization?.hierarchy)?.includes(
            "department"
          )
        ) {
          return <React.Fragment></React.Fragment>;
        }
        return (
          <div className="capitalize text-right mr-24">
            {loading ? (
              <Skeleton className="h-4 w-[250px]" />
            ) : (
              department?.name || "------"
            )}
          </div>
        );
      },
    },
    {
      accessorKey: processInputAsArray(user?.organization?.hierarchy)?.includes(
        "branch"
      )
        ? "branch"
        : " ",
      header: () => {
        if (
          !processInputAsArray(user?.organization?.hierarchy)?.includes(
            "branch"
          )
        ) {
          return <React.Fragment></React.Fragment>;
        }
        return <div className="text-right mr-24">Branch</div>;
      },
      cell: ({ row }) => {
        const branch = row.getValue("branch") as ObjType;
        if (
          !processInputAsArray(user?.organization?.hierarchy)?.includes(
            "branch"
          )
        ) {
          return <React.Fragment></React.Fragment>;
        }
        return (
          <div className="capitalize text-right mr-24">
            {loading ? (
              <Skeleton className="h-4 w-[250px]" />
            ) : (
              branch?.name || "------"
            )}
          </div>
        );
      },
    },
    // {
    //   accessorKey: "address",
    //   header: () => <div className="text-right">Address</div>,
    //   cell: ({ row }) => (
    //     <div className="capitalize text-right">
    //       {loading ? (
    //         <Skeleton className="h-4 w-[250px]" />
    //       ) : (
    //         row.getValue("address")
    //       )}
    //     </div>
    //   ),
    // },
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
    unitColumns,
    data,
    openDeleteModal,
    handleDeleteDialog,
  };
};
