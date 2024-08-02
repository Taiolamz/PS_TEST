"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isPreload, setPreload] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setPreload(false);
      router.push("/mance-web/home");
    }, 3000);
  }, [router]);
  return (
    <section
      className={`w-screen h-screen flex justify-center items-center transition-all ease-linear ${
        !isPreload && "opacity-0"
      }`}
    >
      <div className="w-[80%] md:w-[40%] relative">
        <div className="bg-white h-8 w-20 absolute bottom-0 right-0" />
        <Image width={700} height={1400} src='/assets-website/preload.gif' alt="mance logo" className="" unoptimized={true} />
      </div>
    </section>
  );
}
