type MissionPlanTemplate = {
  missionPlanTemplates: MissionContentDetails[]
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
};

type strategicProp = {
  behaviours: string;
  id: string;
  intent: string;
};

type specifiedProp = {
  strategic_pillars: string;
  task: string;
  success_measures: string;
  start_date: string;
  end_date: string;
  is_main_effort?: number;
  implied_tasks: [];
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
};

type resourceProp = {
  name: string;
};