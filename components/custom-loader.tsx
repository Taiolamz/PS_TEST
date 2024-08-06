export const ManceLoader = () => (
  <div className="flex gap-2 items-center">
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-gray-500 border-e-primary align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
    <p className="text-xs font-medium">Loading...</p>
  </div>
);

export const PageLoader = () => (
  <div className="flex flex-col gap-2 items-center">
    <div
      className="inline-block h-[80px] w-[80px] animate-spin rounded-full border-4 border-solid border-[var(--primary-color)] border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>

    {/* <p className="text-xs font-medium">Fetching data...</p> */}
  </div>
);
