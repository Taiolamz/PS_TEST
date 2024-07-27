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
      errors: {
      };
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

// SUBSIDIARY SERVICES
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
  file?:File
};

// UNIT SERVICES
type UnitData = {};
