"use client";
import { useLazyGetAuthUserDetailsQuery } from "@/redux/services/auth/authApi";
import { useLazyGetChecklistQuery } from "@/redux/services/onboarding/checkListApi";
import { useAppSelector } from "@/redux/store";
import {
  checkUserRole,
  formatChecklistPercent,
  getLinksAndCollapseNumByTitle,
  getPrimaryColorAccent,
} from "@/utils/helpers";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { sideMenuEmployeeList, sideMenuList } from "../_layout/SideMenuList";

interface contextProps {
  collapseSideNav?: boolean;
  setCollapseSideNav?: (param?: boolean) => void;
  showNavVal?: string;
  setShowNavVal: (param?: string) => void;
  setPrimaryColorVals: (param?: string) => void;
  triggerUpdateUser: () => void;
  triggerUpdateChecklist: () => void;
  checkListLength: any;
  listToUse: any;
  setCheckListLength: (param: any, list?: any) => void;
  // setTriggerUpdateUser: () => void;
  primaryColorHexValue?: string; // primary color hexvalue
}

const ActionContext = createContext<contextProps>({
  collapseSideNav: false,
  setCollapseSideNav: (param?: boolean) => {},
  showNavVal: "",
  setShowNavVal: (param?: string) => {},
  setPrimaryColorVals: (param?: string) => {},
  triggerUpdateUser: () => {},
  triggerUpdateChecklist: () => {},
  checkListLength: 0,
  listToUse: [],
  setCheckListLength: (param, list) => {},
  primaryColorHexValue: "",
});

export function ActionContextProvider(props?: any) {
  const [primaryColorHexValue, setPrimaryColorHexValue] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const [collapseSideval, setCollapseSideVal] = useState(false);
  const [showNavVal, setShowNavVal] = useState<string>("two");
  const { checklist } = useAppSelector((state) => state.auth);
  const [getChecklist] = useLazyGetChecklistQuery({});
  const pathname = usePathname();
  const [getAuthUserDetails, { isLoading }] = useLazyGetAuthUserDetailsQuery(
    {}
  );

  useEffect(() => {
    // getCurrentAdminDrop();
    // getCurrentEmpDrop()
    if (Object?.keys(user)?.length > 0) {
      if (checkUserRole(user?.role as string) === "ADMIN") {
        getCurrentAdminDrop();
      } else {
        getCurrentEmpDrop();
      }
    }
  }, [user]);

  function getCurrentAdminDrop() {
    // check tool ----
    const toolLink = getLinksAndCollapseNumByTitle(
      sideMenuList,
      "TOOLS"
    )?.links;
    const toolVal = getLinksAndCollapseNumByTitle(
      sideMenuList,
      "TOOLS"
    )?.collapseNum;
    if (toolLink?.includes(pathname)) {
      setShowNavVal(toolVal);
      return;
    }

    // check organization ----
    const orgLink = getLinksAndCollapseNumByTitle(
      sideMenuList,
      "ORGANIZATION"
    )?.links;
    const orgVal = getLinksAndCollapseNumByTitle(
      sideMenuList,
      "ORGANIZATION"
    )?.collapseNum;
    if (orgLink?.includes(pathname)) {
      setShowNavVal(orgVal);
      return;
    }

    // management organization ----
    const manageLink = getLinksAndCollapseNumByTitle(
      sideMenuList,
      "MANAGEMENT"
    )?.links;
    const manageVal = getLinksAndCollapseNumByTitle(
      sideMenuList,
      "MANAGEMENT"
    )?.collapseNum;
    if (manageLink?.includes(pathname)) {
      setShowNavVal(manageVal);
      return;
    }

    // management organization ----
    const settingLink = getLinksAndCollapseNumByTitle(
      sideMenuList,
      "SETTINGS"
    )?.links;
    const settingVal = getLinksAndCollapseNumByTitle(
      sideMenuList,
      "SETTINGS"
    )?.collapseNum;
    if (settingLink?.includes(pathname)) {
      setShowNavVal(settingVal);
      return;
    }
  }

  function getCurrentEmpDrop() {
    // check tool ----
    const toolLink = getLinksAndCollapseNumByTitle(
      sideMenuEmployeeList,
      "TOOLS"
    )?.links;
    const toolVal = getLinksAndCollapseNumByTitle(
      sideMenuEmployeeList,
      "TOOLS"
    )?.collapseNum;
    if (toolLink?.includes(pathname)) {
      setShowNavVal(toolVal);
      return;
    }

    // check organization ----
    const orgLink = getLinksAndCollapseNumByTitle(
      sideMenuEmployeeList,
      "MY ORGANIZATION"
    )?.links;
    const orgVal = getLinksAndCollapseNumByTitle(
      sideMenuEmployeeList,
      "MY ORGANIZATION"
    )?.collapseNum;
    if (orgLink?.includes(pathname)) {
      setShowNavVal(orgVal);
      return;
    }

    // management organization ----
    const settingLink = getLinksAndCollapseNumByTitle(
      sideMenuEmployeeList,
      "SETTINGS"
    )?.links;
    const settingVal = getLinksAndCollapseNumByTitle(
      sideMenuEmployeeList,
      "SETTINGS"
    )?.collapseNum;
    if (settingLink?.includes(pathname)) {
      setShowNavVal(settingVal);
      return;
    }
  }

  function setCollapseSideNavFunc() {
    setCollapseSideVal(!collapseSideval);
  }

  function setShowNavValFunc(param: any) {
    setShowNavVal(param);
  }

  function setPrimaryColorsFunc(param: any) {
    setPrimaryColorHexValue(param);
    document.documentElement.style.setProperty(
      "--primary-color",
      param || ("#008080" as string)
    );
    document.documentElement.style.setProperty(
      "--btn-color",
      param || ("#008080" as string)
    );
    document.documentElement.style.setProperty(
      "--primary-accent-color",
      getPrimaryColorAccent(param || "#008080") as string
    );
  }

  const handleGetAuthUser = async () => {
    getAuthUserDetails({})
      .unwrap()
      .then(() => {});
  };

  const handleGetChecklist = async () => {
    formatChecklistPercent(checklist?.completion_percent) !== 100 &&
      getChecklist({})
        .unwrap()
        .then(() => {});
  };

  const [checkListVal, setCheckListVal] = useState(0);
  const [listToUse, setListToUse] = useState([]);
  const checkListFunc = (param: any, list: any) => {
    setCheckListVal(param);
    setListToUse(list);
  };

  const contextValue = {
    collapseSideNav: collapseSideval,
    setCollapseSideNav: setCollapseSideNavFunc,
    showNavVal: showNavVal,
    setShowNavVal: setShowNavValFunc,
    setPrimaryColorVals: setPrimaryColorsFunc,
    triggerUpdateUser: handleGetAuthUser,
    triggerUpdateChecklist: handleGetChecklist,
    checkListLength: checkListVal,
    setCheckListLength: checkListFunc,
    listToUse: listToUse,
    primaryColorHexValue: primaryColorHexValue, // Expose value
  };

  return (
    <ActionContext.Provider value={contextValue}>
      {props?.children}
    </ActionContext.Provider>
  );
}

export default ActionContext;
