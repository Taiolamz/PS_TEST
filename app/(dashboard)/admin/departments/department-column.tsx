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
import { processInputAsArray } from "@/utils/helpers";
import { useAppSelector } from "@/redux/store";

export const departmentColumns = (
  loading?: boolean,
  user?: any
): ColumnDef<DepartmentData>[] => [
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
    header: "Department",
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
    accessorKey: "head_of_department",
    header: "HOD",
    cell: ({ row }) => {
      const head_of_department = row.getValue("head_of_department") as ObjType;
      return (
        <div className="capitalize">
          {loading ? (
            <Skeleton className="h-4 w-[250px]" />
          ) : (
            head_of_department?.name || "------"
          )}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "hod",
  //   header: "HOD",
  //   cell: ({ row }) => (
  //     <div className="capitalize">
  //       {loading ? (
  //         <Skeleton className="h-4 w-[250px]" />
  //       ) : (
  //         row.getValue("hod") || "------"
  //       )}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "subsidiary",
    header: () => <div className="text-right mr-24">Subsidiary</div>,
    cell: ({ row }) => {
      const subsidiary = row.getValue("subsidiary") as ObjType;
      return (
        <div className="capitalize text-right mr-24">
          {loading ? (
            <Skeleton className="h-4 w-[250px]" />
          ) : (
            subsidiary?.name || "------"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "branch",
    header: () => <div className="text-right mr-24">Branches</div>,
    cell: ({ row }) => {
      const branch = row.getValue("branch") as { name: string };
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
    // hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
    //   "branch" ? true : false
    // )
  },
  // {
  //   accessorKey: "address",
  //   header: () => <div className="text-left">Address</div>,
  //   cell: ({ row }) => (
  //     <div className="capitalize text-left">
  //       {loading ? (
  //         <Skeleton className="h-4 w-[250px]" />
  //       ) : (
  //         row.getValue("address") || "------"
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
