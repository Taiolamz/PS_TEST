export type MissionStatementType = {
  mission: string;
};

export type MeasureOfSuccessType = {
  id?: string;
  measure?: string;
  status?: string;
  target?: string;
  unit?: string;
};

export type BoundariesType = {
  constraints: [];
  freedoms: [];
};
export type SpecifiedTasksType = {};

export type StrategicIntentType = {
  behaviours: string;
  id: string;
  intent: string;
  status: string;
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
  specified_tasks: [];
  staff_member_id: string;
};

export default MissionPlanApprovablesType;
