const PlusIcon = ({ className }: { className: string }) => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 12H18.5"
      stroke="var(--primary-color)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    />
    <path
      className={className}
      d="M12.5 18V6"
      stroke="var(--primary-color)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default PlusIcon;