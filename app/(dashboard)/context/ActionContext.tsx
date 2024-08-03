"use client";
import { createContext, useState } from "react";

interface contextProps {
  collapseSideNav?: boolean;
  setCollapseSideNav?: (param?: boolean) => void;
  showNavVal?: string;
  setShowNavVal: (param?: string) => void;
}

const ActionContext = createContext<contextProps>({
  collapseSideNav: false,
  setCollapseSideNav: (param?: boolean) => {},
  showNavVal: "",
  setShowNavVal: (param?: string) => {},
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

  const contextValue = {
    collapseSideNav: collapseSideval,
    setCollapseSideNav: setCollapseSideNavFunc,
    showNavVal: showNavVal,
    setShowNavVal: setShowNavValFunc,
  };

  return (
    <ActionContext.Provider value={contextValue}>
      {props?.children}
    </ActionContext.Provider>
  );
}

export default ActionContext;
