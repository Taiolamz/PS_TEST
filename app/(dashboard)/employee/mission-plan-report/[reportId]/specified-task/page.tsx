"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import React, { useEffect } from "react";
import MetricFrame from "@/components/card/frame";
import Image from "next/image";
import ChallengeDrawer from "@/components/drawer/challenge-drawer";
import CustomCommentDrawer from "@/components/drawer/comment-drawer";
import ReportFilter from "../../_partials/_my_report/_fragment/report-filter";
import {
  useGetSpecifiedTaskDetailsQuery,
  useLazyGetParentEntityChallengesQuery,
} from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { toWholeNumber } from "@/utils/helpers";
import { cn } from "@/lib/utils";
import MetricTableCardTwo from "@/components/card/metric-table-card-two";
import {
  useAddMssionPlanCommentOnComponentMutation,
  useLazyGetMssionPlanFetchCommentsQuery,
} from "@/redux/services/mission-plan/missionPlanCommentApi";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  resetFilter,
  setFilteredFiscalYear,
} from "@/redux/features/mission-plan/report/employee/employeeMissionPlanReport";

export default function SpecifiedTask({
  params,
}: {
  params: { reportId: string };
}) {
  // Open modal for challenge and Comment
  const [commentModal, setCommentModal] = React.useState(false);
  const [challengeModal, setChallengeModal] = React.useState(false);
  // Specified task Id for the modal
  const [modalId, setModalId] = React.useState("");

  const dispatch = useDispatch();

  // Filter
  const { fiscal_year, mission_cycle } = useAppSelector(
    (state) => state.employee_mission_plan_filter
  );
  const searchParams = useSearchParams();
  const fy = searchParams.get("fy");

  useEffect(() => {
    if (fy) {
      dispatch(setFilteredFiscalYear(fy));
    } else {
      dispatch(resetFilter());
    }
  }, []);

  const {
    data: orgData,
    isLoading: loadingOrg,
    isFetching: fetchingOrg,
  } = useGetSpecifiedTaskDetailsQuery({
    is_admin: false,
    staff_id: params?.reportId,
    fiscal_year: fiscal_year || "",
    cycle: mission_cycle || "",
  });

  //fetch challenges
  const [
    getParentEntityChallenges,
    { data: challengeData, isLoading: loadingChallenges },
  ] = useLazyGetParentEntityChallengesQuery();

  // fetch mos comment
  const [
    getMssionPlanFetchComments,
    { isLoading: loadingComment, data: commentData },
  ] = useLazyGetMssionPlanFetchCommentsQuery();

  //Add comment on mos
  const [addMssionPlanCommentOnComponent, { isLoading: addingComment }] =
    useAddMssionPlanCommentOnComponentMutation();

  useEffect(() => {
    if (challengeModal) {
      getParentEntityChallenges({ type: "specified-task", id: modalId });
    }
    if (commentModal) {
      getMssionPlanFetchComments(
        {
          component_id: modalId,
          component_type: "specified-task",
        },
        true
      );
    }
  }, [commentModal, challengeModal]);

  return (
    <DashboardLayout back headerTitle="Specified Task Overview">
      <div className="m-5 overflow-x-hidden">
        {/* Filter Card Section */}
        <ReportFilter />
        {/* Filter Card Section End */}

        {/* Team Performance task bar Start */}
        {loadingOrg || fetchingOrg ? (
          <Skeleton className="w-full h-[198px] bg-[var(--primary-accent-color)] rounded-sm mt-10" />
        ) : (
          <MetricFrame className="flex flex-col gap-4 mt-10">
            <div className="flex justify-between items-center">
              <p className="">My Team Performance Task Bar</p>
              <p>
                Total Tasks:{" "}
                {orgData?.data?.task_activity?.reduce(
                  (acc: number, curr: any) => acc + curr.total,
                  0
                ) || 0}
              </p>
            </div>

            {/* -------MULTI PROGRESS BAR------ */}
            <div className="mt-14">
              <div className="flex h-1.5 w-full rounded bg-[var(--input-bg)]">
                {/* in progress */}
                {orgData?.data?.task_activity?.map((chi: any, idx: number) => {
                  const { status, percentage } = chi;
                  return (
                    <span
                      className={cn(
                        "block h-full",
                        idx === 0 && "rounded-l",
                        idx === orgData?.data?.task_activity.length - 1 &&
                          "rounded-l"
                      )}
                      style={{
                        width: `${toWholeNumber(percentage)}%`,
                        backgroundColor: returnStatusColor(status),
                      }}
                      key={idx}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-4 items-center mt-5 ">
                  {orgData?.data?.task_activity?.map((chi: any) => {
                    const { status, total } = chi;
                    return (
                      <div className="flex flex-col gap-2" key={chi?.status}>
                        <div className="flex gap-2 items-center">
                          <span
                            style={{
                              backgroundColor: returnStatusColor(status),
                            }}
                            className={` h-[6px] w-[6px] rounded-[1.06px]`}
                          />
                          <p className="text-[#6E7C87] text-xs">{status}</p>
                        </div>
                        <p
                          className={`text-sm ml-4`}
                          style={{ color: returnStatusColor(status) }}
                        >
                          {total}
                        </p>
                      </div>
                    );
                  })}
                </div>
                {/* ------PROFILE IMAGE DISPLAY -------- */}
                <div className="flex">
                  {profileImages.map((chi, idx) => (
                    <Image
                      width={35}
                      height={35}
                      className="w-[35px] h-[35px] rounded-full border-[#ffff] border-2 -ml-4"
                      key={idx}
                      src={chi}
                      alt="profile image"
                    />
                  ))}
                </div>
                {/* ------PROFILE IMAGE DISPLAY -------- */}
              </div>
            </div>
            {/* -------MULTI PROGRESS BAR------ */}
          </MetricFrame>
        )}
        {/* Team Performance task bar End */}

        {/*   Specified Task Details Section Start */}
        <div className="mt-7">
          {loadingOrg || fetchingOrg ? (
            <>
              <Skeleton className="w-full h-[177px] bg-[var(--primary-accent-color)] rounded-sm mt-5" />
              <Skeleton className="w-full h-[177px] bg-[var(--primary-accent-color)] rounded-sm mt-5" />
            </>
          ) : (
            orgData?.data?.specified_task?.map((chi: any, idx: number) => {
              const {
                task,
                measure_of_success_percentage_completion,
                implied_tasks,
                measure_of_success,
                id,
              } = chi;
              return (
                <MetricTableCardTwo
                  key={idx}
                  id={id}
                  title={task}
                  percentage={toWholeNumber(
                    measure_of_success_percentage_completion
                  )}
                  measureOfSuccessDetails={measure_of_success?.map(
                    (item: any) => ({
                      label: item?.measure,
                      textColor: "var(--primary-color)",
                      bgColor: "var(--primary-accent-color)",
                    })
                  )}
                  tasks={implied_tasks}
                  progressValue={toWholeNumber(
                    measure_of_success_percentage_completion
                  )}
                  progressColor={valueColor(
                    toWholeNumber(measure_of_success_percentage_completion)
                  )}
                  onClickComment={(id) => {
                    id && setModalId(id);
                    setChallengeModal(false);
                    setCommentModal(true);
                  }}
                  onClickViewChallenge={(id) => {
                    id && setModalId(id);
                    setCommentModal(false);
                    setChallengeModal(true);
                  }}
                />
              );
            })
          )}
        </div>
        {/*   Specified Task Details Section End */}
      </div>

      <ChallengeDrawer
        open={challengeModal}
        onClose={() => setChallengeModal(false)}
        id={modalId}
        loading={loadingChallenges}
        data={challengeData?.data?.challenges}
      />
      <CustomCommentDrawer
        open={commentModal}
        onClose={() => setCommentModal(false)}
        id={modalId}
        commentType="specified-task"
        data={commentData?.data || []}
        handleSubmit={(response, resetForm) => {
          addMssionPlanCommentOnComponent(response)
            .unwrap()
            .then(() => {
              resetForm();
            });
        }}
        loadingComment={loadingComment}
        loadingAddComment={addingComment}
      />
    </DashboardLayout>
  );
}

const statusColors: { [key: string]: string } = {
  "In Progress": "#FFA500",
  Completed: "#008000",
  "Under Review": "#FFD700",
  Overdue: "#FF0000",
};

const valueColor = (number: number): "red" | "yellow" | "green" => {
  if (number >= 70) {
    return "green";
  } else if (number >= 40 && number <= 69) {
    return "yellow";
  } else {
    return "red";
  }
};

const returnStatusColor = (status: string): string => {
  return statusColors[status] || "#000000";
};

//   DUMMY IMAGES
const profileImages = [
  "data:image/jpeg;base64,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",
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhISEhIQEBUSFQ8PEA8PDw8PDw8PFRUWFhURFRUYHSggGBolGxUVITEhJSkrLy4uFx8zODMtNygtLisBCgoKDg0OGhAQGisfHyUuKysvNy0rLS0tLSstLS0tLSs2Li0tLS0tKy0tLS0tKystKzUtLS0tLSstLSstKystK//AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAABAgADBAUGB//EADwQAAIBAgQEBAQDBgQHAAAAAAABAgMRBBIhMQVBUXEGImGBE5GhsWLB0RQyQlLh8AdygvEVFiMkM0Oy/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAEEAgMF/8QAIhEBAAICAgICAwEAAAAAAAAAAAECAxEEITFBElETIjJC/9oADAMBAAIRAxEAPwD5gkMkRBsAVEKQUFAAhEMAEwsiQ1gJEGUmUaKADAZMVxKMdI2k+/lX6nOqYupPdvstEB3UwpHn1F3+ly2nOcdnL56E2O4kE59DiH86/wBSX5HQhJNXTuUI0M0CwwC2C0FMIFbAkO0KogJICQ8kBIACyGYJIBEiNhRJAK0LYa+oSCpgsNzBIBbCMsRWwIkQiCBqSREiWCigqIyAFICOIUtAWHsBERIlwxAm27ONjsc5PLFtR58nL+hfxmvtBc9ZduSF4Rwt1dW7RW73fY5taKxuXVazadQw4ei5SSSbbdkkrvsem4X4XlLWo1BWtbRv6aHTwHD400lFe73Z6Ph9BNamHJyZn+W/FxYjuzlYLw3Sja8c/K8np7JHS/5bwzX/AIY97S1+p3aFGK5GlJdDP87T7afx1+nieI+EKDXljKm+sW2vkzzWP4HUw3ni1ON/Mkmnb1X5n1jExutEcnFYZSTi9noz1pmvHt45OPSY8afOKc1JXXMsY+OwLoVXC1oyu49FJbpAZ9Gs7jb5lo1OiJD5QQGOkIxWNIWQAaBYZMlgEZGNlBlAWwslqNcEwFsANiECCseQpQothmKyCXAC5ANaQUyEsUEZC2CgGbGQCARoZR0FsOgPP4lZqsu+XtbQ9RwiGWNuzPOZLVpr8Tfz1/M9NhNEjLyJ6018Wve3Zo8js8Pi2jzEMa01GEc0nrbkl1bOrhuH42p/Gox3y03b5vQxTT7b4v8AUPY4SEb7ptJ6czVKN3Y8vSxFbDyTqQbWznmi0362O/QryqQunZ+px4ekds3FOK06LtKMmvwnBrccjO7o0qkrNbxaTXfa5qxcLSV4SxFSTcYUo7N66euxxaHi+M/JHCyvFSclCKeVJ5bWUr320V+x60pMxuIeF7xE6mWfxL/1KUaqTWWUXZqzXJp/M8/Y93jMPGthpuOmaLdt7Ox43GYGpSyfESjnWaKvd29VyNnHvExpi5NJidqIoIqZLmllRsliSIgFYURigG4GAlgC4iTYzEYEEY7FaAVCseS0EYCXA2NcrkQEgqZANtgxIglEsQA8QCmEUZARMdCZRrAc/E07VU/5kn7rR/kdfBz0Ep4RVLJSyyV2s0XlfpcTD3jKz0+zMeW0WnUN+ClqxEz7d2OWjT+Jzdr9Sur+21owdN/DjK6cJPI0v4ZOXrd6LU63DrVFFO1ju0cJBLSKZljJ8Z3prtj+UacGlgnTpKCbacIKd5Z26ySzSi7LRvk79zqcCr2kk9b+5o4nStSlOWkYp+nsjFw2GSHxqloxdtW9ji0zadu61ikadrG4NN5k3G/8ras9OnYqo4PI9Jd7Rim773ZdxDj2Cpxp56qip6KV7u/okWUsXHd2lB/u1ErJrqx+0QfGsyoxGFSg7dNfkeL8aRX/AG0r3lKFRz7rIv1XsfQ8TKDg2nyPmniqrd0Vzgqsf9LkpL/6fyR78b+2bl9UcSJLEC0fSfLLlJJhAwIhZjMVoAxWgpEC4DWKpIa4jALFTC0LlALEkO0VzAUSRJBsQIQNggbQoVBKHsQVDAFBJEIBCJYeIHS4PGNS1J/vXk4vZOOVu3zX1MWPw7g7uWZ5nfVOwtCo4yUo6NO6NGPhmgqkVKLaebVuEmm9V66P5Mx5cer7hvw5d4/jPpu4JjbaHueFVoWu2fMsBK9mvQ9Fw7FOKmm7OK68uplvXtsx26em4/WjVpuF7R1u9klyPnvFuLwvGEksR8PRZ01CLXNRva/qzJxnjlWpJ082SK0abaS7nd8K+EZYi9SEYKK/9uIlkjmUb2Ud9Vrfb1PfHj+PdmfJmm/VemCONrVYJYWhkjZqpKnDMm/WUtNuVzo4HxHi8PFxr0VOCW1ksqW+z2Pf4XwphoxUqmLnUjlzL9lhammt05eZLS27R5jxVwihUyrDvEwi21N1ZKWdNvbdrR/Q7mInqYecfLzWZUcH49GupqmsmjvTu3Fb2lHp0a9Tn+IIU1mzvzqF6WstajlBPb8Lk9ehowvBqeCzSi23NO2dryqzsrnE45i881zau276HGOsfk/XwuW1px/t5c9yCLFajWN756MDQZCtgS5JMlxADyFTChUAZCoMgJASUhIvUMkRAQqkWMrkAskAdiMglyChA1sZCqQblDBTEbBcC24cxTcZSAuI2ImTMA6ZY6rccjflzZ0vxWte++zenqVJhuNbWJ14U4Ks4Sa6PQ7ixi8slv8AuyV1qjz+Mg75lut11RVDF8zHkx7npuxZNV7euwOEoSc3bzVNXKXm1KqzlRl5peXRK7bhpscbC8Timru3K/Q7NTEQnG0pxaeiurvvY8v3jy96zTzDsrxfh4xSqVczVrLLUq205X0KP+O/tU0qcZtaKdSVlljztFbbWOLQ4DhG5SlVm1Bpyjl1l6K2xtxPGKFCKp0qairXu7XvyvbQ9J78eXE5J/1rTT4m4ml3s8qXVbM8fRm5Nv2TDicTPFVoxW83litlFN3NWKwypTlTWyenZ6ntipFOvbJmvN+/SuIbgiRnuzoyEGARgsFq7JIBEhR0IwIBsK2FYAkBBmKALiyHYGiBJCDSJYBCEZAL1IGcpuNmKLYzHTKEWwYFlwERLAFSHuVMsiwHgxhIlgESu/oZMXgOdrdtDZe1n6o35FJGTNM1ttv48RempeTqU5L1QKGMlHn/ALHaxeEs+5zquDb5XOq5Yny4vgmPCqPEZK9ue7vqUTxDfV+9/wC+Rqo8IqzaUac5Pkkes4N4PUPPWs5bqnF3S7vmzqclK9uPw5J6U+CeFWl8ed7pPIn1fP7/ADK/GdOUKsKq0U04SXLNHVfS/wAj21HDqnBdeS6HmvHkLYZPmpwn9bfZs8KZJnJEy9r4ojHMQ8xRxkXv5fXl/Q0p3217anIsBxN+mB2LETOTCtJbSfzuWrGT6p+yGh0UK3qZoY5c1btqixYqD527pkFjQrRFUi9mn7izqpc18wC5aCA+Ins0woCTQrQzEbIGYrIwSKFIwsUgWSIFkAQD3CBgWIaEhIMKKNAzEixkABosEmFAWXGiISpWUIuT5ber5IDn8SxD+JBX0g4t973+x6fAxzJHiJSbd3q3q+56Lw3xRRapz2ekJdPwsz8ikzG4auNkittT7d+NJXtJfqCpg4RacfqjoKnfXRl9GlGXlej5bow7fSNw2slp5VfnobJSu9Lv7IwwwMk7arszbQwzWl++7b92RJhpjHS71PK/4gTSoqPOTT9ketqwskeG8d1My7afkd4/7h5Zf4l5eOqTQLCLTYjrW5Xfe0T6u3yTpCtFtBN9LuyST5vbVmzE8FxUJZZYeum2oq1Kcoyk1dJSSaemuj2GxzrENH7NPy3hUWZ5YN05rPLfLHTV9hsXhJUpyp1IuE42UoSVpRbSdmuzQRmyitFyiNkuUZdmmjfCVymVEaJFXVJCRWoL3CmchhZMEpAaADIwisAXIEgCAkEDAaDGRXFlgFsWWJlEWWxZQxIhK6k0ldgWSmkm27JHLxOJzvolsud+rBWqOT19l0Kktf73AjiSDLqcroWUCj1nAPEEfLSrSUW9IVHon+GT5P1O/OThJPXqj5fWevbT9Tu+H/EbpZada86WiT3nSXp1j6fLoY83H91bMPI11Z9Lw1RTimn3NEZRXqy3g1CnKEZwcZwmk04tNNdUzRjKKirJXZj03xO2dNWfY+a+NH50vVfr+R9B4jVyJJaWWp848TvNOL/zP5JL8z1wRu8PHkTrHLhgkh2iSPovlEpw1f1XJnqPDXjPFYKNOnTlTdGDm40KsG4Oc225eXzX12202PO0YaDuk5WUbuV04pK7vysuZdD0XEv8TsfUzN/CoZ4rK6FNfEjbRuM224t9VY86pZ/PdyzNybbvJt739RcJgoVLucsj65FKKWl3a6b9Evc0zSVowvkjdQUrZrNttuy3bbdhGvSyQFxhWjpyFxY8/RsYVbv2YUGx6chJiqViSLmBbhbvqBnINxI7hAAGwgsQBWgBYLgAsRWWIB4lpVAac7alDSmkrvRGCdZzfotl+YuKqt7+y6BoLQoFhOZbURVEAqEk20k766sWpVkt8vsjVyMbd3qJCWBYdkscjt+GPE9bBy8vnpSfnot6f5oP+GX35n1ThvGqWIpqpTkpR5p6ShK2sZLkz4gbOF8RqYeeenKz2lF6xnH+WS5nhlwxfuPLTh5E06nw+m8WxDd2/Y8LxGvmn2/Vs68uNRrU3JeWSTcoN6x9V1XqcCo7tnjx6TFp29+VeJpGlco3EcC0D/obXz3d8P8AFqEF8LF4ZYmnmXw6iUfi4eF80oxtZyTfV6eux1+M8ZwlKElw/DwhngnLETalXoRqOUHGOZuUZNXW9kmrWvd+KqSas1fRp6aPTXc6eK4nOKhKnSpRjUpzpTcacJKrSbtmlbaS010d0n0L8YJtP0wsgrW6ve2l0nquupEzpBQGyMDADYjevsFsqc9fYKskyqQHMVsgvpy07aDIooPf2L2QByJcRhRAbkIggKxQisBkMgRCA0pqOrM86mbV6JbIzupmlr7diyo9LIsCuetjUlYppR17fcvRQHsZovU1taGSW4GpISdNDwYWUUPDPdfIqZupkq0VLf58yaGBoI86Lj6rrzAlc5D021qvodJR+yMVOH7q6tI6LQFc4iJFk3/fqVXLAZq+4kaaXINwNlDNgQGQoNwNkA2BXUZmTLazKaW2hA7dgXGjR6krJLYoWhO0u5rbMGXmbHscyJYkkBMOYgBCBAVMhCARMlSWjfRMhAOfA1b6kIUGit/UtIQoMXcy1dyEAvplhCAGI1yEKAxZU0/R9f1IQglCV5JbOKbfTpp8zY5AIciqpL6fcW4CHUAkuAhRGyJkIARJshCDFiamjEoV3H1RCEGuNVNFLu9SEOgpopyuuxCHMhkRshCCZgEIB//Z",
  "data:image/jpeg;base64,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",
  "https://media.licdn.com/dms/image/v2/D4D03AQGDOpnUq2WAng/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1706136278065?e=1732752000&v=beta&t=Qv1TWdJwg13wVYFuX-FXLIokHnitFd9VW15tPdibl10",
];

const specifiedTaskDetails = [
  {
    id: "123456789st",
    title: "Achieve Revenue from sales of Zojatech Products",
    weight: 50,
    percentage: 67,
    color: "yellow",
    measureOfSuccessDetails: [
      {
        label: "30 online Campaign",
        bgColor: "#6B51DF1A",
        textColor: "#6B51DF",
      },
      {
        label: "$100,000 Revenue",
        bgColor: "#119C2B1A",
        textColor: "#119C2B",
      },
      {
        label: "$100,000 Revenue",
        bgColor: "#0452C81A",
        textColor: "#0452C8",
      },
    ],
    tasks: [
      {
        id: "12deuwwwwfie",
        title: "Sell and Market Revvex as a user product",
        weight: 50,
        impliedTasks: [
          {
            period_cycle: "Q1",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "January",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "February",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "March",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q2",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "April",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "May",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "June",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q3",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "July",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "August",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "September",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q4",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "October",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "November",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "December",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
        ],
      },
      {
        title: "Create Marketing Campaigns to Reach Proposed Audience",
        weight: 20,
        impliedTasks: [
          {
            period_cycle: "Q1",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "January",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "February",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "March",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q2",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "April",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "May",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "June",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q3",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "July",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "August",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "September",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q4",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "October",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "November",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "December",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
        ],
      },
      {
        title: "Create Marketing Campaigns to Reach New Audience",
        weight: 30,
        impliedTasks: [
          {
            period_cycle: "Q1",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "January",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "February",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "March",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q2",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "April",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "May",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "June",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q3",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "July",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "August",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "September",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q4",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "October",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "November",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "December",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
        ],
      },
    ],
  },
  {
    id: "123456789nd",
    title: "Achieve Revenue from sales of Zojatech Products",
    weight: 50,
    percentage: 48,
    color: "red",
    measureOfSuccessDetails: [
      {
        label: "30 online Campaign",
        bgColor: "#6B51DF1A",
        textColor: "#6B51DF",
      },
      {
        label: "$100,000 Revenue",
        bgColor: "#119C2B1A",
        textColor: "#119C2B",
      },
      {
        label: "$100,000 Revenue",
        bgColor: "#0452C81A",
        textColor: "#0452C8",
      },
    ],
    tasks: [
      {
        title: "Sell and Market Revvex as a user product",
        weight: 50,
        impliedTasks: [
          {
            period_cycle: "Q1",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "January",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "February",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "March",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q2",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "April",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "May",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "June",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q3",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "July",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "August",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "September",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q4",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "October",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "November",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "December",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
        ],
      },
      {
        title: "Create Marketing Campaigns to Reach Proposed Audience",
        weight: 20,
        impliedTasks: [
          {
            period_cycle: "Q1",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "January",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "February",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "March",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q2",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "April",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "May",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "June",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q3",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "July",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "August",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "September",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q4",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "October",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "November",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "December",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
        ],
      },
      {
        title: "Create Marketing Campaigns to Reach New Audience",
        weight: 30,
        impliedTasks: [
          {
            period_cycle: "Q1",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "January",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "February",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "March",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q2",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "April",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "May",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "June",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q3",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "July",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "August",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "September",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q4",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "October",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "November",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "December",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
        ],
      },
    ],
  },
  {
    id: "123456789rd",
    title: "Achieve Revenue from sales of Zojatech Products",
    weight: 50,
    percentage: 80,
    color: "green",
    measureOfSuccessDetails: [
      {
        label: "30 online Campaign",
        bgColor: "#6B51DF1A",
        textColor: "#6B51DF",
      },
      {
        label: "$100,000 Revenue",
        bgColor: "#119C2B1A",
        textColor: "#119C2B",
      },
      {
        label: "$100,000 Revenue",
        bgColor: "#0452C81A",
        textColor: "#0452C8",
      },
    ],
    tasks: [
      {
        title: "Sell and Market Revvex as a user product",
        weight: 50,
        impliedTasks: [
          {
            period_cycle: "Q1",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "January",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "February",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "March",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q2",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "April",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "May",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "June",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q3",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "July",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "August",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "September",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q4",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "October",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "November",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "December",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
        ],
      },
      {
        title: "Create Marketing Campaigns to Reach Proposed Audience",
        weight: 20,
        impliedTasks: [
          {
            period_cycle: "Q1",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "January",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "February",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "March",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q2",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "April",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "May",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "June",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q3",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "July",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "August",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "September",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q4",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "October",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "November",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "December",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
        ],
      },
      {
        title: "Create Marketing Campaigns to Reach New Audience",
        weight: 30,
        impliedTasks: [
          {
            period_cycle: "Q1",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "January",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "February",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "March",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q2",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "April",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "May",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "June",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q3",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "July",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "August",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "September",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q4",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "October",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "November",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "December",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
        ],
      },
    ],
  },
  {
    id: "123456789rth",
    title: "Achieve Revenue from sales of Zojatech Products",
    weight: 50,
    percentage: 48,
    color: "red",
    measureOfSuccessDetails: [
      {
        label: "30 online Campaign",
        bgColor: "#6B51DF1A",
        textColor: "#6B51DF",
      },
      {
        label: "$100,000 Revenue",
        bgColor: "#119C2B1A",
        textColor: "#119C2B",
      },
      {
        label: "$100,000 Revenue",
        bgColor: "#0452C81A",
        textColor: "#0452C8",
      },
    ],
    tasks: [
      {
        title: "Sell and Market Revvex as a user product",
        weight: 50,
        impliedTasks: [
          {
            period_cycle: "Q1",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "January",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "February",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "March",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q2",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "April",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "May",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "June",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q3",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "July",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "August",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "September",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q4",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "October",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "November",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "December",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
        ],
      },
      {
        title: "Create Marketing Campaigns to Reach Proposed Audience",
        weight: 20,
        impliedTasks: [
          {
            period_cycle: "Q1",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "January",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "February",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "March",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q2",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "April",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "May",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "June",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q3",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "July",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "August",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "September",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q4",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "October",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "November",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "December",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
        ],
      },
      {
        title: "Create Marketing Campaigns to Reach New Audience",
        weight: 30,
        impliedTasks: [
          {
            period_cycle: "Q1",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "January",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "February",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "March",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q2",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "April",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "May",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "June",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q3",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "July",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "August",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "September",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
          {
            period_cycle: "Q4",
            expected_outcome: "Sell and Market Revvex as a user product",
            achieved_outcome: "Sell and Market Revvex as a user product",
            sub_outcomes: [
              {
                date: "October",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "November",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
              {
                date: "December",
                achieved_outcome: "Sell and Market Revvex as a user product",
                expected_outcome: "Sell and Market Revvex as a user product",
              },
            ],
            percentage_completion: 30,
          },
        ],
      },
    ],
  },
];

const allComment = [
  {
    id: "34eef",
    staff_member: { name: "Inioluwa Alake" },
    created_at: "2024-01-01T14:30:45",
    comment: "Discuss with your driect LM on this ",
  },
  {
    id: "243423",
    staff_member: { name: "Adeyinka Balagun" },
    created_at: "2024-09-22T14:30:45",
    comment: "Check your specified unit. Its wrong",
  },
  {
    id: "2334gr",
    staff_member: { name: "Charles Uwaje" },
    created_at: "2024-09-27T02:30:45",
    comment: "21 savage is goated take it or leave it",
  },
];
