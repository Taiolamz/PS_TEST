import Routes from "@/lib/routes/routes";
import routesPath from "@/utils/routes";

export const sideMenuIcons = {
  dashboard: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
      className="img"
    >
      <path
        fill="#5A5B5F"
        fillRule="evenodd"
        d="M7.596 4.991c-2.327 0-2.327.176-2.327 2.327v.021c0 .937 0 1.614.23 1.9.224.278.89.406 2.097.406 1.208 0 1.874-.13 2.098-.407.23-.285.23-.962.23-1.9 0-2.17 0-2.347-2.328-2.347zm0 5.924c-1.426 0-2.497-.15-3.085-.88C4 9.4 4 8.534 4 7.338l.635-.02H4c0-2.43.153-3.597 3.596-3.597s3.596 1.168 3.596 3.596c0 1.217 0 2.083-.51 2.716-.589.73-1.66.88-3.086.88zM16.904 4.991c-2.327 0-2.327.176-2.327 2.327v.021c0 .937 0 1.614.23 1.9.223.278.89.406 2.097.406 1.207 0 1.873-.13 2.097-.407.23-.285.23-.962.23-1.9 0-2.17 0-2.347-2.327-2.347zm0 5.924c-1.427 0-2.497-.15-3.085-.88-.511-.634-.511-1.5-.511-2.696l.634-.02h-.634c0-2.43.153-3.597 3.596-3.597S20.5 4.89 20.5 7.318c0 1.217 0 2.083-.511 2.716-.588.73-1.659.88-3.085.88zM7.596 14.299c-2.327 0-2.327.176-2.327 2.327v.021c0 .937 0 1.614.23 1.9.224.277.89.406 2.097.406 1.208 0 1.874-.13 2.098-.407.23-.285.23-.962.23-1.9 0-2.171 0-2.347-2.328-2.347zm0 5.923c-1.426 0-2.497-.15-3.085-.88C4 18.708 4 17.844 4 16.647l.635-.021H4c0-2.429.153-3.596 3.596-3.596s3.596 1.168 3.596 3.596c0 1.217 0 2.082-.51 2.716-.589.73-1.66.88-3.086.88zM16.904 14.299c-2.327 0-2.327.176-2.327 2.327v.021c0 .937 0 1.614.23 1.9.223.277.89.406 2.097.406 1.207 0 1.873-.13 2.097-.407.23-.285.23-.962.23-1.9 0-2.171 0-2.347-2.327-2.347zm0 5.923c-1.427 0-2.497-.15-3.085-.88-.511-.634-.511-1.498-.511-2.695l.634-.021h-.634c0-2.429.153-3.596 3.596-3.596s3.596 1.168 3.596 3.596c0 1.217 0 2.082-.511 2.716-.588.73-1.659.88-3.085.88z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  todo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
      className="img"
    >
      <mask
        id="mask0_14239_3600"
        style={{ maskType: "alpha" }}
        width="24"
        height="25"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0.722H24V24.722H0z"></path>
      </mask>
      <g mask="url(#mask0_14239_3600)">
        <path
          fill="#5A5B5F"
          d="M4.05 19.422a.75.75 0 110-1.5.75.75 0 010 1.5zm4.5 0a.75.75 0 010-1.5h11.4a.75.75 0 010 1.5H8.55zm-4.5-5.95a.75.75 0 110-1.5.75.75 0 010 1.5zm4.5 0a.75.75 0 010-1.5h11.4a.75.75 0 010 1.5H8.55zm-4.5-5.95a.75.75 0 110-1.5.75.75 0 010 1.5zm4.5 0a.75.75 0 110-1.5h11.4a.75.75 0 010 1.5H8.55z"
        ></path>
      </g>
    </svg>
  ),
  calendar: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
      className="img"
    >
      <mask
        id="mask0_14239_3584"
        style={{ maskType: "alpha" }}
        width="24"
        height="25"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0.722H24V24.722H0z"></path>
      </mask>
      <g mask="url(#mask0_14239_3584)">
        <path
          fill="#5A5B5F"
          d="M5.308 22.222c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 01-.525-1.282V7.03c0-.505.175-.933.525-1.283.35-.35.778-.525 1.283-.525h1.384V3.107h1.539v2.115h7.577V3.107h1.5v2.115h1.384c.505 0 .933.175 1.283.525.35.35.525.778.525 1.283v13.384c0 .506-.175.933-.525 1.283-.35.35-.778.525-1.283.525H5.308zm0-1.5h13.384a.294.294 0 00.212-.096.294.294 0 00.096-.212V11.03H5v9.385c0 .076.032.147.096.211a.294.294 0 00.212.096zM5 9.53h14v-2.5a.294.294 0 00-.096-.212.294.294 0 00-.212-.096H5.308a.294.294 0 00-.212.096A.294.294 0 005 7.03v2.5zm7 5.27a.853.853 0 01-.626-.26.853.853 0 01-.258-.625c0-.245.086-.454.258-.626A.853.853 0 0112 13.03c.245 0 .454.086.626.259a.853.853 0 01.258.626.853.853 0 01-.258.626.853.853 0 01-.626.258zm-4 0a.853.853 0 01-.626-.26.853.853 0 01-.258-.625c0-.245.086-.454.258-.626A.853.853 0 018 13.03c.245 0 .454.086.626.259a.853.853 0 01.258.626.853.853 0 01-.258.626.853.853 0 01-.626.258zm8 0a.853.853 0 01-.626-.26.853.853 0 01-.258-.625c0-.245.086-.454.258-.626A.853.853 0 0116 13.03c.245 0 .453.086.626.259a.853.853 0 01.258.626.853.853 0 01-.258.626.853.853 0 01-.626.258zm-4 3.922a.853.853 0 01-.626-.259.853.853 0 01-.258-.625c0-.245.086-.454.258-.626a.853.853 0 01.626-.259c.245 0 .454.086.626.259a.853.853 0 01.258.626.853.853 0 01-.258.625.853.853 0 01-.626.26zm-4 0a.853.853 0 01-.626-.259.852.852 0 01-.258-.625c0-.245.086-.454.258-.626A.853.853 0 018 16.953c.245 0 .454.086.626.259a.853.853 0 01.258.626.852.852 0 01-.258.625.853.853 0 01-.626.26zm8 0a.853.853 0 01-.626-.259.853.853 0 01-.258-.625c0-.245.086-.454.258-.626a.853.853 0 01.626-.259c.245 0 .453.086.626.259a.853.853 0 01.258.626.853.853 0 01-.258.625.853.853 0 01-.626.26z"
        ></path>
      </g>
    </svg>
  ),
  my_team: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
      className="img"
    >
      <path
        fill="#5A5B5F"
        d="M8 17.514c-.451 0-.835-.158-1.151-.474a1.567 1.567 0 01-.474-1.151c0-.451.158-.835.474-1.151.316-.316.7-.474 1.151-.474.451 0 .835.158 1.151.474.316.316.474.7.474 1.15 0 .452-.158.836-.474 1.152-.316.316-.7.474-1.151.474zm8 0c-.451 0-.835-.158-1.151-.474a1.567 1.567 0 01-.474-1.151c0-.451.158-.835.474-1.151.316-.316.7-.474 1.151-.474.451 0 .835.158 1.151.474.316.316.474.7.474 1.15 0 .452-.158.836-.474 1.152-.316.316-.7.474-1.151.474zm-4-6.333c-.451 0-.835-.158-1.151-.474a1.567 1.567 0 01-.474-1.151c0-.452.158-.835.474-1.151.316-.316.7-.474 1.151-.474.451 0 .835.158 1.151.474.316.316.474.7.474 1.15 0 .452-.158.836-.474 1.152-.316.316-.7.474-1.151.474z"
      ></path>
    </svg>
  ),
  mission_plan: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
      className="img"
    >
      <path
        fill="#3E4345"
        fillRule="evenodd"
        d="M15.25 17.052H8.956a.654.654 0 010-1.307h6.294a.654.654 0 010 1.307zM15.25 13.403H8.956a.654.654 0 010-1.308h6.294a.654.654 0 010 1.308zM11.357 9.761H8.955a.654.654 0 010-1.307h2.402a.654.654 0 010 1.307z"
        clipRule="evenodd"
      ></path>
      <mask
        id="mask0_13797_241724"
        style={{ maskType: "luminance" }}
        width="16"
        height="19"
        x="4"
        y="3"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M4.165 3.999H20v17.357H4.165V3.999z"
          clipRule="evenodd"
        ></path>
      </mask>
      <g mask="url(#mask0_13797_241724)">
        <path
          fill="#3E4345"
          fillRule="evenodd"
          d="M15.418 5.306l-6.703.004c-2.03.012-3.243 1.267-3.243 3.359v8.017c0 2.105 1.225 3.362 3.274 3.362l6.703-.003c2.03-.012 3.243-1.269 3.243-3.36V8.67c0-2.105-1.224-3.363-3.274-3.363zm-6.67 16.05c-2.742 0-4.584-1.877-4.584-4.67V8.669c0-2.819 1.785-4.65 4.547-4.667L15.417 4h.001c2.74 0 4.582 1.877 4.582 4.67v8.017c0 2.817-1.785 4.65-4.546 4.667l-6.707.003z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  ),
  performance: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
      className="img"
    >
      <path
        stroke="#3E4345"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.24"
        d="M9.6 20.722h4.8c4 0 5.6-1.6 5.6-5.6v-4.8c0-4-1.6-5.6-5.6-5.6H9.6c-4 0-5.6 1.6-5.6 5.6v4.8c0 4 1.6 5.6 5.6 5.6z"
      ></path>
      <path
        stroke="#3E4345"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.24"
        d="M7.33 15.212l2.38-3.09c.34-.44.97-.52 1.41-.18l1.83 1.44c.44.34 1.07.26 1.41-.17l2.31-2.98"
      ></path>
    </svg>
  ),
  subsidiary: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
      className="img"
    >
      <path
        fill="#5A5B5F"
        fillRule="evenodd"
        d="M18.5 12.722a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0zm1.5 0a8 8 0 11-16 0 8 8 0 0116 0zm-8 2.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-3.484-2.25a3 3 0 104.932 2.81 3 3 0 100-5.62 3 3 0 10-4.932 2.81zm1.984-.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4 2.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  branch: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
      className="img"
    >
      <path
        stroke="#5A5B5F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.031"
        d="M5.375 19.597h13.75"
      ></path>
      <path
        stroke="#5A5B5F"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.031"
        d="M6.028 19.597l.034-8.27c0-.42.2-.818.53-1.08L11.404 6.5a1.383 1.383 0 011.692 0l4.812 3.74c.337.262.53.66.53 1.087v8.27"
      ></path>
      <path
        stroke="#5A5B5F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.031"
        d="M14.656 12.035H9.844c-.57 0-1.031.46-1.031 1.03v6.532h6.874v-6.531c0-.57-.46-1.031-1.03-1.031zM10.875 15.644v1.031M11.219 9.628h2.062"
      ></path>
    </svg>
  ),
  kpi: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
    >
      <path
        fill="#5A5B5F"
        fillRule="evenodd"
        d="M8.198 16.433a.576.576 0 01-.576-.576v-5.264a.576.576 0 011.151 0v5.264a.576.576 0 01-.575.576zM11.78 16.432a.576.576 0 01-.576-.575V8.072a.576.576 0 011.15 0v7.785a.576.576 0 01-.575.575zM15.302 16.432a.576.576 0 01-.576-.575v-2.482a.576.576 0 011.152 0v2.482a.576.576 0 01-.576.575z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#5A5B5F"
        fillRule="evenodd"
        d="M8.154 4.873c-2.128 0-3.503 1.456-3.503 3.71v6.777c0 2.255 1.375 3.711 3.503 3.711h7.192c2.128 0 3.503-1.456 3.503-3.71V8.583c0-2.255-1.375-3.71-3.503-3.71H8.154zm7.192 15.35H8.154c-2.784 0-4.654-1.955-4.654-4.863V8.584c0-2.908 1.87-4.862 4.654-4.862h7.192C18.13 3.722 20 5.676 20 8.584v6.776c0 2.908-1.87 4.862-4.654 4.862z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  organogram: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
    >
      <path
        fill="#5A5B5F"
        d="M8.492 12.839h7.516v1.412h.734v-2.145h-4.125v-1.467h-.734v1.467H7.758v2.145h.734v-1.412zM10.417 14.764H5.833a.917.917 0 00-.916.917v2.75a.917.917 0 00.916.916h4.584a.917.917 0 00.916-.916v-2.75a.917.917 0 00-.916-.917zM5.833 18.43v-2.75h4.584v2.75H5.833zM18.667 14.764h-4.584a.917.917 0 00-.916.917v2.75a.917.917 0 00.916.916h4.584a.917.917 0 00.916-.916v-2.75a.917.917 0 00-.916-.917zm-4.584 3.667v-2.75h4.584v2.75h-4.584zM9.958 10.18h4.584a.917.917 0 00.916-.916v-2.75a.917.917 0 00-.916-.917H9.958a.917.917 0 00-.916.917v2.75a.917.917 0 00.916.917zm0-3.666h4.584v2.75H9.958v-2.75z"
      ></path>
    </svg>
  ),
  team_management: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
      className="img"
    >
      <path
        stroke="#5A5B5F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.031"
        d="M16.125 9.145a.417.417 0 00-.13 0 1.77 1.77 0 01-1.706-1.774 1.774 1.774 0 111.836 1.774zM15.417 14.15c.942.158 1.98-.007 2.709-.495.97-.646.97-1.705 0-2.351-.736-.489-1.788-.654-2.73-.489M7.854 9.145a.417.417 0 01.131 0A1.77 1.77 0 009.69 7.37a1.774 1.774 0 10-1.836 1.774zM8.562 14.15c-.941.158-1.98-.007-2.708-.495-.97-.646-.97-1.705 0-2.351.735-.489 1.787-.654 2.73-.489M12 14.28a.415.415 0 00-.13 0 1.77 1.77 0 01-1.706-1.773 1.774 1.774 0 113.547 0 1.775 1.775 0 01-1.71 1.773zM10 16.446c-.97.646-.97 1.705 0 2.351 1.1.736 2.9.736 4 0 .97-.646.97-1.705 0-2.351-1.092-.729-2.9-.729-4 0z"
      ></path>
    </svg>
  ),
  settings: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
    >
      <mask
        id="mask0_13859_23072"
        style={{ maskType: "luminance" }}
        width="17"
        height="19"
        x="4"
        y="3"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M4 3.722h16.715v17.96H4V3.722z"
          clipRule="evenodd"
        ></path>
      </mask>
      <g mask="url(#mask0_13859_23072)">
        <path
          fill="#5A5B5F"
          fillRule="evenodd"
          d="M8.509 17.105a2.282 2.282 0 011.987 1.153c.196.33.305.716.308 1.109a1.01 1.01 0 001.01 1.015h1.085a1.01 1.01 0 001.009-1.003 2.277 2.277 0 01.674-1.631c.431-.432 1.034-.69 1.638-.674.395.01.775.117 1.11.307a1.015 1.015 0 001.379-.365l.575-.96a1.003 1.003 0 00-.369-1.362 2.285 2.285 0 01-1.076-1.402 2.314 2.314 0 011.076-2.59c.47-.275.635-.89.362-1.368a.498.498 0 01-.03-.06l-.509-.88a1.01 1.01 0 00-1.374-.372 2.267 2.267 0 01-1.739.24A2.279 2.279 0 0114.219 7.2c-.2-.333-.307-.72-.311-1.115a1.034 1.034 0 00-.285-.757 1.012 1.012 0 00-.724-.305h-1.086a1 1 0 00-1 1.005 2.32 2.32 0 01-2.308 2.287A2.236 2.236 0 017.379 8a1.01 1.01 0 00-1.366.378l-.587.965a1.006 1.006 0 00.374 1.36 2.318 2.318 0 011.153 2c0 .821-.443 1.587-1.154 1.998-.476.276-.64.889-.365 1.365l.547.943c.135.244.356.42.612.492.254.071.535.04.77-.09a2.274 2.274 0 011.146-.306zm4.39 4.577h-1.086a2.31 2.31 0 01-2.309-2.308.933.933 0 00-.13-.461 1.004 1.004 0 00-.611-.475 1.002 1.002 0 00-.756.101 2.346 2.346 0 01-1.77.213A2.324 2.324 0 014.85 17.65l-.542-.934a2.304 2.304 0 01.84-3.142 1.01 1.01 0 000-1.746 2.313 2.313 0 01-.841-3.149l.588-.965a2.307 2.307 0 013.139-.837c.15.09.313.134.478.136.54 0 .992-.445 1-.993a2.28 2.28 0 01.67-1.622 2.289 2.289 0 011.631-.677h1.086c.62 0 1.224.255 1.656.698.432.445.67 1.056.652 1.676.002.14.048.301.131.442a1.003 1.003 0 001.372.36 2.315 2.315 0 013.155.847l.54.935c.014.025.026.05.037.075a2.317 2.317 0 01-.876 3.072.99.99 0 00-.367.365c-.135.233-.172.51-.104.765a.99.99 0 00.468.61c.526.302.918.812 1.075 1.4a2.317 2.317 0 01-.235 1.752l-.575.959a2.31 2.31 0 01-3.144.83 1.032 1.032 0 00-.483-.133h-.006a1.003 1.003 0 00-.987 1.004 2.314 2.314 0 01-2.309 2.303z"
          clipRule="evenodd"
        ></path>
      </g>
      <path
        fill="#5A5B5F"
        fillRule="evenodd"
        d="M12.36 11.067a1.636 1.636 0 101.635 1.636c0-.902-.734-1.636-1.635-1.636zm0 4.57a2.937 2.937 0 01-2.935-2.934 2.939 2.939 0 012.935-2.936 2.939 2.939 0 012.935 2.936 2.937 2.937 0 01-2.935 2.934z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
};

export const sideMenuList: any = [
  {
    title: "",
    collapse: false,
    collapseNum: "one",
    navLinks: [
      {
        name: "Dashboard",
        link: routesPath?.ADMIN?.OVERVIEW,
        icon: sideMenuIcons?.dashboard,
        relatedLink: [""],
      },
    ],
  },
  {
    title: "TOOLS",
    collapse: true,
    collapseNum: "two",
    navLinks: [
      {
        name: "Mission Plan",
        link: routesPath?.ADMIN?.MISSION_PLAN,
        icon: sideMenuIcons?.mission_plan,
        relatedLink: ["/admin/mission-plan/kickstart?ui=financial-year"],
      },
      {
        name: "Performance",
        link: routesPath?.ADMIN?.PERFORMANCE,
        icon: sideMenuIcons?.performance,
        relatedLink: [""],
      },
      {
        name: "KPI",
        link: routesPath?.ADMIN?.KPI,
        icon: sideMenuIcons?.kpi,
        relatedLink: [""],
      },
    ],
  },
  {
    title: "ORGANIZATION",
    collapse: true,
    collapseNum: "three",
    navLinks: [
      {
        name: "Subsidiaries",
        link: routesPath?.ADMIN?.SUBSIDIARY,
        icon: sideMenuIcons?.subsidiary,
      },
      {
        name: "Branches",
        link: routesPath?.ADMIN?.BRANCHES,
        icon: sideMenuIcons?.branch,
      },
      {
        name: "Organogram",
        link: routesPath?.ADMIN?.ORGANOGRAM,
        icon: sideMenuIcons?.organogram,
      },
    ],
  },
  {
    title: "MANAGEMENT",
    collapse: true,
    collapseNum: "four",
    navLinks: [
      {
        name: "Team Management",
        link: routesPath?.ADMIN?.TEAM_MANAGEMENT,
        icon: sideMenuIcons?.team_management,
        relatedLink: [""]
      },
    ],
  },
  {
    title: "SETTINGS",
    collapse: true,
    collapseNum: "five",
    navLinks: [
      {
        name: "Settings",
        link: routesPath?.ADMIN?.SETTINGS,
        icon: sideMenuIcons?.settings,
      },
    ],
  },
];

export const sideMenuEmployeeList = [
  {
    title: "",
    collapse: false,
    collapseNum: "one",
    navLinks: [
      {
        name: "Dashboard",
        link: routesPath?.EMPLOYEE?.OVERVIEW,
        icon: sideMenuIcons?.dashboard,
      },
    ],
  },
  {
    title: "TOOLS",
    collapse: true,
    collapseNum: "two",
    navLinks: [
      {
        name: "Mission Plan",
        link: routesPath?.EMPLOYEE?.MISSION_PLAN,
        icon: sideMenuIcons?.mission_plan,
      },
      {
        name: "Mission Plan Report",
        link: routesPath?.EMPLOYEE?.MISSION_PLAN_REPORT,
        icon: sideMenuIcons?.performance,
      },
      {
        name: "KPI",
        link: routesPath?.EMPLOYEE?.KPI,
        icon: sideMenuIcons?.kpi,
      },
    ],
  },
  {
    title: "MY ORGANIZATION",
    collapse: true,
    collapseNum: "three",
    navLinks: [
      {
        name: "My Team",
        link: routesPath?.EMPLOYEE?.MY_TEAM,
        icon: sideMenuIcons?.my_team,
      },
      {
        name: "Calendar",
        link: routesPath?.EMPLOYEE?.CALENDAR,
        icon: sideMenuIcons?.calendar,
      },
      {
        name: "To Do’s",
        link: routesPath?.EMPLOYEE?.TO_DO,
        icon: sideMenuIcons?.todo,
      },
      {
        name: "Organogram",
        link: routesPath?.EMPLOYEE?.ORGANOGRAM,
        icon: sideMenuIcons?.organogram,
      },
    ],
  },
  {
    title: "SETTINGS",
    collapse: true,
    collapseNum: "five",
    navLinks: [
      {
        name: "Settings",
        link: routesPath?.EMPLOYEE?.SETTINGS,
        icon: sideMenuIcons?.settings,
      },
    ],
  },
];
