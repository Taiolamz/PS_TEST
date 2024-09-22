"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import { sideMenuList, sideMenuEmployeeList } from "./SideMenuList";
import style from "./styles/SideMenuNavBox.module.css";
import { usePathname, useRouter } from "next/navigation";
import ActionContext from "../context/ActionContext";
import { trimLongString } from "./Helper";
import { checkUserRole, processInputAsArray } from "@/utils/helpers";
import { useAppSelector } from "@/redux/store";

const logoIcon = (
  <svg
    className={style?.img}
    width="114"
    height="24"
    viewBox="0 0 114 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.4268 19.27L17.7087 18.8547L14.8725 17.2246L10.8874 14.9381L6.90676 17.2246L5.68161 17.9302L4.06603 18.8547L3.34799 19.27V8.1769L10.8874 3.84506L18.4268 8.1769V19.27ZM21.7746 21.1903V7.84643C21.7826 7.36168 21.6582 6.88387 21.4148 6.46391C21.1714 6.04394 20.818 5.69757 20.3924 5.46169L10.8874 0L1.38686 5.46169C0.961987 5.69883 0.609058 6.04536 0.365077 6.46494C0.121095 6.88452 -0.00495323 7.3617 0.000148967 7.84643V23.2222H3.16848L4.98601 22.1772L6.2336 21.4627L9.23589 19.7389L10.8874 18.7877L11.2284 18.9842L15.5456 21.4627L16.7887 22.1772L18.6063 23.2222H21.7746V21.1903Z"
      fill="var(--primary-color)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.2289 12.6685L14.1055 14.3253L16.4705 12.9677L17.4534 12.4006L14.8729 10.9179L10.8878 8.62695L6.9072 10.9179L5.68205 11.619L4.32227 12.4006L5.30508 12.9677L7.67011 14.3253L9.23633 13.4232L10.8878 12.472L11.2289 12.6685Z"
      fill="var(--primary-color)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.3275 10.9191L14.2086 12.5714L16.5692 11.2138L17.5565 10.6467L14.9715 9.16401L10.9864 6.87305L7.00583 9.16401L5.78068 9.86961L4.4209 10.6467L5.4082 11.2138L7.76874 12.5714L9.33496 11.6738L10.9864 10.7226L11.3275 10.9191Z"
      fill="var(--primary-color)"
    />
    <path
      d="M29.5166 18.4702V4.76911H33.1068L33.1831 7.38608L32.6356 7.48879C32.8242 7.04851 33.0783 6.63901 33.3895 6.27409C33.7013 5.91439 34.0677 5.60549 34.4755 5.3586C34.8966 5.10016 35.349 4.89607 35.8219 4.75125C36.2757 4.60507 36.7495 4.52975 37.2265 4.52796C37.8841 4.51798 38.5376 4.63318 39.1518 4.86736C39.7206 5.08651 40.2229 5.44798 40.6103 5.91682C41.0494 6.47106 41.3688 7.10963 41.5482 7.79247L40.9738 7.74334L41.1578 7.32802C41.385 6.91078 41.6739 6.5299 42.0149 6.19817C42.3663 5.85286 42.7598 5.55279 43.1862 5.30501C43.6104 5.05923 44.0623 4.86436 44.5325 4.72445C44.9791 4.58818 45.4432 4.51747 45.9103 4.51456C46.8491 4.47856 47.7799 4.69779 48.6029 5.1487C49.3333 5.5916 49.8964 6.26186 50.205 7.05561C50.5892 8.0522 50.7707 9.11475 50.7391 10.1817V18.4702H47.0322V10.4318C47.0507 9.90889 46.9621 9.38774 46.7719 8.89999C46.6219 8.53042 46.3579 8.21771 46.018 8.00682C45.6279 7.79521 45.1873 7.69332 44.7435 7.71208C44.3667 7.70731 43.9923 7.77243 43.6395 7.90411C43.3075 8.02579 43.0026 8.21087 42.7419 8.44894C42.5044 8.67722 42.3151 8.95055 42.1855 9.25279C42.0383 9.57249 41.9604 9.91938 41.9566 10.271V18.4702H38.2632V10.3916C38.2766 9.89102 38.1833 9.39333 37.9894 8.93125C37.8305 8.55594 37.5635 8.23585 37.222 8.01129C36.851 7.79575 36.4263 7.68893 35.9969 7.70315C35.6201 7.69838 35.2457 7.7635 34.8929 7.89518C34.5596 8.01426 34.2543 8.19964 33.9954 8.44001C33.7522 8.6745 33.5544 8.95153 33.412 9.25725C33.2688 9.57573 33.1998 9.92226 33.21 10.271V18.4702H29.5166Z"
      fill="var(--primary-color)"
    />
    <path
      d="M59.3962 18.7303C58.2927 18.7437 57.2118 18.4195 56.2996 17.8014C55.3623 17.157 54.6092 16.2814 54.1141 15.2604C53.5584 14.1154 53.2817 12.8563 53.3063 11.585C53.2806 10.315 53.5622 9.05749 54.1276 7.9186C54.6405 6.89887 55.4145 6.03166 56.3714 5.40435C57.3252 4.79693 58.4391 4.48599 59.5712 4.51118C60.2042 4.50415 60.8339 4.6038 61.4336 4.80593C61.9705 4.99232 62.4713 5.26872 62.9145 5.62317C63.3355 5.96193 63.7004 6.36428 63.9961 6.81554C64.2877 7.25017 64.5003 7.73235 64.6244 8.24014L63.8435 8.11063V4.7702H67.5145V18.4713H63.7717V15.1845L64.6019 15.1041C64.4587 15.5977 64.231 16.063 63.9288 16.4796C63.6054 16.9227 63.213 17.3116 62.7664 17.6317C62.2933 17.9747 61.7715 18.2456 61.2182 18.4356C60.6317 18.6346 60.0158 18.7342 59.3962 18.7303ZM60.4149 15.5462C61.0569 15.5593 61.6893 15.3888 62.2369 15.055C62.7632 14.7169 63.182 14.2367 63.4441 13.6706C63.7497 13.0179 63.9031 12.305 63.8929 11.585C63.9023 10.8766 63.7488 10.1755 63.4441 9.53522C63.1769 8.97231 62.7593 8.49338 62.2369 8.15082C61.6923 7.80875 61.0588 7.63328 60.4149 7.64618C59.7793 7.63216 59.154 7.80793 58.6198 8.15082C58.1007 8.4971 57.6839 8.97503 57.4126 9.53522C57.1038 10.1741 56.9501 10.8762 56.9638 11.585C56.9493 12.3054 57.1029 13.0193 57.4126 13.6706C57.679 14.234 58.0968 14.7131 58.6198 15.055C59.1571 15.3897 59.7811 15.5605 60.4149 15.5462Z"
      fill="var(--primary-color)"
    />
    <path
      d="M71.1895 18.4707V4.76955H74.7303L74.8335 7.56962L74.102 7.87776C74.3045 7.23902 74.6568 6.65735 75.1297 6.18075C75.6431 5.66025 76.2526 5.24326 76.9248 4.95265C77.6125 4.64904 78.358 4.49671 79.1103 4.50607C80.0227 4.47397 80.9269 4.68849 81.7266 5.12682C82.4471 5.56342 83.0049 6.22192 83.3153 7.00246C83.6955 7.98912 83.8755 9.04098 83.8448 10.0973V18.4707H80.1514V10.3652C80.1686 9.83516 80.0801 9.30698 79.8912 8.81111C79.7391 8.42356 79.4589 8.0991 79.0968 7.89115C78.692 7.68333 78.2349 7.59795 77.7819 7.64553C77.3878 7.6431 76.9961 7.70806 76.6241 7.83756C76.2901 7.96152 75.9848 8.1514 75.7265 8.39579C75.4768 8.63276 75.2742 8.91459 75.1297 9.22643C74.9795 9.54176 74.9028 9.88676 74.9053 10.2357V18.4707H71.2119H71.1895Z"
      fill="var(--primary-color)"
    />
    <path
      d="M93.3451 18.7293C92.1214 18.7536 90.9146 18.4428 89.8565 17.8308C88.7983 17.2189 87.9295 16.3293 87.345 15.2593C86.7343 14.139 86.4251 12.8806 86.4474 11.6063C86.4288 10.3381 86.7378 9.08634 87.345 7.97111C87.9257 6.89697 88.7933 6.0033 89.8521 5.38865C90.9108 4.774 92.1196 4.46225 93.3451 4.48778C94.5076 4.47362 95.6602 4.7018 96.7288 5.15765C97.6823 5.5532 98.5104 6.19826 99.1253 7.02436L97.0923 9.45823C96.8401 9.11721 96.5375 8.81609 96.1948 8.56506C95.8333 8.29937 95.436 8.08588 95.0145 7.93092C94.5935 7.77644 94.1483 7.69781 93.6996 7.6987C93.0343 7.68432 92.3788 7.85941 91.8103 8.20333C91.264 8.54162 90.8192 9.01976 90.5223 9.58774C90.2074 10.2133 90.0532 10.9069 90.0735 11.6063C90.0596 12.2973 90.225 12.9802 90.5537 13.5891C90.8643 14.1595 91.3171 14.6409 91.8686 14.9869C92.4264 15.3431 93.0773 15.5279 93.74 15.5183C94.1738 15.522 94.6055 15.4572 95.019 15.3263C95.4205 15.19 95.7977 14.991 96.1364 14.7368C96.5016 14.4706 96.8292 14.1566 97.1103 13.8035L99.1163 16.2418C98.4599 17.0271 97.6201 17.6404 96.6705 18.0281C95.624 18.4923 94.4908 18.7313 93.3451 18.7293Z"
      fill="var(--primary-color)"
    />
    <path
      d="M108.02 18.7295C106.663 18.7674 105.319 18.46 104.115 17.8363C103.034 17.2637 102.133 16.4043 101.513 15.3533C100.873 14.2523 100.549 12.9983 100.575 11.7271C100.562 10.7354 100.738 9.75032 101.095 8.8243C101.423 7.97145 101.919 7.1925 102.554 6.53334C103.187 5.88076 103.952 5.36802 104.798 5.02836C105.685 4.67059 106.636 4.49148 107.593 4.5014C108.487 4.4913 109.372 4.66303 110.196 5.00603C110.979 5.33031 111.684 5.81582 112.265 6.43063C112.856 7.05319 113.314 7.78847 113.611 8.59208C113.913 9.46123 114.041 10.3805 113.988 11.2984V12.4371H102.917L102.32 10.1819H110.937L110.519 10.6508V10.0792C110.492 9.62303 110.336 9.18368 110.071 8.81091C109.811 8.43032 109.457 8.12272 109.043 7.91774C108.605 7.70676 108.125 7.59975 107.638 7.60514C106.964 7.58446 106.296 7.73834 105.7 8.05172C105.168 8.34475 104.744 8.79825 104.488 9.3468C104.192 9.99701 104.05 10.7056 104.071 11.4189C104.052 12.1696 104.236 12.9116 104.605 13.567C104.959 14.1732 105.483 14.6636 106.112 14.9782C106.829 15.331 107.62 15.5043 108.419 15.4828C108.987 15.4896 109.551 15.3943 110.084 15.2015C110.671 14.9607 111.215 14.6274 111.695 14.2145L113.468 16.6752C112.966 17.1243 112.406 17.5043 111.803 17.8051C111.205 18.1002 110.576 18.3293 109.927 18.4883C109.303 18.6451 108.663 18.7261 108.02 18.7295Z"
      fill="var(--primary-color)"
    />
  </svg>
);

const logoIconCollapse = (
  <svg
    className={style?.img}
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
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
        <stop stopColor="#162238"></stop>
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

const collapseIcon = (
  <svg
    className={style?.img}
    width="20"
    height="15"
    viewBox="0 0 20 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_13760_88399)">
      <path
        d="M18.75 7.15458L1.96883 7.15458L3.56152 5.56189L3.20365 5.20402L0.999998 7.40767L3.20365 9.61133L3.56152 9.25346L1.96883 7.66076L18.75 7.66076V7.15458Z"
        fill="var(--primary-color)"
        stroke="var(--primary-color)"
        strokeLinejoin="round"
      />
      <path
        d="M4 12.6113L18.5 12.6113"
        stroke="var(--primary-color)"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M4 1.61133L18.5 1.61133"
        stroke="var(--primary-color)"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_13760_88399">
        <rect
          width="20"
          height="14"
          fill="white"
          transform="matrix(1 0 0 -1 0 14.6113)"
        />
      </clipPath>
    </defs>
  </svg>
);

const borderIcon = (
  <svg
    className={style.img}
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22.9724C11.3 22.9724 10.59 22.7024 10.06 22.1724L8.35001 20.4824C7.92001 20.0624 7.35999 19.8324 6.75999 19.8324H6C3.93 19.8324 2.25 18.1624 2.25 16.1124V5.20239C2.25 3.15239 3.93 1.48242 6 1.48242H18C20.07 1.48242 21.75 3.15239 21.75 5.20239V16.1124C21.75 18.1624 20.07 19.8324 18 19.8324H17.24C16.64 19.8324 16.07 20.0624 15.65 20.4824L13.94 22.1724C13.41 22.7024 12.7 22.9724 12 22.9724ZM6 2.97241C4.76 2.97241 3.75 3.97238 3.75 5.19238V16.1024C3.75 17.3324 4.76 18.3224 6 18.3224H6.75999C7.75999 18.3224 8.7 18.7124 9.41 19.4124L11.12 21.1024C11.61 21.5824 12.4 21.5824 12.89 21.1024L14.6 19.4124C15.31 18.7124 16.25 18.3224 17.25 18.3224H18C19.24 18.3224 20.25 17.3224 20.25 16.1024V5.19238C20.25 3.96238 19.24 2.97241 18 2.97241H6Z"
      fill="white"
    />
    <path
      d="M10.3802 14.7327H7.70023C7.26023 14.7327 6.85023 14.5226 6.59023 14.1626C6.34023 13.8226 6.28022 13.4027 6.40022 13.0027C6.75022 11.9327 7.61022 11.3526 8.37022 10.8326C9.17022 10.2926 9.62022 9.95268 9.62022 9.37268C9.62022 8.85268 9.20022 8.43262 8.68022 8.43262C8.16022 8.43262 7.74023 8.85268 7.74023 9.37268C7.74023 9.78268 7.40023 10.1227 6.99023 10.1227C6.58023 10.1227 6.24023 9.78268 6.24023 9.37268C6.24023 8.03268 7.33022 6.93262 8.68022 6.93262C10.0302 6.93262 11.1202 8.02268 11.1202 9.37268C11.1202 10.7827 10.0602 11.5026 9.21024 12.0826C8.68024 12.4426 8.18022 12.7827 7.93022 13.2327H10.3702C10.7802 13.2327 11.1202 13.5727 11.1202 13.9827C11.1202 14.3927 10.7902 14.7327 10.3802 14.7327Z"
      fill="white"
    />
    <path
      d="M16.0399 14.7326C15.6299 14.7326 15.2899 14.3926 15.2899 13.9826V13.2925H13.3299C13.3299 13.2925 13.3299 13.2925 13.3199 13.2925C12.8299 13.2925 12.3799 13.0326 12.1299 12.6126C11.8799 12.1826 11.8799 11.6526 12.1299 11.2326C12.8099 10.0626 13.5999 8.73257 14.3199 7.57257C14.6399 7.06257 15.2499 6.83261 15.8199 6.99261C16.3899 7.16261 16.7899 7.68265 16.7799 8.28265V11.8025H16.9999C17.4099 11.8025 17.7499 12.1425 17.7499 12.5525C17.7499 12.9625 17.4099 13.3025 16.9999 13.3025H16.7899V13.9926C16.7899 14.4026 16.4599 14.7326 16.0399 14.7326ZM15.2899 8.86261C14.6999 9.82261 14.0899 10.8525 13.5399 11.7925H15.2899V8.86261Z"
      fill="white"
    />
  </svg>
);

const dropIcon = (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 14.7222C9.97505 14.7222 9.4501 14.4972 9.05264 14.0555L4.16311 8.6222C3.94563 8.38053 3.94563 7.98053 4.16311 7.73887C4.38059 7.4972 4.74055 7.4972 4.95803 7.73887L9.84756 13.1722C10.2075 13.5722 10.7925 13.5722 11.1524 13.1722L16.042 7.73887C16.2594 7.4972 16.6194 7.4972 16.8369 7.73887C17.0544 7.98053 17.0544 8.38053 16.8369 8.6222L11.9474 14.0555C11.5499 14.4972 11.0249 14.7222 10.5 14.7222Z"
      fill="#5A5B5F"
    />
  </svg>
);

const SideMenuNavBox = () => {
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const actionCtx = useContext(ActionContext);

  // console.log(pathname);

  const getListToUse = () => {
    const val =
      checkUserRole(user?.role as string) === "ADMIN"
        ? sideMenuList
        : sideMenuEmployeeList;
    return val;
  };

  return (
    <div
      // onClick={() => {
      //   console.log(user);
      // }}
      className={style?.side_menu_nav_box_index_wrap}
    >
      {/* logo box start */}
      <div
        className={`${style?.logo_collapse_box} ${
          actionCtx?.collapseSideNav && style?.logo_collapse_box_closed
        }`}
      >
        <figure
          className={`${style.img_box} ${style.logo_box} ${
            actionCtx?.collapseSideNav && style.logo_box_closed
          }`}
        >
          {actionCtx.collapseSideNav ? logoIconCollapse : logoIcon}
        </figure>
        <figure
          onClick={() => {
            actionCtx.setCollapseSideNav && actionCtx.setCollapseSideNav();
          }}
          className={`${style.img_box} ${style.collapse_box} ${
            actionCtx?.collapseSideNav && style.collapse_box_right
          }`}
        >
          {collapseIcon}
        </figure>
      </div>
      {/* logo box end */}
      {/* nav link list box start */}
      <div className={style?.nav_link_list_box}>
        {getListToUse()?.map((chi: any, idx: any) => {
          return (
            <div className={style?.nav_list_fragment} key={idx}>
              <div
                onClick={() => {
                  // console.log(chi);

                  chi?.collapseNum === actionCtx.showNavVal
                    ? actionCtx?.setShowNavVal("")
                    : actionCtx?.setShowNavVal(chi?.collapseNum);
                }}
                className={`${style.title_collapse_box} ${
                  actionCtx.collapseSideNav && style.title_collapse_box_closed
                }`}
              >
                {chi?.title && (
                  <p className={`${style?.title} `}>
                    {trimLongString(
                      chi?.title,
                      actionCtx.collapseSideNav ? 4 : 20
                    )}
                  </p>
                )}
                {actionCtx.collapseSideNav && (
                  <p className={style.title_closed}>{chi?.title}</p>
                )}
                {/* collapse box start */}
                {chi?.collapse && (
                  <div
                    className={`${style.drop_icon} ${
                      chi?.collapseNum !== actionCtx?.showNavVal &&
                      !actionCtx.collapseSideNav &&
                      style.drop_icon_right
                    }`}
                  >
                    <figure className={style.img_box}>{dropIcon}</figure>
                  </div>
                )}
                {/* collapse box end */}
              </div>
              {/* nav link start */}
              <div className={`${style.nav_link_box_wrap} `}>
                <div
                  className={`${style.nav_link_box} ${
                    !chi?.collapse && style.nav_link_box_show
                  } ${
                    actionCtx?.showNavVal === chi?.collapseNum &&
                    chi?.collapse &&
                    style.nav_link_box_show
                  }`}
                >
                  {chi?.navLinks?.map((child: any, i: any) => {
                    if (
                      !processInputAsArray(
                        user?.organization?.hierarchy
                      )?.includes("subsidiary") &&
                      child?.name === "Subsidiaries"
                    ) {
                      return <React.Fragment key={i}></React.Fragment>;
                    }
                    if (
                      !processInputAsArray(
                        user?.organization?.hierarchy
                      )?.includes("branch") &&
                      child?.name === "Branches"
                    ) {
                      return <React.Fragment key={i}></React.Fragment>;
                    }
                    if (
                      !processInputAsArray(
                        user?.organization?.hierarchy
                      )?.includes("department") &&
                      child?.name === "Departments"
                    ) {
                      return <React.Fragment key={i}></React.Fragment>;
                    }
                    if (
                      !processInputAsArray(
                        user?.organization?.hierarchy
                      )?.includes("unit") &&
                      child?.name === "Units"
                    ) {
                      return <React.Fragment key={i}></React.Fragment>;
                    }
                    return (
                      <div
                        key={i}
                        className={`${style.nav_link} ${
                          pathname === child?.link && style.nav_link_active
                        } ${
                          child?.relatedLink?.includes(pathname) &&
                          style.nav_link_active
                        }  ${
                          actionCtx.collapseSideNav && style.nav_link_closed
                        }`}
                        onClick={() => {
                          if (child?.link) {
                            router?.push(child?.link);
                          }
                        }}
                      >
                        <figure className={style.icon_box}>
                          {child?.icon}
                        </figure>
                        <p className={style.name}>{child?.name}</p>
                        {actionCtx.collapseSideNav && (
                          <p className={style.name_closed}>{child?.name}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* nav link end */}
            </div>
          );
        })}
      </div>
      {/* nav link list box end */}
      {/* support list box start */}
      <div
        className={`${style?.support_wrap_box} ${
          actionCtx.collapseSideNav && style?.support_wrap_box_closed
        }`}
      >
        <div className={style.img_title_box}>
          <div className={style.num_box}>
            <figure className={style.before}>{borderIcon}</figure>
            <div className={style.num}>
              <span>09</span>
            </div>
          </div>
          <p className={style.title}>Request Support</p>
        </div>
        {/* text start */}
        <p className={style.text}>
          Get in touch with one of our experts or visit our <span>FAQ</span>
        </p>
        {/* text end */}
        {/* button start */}
        <Button className={style?.btn_support} value={`Request`}>
          Request
        </Button>
        {/* button end */}
      </div>
      {/* support list box end */}
    </div>
  );
};

export default SideMenuNavBox;
