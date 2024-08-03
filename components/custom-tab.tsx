"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

type OPTION_TYPES = {
  id: number;
  title: string;
  accessor: string;
};

interface CustomTabProps {
  slug: string;
  options: OPTION_TYPES[];
}

const notactive =
  "bg-transparent hover:bg-transparent text-custom-gray-scale-300 shadow-none";

const active =
  "bg-[var(--primary-accent-color)] hover:bg-[var(--primary-accent-color)] text-primary  shadow-none";

export default function CustomTab({ slug, options }: CustomTabProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const active_slug = searchParams.get(slug ? slug : "ui");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (!active_slug) {
      router.push(
        pathname + "?" + createQueryString(slug, options?.[0].accessor)
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border rounded-[5px] px-[7px] py-[3px] w-fit space-x-4 text-sm">
      {options?.map(({ id, title, accessor }) => (
        <Button
          key={id}
          onClick={() => {
            router.push(pathname + "?" + createQueryString(slug, accessor));
          }}
          className={cn(
            "h-8 px-[18px] py-2 text-sm rounded-[5px]",
            active_slug === accessor ? active : notactive
          )}
        >
          {title}
        </Button>
      ))} 
    </div>
  );
}
