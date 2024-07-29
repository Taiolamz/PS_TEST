"use client";

import Image from "next/image";
import { ActionIcon, GrayPlusIcon } from "@/public/assets/icons";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ProfileImg } from "@/public/assets/images";

type CreatedBy = {
  name: string;
  profile_picture: string;
};

// export type MissionPlanData = {
//   id: string;
//   process_name: string;
//   assigned_to: string[];
//   created_by: CreatedBy;
// };

export const missionPlanData: MissionPlanTemplateData[] = [
  {
    id: "dsjflsd4",
    process_name: "C-level mission plan",
    assigned_to: ["Intermediate/Experienced Level", "Entry level"],
    created_by: {
      profile_picture: ProfileImg,
      name: "MD",
    },
  },
  {
    id: "dsjflsd4",
    process_name: "Flow 1",
    assigned_to: ["Entry level"],
    created_by: {
      profile_picture: ProfileImg,
      name: "MD",
    },
  },
  {
    id: "dsjflsd4",
    process_name: "Flow 2",
    assigned_to: ["Entry level"],
    created_by: {
      profile_picture: ProfileImg,
      name: "MD",
    },
  },
  {
    id: "dsjflsd4",
    process_name: "Flow 3",
    assigned_to: ["Entry level"],
    created_by: {
      profile_picture: ProfileImg,
      name: "MD",
    },
  },
];

const assignmentLevels = [
  "Executive Level",
  "Middle Level Management",
  "First level Management",
  "Intermediate/Experience",
  "Entry Level",
];

export const missionPlanColumn: ColumnDef<MissionPlanTemplateData>[] = [
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
    accessorKey: "process_name",
    header: "Process Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("process_name")}</div>
    ),
  },
  {
    accessorKey: "assigned_to",
    header: "Assigned To",
    cell: ({ row }) => {
      const assignedTo = row.getValue("assigned_to") as string[];
      return (
        <div className="flex gap-2 items-center">
          <div className="flex gap-2">
            {assignedTo && assignedTo.length > 0 ? (
              <>
                {assignedTo.map((level, index) => (
                  <p
                    key={index}
                    className="capitalize border-0 rounded-[10px] p-2 px-3"
                    style={{ backgroundColor: "rgba(0, 128, 128, 0.05)" }}
                  >
                    {level}
                  </p>
                ))}
                <div
                  className="flex flex-col items-center justify-center cursor-pointer rounded-[10px] border-0"
                  style={{
                    backgroundColor: "rgba(0, 128, 128, 0.05)",
                    width: "34px",
                    height: "25px",
                  }}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <Image
                        src={GrayPlusIcon}
                        alt="Gray icon"
                        className="rounded-[10px] "
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="border rounded-sm"
                      align="end"
                      style={{ width: "300px" }}
                    >
                      {assignmentLevels.map((chi, idx) => (
                        <>
                          <DropdownMenuItem
                            key={idx}
                            className="font-light text-xs cursor-pointer text-custom-gray-scale-400"
                          >
                            {chi}
                          </DropdownMenuItem>
                          {idx !== 4 ? <DropdownMenuSeparator /> : null}
                        </>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <span>Not assigned</span>
            )}
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "created_by",
    header: "Created by",
    cell: ({ row }) => {
      const created_by = row.getValue("created_by") as CreatedBy;
      return (
        <div className="flex items-center capitalize">
          <Image
            src={created_by.profile_picture}
            alt={created_by.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          {created_by.name}
        </div>
      );
    },
  },

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
