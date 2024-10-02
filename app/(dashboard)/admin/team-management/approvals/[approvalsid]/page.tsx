"use client";
import React, { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import threelines from "@/public/assets/icons/threelines.svg";
import Icon from "@/components/icon/Icon";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ApprovalFlowTwo from "../../../mission-plan/approval-flow/create/approval-flow-two";
import { useMissionApprovalFlow } from "../../../checklist/_hooks/useMissionApprovalFlow";
import routesPath from "@/utils/routes";
import { useGetAllRolesQuery } from "@/redux/services/role/rolesApi";
import { useGetAllApproverListQuery } from "@/redux/services/employee/employeeApi";
import { Input } from "@/components/ui/input";

const { ADMIN } = routesPath;
const ApprovalCard = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const divRef = useRef<any>(null);
  const cancelRoute = ADMIN.APPROVALS;

  const {
    formik,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    isCreatingMissionFlow,
    // reviewers,
    level,
    organization,
    isLoadingGradeLevel,
  } = useMissionApprovalFlow({ cancelPath: cancelRoute });

  const { data: rolesData, isLoading: isLoadingroles } =
    useGetAllApproverListQuery();
  const { data: allRolesData, isLoading: isLoadingAllRoles } =
    useGetAllRolesQuery({});
  const formatRolesData = (roles: string[]) => {
    return roles?.map((role) => ({
      name: role,
      value: role,
    }));
  };

  const formatAllRoles = (newRoles: any[]) => {
    const newData = newRoles?.map((chi) => {
      return {
        name: chi?.name,
        value: chi?.id,
      };
    });
    return newData;
  };
  const roles = formatRolesData(rolesData as string[]) ?? [];
  const allRoles = formatAllRoles(allRolesData?.data) ?? [];
  const isBtnDisabled = !(formik.values.order_of_approvals as any[]).some(
    (chi) => chi.approvals.length > 0
  );

  return (
    <DashboardLayout back headerTitle="Approval Flow">
      <div className="px-8 py-6">
        <form className="mt-5 w-full" autoComplete="off">
          <div className="flex flex-col gap-4 mb-5">
            {/* <p className="font-medium text-sm">Approval Flow</p> */}
            <Input
              label="Approval Title"
              type="text"
              placeholder="FY 2024 Approval Flow"
              id="title"
              disabled
              name="title"
              className="w-[425px]"
              value={formik.values.title}
              onChange={formik.handleChange}
              isRequired
            />
            <p className="text-sm font-normal mt-5 text-custom-gray-scale-400">
              Arrange how you want your mission plan approval flow should
              process
            </p>
          </div>

          <ApprovalFlowTwo
            setNewFieldValue={formik.setFieldValue}
            options={level}
            approvals={roles}
            // approvals={reviewers}
            isLoading={isLoadingGradeLevel}
            approvalsArray={formik.values.order_of_approvals}
            // setOrderValue={formik.setFieldValue}
            allRoles={allRoles}
            // hodVal={formik.values.head_of_organization}
          />
          <div>
            <div className="mt-8 flex gap-x-2 items-center">
              <Button
                variant="outline"
                className={`text-[var(--primary-color)] py-5 px-2 rounded-sm bg-transparent border border-[var(--primary-color)] min-w-28`}
              >
                Cancel
              </Button>

              <Button
                //   disabled={
                //     !(formik.isValid && formik.dirty) ||
                //     isLoading ||
                //     isReassigning ||
                //     isLoadingDeleteSpecifiedTask
                //   }
                //   type="submit"
                //   loading={
                //     isLoading || isReassigning || isLoadingDeleteSpecifiedTask
                //   }
                loadingText={"Save"}
                className={`py-5 px-2 min-w-24`}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ApprovalCard;
