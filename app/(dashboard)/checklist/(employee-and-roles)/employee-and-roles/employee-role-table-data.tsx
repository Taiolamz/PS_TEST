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
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export type EmployeeRolesData = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  maiden_name: string;
  gender: string;
  date_of_birth: string;
  resumption_date: string;
  phone_number: string;
  staff_number: string;
  level: string;
  designation: string;
  email: string;
  line_manager_email: string;
  organization_id: string;
  department_id: string;
  branch_id: string;
  unit_id: string;
  status: string;
  role_id: string;
  reason: string;
  created_at: string;
  updated_at: string;
};

export const employeerolesColumns: ColumnDef<EmployeeRolesData>[] = [
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
    accessorKey: "gender",
    header: () => <div className="text-right">Gender</div>,
    cell: ({ row }: any) => (
      <div className="capitalize">{row.getValue("gender")?.slice(0, 1)}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-right">Work Email</div>,
    cell: ({ row }) => (
      <div className=" lowercase">
        {row.getValue("email") ? row.getValue("email") : "Not Assigned"}
      </div>
    ),
  },
  {
    accessorKey: "resumption_date",
    header: () => <div className="text-right">Resumption Date</div>,
    cell: ({ row }) => (
      <div className=" capitalize">
        {format(row.getValue("resumption_date"), "PPP")}
      </div>
    ),
  },
  {
    accessorKey: "line_manager",
    header: () => <div className="text-right">Line Manager</div>,
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("line_manager")
          ? row.getValue("line_manager")
          : "Not Assigned"}
      </div>
    ),
  },
  {
    accessorKey: "job_title",
    header: () => <div className="text-right">Job Title</div>,
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("job_title") ? row.getValue("job_title") : "Not Assigned"}
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
            row?.getValue("status")?.toLowerCase() === "pending"
              ? "pending"
              : row?.getValue("status") === "approved"
              ? "success"
              : "danger"
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
      return <TableActionMenu id={id} />;
    },
  },
];

const TableActionMenu = ({ id }: { id: string }) => {
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
        <DropdownMenuItem
          className="text-custom-red font-normal text-sm"
          onClick={() => {
            
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
