"use client"
import { useState } from "react"
import Authenticated from "@/components/middleware/authenticated"


const RootLayout = ({children}:{children: React.ReactNode}) => {
    const [showSidebar, setShowSidebar] = useState<boolean>(true)

    return (
        <main>
            {children}
        </main>
    )
}

export default Authenticated(RootLayout)