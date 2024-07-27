"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/molecules/loader";
import Link from "next/link";
import Image from "next/image";

const organizationTypesData = [
  "Information Technology",
  "Healthcare",
  "Education",
  "Non-profit",
  "Finance",
  "Government",
  "Retail",
  "Manufacturing",
  "Entertainment",
  "Hospitality",
  "Engineering",
];

const inputStyle =
  "border-[1.5px] border-[var(--btn-color)] outline-none py-2 pl-4 pr-2 rounded-[4px] text-sm font-light text-[var(--text-color3)]  placeholder-shown:bg-[var(--input-bg)] placeholder-shown:border-[var(--input-border)] invalid:bg-[var(--input-bg)] invalid:border-[var(--input-border)]";

export default function Waitlist() {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate.push("/waitlist/successful");
    }, 5000);
  };

  return (
    <section className="w-full">
      {isLoading && <Loader/>}
      <div className="mx-auto max-w-[85%]">
        <Link href="/mance-web/home"
          className="inline-flex items-center p-2 mt-6 -ml-2 cursor-pointer"
        >
          <Image 
          width={30}
          height={20}
           src="/assets-website/svg/double-chevronarrow.svg" alt="double arrow svg" />
          <span className=" text-sm text-[var(--text-color)]">Back</span>
        </Link>
        <div className="mt-10 ">
          <h3 className=" font-semibold text-4xl text-[var(--text-color3)]">
            Join the waitlist
          </h3>
          <p className=" text-base text-[var(--text-color4)] mt-3">
            Be among the first profiles to enjoy the free holistic features and
            support
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-[14px] pb-12 gap-y-5 md:w-[80%]"
          >
            <div className="flex flex-col space-y-2 col-span-2 md:col-span-1">
              <label
                htmlFor="fname"
                className=" text-[13px] text-[var(--text-color)]"
              >
                <span className="after:content-['*'] after:ml-1 after:text-red-600">
                  First Name
                </span>
              </label>
              <input
                type="text"
                name="fname"
                id="fname"
                required
                placeholder="Input First Name"
                className={inputStyle}
              />
            </div>

            <div className="flex flex-col space-y-2 col-span-2 md:col-span-1">
              <label
                htmlFor="lname"
                className=" text-[13px] text-[var(--text-color)]"
              >
                <span className="after:content-['*'] after:ml-1 after:text-red-600">
                  Last Name
                </span>
              </label>
              <input
                type="text"
                name="lname"
                id="lname"
                required
                placeholder="Input Last Name"
                className={inputStyle}
              />
            </div>

            <div className="flex flex-col space-y-2 col-span-2">
              <label
                htmlFor="email"
                className=" text-[13px] text-[var(--text-color)]"
              >
                <span className="after:content-['*'] after:ml-1 after:text-red-600">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Input Email"
                className={inputStyle}
              />
            </div>

            <div className="flex flex-col space-y-2 col-span-2">
              <label
                htmlFor="orgName"
                className=" text-[13px] text-[var(--text-color)]"
              >
                <span className="after:content-['*'] after:ml-1 after:text-red-600">
                  Organization Name
                </span>
              </label>
              <input
                type="text"
                name="orgName"
                id="orgName"
                placeholder="Input Organization Name"
                className={inputStyle}
              />
            </div>
            <div className="flex flex-col space-y-2 col-span-2">
              <label
                htmlFor="orgType"
                className=" text-[13px] text-[var(--text-color)]"
              >
                <span className="after:content-['*'] after:ml-1 after:text-red-600">
                  Organization Type
                </span>
              </label>
              <select
                name="orgType"
                id="orgType"
                required
                className={inputStyle}
              >
                <option value="" selected disabled>
                  Select Organization Type
                </option>
                {organizationTypesData?.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-2 col-span-2">
              <label
                htmlFor="orgSize"
                className=" text-[13px] text-[var(--text-color)]"
              >
                <span className="after:content-['*'] after:ml-1 after:text-red-600">
                  Organization Size
                </span>
              </label>
              <select
                name="orgSize"
                id="orgSize"
                required
                className={inputStyle}
              >
                <option value="" disabled selected>
                  Select Organization Size
                </option>
                <option value="">1-50</option>
                <option value="">50-100</option>
                <option value="">100-200</option>
                <option value="">200-300</option>
                <option value="">300-500</option>
                <option value="">500-1000</option>
                <option value="">1000-2000</option>
                <option value="">2000-5000</option>
              </select>
            </div>
            <button className="group mt-7 col-span-3 bg-[var(--btn-color)] hover:bg-[var(--btn-hover-backgroundColor)] text-white text-base font-medium rounded-md px-4 py-1.5 inline-flex items-center justify-center gap-2 transition-all ease-linear">
              Join Waitlist
              <svg
                width="15"
                height="12"
                className=" group-hover:translate-x-2 transition-all ease-linear"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 5.75013C0.5 5.42785 0.739489 5.1615 1.05021 5.11935L1.13659 5.11354L13.8684 5.11354C14.22 5.11354 14.505 5.39855 14.505 5.75013C14.505 6.07241 14.2655 6.33875 13.9548 6.38091L13.8684 6.38672L1.13659 6.38672C0.785012 6.38672 0.5 6.10171 0.5 5.75013Z"
                  fill="white"
                />
                <path
                  d="M8.2841 1.08745C8.03496 0.839385 8.0341 0.436318 8.28216 0.18718C8.50768 -0.0393105 8.8613 -0.0606174 9.11091 0.123757L9.18244 0.185241L14.3176 5.29835C14.5448 5.52454 14.5654 5.87943 14.3796 6.12903L14.3177 6.20052L9.18248 11.3145C8.93336 11.5626 8.53029 11.5617 8.2822 11.3126C8.05667 11.0861 8.03685 10.7324 8.22228 10.4836L8.28407 10.4123L12.966 5.7492L8.2841 1.08745Z"
                  fill="white"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
