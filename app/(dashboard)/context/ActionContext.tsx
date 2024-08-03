"use client";
import { getPrimaryColorAccent } from "@/utils/helpers";
import { createContext, useState } from "react";

interface contextProps {
  collapseSideNav?: boolean;
  setCollapseSideNav?: (param?: boolean) => void;
  showNavVal?: string;
  setShowNavVal: (param?: string) => void;
  setPrimaryColorVals: (param?: string) => void;
}

const ActionContext = createContext<contextProps>({
  collapseSideNav: false,
  setCollapseSideNav: (param?: boolean) => {},
  showNavVal: "",
  setShowNavVal: (param?: string) => {},
  setPrimaryColorVals: (param?: string) => {},
});

export function ActionContextProvider(props?: any) {
  const [collapseSideval, setCollapseSideVal] = useState(false);
  const [showNavVal, setShowNavVal] = useState<string>("two");

  function setCollapseSideNavFunc() {
    setCollapseSideVal(!collapseSideval);
  }

  function setShowNavValFunc(param: any) {
    setShowNavVal(param);
  }

  function setPrimaryColorsFunc(param: any) {
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

  const contextValue = {
    collapseSideNav: collapseSideval,
    setCollapseSideNav: setCollapseSideNavFunc,
    showNavVal: showNavVal,
    setShowNavVal: setShowNavValFunc,
    setPrimaryColorVals: setPrimaryColorsFunc,
  };

  return (
    <ActionContext.Provider value={contextValue}>
      {props?.children}
    </ActionContext.Provider>
  );
}

export default ActionContext;
