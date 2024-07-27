"use client";

import Image from "next/image";
import React, { useState } from "react";

const featureData = [
  {
    id: 1,
    title: "Onboard Company Staff",
    header: "Automatically Onboard New Employees",
    message:
      "When a new staff comes into your work environment, the system automatically conducts a quick onboarding by taking the staff through preset entry exercisesand notifies employee about their induction exercise date",
    image: "/assets-website/svg/KPICreation.svg",
  },
  {
    id: 2,
    title: "Manage Mission Plan",
    header: "Access Mission Plan and Track KPI",
    message:
      "Allow employees set their mission plan pillars, create KPI deliverables and submit, then afford line managers accessment authority to review, give approval grading period, award grades for successful accomplishment or shortfal on mission plan and KPI objectives",
    image: "/assets-website/svg/KPIflow.svg",
  },
  {
    id: 3,
    title: "Set Deadlines",
    header: "Plan Events and Schedule Deadlines",
    message:
      "Pre-plan company events, determine financial seasons, set project deadlines to allow the system automatically chart a company schedule and send off notifications to entire organization on time sensitive subjects or periodic developments",
    image: "/assets-website/svg/lmreport.svg",
  },
];

export default function Features() {
  const [active, setAactive] = useState(1);
  const handleActive = (id: number) => {
    setAactive(id);
  };
  const activeTab = "text-[var(--btn-color)] border-[var(--btn-color)]";
  return (
    <section className="text-center md:max-w-[70%] mx-auto mb-24 pt-16">
      <h2 className="text-[var(--btn-color)] text-[28px]">Product Features</h2>
      <div className="flex mt-6 justify-center max-sm:px-1">
        {featureData.map((data) => (
          <span
            onClick={() => handleActive(data?.id)}
            key={data.id}
            className={`cursor-pointer max-sm:text-sm p-4 md:min-w-56 text-center transition-all ease-linear border-b-[5px] ${
              active === data.id ? activeTab : " border-transparent"
            }`}
          >
            <span>{data.title}</span>
          </span>
        ))}
      </div>
      <div className="mt-14">
        {featureData.map((data) => (
          <div
            key={data.id}
            className={`text-center space-y-10 transition-all ease-linear ${
              active !== data.id && "opacity-0 hidden"
            }`}
          >
            <div className="space-y-4">
              <h2 className="md:text-4xl text-3xl pb-1 font-extrabold mx-auto ">
                {data.header}
              </h2>
              <p className="text-[var(--text-color)] mx-auto max-sm:px-4 md:w-[80%]">
                {data.message}
              </p>
            </div>
            <div className="md:w-[60%] w-[70%] mx-auto">
              <Image
              width={700}
              height={700}
                src={data?.image}
                alt={data.header}
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="700"
                style={{ boxShadow: "#95b5c9 0px 22px 70px 4px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
