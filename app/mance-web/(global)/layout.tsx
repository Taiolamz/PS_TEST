"use client";

import React from 'react'
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export default function AOSlayout({children} : {
  children: React.ReactNode;
}) {
    useEffect(() => {
        AOS.init({
          once: true,
        });
      }, []);
  return (
    <div>{children}</div>
  )
}
