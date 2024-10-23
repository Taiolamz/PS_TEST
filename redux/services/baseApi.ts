import { clearStorageItem } from "@/utils/hooks/useLocalStorage";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { resetAuth } from "../features/auth/authSlice";
import { resetMissionPlan } from "../features/mission-plan/missionPlanSlice";
import { resetMissionPlanPreview } from "../features/mission-plan/missionPlanPreviewSlice";

const toastError = (errors: any) => {
  const errorKeys = Object.keys(errors);
  if (Array.isArray(errors[errorKeys[0]])) {
    const message = errors[errorKeys[0]][0];
    toast.error(message);
    return;
  } else {
    const message = errors[errorKeys[0]];
    toast.error(message);
  }
};

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  prepareHeaders: (headers, { getState }) => {
    let accessToken: string = Cookies.get("token") || "";
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    headers.set("accept", "application/json");
    return headers;
  },
});

export const baseQueryInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log(result)

  if (result?.error) {
    let res: any = result.error;
    if (res.status === 403) {
      if (res?.data?.message) {
        toast.error(res?.data?.message);
      }
      if (res?.data?.error?.message) {
        toast.error(res?.data?.error?.message);
      }
      // api.dispatch(resetAuth());
      // Cookies.remove("token");
      // clearStorageItem();
      // window.location.href = "/login";
    }
    if (res.status === 401) {
      if (res.data.status === "failed") {
        api.dispatch(resetAuth());
        api.dispatch(resetMissionPlan());
        api.dispatch(resetMissionPlanPreview());
        Cookies.remove("token");
        clearStorageItem();
        window.location.href = "/login";
        // let message = res.data.message;
        // toast.error(message);
      }
    }
    if (res.status === 404) {
      let message = res?.data?.error?.message || res?.data?.message;
      toast.error(message);
    }
    if (res.status === 422) {
      if (res.data.errors) {
        toastError(res.data.errors);
      }
      if (res.data.error) {
        let message = res.data.error.message;
        toast.error(message);
      }
    }

    if (res.status === 409) {
      let message = res.data.message;
      toast.error(message);
    }

    if (res.status === 503) {
      let message = res.data.message || res.data.error.message;
      toast.error(message);
    }

    if (res.status === 500) {
      let message = res.data.error.message;
      toast.error(message);
    }

    if (res.status === 400) {
      let message = res?.data?.error?.message;
      if (typeof message === "object") {
        message = res.data?.error?.message?.error || JSON.stringify(message);
      }
      toast.error(message);
    }
  }

  return result;
};
export const TAG_TYPES = [
  "Subsidiaries",
  "Branches",
  "Departments",
  "Units",
  "Employees",
  "MissionPlanTemplates",
  "Comments",
  "MissionPlan",
  "MissionPlanExtension",
  "Approvables",
  "OrganizationFiscalYear",
  "MissionPlanReport",
  "TargetOutcomeSettings",
  "Staff",
  "Downliners",
  "Notification",
];
export const baseApi = createApi({
  baseQuery: baseQueryInterceptor,
  endpoints: () => ({}),
  reducerPath: "baseApi",
  tagTypes: TAG_TYPES,
});
