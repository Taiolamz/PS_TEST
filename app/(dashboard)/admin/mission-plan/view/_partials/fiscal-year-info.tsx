import { Dictionary } from "@/@types/dictionary";
import ConfirmationModal from "@/components/atoms/modals/confirm";
import CustomDateInput from "@/components/custom-date-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { updateFinancialYearDetails, updateMissionPlanDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import { useExtendFinancialYearMutation } from "@/redux/services/mission-plan/allmissionplanApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { formatDate } from "@/utils/helpers/date-formatter";
import routesPath from "@/utils/routes";
import { isBefore, parseISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import EndFYModal from "../_modal/end-fy-modal";
import FYExtendModal from "../_modal/fy-extend-modal";
import { useGetAllMissionPlanFlowQuery } from "@/redux/services/mission-plan/missionPlanApprovalFlow";
import { CAN_CREATE_FINANCIAL_YEAR } from "@/utils/helpers";

const { ADMIN } = routesPath;

const FiscalYearInfo = () => {
  const [endFY, setExtendSubmission] = useState<boolean>(false);
  const [approvalFlowData, setApprovalFlowData] = useState<any>();

  const [showSuccessExtendModal, setShowExtendSuccessModal] = useState(false);
  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );
  const { role: user_role, organization }: any = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (organization?.staff_levels) {
      let STAFF_LEVELS = typeof (organization?.staff_levels) === 'string' ? JSON.parse(organization?.staff_levels) : organization?.staff_levels
      let APPROVAL_LEVELS = typeof (organization?.approval_flows) === 'string' ? JSON.parse(organization?.approval_flows) : organization?.approval_flows
      // console.log(active_fy_info)
      const LEVELS = APPROVAL_LEVELS?.map((item: any, idx: number) => {
        return {
          title: item.title,
          approvals: item?.approvals || [],
          approval_levels: item?.approvals?.length,
          level: STAFF_LEVELS?.[idx]?.level
        }
      })
      setApprovalFlowData({ staff_levels: LEVELS });

      if (organization?.approval_flows?.length) {
        const initialApprovals = organization?.approval_flows?.map(
          (d: Dictionary, idx: string | number) => {
            return {
              ...d,
              approval_levels: d?.approvals?.length,
              level: LEVELS[idx]?.level,
            };
          }
        );

        setApprovalFlowData([...initialApprovals]);
      }
    }
  }, [organization]);

  // const { data: approvalFlowData } = useGetAllMissionPlanFlowQuery<any>();

  const isBeforeFiscalYearStart = isBefore(
    new Date(),
    parseISO(active_fy_info?.start_date)
  );

  const btn =
    "px-[1rem] py-[4px] text-[var(--primary-color)] bg-white text-sm border border-[var(--primary-color)] text-center rounded-sm font-[500] h-fit cursor-pointer hover:bg-[var(--primary-accent-color)] select-none";

  const [extendFinancialYear, { isLoading, error: apiError }]: any =
    useExtendFinancialYearMutation();

  const dispatch = useAppDispatch();

  const [date, setdate] = useState({ new_end_date: "" });

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const HAS_NO_PERMISSION = () => {
    return !CAN_CREATE_FINANCIAL_YEAR?.includes(user_role)
  }

  const handleNavigate = (slug: string) => {
    router.push(`${ADMIN.FINANCIAL_YEAR_UPDATE}?ui=${slug}`);
  };

  const handleSubmit = async () => {
    let value = { fiscal_year_id: id, new_end_date: date.new_end_date };

    value.new_end_date = formatDate(value.new_end_date);

    extendFinancialYear(value)
      .unwrap()
      .then((payload: Dictionary) => {
        // Fetch and update fiscal year information after extending financial year
        dispatch(
          updateMissionPlanDetails({
            slug: "active_fy_info",
            data: payload?.data?.organization_mission_plan,
          })
        );
        setExtendSubmission(false);
        setShowExtendSuccessModal(true);
      });
  };

  const handleChange = (date: any | null) => {
    if (date) {
      setdate({ new_end_date: formatDate(date) });
    }
  };

  const handleEditFiscalYear = () => {
    const { id, title, start_date, end_date, review_period, template, mission, vision, strategic_pillars, creation_start_date, creation_end_date, approval_start_date, approval_end_date, setup_reminder, approval_reminder, before_start_reminder } = active_fy_info
    // console.log(active_fy_info)
    // return
    const fy_data = {
      title,
      start_date,
      end_date,
      review_period,
      template_id: template?.id,
    }
    const FY_KEYS = [
      {
        slug: 'financial_year',
        data: fy_data
      },
      {
        slug: 'mission_vision',
        data: { mission, vision }
      },
      {
        slug: 'strategic_pillars',
        data: {
          strategic_pillars: strategic_pillars?.map((item: Dictionary) => {
            return {
              pillar: item?.title
            }
          })
        }
      },
      {
        slug: 'timeline_reminder',
        data: {
          creation_start_date,
          creation_end_date,
          approval_start_date,
          approval_end_date,
          setup_reminder,
          approval_reminder,
          before_start_reminder,
          fiscal_year_id: id
        }
      },
      // {
      //   slug: 'order_of_approvals',
      //   data: 'payload'
      // },

    ]
    // financial_year, mission_vision, strategic_pillars, timeline_reminder, order_of_approvals
    FY_KEYS.forEach((item: Dictionary, idx: number) => {
      // if (idx < 4) {
      dispatch(updateFinancialYearDetails({
        slug: item.slug,
        data: item.data,
      }))
      // }
    });
    router.push(
      `${ADMIN.KICK_START_MISSION_PLAN}?ui=financial-year`
    );
  };
  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };
  //Modal for End Financial Year
  const [endFinancialYear, setEndFinancialYear] = useState<boolean>(false);
  //Modal for Success End Financial Year
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // console.log(active_fy_info?.id)

  return (
    <div className="space-y-5 mb-6 px-5 mt-1 text-[var(--text-color3)]">
      {/* Financial Year */}
      <div className="flex gap-[10px] justify-end ">
        <Button
          className={cn(
            btn,
            "disabled:opacity-30",
            active_fy_info?.status !== "pending" && "hidden"
          )}
          disabled={active_fy_info?.status !== "pending" || HAS_NO_PERMISSION()}
          onClick={handleEditFiscalYear}
        >
          Edit Financial Year
        </Button>
        <Button
          className={cn(btn, "disabled:opacity-30")}
          disabled={active_fy_info?.status !== "active" || HAS_NO_PERMISSION()}
          onClick={() => setExtendSubmission(true)}
        >
          Extend Financial Year
        </Button>
        <Button
          className={cn(btn, "disabled:opacity-30")}
          disabled={active_fy_info?.status !== "active" || HAS_NO_PERMISSION()}
          onClick={() => {
            setEndFinancialYear(true);
          }}
        >
          End Financial Year
        </Button>
      </div>

      {/* <EndFinancialYearModal
        icon="/assets/images/success.gif"
        iconClass="w-40"
        title="You Are About to End the Current Financial Year?"
        message="Ending this Financial year closes all mission plans and task progress will also be lost and saved as at the time of this action, This action is permanent, Proceed?"
        // show={showSuccessModal}
        handleClose={() => {
          setShowSuccessModal(false);
        }}
        actionBtnTitle="Yes, End Financial Year"
        modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
      /> */}

      <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
        <h3 className="text-sm font-normal ">1. Financial Year</h3>
        <div className="grid grid-cols-10 gap-5 mt-4 max-w-4xl">
          {/* Title */}
          <div className="col-span-4 space-y-2">
            <h4 className="text-[var(--text-color4)] font-light text-sm">
              Title
            </h4>
            <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
              {active_fy_info?.title}
            </p>
          </div>
          {/* Start Period */}
          <div className="col-span-3 space-y-2">
            <h4 className="text-[var(--text-color4)] font-light text-sm">
              Start Period
            </h4>
            <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
              {active_fy_info?.start_date}
            </p>
          </div>
          {/* End Period */}
          <div className="col-span-3 space-y-2">
            <h4 className="text-[var(--text-color4)] font-light text-sm">
              End Period
            </h4>
            <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
              {active_fy_info?.end_date}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-10 gap-5 mt-4 max-w-4xl">
          {/* Review Type */}
          <div className="col-span-4 space-y-2">
            <h4 className="text-[var(--text-color4)] font-light text-sm">
              Review Type
            </h4>
            <div className="inline-flex">
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] capitalize min-w-52 place-content-center text-sm font-normal px-4 py-2">
                {active_fy_info?.review_period}
              </p>
              {/* Edit button */}
              <button
                disabled={
                  active_fy_info?.status !== "active" ||
                  !isBeforeFiscalYearStart || HAS_NO_PERMISSION()
                }
                className="border-[1.5px] rounded-[5px] text-[var(--primary-color)] bg-white border-[var(--primary-color)] capitalize ml-6 place-content-center text-sm font-medium px-4 py-2 hover:bg-[var(--primary-accent-color)] select-none disabled:opacity-30"
                onClick={() => handleNavigate("financial-year")}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
        <h3 className="text-sm font-normal ">2. Mission and Vision</h3>
        <div className="space-y-7 mt-4 max-w-4xl">
          {/* Mission */}
          <div className="space-y-2">
            <h4 className="text-[var(--text-color4)] font-light text-sm">
              Mission
            </h4>
            <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
              {active_fy_info?.mission}
            </p>
          </div>
          {/* Vision */}
          <div className="space-y-2">
            <h4 className="text-[var(--text-color4)] font-light text-sm">
              Vision
            </h4>
            <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
              {active_fy_info?.vision}
            </p>
          </div>
          <button
            disabled={active_fy_info?.status !== "active" || HAS_NO_PERMISSION()}
            className="border-[1.5px] rounded-[5px] text-[var(--primary-color)] bg-white border-[var(--primary-color)] capitalize place-content-center text-sm font-medium px-4 py-2 hover:bg-[var(--primary-accent-color)] select-none disabled:opacity-30"
            onClick={() => handleNavigate("mission-vision")}
          >
            Edit
          </button>
        </div>
      </div>

      <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
        <h3 className="text-sm font-normal ">3. Strategic Pillars</h3>
        <div className="mt-4 max-w-lg">
          {/* Pillar 1 */}
          {active_fy_info?.strategic_pillars?.map(
            (item: Dictionary, idx: number) => (
              <div className="mb-6" key={idx}>
                <h4 className="text-[var(--text-color4)] font-light text-sm">
                  Pillar {idx + 1}
                </h4>
                <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                  {item?.title}
                </p>
              </div>
            )
          )}
          <button
            // disabled={active_fy_info?.status !== "active"}
            className="border-[1.5px] rounded-[5px] text-[var(--primary-color)] bg-white border-[var(--primary-color)] capitalize place-content-center text-sm font-medium px-4 py-2 hover:bg-[var(--primary-accent-color)] select-none disabled:opacity-30"
            onClick={() => handleNavigate("strategic-pillar")}
            disabled={
              active_fy_info?.status !== "active" ||
              !isBeforeFiscalYearStart || HAS_NO_PERMISSION()
            }
          >
            Edit
          </button>
        </div>
      </div>

      <div className="capitalize border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
        <h3 className="text-sm font-normal ">4. Timelines and Reminders</h3>
        <div className="mt-4 max-w-lg">
          <p className="text-sm font-normal my-4">Mission Creation Duration</p>
          <div className="mb-6 w-full grid grid-cols-2 gap-5">
            {/* Start Period */}
            <div className="space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                Start Period
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                {active_fy_info?.creation_start_date}
              </p>
            </div>
            {/* End Period */}
            <div className="space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                End Period
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                {active_fy_info?.creation_end_date}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 max-w-lg">
          <p className="text-sm font-normal my-4">Mission Approval Duration</p>
          <div className="mb-6 w-full grid grid-cols-2 gap-5">
            {/* Start Period */}
            <div className="space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                Start Period
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                {active_fy_info?.approval_start_date}
              </p>
            </div>
            {/* End Period */}
            <div className="space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                End Period
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                {active_fy_info?.approval_end_date}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="mt-4 max-w-lg">
          <p className="text-sm font-normal my-4">FY Start Reminder</p>
          <div className="mb-6 w-full grid gap-5">
          
            <div className="space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                Reminder Type
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                {active_fy_info?.setup_reminder}
              </p>
            </div>
          </div>
        </div> */}
        <div className="mt-4 max-w-lg">
          <p className="text-sm font-normal my-4">FY Start Reminder</p>
          <div className="mb-6 w-full grid gap-5">
            {/*  Reminder Type */}
            <div className="space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                Reminder Type
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                {active_fy_info?.setup_reminder}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 max-w-lg">
          <p className="text-sm font-normal my-4">
            Mission Plan Setup Reminder
          </p>
          <div className="mb-6 w-full grid gap-5">
            {/*  Reminder Type */}
            <div className="space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                Reminder Type
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                {active_fy_info?.setup_reminder}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 max-w-lg">
          <p className="text-sm font-normal my-4">
            Mission Plan Approval Reminder
          </p>
          <div className="mb-6 w-full grid gap-5">
            {/*  Reminder Type */}
            <div className="space-y-2">
              <h4 className="text-[var(--text-color4)] font-light text-sm">
                Reminder Type
              </h4>
              <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                {active_fy_info?.approval_reminder}
              </p>
            </div>
          </div>
        </div>
        <button
          // disabled={active_fy_info?.status !== "active"}
          disabled={
            active_fy_info?.status !== "active" ||
            !isBeforeFiscalYearStart || HAS_NO_PERMISSION()
          }
          className="border-[1.5px] rounded-[5px] text-[var(--primary-color)] bg-white border-[var(--primary-color)] capitalize place-content-center text-sm font-medium px-4 py-2 hover:bg-[var(--primary-accent-color)] select-none disabled:opacity-30"
          onClick={() => handleNavigate("timeline-reminder")}
        >
          Edit
        </button>
      </div>

      <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7 overflow-x-hidden">
        <h3 className="text-sm font-normal ">5. Approval Flow</h3>
        <div className="my-5 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {approvalFlowData?.map(
            (item: {
              level: any;
              title: any;
              approval_levels: string | number;
              approvals: any[];
            }) => (
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
                    {item.approvals.length} level approval
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <button
          disabled={active_fy_info?.status !== "active" || HAS_NO_PERMISSION()}
          className="border-[1.5px] rounded-[5px] text-[var(--primary-color)] bg-white border-[var(--primary-color)] capitalize place-content-center text-sm font-medium px-4 py-2 hover:bg-[var(--primary-accent-color)] select-none disabled:opacity-30"
          onClick={() => handleNavigate("approval-flow")}
        >
          Edit
        </button>
      </div>

      <FYExtendModal
        show={endFY}
        handleClose={() => setExtendSubmission(false)}
        handleSubmit={handleSubmit}
        style="lg:max-w-[700px] lg:w-[600px] h-[600px "
        loading={isLoading}
        disabled={!date?.new_end_date}
      >

        <form className="p-10">
          <div className="flex text-custom-gray-scale-300">
            <div className="">
              <CustomDateInput
                id="start_date"
                name="start_date"
                error=""
                handleChange={handleCloseModal}
                labelClass="text-custom-gray-scale-300 pb-1"
                disabled={true}
                format=""
                selected={active_fy_info.start_date}
                placeholder="September 2024"
                showIcon={false}
                label="Previous Start date"
                className="p-2" // Adjust the padding here as needed
              />
            </div>
            <div className="ml-5">
              <CustomDateInput
                id="end_date"
                name="end_date"
                error="nothing"
                labelClass="text-custom-gray-scale-300 pb-1"
                handleChange={handleCloseModal}
                selected={active_fy_info.end_date}
                disabled={true}
                placeholder="October 2024"
                showIcon={false}
                label="Previous End date"
                className="p-2"
              />
            </div>
          </div>
          <div className="flex flex-col mt-5 w-[195px] h-[40px]">
            <CustomDateInput
              id="new_end_date"
              label="New End Date"
              handleChange={handleChange}
              className="w-full h-full"
              placeholder="YYYY-MM-DD"
              labelClass="text-custom-gray-scale-300 pb-1"
              showIcon={true}
              format=""
              error=""
              portal={false}
            />
          </div>
          <div className="mt-16">
            <Textarea
              label="Reason For Extension"
              placeholder=" "
              id="reason_for_extension"
              name="reason_for_extension"
              className="w-[405px] mt-2 h-[71px] rounded-md border-[2px] outline-none border-custom-divider resize-none p-2"
              labelClass="text-custom-gray-scale-300 pb-1"
            />
          </div>
        </form>
      </FYExtendModal>
      {/* <EndFinancialYearCompleteModal
        icon="/assets/images/success.gif"
        iconClass="w-40"
        title="Financial Year Extended!!!"
        message="Congratulations! You have successfully extended your financial year. Click on the button below to continue."
        show={showSuccessExtendModal}
        handleClose={() => {
          setShowExtendSuccessModal(false);
        }}
        modalClass="lg:w-[753px] lg:max-w-[605px] p-6"
      /> */}
      {/* End FY */}
      <EndFYModal
        show={endFinancialYear}
        setSuccessModal={setShowSuccessModal}
        handleClose={() => setEndFinancialYear(false)}
        fy_id={active_fy_info?.id ?? ""}
      />
      {/* Confirm Modal for End of FY */}
      <ConfirmationModal
        icon="/assets/images/success.gif"
        iconClass="w-40"
        title="Current Financial Year Ended!"
        message="Congratulations! you have successfully brought the current Financial Year to a close"
        show={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
        handleClick={() => setShowSuccessModal(false)}
        actionBtnTitle="Complete"
        modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
      />
    </div>
  );
};

export default FiscalYearInfo;

const dummyApprovalFlow = [
  { title: "Entry Level", level: 0, approval_level: "2 level approval" },
  { title: "Intermediate Level", level: 0, approval_level: "2 level approval" },
  { title: "C-Level", level: 0, approval_level: "2 level approval" },
  { title: "CEO", level: 0, approval_level: "2 level approval" },
];
