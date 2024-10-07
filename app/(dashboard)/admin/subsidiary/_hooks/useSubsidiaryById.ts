import {
  useGetSubsidiaryByIdQuery,
  useGetSubsidiaryInBranchQuery,
  useGetSubsidiaryInDeptQuery,
  useGetSubsidiaryInStaffQuery,
  useGetSubsidiaryInUnitQuery,
} from "@/redux/services/checklist/subsidiaryApi";

export const useSubsidiaryById = (id: string) => {
  const { data: subDetalsData, isLoading: isLoadingSubDetails } =
    useGetSubsidiaryByIdQuery(id ?? "");

  const { data: subDetailsBranchData, isLoading: isLoadingSubDetailsBranch } =
    useGetSubsidiaryInBranchQuery({ id: id, params: { page: 1 } });

  const { data: subDetailsDepthData, isLoading: isLoadingSubDetailsDept } =
    useGetSubsidiaryInDeptQuery({ id: id, params: { page: 1 } });

  const { data: subDetailsUnithData, isLoading: isLoadingSubDetailsunit } =
    useGetSubsidiaryInUnitQuery({ id: id, params: { page: 1 } });

  const { data: subDetailsStaffhData, isLoading: isLoadingSubDetailsStaff } =
    useGetSubsidiaryInStaffQuery({ id: id, params: { page: 1 } });

  return {
    subDetalsData,
    isLoadingSubDetails,
    subDetailsDepthData,
    isLoadingSubDetailsDept,
    subDetailsBranchData,
    isLoadingSubDetailsBranch,
    subDetailsUnithData,
    isLoadingSubDetailsunit,
    subDetailsStaffhData,
    isLoadingSubDetailsStaff,
  };
};
