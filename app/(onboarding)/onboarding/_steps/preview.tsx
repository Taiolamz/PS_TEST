import React from "react";
import { FormHeader } from "../_components";
import { steps } from "../data";
import Icon from "@/components/icon/Icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdModeEdit } from "react-icons/md";

const Preview = () => {
  const router = useRouter();
  const location = usePathname();
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");

  const filteredSteps = steps.filter((step) => step !== "Preview");

  return (
    <section className="max-w-[27.375rem]">
      <FormHeader
        title="Preview Organization Onboarding"
        subTitle="Filled Information"
      />
      <div className="flex flex-col gap-3">
        {filteredSteps.map((item, index) => (
          <div
            key={item}
            className="text-[#5B6871] flex items-center justify-between bg-[#00808008] p-2"
          >
            <p className="text-sm"> {`${index + 1}. ${item}`}</p>
            <button
              type="button"
              onClick={() =>
                router.push(`${location}?ui=${ui}&step=${index + 1}`)
              }
            >
              <MdModeEdit
                height={28}
                width={28}
                color="#008080"
                className="bg-[#0080801A] rounded-full p-[0.1875rem]"
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Preview;
