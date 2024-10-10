import React from "react";
import style from "./ModuleCard.module.css";

interface myComponentProps {
  icon?: any;
  title?: string;
  count?: number | string;
  type?: string;
  primaryColor?: string;
  accentColor?: string;
  onClick?: () => void;
  hide?: boolean;
  active?: boolean;
  pending?: boolean;
}

const ModuleCard = ({
  accentColor,
  count,
  icon,
  primaryColor,
  title,
  type,
  onClick,
  hide,
  active,
  pending,
}: myComponentProps) => {
  const branchIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="29"
      fill="none"
      viewBox="0 0 29 29"
      className={style.img}
    >
      <path
        stroke={
          pending
            ? `rgba(255, 192, 67, 1)`
            : primaryColor || "var(--primary-color)"
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.776"
        d="M2.505 26.61h23.68"
      ></path>
      <path
        stroke={
          pending
            ? `rgba(255, 192, 67, 1)`
            : primaryColor || "var(--primary-color)"
        }
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.776"
        d="M3.63 26.61l.06-14.243c0-.723.342-1.41.91-1.86l8.289-6.452a2.381 2.381 0 012.913 0l8.288 6.441c.58.45.912 1.137.912 1.87v14.245"
      ></path>
      <path
        stroke={
          pending
            ? `rgba(255, 192, 67, 1)`
            : primaryColor || "var(--primary-color)"
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.776"
        d="M18.489 13.586h-8.288c-.983 0-1.776.794-1.776 1.777V26.61h11.84V15.363c0-.983-.793-1.777-1.776-1.777zM11.977 19.803v1.776M12.57 9.442h3.551"
      ></path>
    </svg>
  );

  const subIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      fill="none"
      viewBox="0 0 42 42"
      className={style.img}
    >
      <path
        fill={
          pending
            ? `rgba(255, 192, 67, 1)`
            : primaryColor || "var(--primary-color)"
        }
        fillRule="evenodd"
        d="M34.542 21a13.542 13.542 0 11-27.084 0 13.542 13.542 0 0127.084 0zm3.125 0a16.667 16.667 0 11-33.334 0 16.667 16.667 0 0133.334 0zM21 25.688a3.125 3.125 0 11-6.25 0 3.125 3.125 0 016.25 0zM13.742 21a6.25 6.25 0 1010.275 5.854 6.25 6.25 0 100-11.708A6.25 6.25 0 1013.742 21zm4.133-1.562a3.125 3.125 0 100-6.25 3.125 3.125 0 000 6.25zm8.334 4.687a3.125 3.125 0 100-6.25 3.125 3.125 0 000 6.25z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  const deptIcon = (
    <svg
      className={style.img}
      xmlns="http://www.w3.org/2000/svg"
      width="43"
      height="42"
      fill="none"
      viewBox="0 0 43 42"
    >
      <path
        fill={pending ? `rgba(255, 192, 67, 1)` : primaryColor || "#0452C8"}
        d="M35.446 33.935h-3.245V10.818c-.023.005-.041.005-.065.005H11.142c-.024 0-.041 0-.065-.005v23.117H7.835a.586.586 0 100 1.174h27.611a.586.586 0 100-1.174zm-8.52-14.146h2.107v3.668h-2.107v-3.668zm2.107-6.407v3.667h-2.107v-3.667h2.107zm-5.381 0h2.1v3.667h-2.1v-3.667zm0 6.407h2.1v3.668h-2.1v-3.668zm-4.025-6.407v3.667h-2.1v-3.667h2.1zm-2.1 12.815h2.1v3.667h-2.1v-3.667zm0-2.74v-3.668h2.1v3.668h-2.1zm-3.275-10.075h2.1v3.667h-2.1v-3.667zm0 6.407h2.1v3.668h-2.1v-3.668zm0 6.408h2.1v3.667h-2.1v-3.667zm8.068 0h6.712v7.738H22.32v-7.738zM11.142 9.65h20.994c1.063 0 1.93-.863 1.93-1.93a1.93 1.93 0 00-1.93-1.925H11.142a1.927 1.927 0 000 3.855z"
      ></path>
    </svg>
  );

  const unitIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      fill="none"
      viewBox="0 0 42 42"
      className={style.img}
    >
      <path
        fill={pending ? `rgba(255, 192, 67, 1)` : primaryColor || "#7E10E5"}
        stroke={pending ? `rgba(255, 192, 67, 1)` : primaryColor || "#7E10E5"}
        strokeWidth="0.502"
        d="M20.51 10.921v2.447a.44.44 0 10.878 0V10.92A1.995 1.995 0 0022.94 8.98a1.994 1.994 0 00-1.991-1.991 1.994 1.994 0 00-1.992 1.991c0 .947.665 1.742 1.552 1.942zm.439-3.054c.613 0 1.112.499 1.112 1.112 0 .613-.499 1.112-1.112 1.113 0 0 0 0 0 0s0 0 0 0a1.113 1.113 0 010-2.225zm6.363 9.955c.074 0 .15-.019.22-.059l2.414-1.394a1.998 1.998 0 002.457.373 1.994 1.994 0 00.73-2.72s0 0 0 0a1.994 1.994 0 00-2.721-.73 1.995 1.995 0 00-.906 2.316l-2.414 1.394a.44.44 0 00.22.82zm3.54-3.768a1.113 1.113 0 011.52.407h-.001a1.114 1.114 0 01-1.251 1.631 1.113 1.113 0 01-.268-2.038zm2.48 12.525a1.978 1.978 0 00-.929-1.21 1.978 1.978 0 00-1.51-.198c-.37.099-.695.297-.948.571l-2.414-1.393a.44.44 0 10-.44.761l2.415 1.394a1.995 1.995 0 001.898 2.581c.689 0 1.36-.357 1.728-.995 0 0 0 0 0 0a1.98 1.98 0 00.2-1.511zm-.961 1.071a1.114 1.114 0 01-1.52.408 1.114 1.114 0 011.113-1.927c.53.307.713.988.407 1.52zm-10.983 3.54v-2.446a.44.44 0 00-.879 0v2.447c-.887.2-1.552.995-1.552 1.942 0 1.098.894 1.991 1.992 1.991a1.994 1.994 0 001.991-1.991c0-.947-.664-1.742-1.552-1.942zm-.44 3.055a1.113 1.113 0 010-2.225 1.114 1.114 0 010 2.224zm-6.582-9.896l-2.413 1.393a1.978 1.978 0 00-.947-.571 1.994 1.994 0 00-2.24 2.92s0 0 0 0a1.993 1.993 0 002.72.728 1.995 1.995 0 00.906-2.315l2.414-1.394a.44.44 0 00-.44-.761zm-3.32 3.709a1.113 1.113 0 01-1.52-.408h0a1.113 1.113 0 011.927-1.112 1.113 1.113 0 01-.407 1.52zM9.494 16.742a1.998 1.998 0 002.458-.373l2.415 1.394a.436.436 0 00.6-.16.44.44 0 00-.16-.601l-2.415-1.394a1.995 1.995 0 00-.906-2.315 1.994 1.994 0 00-2.72.729s0 0 0 0a1.994 1.994 0 00.728 2.72zm.033-2.28a1.114 1.114 0 012.038.268 1.113 1.113 0 11-2.038-.268zm17.35 7.58a.44.44 0 00.282-.41V20.48a.44.44 0 00-.282-.41l-.746-.287a5.271 5.271 0 00-.617-1.489l.325-.731a.44.44 0 00-.091-.49l-.816-.815a.44.44 0 00-.49-.09l-.73.324a5.27 5.27 0 00-1.489-.617l-.287-.746a.44.44 0 00-.41-.282h-1.154a.44.44 0 00-.41.282l-.287.746a5.267 5.267 0 00-1.489.617l-.731-.325a.44.44 0 00-.49.091l-.815.816a.44.44 0 00-.09.489l.324.731a5.269 5.269 0 00-.617 1.489l-.746.287a.44.44 0 00-.282.41v1.154a.44.44 0 00.282.41l.746.287c.128.526.335 1.025.617 1.489l-.325.731a.44.44 0 00.091.49l.816.815a.44.44 0 00.489.09l.731-.324c.464.282.963.488 1.489.617l.287.746a.44.44 0 00.41.282h1.154a.44.44 0 00.41-.282l.287-.746a5.273 5.273 0 001.489-.617l.73.325a.44.44 0 00.49-.091l.816-.816a.44.44 0 00.09-.49l-.324-.73c.281-.464.488-.963.617-1.489l.746-.287zm-1.556-.122a4.41 4.41 0 01-.67 1.616.44.44 0 00-.037.423l.298.672-.388.389-.671-.299a.44.44 0 00-.424.037 4.407 4.407 0 01-1.616.67.44.44 0 00-.326.274l-.263.684h-.55l-.264-.684a.44.44 0 00-.325-.274 4.41 4.41 0 01-1.616-.67.44.44 0 00-.424-.037l-.671.299-.389-.39.298-.67a.44.44 0 00-.037-.424 4.41 4.41 0 01-.67-1.616.44.44 0 00-.273-.326l-.685-.263v-.55l.685-.264a.44.44 0 00.274-.325c.114-.58.339-1.124.67-1.616a.44.44 0 00.037-.424l-.299-.671.389-.389.671.299a.44.44 0 00.424-.037 4.408 4.408 0 011.616-.67.44.44 0 00.325-.274l.264-.684h.55l.263.684a.44.44 0 00.326.274 4.41 4.41 0 011.616.67.44.44 0 00.423.037l.672-.299.388.389-.298.671a.44.44 0 00.037.424 4.41 4.41 0 01.67 1.616.44.44 0 00.274.326l.684.263v.55l-.685.264a.44.44 0 00-.273.325zm-4.372-3.913a3.052 3.052 0 00-3.05 3.049 3.052 3.052 0 003.05 3.049 3.052 3.052 0 003.049-3.049 3.052 3.052 0 00-3.05-3.049zm0 5.219a2.172 2.172 0 01-2.17-2.17c0-1.196.974-2.17 2.17-2.17s2.17.974 2.17 2.17-.974 2.17-2.17 2.17z"
      ></path>
    </svg>
  );

  const staffIcon = (
    <svg
      className={style.img}
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      fill="none"
      viewBox="0 0 42 42"
    >
      <path
        fill={pending ? `rgba(255, 192, 67, 1)` : primaryColor || "#119C2B"}
        d="M22.222 21.172a2.712 2.712 0 012.713 2.713l-.002 1.353c.186 3.321-2.372 4.977-7.115 4.977-4.728 0-7.342-1.634-7.342-4.93v-1.4a2.712 2.712 0 012.712-2.713h9.034zm7.235 0a2.713 2.713 0 012.712 2.713l-.001.952c.163 2.98-2.097 4.473-6.228 4.473-.561 0-1.088-.028-1.58-.082.97-.897 1.49-2.113 1.487-3.65l-.011-.39.003-1.303c0-1.08-.474-2.05-1.225-2.713h4.843zm-11.748-10.85a4.522 4.522 0 110 9.043 4.522 4.522 0 010-9.043zm9.042 1.809a3.617 3.617 0 110 7.233 3.617 3.617 0 010-7.233z"
      ></path>
    </svg>
  );

  const getCardProp = (param?: any) => {
    let optionObject;
    switch (param) {
      case "subsidiary":
        optionObject = {
          icon: subIcon,
          color: "var(--primary-color)",
          accent: "var(--primary-accent-color)",
        };
        break;
      case "branch":
        optionObject = {
          icon: branchIcon,
          color: "var(--primary-color)",
          accent: "var(--primary-accent-color)",
        };
        break;
      case "staff":
        optionObject = {
          icon: staffIcon,
          color: "#119C2B",
          accent: "rgba(17, 156, 43, 0.05)",
        };
        break;
      case "unit":
        optionObject = {
          icon: unitIcon,
          color: "#7E10E5",
          accent: "rgba(126, 16, 229, 0.05)",
        };
        break;
      case "department":
        optionObject = {
          icon: deptIcon,
          color: "#0452C8",
          accent: "rgba(4, 82, 200, 0.05)",
        };
        break;
      default:
        optionObject = {
          icon: subIcon,
          color: "var(--primary-color)",
          accent: "var(--primary-accent-color)",
        };
        break;
    }
    return optionObject;
  };

  if (hide) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <div
      onClick={() => {
        onClick && onClick();
      }}
      className={`${style.module_card_metric_index_wrapper} ${active ? style.module_card_metric_index_wrapper_active : ""
        }`}
      style={
        {
          "--border-color": pending
            ? `rgba(255, 192, 67, 1)`
            : primaryColor || getCardProp(type)?.color,
        } as React.CSSProperties
      }
    >
      <div className={`${style.icon_box}`}>
        <figure
          style={{
            backgroundColor: pending
              ? `rgba(255, 192, 67, 0.05)`
              : accentColor || getCardProp(type)?.accent,
          }}
          className={style.img_box}
        >
          {icon ? icon : getCardProp(type)?.icon}
        </figure>
      </div>
      {/* icon box end */}
      <div className={style.title_count_box}>
        <p className={style.title}>{title || ""}</p>
        <p className={style.count}>{count || "0"}</p>
      </div>
    </div>
  );
};

export default ModuleCard;
