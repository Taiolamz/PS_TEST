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
export type MeasureData = {
  id: string;
  measure: string;
  description: string;
  unit: string;
  value: string;
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

export const measuresData = [
  {
    no: "Measure 1",
    description: "Customer/Client...",
    unit: "%",
    value: 100,
    id: "433",
  },
  {
    no: "Measure 2",
    description: "Commercial Products...",
    unit: "No",
    value: 100,
    id: "33",
  },
  {
    no: "Measure 3",
    description: "Revenue increase",
    unit: "$",
    value: 500000,
    id: "3234",
  },
  {
    no: "Measure 4",
    description: "Customer/Client...",
    unit: "%",
    value: 100,
    id: "3211",
  },
  {
    no: "Measure 5",
    description: "Customer/Client...",
    unit: "%",
    value: 100,
    id: "322",
  },
];

export const measureColumns: ColumnDef<MeasureData>[] = [
  {
    accessorKey: "no",
    header: () => <div className="text-left">No</div>,
    cell: ({ row }) => (
      <div className="capitalize">{`Measure ${row.index + 1}:`}</div>
    ),
  },
  {
    accessorKey: "measure",
    header: () => <div className="text-left">Measure</div>,
    cell: ({ row }) => (
      <div className=" capitalize">{row.getValue("measure")}</div>
    ),
  },
  {
    accessorKey: "unit",
    header: () => <div className="text-left">Unit</div>,
    cell: ({ row }) => (
      <div className=" capitalize">{row.getValue("unit")}</div>
    ),
  },
  {
    accessorKey: "target",
    header: () => <div className="text-left">Target</div>,
    cell: ({ row }) => (
      <div className=" capitalize">{row.getValue("target")}</div>
    ),
  },
];

export const taskData = [
  {
    id: "Task 1",
    goal: "Achieve $1 Billion in Company Revenue, Design Mance System",
    items: [
      {
        sn: 1,
        pillar: "Brand",
        task: "Commercialize 4 products",
        resources: "Ayomipe, Segun",
        startDate: "03/07/2024",
        endDate: "04/08/2024",
      },
      {
        sn: 2,
        pillar: "People",
        task: "Revenue from ...",
        resources: "Ayomipe, Segun",
        startDate: "03/07/2024",
        endDate: "04/08/2024",
      },
      {
        sn: 3,
        pillar: "Product",
        task: "Revenue from ...",
        resources: "Ayomipe, Segun",
        startDate: "03/07/2024",
        endDate: "04/08/2024",
      },
    ],
  },
  {
    id: "Task 2",
    goal: "Achieve $1 Billion in Company Revenue, Design Mance System",
    items: [
      {
        sn: 1,
        pillar: "Brand",
        task: "Commercialize 4 products",
        resources: "Ayomipe, Segun",
        startDate: "03/07/2024",
        endDate: "04/08/2024",
      },
      {
        sn: 2,
        pillar: "People",
        task: "Revenue from ...",
        resources: "Ayomipe, Segun",
        startDate: "03/07/2024",
        endDate: "04/08/2024",
      },
      {
        sn: 3,
        pillar: "Product",
        task: "Revenue from ...",
        resources: "Ayomipe, Segun",
        startDate: "03/07/2024",
        endDate: "04/08/2024",
      },
    ],
  },
];

export const impliedTask = [
  {
    id: 1,
    title: "Implied Task 1",
    impliedTask: "Commercialize 4 products",
    specifiedTask: "Achieve $1 Billion in Company Revenue, Design Mance System",
    expectedOutcome: "Design Mance System",
    weight: "100",
    percentage: "100%",
    resources: "Ayomipe, Segun",
    startDate: "22nd July 2022",
    endDate: "22nd July 2022",
  },
  {
    id: 2,
    title: "Implied Task 2",
    impliedTask: "Commercialize 4 products",
    specifiedTask: "Achieve $1 Billion in Company Revenue, Design Mance System",
    expectedOutcome: "Design Mance System",
    weight: "100",
    percentage: "100%",
    resources: "Ayomipe, Segun",
    startDate: "22nd July 2022",
    endDate: "22nd July 2022",
  },
];

export const specifiedTask = [
  {
    id: 1,
    title: "Specified Task 1",
    specifiedTask: "Commercialize 4 products (MAIN EFFORT)",
    pillars: "Product, Brand, People",
    measureOfSuccess: "Measure 1, Measure 2, Measure 3",
    startDate: "22nd July 2022",
    endDate: "22nd July 2022",
  },
  {
    id: 11,
    title: "Specified Task 1",
    specifiedTask: "Commercialize 4 products",
    pillars: "Product, Brand, People",
    measureOfSuccess: "Measure 1, Measure 2, Measure 3",
    startDate: "22nd July 2022",
    endDate: "22nd July 2022",
  },
];
