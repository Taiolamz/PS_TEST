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

const logoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    fill="none"
    viewBox="0 0 40 40"
  >
    <g
      fillRule="evenodd"
      clipPath="url(#clip0_13916_169105)"
      clipRule="evenodd"
    >
      <path
        fill="url(#paint0_linear_13916_169105)"
        d="M26.216 24.94l-.554-.323-2.188-1.263-3.075-1.773-3.07 1.773-.946.547-1.246.716-.554.322v-8.6l5.816-3.358 5.817 3.358v8.6zm2.583 1.488V16.083a2.076 2.076 0 00-1.067-1.849L20.4 10l-7.33 4.234A2.094 2.094 0 0012 16.084v11.92h2.444l1.403-.81.962-.555 2.316-1.336 1.274-.738.264.153 3.33 1.921.96.554 1.401.81H28.8v-1.575z"
      ></path>
      <path
        fill="var(--primary-color)"
        d="M20.664 19.823l2.22 1.284 1.824-1.052.758-.44-1.99-1.15L20.4 16.69l-3.07 1.777-.946.543-1.05.606.76.44 1.824 1.052 1.208-.7 1.274-.737.263.153z"
      ></path>
      <path
        fill="var(--primary-color)"
        d="M20.738 18.465l2.223 1.28 1.821-1.052.762-.44-1.994-1.149-3.075-1.776-3.07 1.776-.946.547-1.049.603.762.44 1.821 1.052 1.208-.696 1.274-.738.263.153z"
      ></path>
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_13916_169105"
        x1="20.399"
        x2="20.399"
        y1="7.435"
        y2="21.591"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="var(--primary-color)"></stop>
        <stop offset="1" stopColor="var(--primary-color)"></stop>
      </linearGradient>
      <clipPath id="clip0_13916_169105">
        <path
          fill="#fff"
          d="M0 0H16.799V18H0z"
          transform="translate(12 10)"
        ></path>
      </clipPath>
    </defs>
  </svg>
);

// export const ManceLogoLoader = () => (
//   <div className="flex flex-col gap-2 items-center">
//     <div className=" animate-ping duration-1000" role="status">
//       {logoIcon}
//     </div>
//   </div>
// );
