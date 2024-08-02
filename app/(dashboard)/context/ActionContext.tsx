"use client"
import { createContext, useState } from "react";

interface contextProps {
    collapseSideNav?: boolean,
    setCollapseSideNav?: (param?: boolean) => void,   
}

const ActionContext = createContext<contextProps>({
  collapseSideNav: false,
  setCollapseSideNav: (param?: boolean) => {},
});

export function ActionContextProvider(props?: any) {
  const [collapseSideval, setCollapseSideVal] = useState(false);

  function setCollapseSideNavFunc() {
    setCollapseSideVal(!collapseSideval);
  }

  const contextValue = {
    collapseSideNav: collapseSideval,
    setCollapseSideNav: setCollapseSideNavFunc,
  };

  return (
    <ActionContext.Provider value={contextValue}>
      {props?.children}
    </ActionContext.Provider>
  );
}

export default ActionContext;
