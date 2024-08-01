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

type AuthResponseType = {
  setErrors?: (errors: string[]) => void; // Function to set errors (array of strings)
  setStatus?: (status: string[]) => void; // Function to set status (array of strings)
  setLoading?: (loading: boolean) => void; // Function to set loading state (boolean)
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
  id?: string;
  name: string;
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

type QueryParams = {
  currentPage?: number;
  next_page_url?: string;
  prev_page_url?: string;
  per_page?: number;
  total?: number;
  to?: number;
};

// unit services
type UnitData = {
  id?: string;
  name: string;
};
