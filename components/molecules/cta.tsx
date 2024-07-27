import Link from "next/link";
import React from "react";

export default function CTA () {
  return (
    <main className="bg-[var(--btn-color)] text-white w-full py-[50px] max-sm:px-2 md:p-[50px]">
      <div className="mx-auto space-y-4 text-center md:w-[90%]">
        <h2 className=" font-extrabold text-2xl md:text-5xl">
          A Tool Just For Every Business
        </h2>
        <p className="mx-auto text-base max-sm:px-2 md:w-[70%]">
          We realized how hard employee resource management can be so we
          designed a tool to help mitigate lapses in your organization structure
          and ensure employee engagement
        </p>
        <div className="pt-4">
          <Link
            href="/mance-web/waitlist"
            className="group w-44 text-[var(--btn-color)] hover:text-white bg-white hover:bg-[var(--btn-hover-backgroundColor)] text-base font-medium rounded-md px-4 py-1.5 inline-flex items-center justify-center gap-2 shadow-lg"
          >
            Join Waitlist
            <svg
              width="15"
              height="12"
              className="fill-[var(--btn-color)] group-hover:fill-white group-hover:translate-x-2 transition-all ease-linear"
              viewBox="0 0 15 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.5 5.75013C0.5 5.42785 0.739489 5.1615 1.05021 5.11935L1.13659 5.11354L13.8684 5.11354C14.22 5.11354 14.505 5.39855 14.505 5.75013C14.505 6.07241 14.2655 6.33875 13.9548 6.38091L13.8684 6.38672L1.13659 6.38672C0.785012 6.38672 0.5 6.10171 0.5 5.75013Z" />
              <path d="M8.2841 1.08745C8.03496 0.839385 8.0341 0.436318 8.28216 0.18718C8.50768 -0.0393105 8.8613 -0.0606174 9.11091 0.123757L9.18244 0.185241L14.3176 5.29835C14.5448 5.52454 14.5654 5.87943 14.3796 6.12903L14.3177 6.20052L9.18248 11.3145C8.93336 11.5626 8.53029 11.5617 8.2822 11.3126C8.05667 11.0861 8.03685 10.7324 8.22228 10.4836L8.28407 10.4123L12.966 5.7492L8.2841 1.08745Z" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
