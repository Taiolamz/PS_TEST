"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
// import Head from "next/head";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/mance-web");
  });

  return (
    
    <div className="text-base font-medium">
     {/* ppp */}
      <></>
    </div>
  );
};

export default Home;
