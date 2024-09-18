type MissionPlanTemplate = {
  missionPlanTemplates: MissionContentDetails[];
};

type dataProp = {
  data: any;
};

type measureProp = {
  measure: string;
  description: string;
  unit: string;
  target: string;
  id: string;
  weight: number;
  approval_comment_count?: string;
  status?: string;
};

type strategicProp = {
  behaviours: string;
  id: string;
  intent: string;
};

type specifiedProp = {
  strategic_pillars: [];
  task: string;
  success_measures: [];
  start_date: string;
  end_date: string;
  is_main_effort?: number;
  implied_tasks: [];
  status: string;
};
type impliedProp = {
  expected_outcome: string;
  task: string;
  weight: string;
  percentage: string;
  resources: [];
  start_date: string;
  end_date: string;
  is_main_effort?: number;
  title: string;
  status: string;
};

type resourceProp = {
  name: string;
};

type approveItems = {
  approvable_type?: string;
  approvable_id?: string;
  status: string;
  id?: string;
};
type itemsApprove = {
  id?: string;
  comments?: string[];
  status?: string;
};
