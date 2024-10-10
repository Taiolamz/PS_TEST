import React from "react";
import ModuleCard from "./ModuleCard";
import style from "./ModuleCard.module.css";

interface myComponentProps {
  list?: any;
}

const listToTest = [
  {
    active: true,
    title: "Total Staffs",
    type: "staff",
    count: 12,
    accentColor: "",
    hide: false,
    icon: "",
    onCLick: () => { },
    pending: false,
    primaryColor: "",
  },
  {
    // active: true,
    title: "Total Brnach",
    type: "branch",
    count: 4,
    accentColor: "",
    hide: false,
    icon: "",
    onCLick: () => { },
    pending: false,
    primaryColor: "",
  },
  {
    // active: true,
    title: "Total Department",
    type: "department",
    count: 2,
    accentColor: "",
    hide: false,
    icon: "",
    onCLick: () => { },
    pending: false,
    primaryColor: "",
  },
  {
    // active: true,
    title: "Total Department",
    type: "department",
    count: 2,
    accentColor: "",
    hide: false,
    icon: "",
    onCLick: () => { },
    pending: false,
    primaryColor: "",
  },
];

const ParentModuleCard = ({ list }: myComponentProps) => {
  return (
    <div
      style={{
        gridTemplateColumns:
          list?.length < 4
            ? "repeat(auto-fit, minmax(15rem, 17rem))"
            : list?.length === 4
              ? "repeat(4, 1fr)"
              : "",
      }}
      className={style.parent_module_card_metric_index_wrapper}
    >
      {list?.map((chi?: any, idx?: any) => {
        return (
          <ModuleCard
            key={idx}
            active={chi?.active}
            title={chi?.title}
            type={chi?.type}
            count={chi?.count}
            accentColor={chi?.accentColor}
            hide={chi?.hide}
            icon={chi?.icon}
            onClick={chi?.onClick}
            pending={chi?.pending}
            primaryColor={chi?.primaryColor}
          />
        );
      })}
    </div>
  );
};

export default ParentModuleCard;
