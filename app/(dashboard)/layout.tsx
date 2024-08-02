"use client"
import { useState } from "react"
import Authenticated from "@/components/middleware/authenticated"
import DashboardLayout from "./_layout/DashboardLayout"
import { ActionContextProvider } from "./context/ActionContext"


const RootLayout = ({children}:{children: React.ReactNode}) => {
    const [showSidebar, setShowSidebar] = useState<boolean>(true)

    return (
        <ActionContextProvider>
                {children}
        </ActionContextProvider>
    )
}




export default Authenticated(RootLayout)