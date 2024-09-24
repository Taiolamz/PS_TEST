import { useGetAllOrganizationEmployeeMissionPlanQuery } from "@/redux/services/mission-plan/allmissionplanApi";

const Approvals = () => {


  const {
    data: employeeData,
    isLoading: isLoadingEmployee,
    isFetching: isFetchingEmployee,
    error: employeeError,
  }: any = useGetAllOrganizationEmployeeMissionPlanQuery({
    params: {
      subsidiary: "",
      department: '',
      unit: "",
      search: "",
      status: "",
      sort_by: "",
    },
    fiscal_year_id: "01j80dtcr56d3pxts26prs9547",
  });
  return (
    <div className="w-full mt-[30px]">
     <div>
      <h1 className="text-lg font-[700]">Total: 3</h1>
     </div>
    </div>
  );
};

export default Approvals;
