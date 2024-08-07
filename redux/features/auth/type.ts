type Organization = {
  appraisal_cycle?: string | null;
  brand_colour?: string | null;
  city?: string;
  closing_time?: string | null;
  country?: string;
  end_fiscal_year?: string | null;
  fiscal_year_title?: string | null;
  hierarchy?: string | null;
  id?: string;
  logo?: string | null;
  mission?: string | null;
  name?: string;
  opening_time?: string | null;
  probation_duration?: string | null;
  staff_levels?: string | null;
  start_fiscal_year?: string | null;
  state?: string;
  vision?: string | null;
};

type User = {
  role?: string;
  designation?: string;
  email?: string;
  email_verified_at?: string;
  id?: string;
  name?: string;
  organization?: Organization;
};

export type Auth = {
  user: User;
  token?: string;
  checklist?: string;
};
