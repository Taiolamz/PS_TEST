"use client";
import React from "react";
// import { DashboardLayout } from "./_components/dashboard-layout";
import Link from "next/link";
import Routes from "@/lib/routes/routes";
import DashboardLayout from "../../_layout/DashboardLayout";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import {
  AnnouncementIcon,
  CreateListIcon,
  HelpIcon,
  WarningIcon,
} from "@/public/assets/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import {
  AchievementProgress,
  Legend,
  ReusableProgress,
} from "@/components/fragment";

const OverView = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <DashboardLayout headerTitle={`Welcome ${user?.name?.split(" ")[0]}`}>
      <div className="h-full flex flex-col overflow-y-hidden">
        {/* Employee checklist to complete profile */}
        <article className="bg-[#fffcc2] pl-6 md:pr-9 py-2.5 flex justify-between items-center w-full">
          <div className="inline-flex items-center">
            <Image src={WarningIcon} alt="warning icon" />
            <h4 className="text-[var(--text-color3)] font-medium ml-1.5">
              Complete your profile setup
            </h4>
            <Link
              href="#"
              className=" max-md:hidden text-xs font-light ml-3 underline underline-offset-1"
            >
              complete your employee profile setup
            </Link>
          </div>
          <Link
            href="#"
            className="font-medium text-sm text-[var(--primary-color)] inline-flex gap-x-1 items-center group"
          >
            Proceed
            {ArrowRight}
          </Link>
        </article>
        {/* Main Content */}
        <div className="flex-1 relative">
          <div className="h-full pb-10 pl-5 w-[calc(100%-370px)] absolute top-0 left-0 space-y-6 custom-scrollbar">
            {/* Quick access */}
            <section className="mt-9">
              <h3 className="text-[var(--footer-link-color)] font-medium text-lg mb-2.5">
                Quick Access
              </h3>
              <section className="bg-white rounded-lg px-[15px] py-[23px] grid gap-3 grid-cols-1 md:grid-cols-3">
                <Link
                  href={"#"}
                  className="border border-[var(--input-border2)] px-2.5 py-3.5 text-sm rounded-lg inline-flex gap-x-1 items-center text-[var(--text-color4)] font-medium shadow-sm"
                >
                  <Image
                    className="size-11"
                    src={AnnouncementIcon}
                    alt="announcement icon"
                  />
                  View Announcement
                </Link>
                <Link
                  href={"#"}
                  className="border border-[var(--input-border2)] px-2.5 py-3.5 text-sm rounded-lg inline-flex gap-x-1 items-center text-[var(--text-color4)] font-medium shadow-sm"
                >
                  <Image
                    className="size-11"
                    src={CreateListIcon}
                    alt="create todo icon"
                  />
                  Create To Do
                </Link>
                <Link
                  href={"#"}
                  className="border border-[var(--input-border2)] px-2.5 py-3.5 text-sm rounded-lg inline-flex gap-x-1 items-center text-[var(--text-color4)] font-medium shadow-sm"
                >
                  <Image className="size-11" src={HelpIcon} alt="help icon" />
                  Help
                </Link>
              </section>
            </section>

            {/* My mission plan */}
            <section className="bg-white rounded-[5px] px-5 pt-3 pb-8 space-y-5">
              {/* Header/Title for card */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-base"> My Mission Plan 2023</p>
                  <span className="text-xs text-[var(--text-color2)]">
                    March 23 - March 31, 2024
                  </span>
                </div>
                <div className="inline-flex space-x-2 text-xs text-[var(--text-color)]">
                  <span className="inline-flex items-center gap-x-1.5">
                    <span className="block bg-[var(--primary-color)] size-1.5 rounded-[1px]" />
                    Measure of Success
                  </span>
                  <span className="inline-flex items-center gap-x-1.5">
                    <span className="block bg-[var(--primary-accent-color)] size-1.5 rounded-[1px]" />
                    Task Performance
                  </span>
                </div>
              </div>
              {/* content */}
              <main className="w-full space-y-3">
                <div className="flex gap-x-3 font-medium text-xs text-[var(--text-color5)]">
                  <div
                    className={`block bg-[var(--primary-color)] rounded-tl-sm rounded-bl-sm h-4`}
                    style={{ width: `${50}%` }}
                  />
                  {50}%
                </div>
                <div className="flex gap-x-3 font-medium text-xs text-[var(--text-color5)]">
                  <div
                    className={`block bg-[var(--primary-accent-color)] rounded-tl-sm rounded-bl-sm h-4`}
                    style={{ width: `${80}%` }}
                  />
                  {80}%
                </div>
              </main>
            </section>

            {/* My Team Performance Task Bar */}
            <section className="bg-white rounded-[5px] px-5 pt-3 pb-8 space-y-5">
              {/* Header/Title for card */}
              <div className="flex justify-between items-center">
                <h4 className="text-base">My Team Performance Task Bar</h4>

                <p className="font-medium">Total Task: 0 </p>
              </div>
              {/* content */}
              <main className="w-full pt-12">
                {/* Progree bar */}
                <div className="flex h-1.5 w-full rounded bg-[var(--input-bg)] -space-x-1">
                  {/* in progress */}
                  <span
                    className="block bg-[var(--bg-yellow-400)] h-full rounded"
                    style={{ width: `${20}%` }}
                  />
                  <span
                    className="block bg-[rgb(var(--bg-green-100))] h-full rounded"
                    style={{ width: `${25}%` }}
                  />
                  <span
                    className="block bg-[rgb(var(--bg-blue-100))] h-full rounded"
                    style={{ width: `${30}%` }}
                  />
                  <span
                    className="block bg-[var(--bg-red-100)] h-full rounded"
                    style={{ width: `${25}%` }}
                  />
                </div>
                {/* data */}
                <div className="mt-6 flex justify-between items-start text-xs text-[var(--text-color)]">
                  <div className="inline-flex gap-x-2">
                    <span className="space-y-2">
                      <div className="inline-flex items-center gap-x-1.5">
                        <span className="block bg-[var(--bg-yellow-400)] size-1.5 rounded-[1px]" />
                        In Progress
                      </div>
                      <div className="text-center text-sm text-[var(--bg-yellow-400)]">
                        24
                      </div>
                    </span>
                    <span className="space-y-2">
                      <div className="inline-flex items-center gap-x-1.5">
                        <span className="block bg-[rgb(var(--bg-green-100))] size-1.5 rounded-[1px]" />
                        Completed
                      </div>
                      <div className="text-center text-sm text-[rgb(var(--bg-green-100))]">
                        13
                      </div>
                    </span>
                    <span className="space-y-2">
                      <div className="inline-flex items-center gap-x-1.5">
                        <span className="block bg-[rgb(var(--bg-blue-100))] size-1.5 rounded-[1px]" />
                        Under Review
                      </div>
                      <div className="text-center text-sm text-[rgb(var(--bg-blue-100))]">
                        17
                      </div>
                    </span>
                    <span className="space-y-2">
                      <div className="inline-flex items-center gap-x-1.5">
                        <span className="block bg-[var(--bg-red-100)] size-1.5 rounded-[1px]" />
                        Overdue
                      </div>
                      <div className="text-center text-sm text-[var(--bg-red-100)]">
                        22
                      </div>
                    </span>
                  </div>
                  {/* Array of Initials */}
                  <div className="inline-flex -space-x-3.5">
                    <span className="size-8 rounded-full border border-white bg-[var(--primary-color)] place-content-center grid text-white font-medium text-sm">
                      BD
                    </span>
                    <span className="size-8 rounded-full border border-white bg-[var(--primary-color)] place-content-center grid text-white font-medium text-sm">
                      OI
                    </span>
                    <span className="size-8 rounded-full border border-white bg-[var(--primary-color)] place-content-center grid text-white font-medium text-sm">
                      AA
                    </span>
                    <span className="size-8 rounded-full border border-white bg-[var(--primary-color)] place-content-center grid text-white font-medium text-sm">
                      CU
                    </span>
                  </div>
                </div>
              </main>
            </section>

            {/* My Downline Team Performance Task Bar */}
            <section className="bg-white rounded-[5px] px-5 pt-3 pb-8 space-y-5">
              {/* Header/Title for card */}
              <div className="flex justify-between items-center">
                <h4 className="text-base">
                  My Downline Team Performance Task Bar
                </h4>

                <p className="font-medium">Total Task: 50 </p>
              </div>
              {/* content */}
              <main className="w-full pt-12">
                {/* Progree bar */}
                <div className="flex h-1.5 w-full rounded bg-[var(--input-bg)] -space-x-1">
                  {/* in progress */}
                  <span
                    className="block bg-[var(--bg-yellow-400)] h-full rounded"
                    style={{ width: `${2}%` }}
                  />
                  <span
                    className="block bg-[rgb(var(--bg-green-100))] h-full rounded"
                    style={{ width: `${2}%` }}
                  />
                  <span
                    className="block bg-[rgb(var(--bg-blue-100))] h-full rounded"
                    style={{ width: `${2}%` }}
                  />
                  <span
                    className="block bg-[var(--bg-red-100)] h-full rounded"
                    style={{ width: `${2}%` }}
                  />
                </div>
                {/* data */}
                <div className="mt-6 flex justify-between items-start text-xs text-[var(--text-color)]">
                  <div className="inline-flex gap-x-2">
                    <span className="space-y-2">
                      <div className="inline-flex items-center gap-x-1.5">
                        <span className="block bg-[var(--bg-yellow-400)] size-1.5 rounded-[1px]" />
                        In Progress
                      </div>
                      <div className="text-center text-sm text-[var(--bg-yellow-400)]">
                        24
                      </div>
                    </span>
                    <span className="space-y-2">
                      <div className="inline-flex items-center gap-x-1.5">
                        <span className="block bg-[rgb(var(--bg-green-100))] size-1.5 rounded-[1px]" />
                        Completed
                      </div>
                      <div className="text-center text-sm text-[rgb(var(--bg-green-100))]">
                        13
                      </div>
                    </span>
                    <span className="space-y-2">
                      <div className="inline-flex items-center gap-x-1.5">
                        <span className="block bg-[rgb(var(--bg-blue-100))] size-1.5 rounded-[1px]" />
                        Under Review
                      </div>
                      <div className="text-center text-sm text-[rgb(var(--bg-blue-100))]">
                        17
                      </div>
                    </span>
                    <span className="space-y-2">
                      <div className="inline-flex items-center gap-x-1.5">
                        <span className="block bg-[var(--bg-red-100)] size-1.5 rounded-[1px]" />
                        Overdue
                      </div>
                      <div className="text-center text-sm text-[var(--bg-red-100)]">
                        22
                      </div>
                    </span>
                  </div>
                  {/* Array of Initials */}
                  <div className="inline-flex -space-x-3.5">
                    <span className="size-8 rounded-full border border-white bg-[var(--primary-color)] place-content-center grid text-white font-medium text-sm">
                      BD
                    </span>
                    <span className="size-8 rounded-full border border-white bg-[var(--primary-color)] place-content-center grid text-white font-medium text-sm">
                      OI
                    </span>
                    <span className="size-8 rounded-full border border-white bg-[var(--primary-color)] place-content-center grid text-white font-medium text-sm">
                      AA
                    </span>
                    <span className="size-8 rounded-full border border-white bg-[var(--primary-color)] place-content-center grid text-white font-medium text-sm">
                      CU
                    </span>
                  </div>
                </div>
              </main>
            </section>

            {/* Specified task progress */}
            <section className="bg-white rounded-[5px] px-5 pt-3 pb-8 space-y-5">
              {/* header */}
              <header className="flex mb-3 justify-between items-center">
                <h3 className="">Specified Task Progress</h3>
                <Link
                  href={"#"}
                  className="inline-flex items-center text-[var(--primary-color)] text-[13px] h-fit"
                >
                  See all <ChevronRightIcon className="size-4" />
                </Link>
              </header>
              <div className="text-[var(--text-color)] mb-5 inline-flex gap-x-4">
                <p className="text-sm">
                  Total Task: <span className="text-black">{20}</span>
                </p>
                <div className="inline-flex space-x-2 text-xs text-[var(--text-color)]">
                  <span className="inline-flex items-center gap-x-1.5">
                    <span className="block bg-[var(--primary-color)] size-1.5 rounded-[1px]" />
                    Specified Task
                  </span>
                  <span className="inline-flex items-center gap-x-1.5">
                    <span className="block bg-[var(--primary-accent-color)] size-1.5 rounded-[1px]" />
                    Implied Task
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="space-y-6">
                <AchievementProgress
                  title={
                    <span className="inline-flex items-center gap-x-2 !text-black mb-3">
                      Task 1: Complete Hifi Design
                      <span className="text-xs font-light text-[var(--text-color)]">
                        10/12/2024
                      </span>
                      <Legend
                        title="In Review"
                        barWidth={6}
                        barHeight={6}
                        color="blue"
                        rounded
                      />
                    </span>
                  }
                  color="base"
                  progress_value={50}
                  target="Revenue (150,000,000$)"
                  targetColor="var(--text-color)"
                  targetClassName="!h-4 pl-2 mt-3 bg-[var(--primary-accent-color)]"
                />

                <AchievementProgress
                  title={
                    <span className="inline-flex items-center gap-x-2 !text-black mb-3">
                      Task 2: Complete Hifi Design
                      <span className="text-xs font-light text-[var(--text-color)]">
                        10/12/2024
                      </span>
                      <Legend
                        title="In Progress"
                        barWidth={6}
                        barHeight={6}
                        color="yellow"
                        rounded
                      />
                    </span>
                  }
                  color="base"
                  progress_value={65}
                  target="Revenue (150,000,000$)"
                  targetColor="var(--text-color)"
                  targetClassName="!h-4 pl-2 mt-3 bg-[var(--primary-accent-color)]"
                />

                <AchievementProgress
                  title={
                    <span className="inline-flex items-center gap-x-2 !text-black mb-3">
                      Task 3: Complete Hifi Design
                      <span className="text-xs font-light text-[var(--text-color)]">
                        10/12/2024
                      </span>
                      <Legend
                        title="Overdue"
                        barWidth={6}
                        barHeight={6}
                        color="red"
                        rounded
                      />
                    </span>
                  }
                  color="base"
                  progress_value={75}
                  target="Revenue (150,000,000$)"
                  targetColor="var(--text-color)"
                  targetClassName="!h-4 pl-2 mt-3 bg-[var(--primary-accent-color)]"
                />
              </div>
            </section>

            {/* Recent Activity */}
            <section className="mt-9">
              <header className="flex justify-between items-center">
                <h3 className="text-[var(--footer-link-color)] font-medium text-lg mb-2.5">
                  Recent Activity
                </h3>
                <Link
                  href={"#"}
                  className="inline-flex items-center text-[var(--primary-color)] text-[13px] h-fit"
                >
                  See all <ChevronRightIcon className="size-4" />
                </Link>
              </header>
              <section className="bg-white rounded-sm px-[15px] py-4 ">
                <div className="text-[var(--text-color2)] min-h-28 grid place-content-center text-center w-full">
                  You have no recent activity
                </div>
              </section>
            </section>
          </div>

          {/* Right Side Content --Todo, Mission and Vision-- */}
          <div className="bg-[var(--btn-solid-color)] absolute top-0 right-0 w-[350px] h-full z-10 custom-scrollbar px-5 py-8 space-y-7">
            {/* Mission and Vision Statement */}
            {(user.organization?.mission || user.organization?.vision) && (
              <section className="custom-shadow rounded w-full px-3 py-6 space-y-7">
                {user.organization?.mission && (
                  <div className="flex space-x-2.5 text-[var(--primary-color)]">
                    {MissionIcon}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-[var(--text-color5)]">
                        Mission Statement
                      </h4>
                      <p className="text-[var(--text-color2)] text-xs">
                        {user?.organization?.mission}
                      </p>
                    </div>
                  </div>
                )}
                {user.organization?.vision && (
                  <div className="flex space-x-2.5  text-[var(--primary-color)]">
                    {VisionIcon}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-[var(--text-color5)]">
                        Vision Statement
                      </h4>
                      <p className="text-[var(--text-color2)] text-xs">
                        {user?.organization?.vision}
                      </p>
                    </div>
                  </div>
                )}
              </section>
            )}
            {/* Todo Action */}
            <section className="custom-shadow rounded w-full min-h-[500px] px-3 py-5 flex flex-col">
              <div className="bg-[var(--primary-accent-color)] rounded-[5px] py-[5px] px-[7px] cursor-pointer mb-0.5">
                <p className="bg-white py-[5.5px] rounded-sm flex justify-center items-center gap-x-2.5 text-[var(--primary-color)] font-medium">
                  {TodoIcon} To-do List
                </p>
              </div>
              {/* Empty state for TODO content */}
              <div className="mt-0.5 h-contain flex-1 place-content-center ">
                <div className="text-center space-y-[15px]">
                  <p className="text-[var(--text-color2)]">
                    You have no to do list
                  </p>
                  <Button className="py-2 px-8">Create To Do List</Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OverView;

const ArrowRight = (
  <svg
    width="24"
    height="24"
    className="group-hover:translate-x-1 transition-all ease-linear"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 11.75C4.5 11.4278 4.73949 11.1614 5.05021 11.1193L5.13659 11.1134H17.8684C18.22 11.1134 18.505 11.3985 18.505 11.75C18.505 12.0723 18.2655 12.3387 17.9548 12.3808L17.8684 12.3866H5.13659C4.78501 12.3866 4.5 12.1016 4.5 11.75Z"
      fill="currentColor"
    />
    <path
      d="M12.2851 7.0877C12.0359 6.83963 12.0351 6.43656 12.2831 6.18742C12.5087 5.96093 12.8623 5.93963 13.1119 6.124L13.1834 6.18548L18.3186 11.2986C18.5458 11.5248 18.5664 11.8797 18.3806 12.1293L18.3186 12.2008L13.1835 17.3147C12.9343 17.5628 12.5313 17.562 12.2832 17.3129C12.0576 17.0864 12.0378 16.7327 12.2233 16.4839L12.285 16.4126L16.967 11.7494L12.2851 7.0877Z"
      fill="currentColor"
    />
  </svg>
);

const TodoIcon = (
  <svg
    width="22"
    height="23"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 9.75C12.5 9.55109 12.579 9.36032 12.7197 9.21967C12.8603 9.07902 13.0511 9 13.25 9H16.75C16.9489 9 17.1397 9.07902 17.2803 9.21967C17.421 9.36032 17.5 9.55109 17.5 9.75C17.5 9.94891 17.421 10.1397 17.2803 10.2803C17.1397 10.421 16.9489 10.5 16.75 10.5H13.25C13.0511 10.5 12.8603 10.421 12.7197 10.2803C12.579 10.1397 12.5 9.94891 12.5 9.75ZM13.25 14.5C13.0511 14.5 12.8603 14.579 12.7197 14.7197C12.579 14.8603 12.5 15.0511 12.5 15.25C12.5 15.4489 12.579 15.6397 12.7197 15.7803C12.8603 15.921 13.0511 16 13.25 16H16.75C16.9489 16 17.1397 15.921 17.2803 15.7803C17.421 15.6397 17.5 15.4489 17.5 15.25C17.5 15.0511 17.421 14.8603 17.2803 14.7197C17.1397 14.579 16.9489 14.5 16.75 14.5H13.25ZM10.78 9.28C10.8537 9.21134 10.9128 9.12854 10.9538 9.03654C10.9948 8.94454 11.0168 8.84522 11.0186 8.74452C11.0204 8.64382 11.0018 8.54379 10.9641 8.4504C10.9264 8.35701 10.8703 8.27218 10.799 8.20096C10.7278 8.12974 10.643 8.0736 10.5496 8.03588C10.4562 7.99816 10.3562 7.97963 10.2555 7.98141C10.1548 7.98319 10.0555 8.00523 9.96346 8.04622C9.87146 8.08721 9.78866 8.14631 9.72 8.22L8.25 9.69L7.78 9.22C7.63783 9.08752 7.44978 9.0154 7.25548 9.01882C7.06118 9.02225 6.87579 9.10097 6.73838 9.23838C6.60097 9.37579 6.52225 9.56118 6.51883 9.75548C6.5154 9.94978 6.58752 10.1378 6.72 10.28L7.72 11.28C7.86063 11.4205 8.05125 11.4993 8.25 11.4993C8.44875 11.4993 8.63937 11.4205 8.78 11.28L10.78 9.28ZM10.78 13.72C10.9205 13.8606 10.9993 14.0512 10.9993 14.25C10.9993 14.4488 10.9205 14.6394 10.78 14.78L8.78 16.78C8.63937 16.9205 8.44875 16.9993 8.25 16.9993C8.05125 16.9993 7.86063 16.9205 7.72 16.78L6.72 15.78C6.64631 15.7113 6.58721 15.6285 6.54622 15.5365C6.50523 15.4445 6.48319 15.3452 6.48141 15.2445C6.47963 15.1438 6.49816 15.0438 6.53588 14.9504C6.5736 14.857 6.62974 14.7722 6.70096 14.701C6.77218 14.6297 6.85701 14.5736 6.9504 14.5359C7.04379 14.4982 7.14382 14.4796 7.24452 14.4814C7.34523 14.4832 7.44454 14.5052 7.53654 14.5462C7.62854 14.5872 7.71134 14.6463 7.78 14.72L8.25 15.19L9.72 13.72C9.86063 13.5795 10.0512 13.5007 10.25 13.5007C10.4488 13.5007 10.6394 13.5795 10.78 13.72ZM6.25 3.5C5.38805 3.5 4.5614 3.84241 3.9519 4.4519C3.34241 5.0614 3 5.88805 3 6.75V18.25C3 19.112 3.34241 19.9386 3.9519 20.5481C4.5614 21.1576 5.38805 21.5 6.25 21.5H17.75C18.612 21.5 19.4386 21.1576 20.0481 20.5481C20.6576 19.9386 21 19.112 21 18.25V6.75C21 5.88805 20.6576 5.0614 20.0481 4.4519C19.4386 3.84241 18.612 3.5 17.75 3.5H6.25ZM4.5 6.75C4.5 5.784 5.284 5 6.25 5H17.75C18.716 5 19.5 5.784 19.5 6.75V18.25C19.5 18.7141 19.3156 19.1592 18.9874 19.4874C18.6592 19.8156 18.2141 20 17.75 20H6.25C5.78587 20 5.34075 19.8156 5.01256 19.4874C4.68437 19.1592 4.5 18.7141 4.5 18.25V6.75Z"
      fill="currentColor"
    />
  </svg>
);

const MissionIcon = (
  <svg
    width="21"
    height="22"
    viewBox="0 0 23 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.0076 23.9999L15.6153 22.6076L17.7152 20.4742L15.6153 18.3742L17.0076 16.9486L19.1409 19.0819L21.2409 16.9486L22.6666 18.3742L20.5332 20.4742L22.6666 22.6076L21.2409 23.9999L19.1409 21.8999L17.0076 23.9999ZM3.66665 21.9999C4.12998 21.9999 4.52353 21.8379 4.84731 21.5139C5.17131 21.1901 5.33331 20.7966 5.33331 20.3332C5.33331 19.8699 5.17131 19.4763 4.84731 19.1526C4.52353 18.8286 4.12998 18.6666 3.66665 18.6666C3.20332 18.6666 2.80976 18.8286 2.48599 19.1526C2.16199 19.4763 1.99999 19.8699 1.99999 20.3332C1.99999 20.7966 2.16199 21.1901 2.48599 21.5139C2.80976 21.8379 3.20332 21.9999 3.66665 21.9999ZM3.66665 23.9999C2.64954 23.9999 1.78421 23.643 1.07066 22.9292C0.356887 22.2157 0 21.3503 0 20.3332C0 19.3161 0.356887 18.4508 1.07066 17.7372C1.78421 17.0235 2.64954 16.6666 3.66665 16.6666C4.47176 16.6666 5.19609 16.9029 5.83964 17.3756C6.48319 17.8482 6.92208 18.4735 7.1563 19.2512C8.10851 19.0837 8.8974 18.6316 9.52295 17.8949C10.1487 17.158 10.4616 16.3041 10.4616 15.3333V10.1923C10.4616 8.44185 11.0795 6.94874 12.3153 5.71297C13.5513 4.47698 15.0445 3.85898 16.7949 3.85898H18.8152L16.3819 1.42566L17.8076 0L22.6666 4.85898L17.8076 9.71795L16.3819 8.32563L18.8026 5.85897H16.7949C15.5898 5.85897 14.5663 6.27986 13.7243 7.12163C12.8825 7.96363 12.4616 8.98718 12.4616 10.1923V15.3333C12.4616 16.8444 11.9586 18.161 10.9526 19.2832C9.94662 20.4055 8.69485 21.0682 7.1973 21.2716C6.99063 22.0767 6.55863 22.7327 5.9013 23.2395C5.24397 23.7464 4.49909 23.9999 3.66665 23.9999ZM1.39233 8.38462L0 6.9923L2.09999 4.85898L0 2.75899L1.39233 1.33333L3.52565 3.46665L5.62564 1.33333L7.0513 2.75899L4.91798 4.85898L7.0513 6.9923L5.62564 8.38462L3.52565 6.28463L1.39233 8.38462Z"
      fill="currentColor"
    />
  </svg>
);

const VisionIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_16039_235299"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_16039_235299)">
      <path
        d="M11.5558 17.4808C10.1289 17.3589 8.92958 16.7775 7.95775 15.7365C6.98592 14.6955 6.5 13.45 6.5 12C6.5 10.4722 7.03475 9.17358 8.10425 8.10425C9.17358 7.03475 10.4722 6.5 12 6.5C13.45 6.5 14.6955 6.98433 15.7365 7.953C16.7775 8.9215 17.3589 10.1193 17.4808 11.5463L15.8905 11.075C15.6743 10.175 15.2088 9.4375 14.4938 8.8625C13.7789 8.2875 12.9477 8 12 8C10.9 8 9.95833 8.39167 9.175 9.175C8.39167 9.95833 8 10.9 8 12C8 12.95 8.28908 13.7833 8.86725 14.5C9.44542 15.2167 10.1813 15.6833 11.075 15.9L11.5558 17.4808ZM12.7558 21.4595C12.6298 21.4865 12.5038 21.5 12.378 21.5H12C10.6858 21.5 9.45083 21.2507 8.295 20.752C7.13917 20.2533 6.13375 19.5766 5.27875 18.7218C4.42375 17.8669 3.74692 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74942 15.7035 3.24825C16.8597 3.74692 17.8653 4.42375 18.7205 5.27875C19.5757 6.13375 20.2528 7.13917 20.7518 8.295C21.2506 9.45083 21.5 10.6858 21.5 12V12.373C21.5 12.4973 21.4865 12.6217 21.4595 12.7463L20 12.3V12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20H12.3L12.7558 21.4595ZM20.1402 21.6443L15.6058 17.1L14.5193 20.3845L12 12L20.3845 14.5192L17.1 15.6058L21.6443 20.1402L20.1402 21.6443Z"
        fill="currentColor"
      />
    </g>
  </svg>
);
