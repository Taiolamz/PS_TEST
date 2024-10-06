import { useGetSubsidiaryByIdQuery, useGetSubsidiaryInBranchQuery } from "@/redux/services/checklist/subsidiaryApi";

export const useSubsidiaryById = ({id}: {id:string}) => {
      const { data: subDetalsData, isLoading: isLoadingSubDetails } = useGetSubsidiaryByIdQuery(
   id
  );

        const { data: subDetalsBranchData, isLoading: isLoadingSubDetailsBranch } = useGetSubsidiaryInBranchQuery(
   id
  );

  return {
    subDetalsData,isLoadingSubDetails
  }
}