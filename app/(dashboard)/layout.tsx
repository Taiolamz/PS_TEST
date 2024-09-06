"use client";
import { useState } from "react";
import Authenticated from "@/components/middleware/authenticated";
import DashboardLayout from "./_layout/DashboardLayout";
import { ActionContextProvider } from "./context/ActionContext";
import NextTopLoader from "nextjs-toploader";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <ActionContextProvider>
      <NextTopLoader color="var(--primary-color)" showSpinner={false} />
      {children}
    </ActionContextProvider>
  );
};

export default Authenticated(RootLayout);
