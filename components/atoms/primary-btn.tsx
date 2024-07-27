import React from "react";

export default function PrimaryButton({ handleClick, title, styles }: { handleClick?: () => void; title?: string; styles?: string }) {
  return (
    <button
      onClick={handleClick}
      className={`bg-[var(--btn-color)] hover:bg-[var(--btn-hover-backgroundColor)] text-white text-sm font-medium rounded-md ${styles}`}
    >
      {title}
    </button>
  );
}
