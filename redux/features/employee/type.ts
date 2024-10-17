import { Dictionary } from "@/@types/dictionary";

type ID_NAME = {
  id: string;
  name: string;
};

type EmployeeData = {
  role?: string;
  email?: string;
  work_email?: string;
  id?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  date_of_birth?: string;
  maiden_name?: string;
  gender?: string;
  resumption_date?: string;
  branch?: ID_NAME;
  department?: ID_NAME;
  level?: string;
  line_manager_id?: string;
  line_manager_name?: string;
  line_manager_email?: string;
  subsidiary?: ID_NAME;
  subsidiary_id?: string;
  unit?: ID_NAME;
  job_title?: string;
  phone_number?: string;
  staff_number?: string;
  new_employee?: string;
  designation?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  previous_designation?: string;
  previous_designation_end_date?: string;
  previous_designation_start_date?: string;
};

export type Employee = {
  employee: EmployeeData;
};
