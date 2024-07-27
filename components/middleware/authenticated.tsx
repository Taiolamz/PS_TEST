"use client"
import { useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import Cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const { LOGIN } = routesPath

export default function Authenticated(Component: any) {
    
    const accessToken = Cookies.get('token')
    return function Authenticated(props: any) {
        const router = useRouter()
        const { token } = useAppSelector((state) => state.auth)

        useEffect(() => {
            if (!accessToken && !token) {
                return redirect(LOGIN);
            }
        }, []);

        return <Component {...props} />;
    };
}
