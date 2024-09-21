import { Dictionary } from "@/@types/dictionary";
import { CustomAccordion } from "@/components/custom-accordion";
import CustomSelect from "@/components/custom-select";
import { Button } from "@/components/ui/button";
import { updateFinancialYearDetails, updateMissionPlanDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import { useLazyGetAuthUserDetailsQuery } from "@/redux/services/auth/authApi";
import { useGetAllApproverListQuery } from "@/redux/services/employee/employeeApi";
import { useCreateApprovalFlowMutation } from "@/redux/services/mission-plan/missionPlanApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import { FieldArray, Form, Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LEVEL = {
  title: "",
  approvals: [],
  approval_levels: 0,
};

type Select = {
  label: string | number;
  value: string | number;
};

const levelOptionsDefault: Select[] = Array.from({ length: 11 }, (_, i) => {
  return {
      // ...option,
      value: (i).toString(),
      label: (i).toString(),
  }
});

const levelOptions: Select[] = Array.from({ length: 10 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));

const { ADMIN } = routesPath;

const ApprovalFlowUpdate = () => {
  const [initialApprovalFlowData, setInitialApprovalFlowData] =
    useState<Dictionary>({
      staff_levels: [],
    });
  const [approvals, setApprovals] = useState<Dictionary>({
    staff_levels: [],
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { organization }: any = useAppSelector((state) => state.auth.user);
  const { fy_info } = useAppSelector((state) => state.mission_plan);
  // console.log(fy_info)

  const { data: rolesData, isLoading: isLoadingApprovalroles } =
    useGetAllApproverListQuery();
    
  const [createApprovalFlow, { isLoading: isUpdatingApprovalFlow }] =
    useCreateApprovalFlowMutation();

    const [getAuthUserDetails, { isLoading }] = useLazyGetAuthUserDetailsQuery(
      {}
    );
  
    // This fuction update user records
    const handleGetAuthUser = async () => {
      getAuthUserDetails({})
        .unwrap()
        .then(() => {});
    };

  const getApprovalLevels = (data: []) => {
    const mappedApprovals = data.map((d: Dictionary) => {
      return {
        ...d,
        title: d?.title,
        approvals: d?.approvals,
      };
    });
    return { order_of_approvals: mappedApprovals };
  };

  // const formik = useFormik()
  const handleFormSubmit = async (values: any) => {
    
    const hasEmptyApproval = values?.staff_levels?.filter((f: Dictionary) => f.title !== "organization head")?.map((f: Dictionary) => f.approvals)?.some((f: Dictionary) => f.length === 0)
    if (hasEmptyApproval) {
        toast.error('Each level must have at least one approval except the organization head')
        return
    }
    const APPROVALS = getApprovalLevels(values?.staff_levels)
    // console.log(APPROVALS);
    // return
    createApprovalFlow(APPROVALS)
    .unwrap()
    .then((payload) => {
        toast.success('Approval flow updated successfully')
        handleGetAuthUser()
        // console.log(payload)
        dispatch(
          updateMissionPlanDetails({
            slug: "active_fy_info",
            data: payload?.data,
          })
        );
        router.back()
    })
  };

  useEffect(() => {
    if (organization?.staff_levels) {
      let STAFF_LEVELS = organization?.staff_levels;
      const LEVELS = STAFF_LEVELS?.map((item: any) => {
        return {
          title: item.name,
          approvals: [],
          approval_levels: 0,
          level: item.level,
        };
      });
      setInitialApprovalFlowData({ staff_levels: LEVELS });

      if (organization?.approval_flows?.length) {
        const initialApprovals = organization?.approval_flows?.map(
          (d: Dictionary) => {
            return {
              ...d,
              approval_levels: d?.approvals?.length,
            };
          }
        );
        let approvals_flow = { staff_levels: initialApprovals };
        setInitialApprovalFlowData(approvals_flow);
      }
    }
  }, [organization, fy_info?.order_of_approvals]);

  return (
    <section className="w-full h-full overflow-y-auto pb-20 customScrollbar">
      <h1>Set FY Approval Flow</h1>
      <section className="mt-6">
        <Formik
          initialValues={initialApprovalFlowData}
          onSubmit={handleFormSubmit}
          // validationSchema={}
          enableReinitialize={true}
        >
          {(formik) => {
            // console.log(formik.values)
            return (
              <Form>
                <FieldArray name="staff_levels">
                  {({ push, remove }: { push: any; remove: any }) =>
                    formik?.values?.staff_levels?.length > 0 &&
                    formik.values.staff_levels.map((item: any, idx: number) => (
                      <div key={idx} className="flex flex-col gap-10 mt-2">
                        <CustomAccordion
                          key={1}
                          className="w-full bg-white mb-4 p-5 border border-custom-divider rounded flex flex-col gap-1"
                          title={
                            <p className="font-medium text-sm">
                              {idx + 1}. How many levels of approval should be
                              for{" "}
                              <span className="text-primary capitalize">
                                {item.title}
                              </span>?
                            </p>
                          }
                          content={
                            <>
                              <CustomSelect
                                options={formik?.values?.staff_levels?.[idx].title === "organization head" ? levelOptionsDefault : levelOptions}
                                selected={
                                  formik?.values?.staff_levels?.[idx]
                                    .approval_levels
                                    ? formik?.values?.staff_levels?.[
                                        idx
                                      ].approval_levels.toString()
                                    : ""
                                }
                                setSelected={(value) => {
                                  formik.setFieldValue(
                                    `staff_levels.${idx}.approvals`,
                                    []
                                  );
                                  formik.setFieldValue(
                                    `staff_levels.${idx}.approval_levels`,
                                    value
                                  );
                                }}
                                className="w-[10rem]"
                                placeholder="Select..."
                              />
                              <div className="flex flex-col gap-2 mt-6">
                                <FieldArray name="approvals">
                                  {({
                                    push,
                                    remove,
                                  }: {
                                    push: any;
                                    remove: any;
                                  }) =>
                                    formik?.values?.staff_levels?.[idx]
                                      .approval_levels
                                      ? Array.from(
                                          {
                                            length:
                                              formik?.values?.staff_levels?.[
                                                idx
                                              ].approval_levels,
                                          },
                                          (_, index) => (
                                            <div key={index} className="mb-4">
                                              {formik?.values?.staff_levels?.[idx].approval_levels == 1 && <span>Who has the final approval power</span>}
                                              {index === 0 && formik?.values?.staff_levels?.[idx].approval_levels > 1 && <span>Who should be the first approval</span>}
                                              {index > 0 &&
                                                index <
                                                  Number(
                                                    formik?.values
                                                      ?.staff_levels?.[idx]
                                                      .approval_levels
                                                  ) -
                                                    1 && (
                                                  <span>
                                                    Who should be the next
                                                    approval
                                                  </span>
                                                )}
                                              {Number(
                                                formik?.values?.staff_levels?.[
                                                  idx
                                                ].approval_levels
                                              ) > 1 &&
                                                Number(
                                                  formik?.values
                                                    ?.staff_levels?.[idx]
                                                    .approval_levels
                                                ) ===
                                                  index + 1 && (
                                                  <span>
                                                    Who has the final approval
                                                    power
                                                  </span>
                                                )}
                                              <CustomSelect
                                                key={index}
                                                options={
                                                  rolesData?.map((item) => {
                                                    return {
                                                      label: item,
                                                      value: item,
                                                    };
                                                  }) || []
                                                }
                                                selected={
                                                  formik?.values
                                                    ?.staff_levels?.[idx]
                                                    .approvals?.[index]
                                                }
                                                setSelected={(value) => {
                                                  formik.setFieldValue(
                                                    `staff_levels.${idx}.approvals.${index}`,
                                                    value
                                                  );
                                                }}
                                                className="w-[15rem]"
                                                placeholder="Select..."
                                              />
                                            </div>
                                          )
                                        )
                                      : ""
                                  }
                                </FieldArray>
                              </div>
                            </>
                          }
                        />
                      </div>
                    ))
                  }
                </FieldArray>

                <div className="mt-5">
                  <Button
                    disabled={isUpdatingApprovalFlow}
                    className=""
                    type="submit"
                    loading={isUpdatingApprovalFlow}
                    loadingText="Save & Continue"
                  >
                    Save & Continue
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
    </section>
  );
};

export default ApprovalFlowUpdate;
