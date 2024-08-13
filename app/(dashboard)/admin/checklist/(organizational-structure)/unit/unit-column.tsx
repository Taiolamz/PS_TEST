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

export const unitColumns = (loading?: boolean): ColumnDef<UnitData>[] => [
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
          row.getValue("name")
        )}
      </div>
    ),
  },
  {
    accessorKey: "hou",
    header: "HOU",
    cell: ({ row }) => (
      <div className="capitalize">
        {loading ? <Skeleton className="h-4 w-[250px]" /> : row.getValue("hou")}
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: () => <div className="text-right mr-24">Department</div>,
    cell: ({ row }) => (
      <div className="capitalize text-right mr-24">
        {loading ? (
          <Skeleton className="h-4 w-[250px]" />
        ) : (
          row.getValue("department")
        )}
      </div>
    ),
  },
  {
    accessorKey: "branch",
    header: () => <div className="text-right mr-24">Branch</div>,
    cell: ({ row }) => {
    //   const branch = row.getValue("branch");
      //   console.log(branch.name, "branch name");
      return (
        <div className="capitalize text-right mr-24">
          {loading ? (
            <Skeleton className="h-4 w-[250px]" />
          ) : (
            row.getValue("branch")
          )}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "address",
  //   header: () => <div className="text-left">Address</div>,
  //   cell: ({ row }) => (
  //     <div className="capitalize text-left">
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
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Image src={ActionIcon} alt="Action icon" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="border rounded-sm"
            align="end"
            style={{ width: "170px" }}
          >
            <DropdownMenuItem className="font-light text-sm cursor-pointer text-custom-gray-scale-400">
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-custom-red font-light cursor-pointer text-sm">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
