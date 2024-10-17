import React from "react";

export default function TeamPerformance() {
  return (
    <>
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
          <h4 className="text-base">My Downline Team Performance Task Bar</h4>

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
    </>
  );
}
