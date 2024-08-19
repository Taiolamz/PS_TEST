import { useLazyGetChecklistQuery } from "@/redux/services/onboarding/checkListApi";
import React, { useEffect } from "react";
import {
  ChecklistOverviewContent,
  ChecklistOverviewLayout,
} from "./_components";

export default function ChecklistOverview() {
  const [getChecklist] = useLazyGetChecklistQuery({});
  const handleGetChecklist = async () => {
    getChecklist({})
      .unwrap()
      .then(() => {});
  };

  useEffect(() => {
    // if (checkUserRole(user?.role as string) === "ADMIN") {
    //   handleGetChecklist();
    // }
    handleGetChecklist();
  //  console.log(user);
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <ChecklistOverviewLayout>
      <ChecklistOverviewContent />
    </ChecklistOverviewLayout>
  );
}
