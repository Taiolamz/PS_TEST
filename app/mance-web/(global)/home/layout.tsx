"use client";

import Footer from "@/components/molecules/footer";
import Navbar from "@/components/molecules/navbar";
// import Navbar from "@/components/molecules/navbar";
import React from "react";

export default function GlobalLayout({ children } : {
  children: React.ReactNode;
}) {

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
