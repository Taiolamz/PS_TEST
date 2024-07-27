import { clearStorageItem } from "@/utils/hooks/useLocalStorage";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { resetAuth } from "../features/auth/authSlice";

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
    prepareHeaders: (headers, {getState}) => {
        let accessToken: string = Cookies.get('token') || "";
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`)
        }
        headers.set('accept', 'application/json')
        headers.set('Content-Type', 'application/json; charset=utf-8')
        return headers
    }
})

export const baseQueryInterceptor: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    // console.log(result)

    if (result.error) {
        let res: any = result.error
        if (res.status === 403) {
            api.dispatch(resetAuth())
            Cookies.remove('token');
            clearStorageItem()
            window.location.href = '/';
        }
        if (res.status === 401) {
            let message = Array.isArray(res.data.error.message)
            ? res.data.error.message[0]
            : res.data.error.message
            toast.error(message);
        }
        if (res.status === 404) {
            let message = res.data.error.message
            toast.error(message);
        }
        if (res.status === 422) {
            if (res.data.errors) {
                toastError(res.data.errors)
            }
            if (res.data.error) {
                let message = res.data.error.message
                toast.error(message)
            }
        }

        if (res.status === 503) {
            let message = res.data.error.message
            toast.error(message)
        }

        if (res.status_code === 503) {
            let message = res.data.error.message
            toast.error(message);
        }

        if (res.status === 500) {
            let message = res.data.error.message
            toast.error(message)
        }

        if (res.status === 400) {
            let message = res.data.error.message
            toast.error(message)
        }
    }

    return result
}


export const baseApi = createApi({
    baseQuery: baseQueryInterceptor,
    endpoints: () => ({}),
    reducerPath: 'baseApi',
})