import { Dictionary } from "@/@types/dictionary";
import { baseApi } from "../baseApi";
import { setChecklist } from "@/redux/features/auth/authSlice";

export const checkListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChecklist: builder.query<Dictionary, {}>({
      query: () => ({
        url: `/admin/organization/checklist`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const {data: { data } } = result;
          dispatch(setChecklist(data));
        } catch (error: any) {
          // console.log(error)
        }
      },
    }),
  }),
});

export const { useLazyGetChecklistQuery } = checkListApi;
