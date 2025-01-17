export type MissionStatementType = {
  mission: string;
  id: string;
  status: "pending" | "approved" | "rejected";
  approvables?: [];
};

export type MeasureOfSuccessType = {
  id: string;
  measure: string;
  status: string;
  target: string;
  unit: string;
  weight: string;
};

export type BoundariesType = {
  constraints: [];
  freedoms: [];
  id: string;
  status?: string;
};

export type SpecifiedTasksType = {
  id: string;
  task?: string;
  strategic_pillars: StrategicPillarsType[];
  success_measures?: SuccessMeasuresType[];
  start_date: string;
  end_date: string;
  is_main_effort?: number;
  implied_tasks: ImpliedTaskType[];
  status?: string;
  weight?: string;
  approval_comment_count?: number;
};

export type ImpliedTaskType = {
  id: string;
  task: string;
  expected_outcome: string;
  weight: number;
  percentage: string;
  resources: ResourcesType[];
  start_date: string;
  end_date: string;
  approval_comment_count?: string;
  status?: string;
};

export type StrategicIntentType = {
  behaviours: string;
  id: string;
  intent: string;
  status?: string;
  approvables?: any;
  approval_comment_count?: string;
};

type StrategicPillarsType = {
  id: string;
  title: string;
};

type SuccessMeasuresType = {
  id: string;
  measure: string;
};

type ResourcesType = {
  staff_member_id: string;
  name: string;
};

type MissionPlanApprovablesType = {
  mission_statement: MissionStatementType;
  measure_of_success: MeasureOfSuccessType[];
  strategic_intents: StrategicIntentType[];
  organization_id: string;
  approvables: [];
  boundaries: BoundariesType[];
  created_at: string;
  fiscal_year_id: string;
  id: string;
  specified_tasks: SpecifiedTasksType[];
  staff_member: string;
};

export default MissionPlanApprovablesType;
