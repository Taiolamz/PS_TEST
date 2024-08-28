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
import { useRouter } from "next/navigation";
import routesPath from "@/utils/routes";
import { useDeleteMissionPlanTemplateMutation } from "@/redux/services/checklist/missionPlanTemplateApi";
import useDisclosure from "../../_hooks/useDisclosure";
import { useState } from "react";
import DashboardModal from "../../_components/checklist-dashboard-modal";
import DeleteMissionPlanTemplate from "./delete-mission-plan-template";

type CreatedBy = {
  name: string;
  profile_picture: string;
};

export const missionPlanData = [
  {
    id: "dsjflsd4",
    process_name: "C-level mission plan",
    assignees: ["Intermediate/Experienced Level", "Entry level"],
    created_by: {
      profile_picture: ProfileImg,
      name: "MD",
    },
  },
  //...other data
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
    accessorKey: "name",
    header: "Process Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "assignees",
    header: "Assigned To",
    cell: ({ row }) => {
      const assignedTo = row.getValue("assignees") as string[];
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
              <span>------</span>
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
          {created_by?.profile_picture ? (
            <>
              <Image
                src={created_by?.profile_picture}
                alt={created_by?.name}
                className="w-8 h-8 rounded-full mr-2"
              />
            </>
          ) : null}
          {created_by?.name || "-----"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const {
        isOpen: openDeleteModal,
        open: onOpenDeleteModal,
        close: closeDeleteModal,
      } = useDisclosure();
      const router = useRouter();
      const [deleteMissionPlanTemplate] =
        useDeleteMissionPlanTemplateMutation();
      const [data, setData] = useState({});

      const handleDeleteDialog = () => {
        onOpenDeleteModal();
        if (openDeleteModal) {
          closeDeleteModal();
        }
      };

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
            <DropdownMenuItem
              className="font-light text-sm cursor-pointer text-custom-gray-scale-400"
              onClick={() => {
                router.push(routesPath.ADMIN.VIEW_MISSION_PLAN_TEMPLATE);
                localStorage.setItem(
                  "selected-mission-plan-template-review",
                  JSON.stringify(row.original)
                );
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-custom-red font-light cursor-pointer text-sm"
              onClick={() => {
                setData(row.original);
                handleDeleteDialog();
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
          <>
            <DashboardModal
              className={"w-[420px]"}
              open={openDeleteModal}
              onOpenChange={handleDeleteDialog}
            >
              <DeleteMissionPlanTemplate
                data={data}
                onCancel={handleDeleteDialog}
              />
            </DashboardModal>
          </>
          ,
        </DropdownMenu>
      );
    },
  },
  // modal
];
