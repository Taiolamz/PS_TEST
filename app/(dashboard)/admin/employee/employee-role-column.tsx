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
      <div className="capitalize text-right">
        {row.getValue("gender")?.slice(0, 1)}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left ml-[50px]">Work Email</div>,
    cell: ({ row }) => (
      <div className=" lowercase text-left ml-[50px]">
        {row.getValue("email") ? row.getValue("email") : "Not Assigned"}
      </div>
    ),
  },
  {
    accessorKey: "resumption_date",
    header: () => <div className="text-right">Resumption Date</div>,
    cell: ({ row }) => {
      const resumptionDate = row.getValue("resumption_date");
      return (
        <div className="capitalize text-right">
          {resumptionDate
            ? format(new Date(resumptionDate as Date), "yyyy/MM/dd")
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "line_manager",
    header: () => <div className="text-right">Line Manager</div>,
    cell: ({ row }) => (
      <div className="capitalize text-right">
        {row.getValue("line_manager")
          ? row.getValue("line_manager")
          : "Not Assigned"}
      </div>
    ),
  },
  {
    accessorKey: "designation",
    header: () => <div className="text-right">Job Title</div>,
    cell: ({ row }) => (
      <div className="capitalize text-right">
        {row?.getValue("designation")
          ? row?.getValue("designation")
          : "Not Assigned"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }: any) => (
      <div className="capitalize text-right">
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
      return (
        <div className="ml-5">
          {" "}
          <TableActionMenu id={id} />
        </div>
      );
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
          onClick={() => {}}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
