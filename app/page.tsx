"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/mance-web");
  });

  return (
    <div className="text-base font-medium">
      <></>
    </div>
  );
};

export default Home;
