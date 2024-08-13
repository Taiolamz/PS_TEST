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
    id: "32se594hf4",
    name: "Tobi Oluwa",
    designation: "Product Designer",
    created_at: "02-11-2024",
    phone_number: "string",
    email: "cosegbo@zojatech.com",
    status: "approved",
  },
  {
    id: "02jg94dh58",
    name: "Michael Oluwa",
    designation: "Frontend Designer",
    created_at: "02-11-2024",
    phone_number: "string",
    email: "cosegbo@zojatech.com",
    status: "in review",
  },
  {
    id: "6w734hc93f",
    name: "Sammuel Barry",
    designation: "UI Designer",
    created_at: "02-11-2024",
    phone_number: "string",
    email: "cosegbo@zojatech.com",
    status: "approved",
  },
  {
    id: "4ea3vc84f5",
    name: "Tobi Davis",
    designation: "Product Manager",
    created_at: "02-11-2024",
    phone_number: "string",
    email: "cosegbo@zojatech.com",
    status: "rejected",
  },
  {
    id: "13gh54er3g",
    name: "Folanke Francis",
    designation: "Backend Developer",
    created_at: "06-09-2024",
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
