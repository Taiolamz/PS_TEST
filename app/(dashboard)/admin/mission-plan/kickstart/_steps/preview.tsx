import { Dictionary } from "@/@types/dictionary";
import ConfirmationModal from "@/components/atoms/modals/confirm";
import CustomDateInput from "@/components/custom-date-input";
import { PageLoader } from "@/components/custom-loader";
import CustomSelect from "@/components/custom-select";
import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetFinancialYearDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import {
  useGetFinancialYearPreviewQuery,
  useSaveFinancialYearMutation,
} from "@/redux/services/mission-plan/missionPlanApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { ADMIN } = routesPath;

const FinancialYearPreview = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [financialYearData, setFinancialYearData] = useState<Dictionary>({});

  const { fy_info } = useAppSelector((state) => state.mission_plan)

  const dispatch = useAppDispatch()

  const {
    data: financial_year_info,
    isLoading,
    isFetching,
    refetch
  } = useGetFinancialYearPreviewQuery({});
  const [
    saveFinancialYear,
    { isLoading: isSavingFinancialYear, reset: resetSaveFinancialYear },
  ] = useSaveFinancialYearMutation({});
  // 01j4hsayp0txev624bx0xgda06

  const router = useRouter();

  const handleSaveFinancialYear = async () => {
    saveFinancialYear({ id: financialYearData.id })
      .unwrap()
      .then(() => {
        dispatch(resetFinancialYearDetails())
        setShowInfoModal(false)
        setShowSuccessModal(true);
      });
  };

  useEffect(() => {
    refetch()
    if (financial_year_info) {
      setFinancialYearData({
        ...financial_year_info?.data?.organization_mission_plan,
      });
    }
  }, [financial_year_info]);


  return (
    <div className="w-[60vw] h-full overflow-y-scroll pr-4 customScrollbar">
      <h1 className="text-primary">Preview Financial Year Information</h1>
      <span className="block mt-1 text-[#6E7C87] text-sm">
        Filled Information
      </span>
      {isLoading || isFetching ? (
        <div className="h-full grid place-content-center">
          <PageLoader />
        </div>
      ) : (
        <>
          <div className="mt-4">
            <div className="mb-4">
              <div className="bg-[var(--primary-accent-color)] p-1 px-2 flex items-center justify-between gap-5">
                <span className="text-sm text-[#6E7C87] font-light">
                  1. Financial Year
                </span>
                <span
                  className="text-[var(--primary-color)] w-8 h-8 grid place-content-center rounded-full bg-[#0080801A] cursor-pointer"
                  onClick={() =>
                    router.push(
                      `${ADMIN.KICK_START_MISSION_PLAN}?ui=financial-year`
                    )
                  }
                >
                  <Pencil size={15} color="var(--primary-color)" />
                </span>
              </div>
              <div className="mt-4 border rounded-[5px] p-5 bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-[55%]">
                    <Input
                      label="Title"
                      id=""
                      name=""
                      value={financialYearData?.title}
                      onChange={() => null}
                      readOnly
                      disabled
                      className="disabled:opacity-100"
                    />
                  </div>
                  <CustomDateInput
                    label="Start Period"
                    id="start_date"
                    selected={new Date(financialYearData?.start_date)}
                    handleChange={() => null}
                    error=""
                    disabled
                  />
                  <CustomDateInput
                    label="End Period"
                    id="end_date"
                    selected={new Date(financialYearData?.end_date)}
                    handleChange={() => null}
                    error=""
                    disabled
                  />
                </div>
                <div className="mt-6 w-1/3">
                  <CustomSelect
                    label="Review Period"
                    id=""
                    options={[
                      { label: "Monthly", value: "monthly" },
                      { label: "Quarterly", value: "buarterly" },
                      { label: "Bi-Annual (twice/year)", value: "bi-annual" },
                    ]}
                    selected={financialYearData?.review_period}
                    setSelected={(selected) => null}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="bg-[var(--primary-accent-color)] p-1 px-2 flex items-center justify-between gap-5">
                <span className="text-sm text-[#6E7C87] font-light">
                  2. Mission and Vision
                </span>
                <span
                  className="text-[var(--primary-color)] w-8 h-8 grid place-content-center rounded-full bg-[#0080801A] cursor-pointer"
                  onClick={() =>
                    router.push(
                      `${ADMIN.KICK_START_MISSION_PLAN}?ui=mission-vision`
                    )
                  }
                >
                  <Pencil size={15} color="var(--primary-color)" />
                </span>
              </div>
              <div className="mt-4 border rounded-[5px] p-5 bg-white">
                <div className="mb-3">
                  <span className="text-xs text-[#6E7C87]">Mission</span>
                  <div className="mt-1 border rounded-[5px] p-5 text-sm">
                    {financialYearData?.mission}
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-xs text-[#6E7C87]">Vision</span>
                  <div className="mt-1 border rounded-[5px] p-5 text-sm">
                    {financialYearData?.vision}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-[var(--primary-accent-color)] p-1 px-2 flex items-center justify-between gap-5">
                <span className="text-sm text-[#6E7C87] font-light">
                  3. Strategic Pillars
                </span>
                <span
                  className="text-[var(--primary-color)] w-8 h-8 grid place-content-center rounded-full bg-[var(--primary-accent-color)] cursor-pointer"
                  onClick={() =>
                    router.push(
                      `${ADMIN.KICK_START_MISSION_PLAN}?ui=strategic-pillar`
                    )
                  }
                >
                  <Pencil size={15} color="var(--primary-color)" />
                </span>
              </div>
              <div className="mt-4 border rounded-[5px] p-5 bg-white">
                <div className="mb-3">
                  {financialYearData?.strategic_pillars?.map(
                    (item: Dictionary, idx: number) => (
                      <div key={item.id} className="mb-4">
                        <span className="text-xs text-[#6E7C87]">
                          Pillar {idx + 1}
                        </span>
                        <div className="mt-1 border rounded-[5px] p-2 text-sm">
                          {item?.title}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-[var(--primary-accent-color)] p-1 px-2 flex items-center justify-between gap-5">
                <span className="text-sm text-[#6E7C87] font-light">
                  4. Timeline and Reminders
                </span>
                <span
                  className="text-[var(--primary-color)] w-8 h-8 grid place-content-center rounded-full bg-[#0080801A] cursor-pointer"
                  onClick={() =>
                    router.push(
                      `${ADMIN.KICK_START_MISSION_PLAN}?ui=timeline-reminder`
                    )
                  }
                >
                  <Pencil size={15} color="var(--primary-color)" />
                </span>
              </div>
              <div className="mt-4 border rounded-[5px] p-5 bg-white">
                <div className=''>
                  <h1>Mission Creation Duration</h1>
                  <div className="mt-4 w-full flex gap-4 items-center relative">
                    <CustomDateInput
                      label='Start Period'
                      id='creation_start_date'
                      selected={new Date(financialYearData?.creation_start_date)}
                      handleChange={(selected) => null}
                      placeholder='YYYY-MM-DD'
                      iconClass='top-7'
                      disabled
                    />
                    <CustomDateInput
                      label='End Period'
                      id='creation_end_date'
                      selected={new Date(financialYearData?.creation_end_date)}
                      handleChange={(selected) => null}
                      placeholder='YYYY-MM-DD'
                      iconClass='top-7'
                      disabled
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <h1>Mission Approval Duration</h1>
                  <div className="mt-2 w-ful flex gap-4 items-center">
                    <CustomDateInput
                      label='Start Period'
                      id='approval_start_date'
                      selected={new Date(financialYearData?.approval_start_date)}
                      handleChange={(selected) => null}
                      placeholder='YYYY-MM-DD'
                      iconClass='top-7'
                      disabled
                    />
                    <CustomDateInput
                      label='End Period'
                      id='approval_end_date'
                      selected={new Date(financialYearData?.approval_end_date)}
                      handleChange={(selected) => null}
                      placeholder='YYYY-MM-DD'
                      iconClass='top-7'
                      disabled
                    />
                  </div>
                </div>
                <div className="mt-8 lg:w-[50%]">
                  <h1>Employee Reminder Interval</h1>
                  <div className="mt-2 grid grid-cols-1 gap-4 items-center">
                    <CustomSelect
                      label="FY Start Reminder"
                      id="before_start_reminder"
                      options={[
                        { label: "Every week before start", value: "weekly" },
                        { label: "Every 2 weeks before start", value: "two-weeks" },
                        { label: "Only at start", value: "start" },
                      ]}
                      selected={financialYearData?.before_start_reminder}
                      setSelected={(selected) => null}
                      disabled
                    />
                    <CustomSelect
                      label="Mission Setup Reminder"
                      id="setup_reminder"
                      options={[
                        { label: "Every week", value: "weekly" },
                        { label: "Every 2 weeks", value: "two-weeks" },
                        { label: "Only at start", value: "start" },
                      ]}
                      selected={financialYearData?.setup_reminder}
                      setSelected={(selected) => null}
                      disabled
                    />
                    <CustomSelect
                      label="Due Date Reminder"
                      id="approval_reminder"
                      options={[
                        { label: "Every week", value: "weekly" },
                        { label: "Every 2 weeks", value: "two-weeks" },
                        { label: "Only at start", value: "start" },
                      ]}
                      selected={financialYearData?.approval_reminder}
                      setSelected={(selected) => null}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-[var(--primary-accent-color)] p-1 px-2 flex items-center justify-between gap-5">
                <span className="text-sm text-[#6E7C87] font-light">
                  5. Approval Flow
                </span>
                <span
                  className="text-[var(--primary-color)] w-8 h-8 grid place-content-center rounded-full bg-[var(--primary-accent-color)] cursor-pointer"
                  onClick={() =>
                    router.push(
                      `${ADMIN.KICK_START_MISSION_PLAN}?ui=approval-flow`
                    )
                  }
                >
                  <Pencil size={15} color="var(--primary-color)" />
                </span>
              </div>
              <div className="mt-4 border rounded-[5px] p-5 bg-white">
                <div className="my-5 w-full grid grid-cols-2 lg:flex lg:flex-wrap gap-7">
                  {fy_info?.order_of_approvals?.map((item: Dictionary) => (
                    <div className="flex gap-x-2.5" key={item?.title}>
                      <div className="">
                        <p className="text-[var(--text-color4)] font-medium text-sm text-nowrap capitalize">
                          {item.title}
                        </p>
                        <p className="text-[var(--text-color)] font-light text-[10px] text-nowrap">
                          Level {item.level}
                        </p>
                      </div>
                      <div className="">
                        <div className="block text-[10px] text-[var(--primary-color)] bg-[var(--primary-accent-color)] px-[5px] py-[5.5px] rounded-full text-nowrap">
                          {`${item.approval_levels} level approval`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Button
                className="px-7 !cursor-pointer"
                type="button"
                onClick={() => setShowInfoModal(true)}
              >
                Save
              </Button>
            </div>
          </div>
          <ConfirmationModal
            icon="/assets/images/success.gif"
            iconClass="w-40"
            title="Financial Year Begins!!!"
            message="Congratulations! You have successfully kickstarted your financial year. Click on the button below to continue"
            show={showSuccessModal}
            handleClose={() => {
              resetSaveFinancialYear();
              setShowSuccessModal(false);
            }}
            handleClick={() => router.push(ADMIN.MISSION_PLAN)}
            actionBtnTitle="Proceed to Mission Plan"
            modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
          />

          <ModalContainer
            show={showInfoModal}
            title="Kicktart Financial Year"
            handleClose={() => setShowInfoModal(false)}
            hasCloseButton={false}
            modalClass="rounded-none py-10 px-6 bg-white md:w-[28.8rem] md:max-w-[30.8rem] lg:w-[40rem] lg:max-w-[40rem]"
          >
            <section>
              <div className="">
                <div className="text-center mb-5">
                  <h3 className="mt-[14px] text-[var(--text-color5)] text-2xl font-semibold mx-auto">
                    You Are About to Start a <br /> New Financial Year?
                  </h3>
                  <p className="text-sm px-9 font-normal mx-auto mt-4 text-[#5B6871] leading-7">
                   You are about to start a new financial year, users can create mission plan for the year and properly outline their projected deliverables, by creating tasks and assigning to downlines. The head of organization has to setup his mission plan first to assign the organizations&apos;s specific tasks to his downlines  which allow them cascade the tasks to their reporting line. Notify the head of organization below
                  </p>
                  <div className="flex justify-center space-x-4 mt-8">
                    <Button
                      disabled={isLoading}
                      className="bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--text-color2)] px-6 border rounded shadow-none disabled:cursor-not-allowed"
                      onClick={() => setShowInfoModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveFinancialYear}
                      disabled={isSavingFinancialYear}
                      loading={isSavingFinancialYear}
                      loadingText="Yes, Send Notification to MD/CED"
                      className="px-9 rounded"
                    >
                      Yes, Send Notification to MD/CED
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </ModalContainer>

        </>
      )}
    </div>
  );
};

export default FinancialYearPreview;
