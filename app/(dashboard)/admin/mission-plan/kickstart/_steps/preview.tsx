import { Dictionary } from "@/@types/dictionary";
import ConfirmationModal from "@/components/atoms/modals/confirm";
import CustomDateInput from "@/components/custom-date-input";
import { PageLoader } from "@/components/custom-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetFinancialYearDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import {
  useGetFinancialYearPreviewQuery,
  useSaveFinancialYearMutation,
} from "@/redux/services/mission-plan/missionPlanApi";
import { useAppDispatch } from "@/redux/store";
import routesPath from "@/utils/routes";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { ADMIN } = routesPath;

const FinancialYearPreview = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [financialYearData, setFinancialYearData] = useState<Dictionary>({});

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

            <div className="mt-5">
              <Button
                className="px-7"
                type="button"
                loading={isSavingFinancialYear}
                loadingText="Save"
                disabled={isSavingFinancialYear}
                onClick={handleSaveFinancialYear}
              >
                Save
              </Button>
            </div>
          </div>
          <ConfirmationModal
            icon="/assets/images/success.gif"
            iconClass="w-40"
            title="Financial Year Begins!!!"
            message="Congratulations ! you have successfully kickstarted your financial year. Click on the button below to continue"
            show={showSuccessModal}
            handleClose={() => {
              resetSaveFinancialYear();
              setShowSuccessModal(false);
            }}
            handleClick={() => router.push(ADMIN.MISSION_PLAN)}
            actionBtnTitle="Proceed to Mission Plan"
            modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
          />
        </>
      )}
    </div>
  );
};

export default FinancialYearPreview;
