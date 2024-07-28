export const ManceLoader = () => (
  <div className="flex gap-2 items-center">
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-gray-500 border-e-primary align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
    <p className="text-xs font-medium">Loading...</p>
  </div>
);
