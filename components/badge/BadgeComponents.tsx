import React from "react";
import style from "./BagdeComponent.module.css";

interface MyComponentProps {
  text?: string;
  className?: string;
  children?: any;
  onClick?: () => void;
  color?: string;
  bgColor?: string;
}

const BadgeComponent: React.FC<MyComponentProps> = ({
  text,
  className,
  children,
  onClick,
  color,
  bgColor,
}) => {
  return (
    <div
      onClick={() => {
        onClick && onClick();
      }}
      className={style?.badge_reusable_wrap_index}
    >
      <div
        style={{
          backgroundColor:
            color === "red"
              ? "rgba(214, 19, 15, 0.1)"
              : color === "green"
              ? "rgba(7, 162, 135, 0.1)"
              : color === "yellow"
              ? "rgba(253, 218, 25, 0.1)"
              : bgColor || "rgba(253, 218, 25, 0.1)",
        }}
        className={`${style?.badge_wrap_index} ${className?.toLowerCase()}`}
      >
        {children || ""}{" "}
        <span
          style={{
            color:
              color === "red"
                ? "rgba(236, 20, 16, 1)"
                : color === "green"
                ? "rgba(7, 162, 135, 1)"
                : color === "yellow"
                ? "rgba(255, 192, 67, 1)"
                : color || "rgba(255, 192, 67, 1)",
          }}
        >
          {text || ""}
        </span>
      </div>
    </div>
  );
};

export default BadgeComponent;
