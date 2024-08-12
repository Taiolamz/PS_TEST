const CollapseIcon = ({ strokeClassName }: IconPropType) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.6 20H14.4C18.4 20 20 18.4 20 14.4V9.6C20 5.6 18.4 4 14.4 4H9.6C5.6 4 4 5.6 4 9.6V14.4C4 18.4 5.6 20 9.6 20Z"
      stroke="white"
      stroke-width="1.24"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={strokeClassName}
    />
    <path
      d="M7.33008 14.4898L9.71008 11.3998C10.0501 10.9598 10.6801 10.8798 11.1201 11.2198L12.9501 12.6598C13.3901 12.9998 14.0201 12.9198 14.3601 12.4898L16.6701 9.50977"
      stroke="white"
      stroke-width="1.24"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={strokeClassName}
    />
  </svg>
);

export default CollapseIcon;
