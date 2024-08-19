interface AuthType {
  middleware: string;
  redirectIfAuthenticated: string;
}

type RegisterFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  id: string;
};

type RejectValues = {
  reason: string;
  other_reason: string;
  id: string;
};

type Downliners = {
  date_submitted: string;
  designation: string;
  email: string;
  id: string;
  manager_id: string;
  name: string;
  role: string;
  status: string;
};

type AuthResponseType = {
  setErrors?: (errors: string[]) => void; // Function to set errors (array of strings)
  setStatus?: (status: string[]) => void; // Function to set status (array of strings)
  setLoading?: (loading: boolean) => void; // Function to set loading state (boolean)
};

type FileTemplateParam = {
  template: string;
  format: string;
};

type ApiError = {
  response: {
    data: {
      message: string;
    };
  };
};

type LoginError = {
  response: {
    data: {
      errors: {};
    };
  };
};

type RegisterError = {
  response: {
    data: {
      error: {
        message: string;
      };
    };
  };
};

type RejectError = {
  response: {
    data: {
      error: {
        message: string;
      };
    };
  };
};

// subsidiary services
type SubsidiaryData = {
  id?: string;
  parent_id?: string;
  name: string;
  address: string;
  brand_colour?: string;
  city?: string;
  country: string;
  created_at?: string;
  deleted_at?: string;
  logo?: string;
  mission?: string;
  org_preferences?: string;
  state?: string;
  updated_at?: string;
  vision?: string;
  file?: File;
};
type BranchData = {
  name: string;
  branch_id: string;
};

type GradeLevelData = {
  name: string;
  level: string;
};

type AllStaff = {
  // staff_members: {
  email: string;
  id: string;
  name: string;
  // };
};

type InvitedUser = {
  organization: {
    name: string;
    logo: string;
  };
  logo: string;
  name: string;
  branch_id: string;
  created_at: string;
  date_of_birth: string;
  department_id: string;
  designation: string;
  email: string;
  first_name: string;
  gender: string;
  id: string;
  last_name: string;
  level: string;
  line_manager_email: string | null;
  maiden_name: string;
  manager_id: string;
  middle_name: string;
  organization_id: string;
  phone_number: string;
  reason: string | null;
  resumption_date: string;
  role_id: string;
  staff_number: string;
  status: string;
  unit_id: string;
  updated_at: string;
};

type ObjType = {
  name: string;
  id: string;
};

type StateData = {
  name: string;
  id: string;
  work_email: string;
};

type RolesData = {
  name: string;
  id: string;
};

type DepartmentData = {
  id?: string;
  name?: string;
  branch?: {
    id: string;
    name: string;
  };
};

type MissionPlanTemplateData = {};

type EmployeeRolesData = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  maiden_name: string;
  gender: string;
  date_of_birth: string;
  resumption_date: string;
  phone_number: string;
  staff_number: string;
  level: string;
  designation: string;
  email: string;
  line_manager_email: string;
  organization_id: string;
  department_id: string;
  branch_id: string;
  unit_id: string;
  status: string;
  role_id: string;
  reason: string;
  created_at: string;
  updated_at: string;
};

type CurrentMissionPlanData = {
  approval_steps: any[];
  approvals: any[];
  boundaries: any[];
  created_at: string;
  fiscal_year_id: string;
  id: string;
  implied_task: any;
  measure_of_success: any[];
  mission_statement: {
    id: string;
    mission_plan_id: string;
    created_at: string;
    deleted_at: string;
    mission: string;
    staff_member_id: string;
    status: string;
    updated_at: string;
  };
  organization_id: string;
  specified_task: any[];
  staff_member_id: string;
  status: string;
  strategic_intents: any[];
};

type RolesData = {};

type QueryParams = {
  currentPage?: number;
  next_page_url?: string;
  prev_page_url?: string;
  per_page?: number;
  total?: number;
  to?: number;
  status?: string;
};

// unit services
type UnitData = {
  id?: string;
  name: string;
};
