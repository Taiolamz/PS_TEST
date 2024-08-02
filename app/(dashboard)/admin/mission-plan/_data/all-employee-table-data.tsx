"use client";
import Image from "next/image";
import { ActionIcon } from "@/public/assets/icons";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export type EmployeeRolesData = {
  id: string;
  first_name: string;
  last_name: string;
  designation: string;
  date_submitted: string;
  phone_number: string;
  email: string;
  status: string;
};

export const allemployeeData = [
  {
    id: "2df34u454",
    first_name: "Oluwa",
    last_name: "Tobi",
    designation: "Product Designer",
    date_submitted: "02-11-2024",
    phone_number: "string",
    email: "cosegbo@zojatech.com",
    status: "approved",
  },
  {
    id: "2df34u454",
    first_name: "Michael",
    last_name: "James",
    designation: "Frontend Designer",
    date_submitted: "02-11-2024",
    phone_number: "string",
    email: "cosegbo@zojatech.com",
    status: "in review",
  },
  {
    id: "2df34u454",
    first_name: "Samuel",
    last_name: "Barry",
    designation: "UI Designer",
    date_submitted: "02-11-2024",
    phone_number: "string",
    email: "cosegbo@zojatech.com",
    status: "approved",
  },
  {
    id: "2df34u454",
    first_name: "David",
    last_name: "James",
    designation: "Product Manager",
    date_submitted: "02-11-2024",
    phone_number: "string",
    email: "cosegbo@zojatech.com",
    status: "rejected",
  },
  {
    id: "2ddd4u454",
    first_name: "Abdulrasheed",
    last_name: "Francis",
    designation: "Backend Developer",
    date_submitted: "06-09-2024",
    phone_number: "string",
    email: "afrancis@zojatech.com",
    status: "approved",
  },
];

export const allemployeeColumns: ColumnDef<EmployeeRolesData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border-custom-gray-scale-white border-0 outline-none"
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
    accessorKey: "staff_name",
    header: "Staff Name",
    cell: ({ row }) => {
      const { first_name, last_name } = row?.original;
      return <div className="capitalize">{`${first_name} ${last_name}`}</div>;
    },
  },
  {
    accessorKey: "designation",
    header: () => <div className="text-right">Designation</div>,
    cell: ({ row }: any) => (
      <div className="capitalize">{row.getValue("designation")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-right">Email</div>,
    cell: ({ row }) => (
      <div className=" lowercase">
        {row.getValue("email") ? row.getValue("email") : "Not Assigned"}
      </div>
    ),
  },
  {
    accessorKey: "date_submitted",
    header: () => <div className="text-right">Date Submitted</div>,
    cell: ({ row }) => (
      <div className=" capitalize">
        {format(row.getValue("date_submitted"), "PPP")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }: any) => (
      <div className="capitalize">
        <Badge
          variant={
            row?.getValue("status")?.toLowerCase() === "rejected"
              ? "danger"
              : row?.getValue("status") === "approved"
              ? "success"
              : "pending"
          }
        >
          {row.getValue("status")?.toLowerCase()}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { id } = row?.original;
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
              View Mission Plan
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-light text-sm cursor-pointer text-custom-gray-scale-400">
              Approval Status
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-light text-sm cursor-pointer text-custom-gray-scale-400">
              View Comments
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
