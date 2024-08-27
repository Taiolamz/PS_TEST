"use client";

import Icon from "@/components/icon/Icon";
import { CheckIcon } from "@radix-ui/react-icons";
import React, { useContext, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useLazyGetAuthUserDetailsQuery } from "@/redux/services/auth/authApi";
import { useAppSelector } from "@/redux/store";
import { steps } from "./data";
import ActionContext, {
  ActionContextProvider,
} from "@/app/(dashboard)/context/ActionContext";

type Props = {
  children: React.ReactNode;
};

const OnboardingLayout = ({ children }: Props) => {
  const actionCtx = useContext(ActionContext);
  const { user, checklist } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const location = usePathname();
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");

  const getCurrentStep = () => {
    const step = Number(searchParams.get("step"));
    return step;
  };

  const filteredSteps = steps.filter((step) => step !== "Preview");

  const [getAuthUserDetails, { isLoading }] = useLazyGetAuthUserDetailsQuery(
    {}
  );

  // This fuction update user records
  const handleGetAuthUser = async () => {
    getAuthUserDetails({})
      .unwrap()
      .then(() => {});
  };

  useEffect(() => {
    // document.documentElement.style.setProperty(
    //   "--primary-color",
    //   e.hex
    // );
    const color = user?.organization?.brand_colour || ("" as any);
    actionCtx?.setPrimaryColorVals(color);
    // console.log(user);

    if (user && Object?.keys(user)?.length < 1) {
      // checkRoutePermission();
      handleGetAuthUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <ActionContextProvider>
      <section className="flex h-screen overflow-hidden">
        <aside className="w-1/4 p-4 pr-0 bg-[--primary-color] text-white xl:w-2/12">
          <Icon width={74} height={15} name="mance" className="mx-auto" />
          <h2 className="font-semibold mb-2 mt-[1.125rem] pl-2">Steps</h2>
          <ul className="flex flex-col gap-2">
            {filteredSteps.map((step, index) => (
              <li
                key={index}
                className={`text-xs p-2 cursor-pointer flex items-center gap-2 mr-4 ${
                  getCurrentStep() - 1 >= index
                    ? "bg-white bg-opacity-[8%]"
                    : ""
                }`}
                onClick={() =>
                  router.push(`${location}?ui=${ui}&step=${index + 1}`)
                }
              >
                {getCurrentStep() - 1 >= index && <CheckIcon className="w-3" />}
                {step}
              </li>
            ))}
          </ul>
        </aside>
        <main className="w-3/4 bg-white shadow-lg xl:w-5/6 pb-10 xl:pb-40">
          {children}
        </main>
      </section>
    </ActionContextProvider>
  );
};

export default OnboardingLayout;
