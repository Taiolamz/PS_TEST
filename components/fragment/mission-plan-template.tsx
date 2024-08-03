import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import update from "@/public/svgs/update.svg";
import Image from "next/image";
import React from "react";

interface missionProp {
  title: string;
  status: string;
  comment?: string;
  children: any;
}

interface missionItems {
  title: string;
  description: [
    {
      key: string;
      value: string;
    }
  ];
}

interface dataProp {
  data: any;
}

interface missionHeaderProp {
  title: string;
  link: string;
  index: string;
}

interface prop {
  children: React.ReactNode;
}

export const strategicIntent = [
  {
    title: "Strategic Intent 1",
    description: [
      {
        key: "Intent",
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      },
      {
        key: "Behaviours",
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      },
    ],
  },
];
export const specificTask = [
  {
    title: "Commercialize 4 products (MAIN EFFORT)",
    description: [
      {
        key: "Pillars",
        value: "Product, Brand, People",
      },
      {
        key: "Measures of success",
        value: "Measure 1, Measure 2, Measure 3",
      },
      {
        key: "22nd July 2022 - 15th Dec 2022",
        value: "",
      },
    ],
  },
];
export const impliedTask = [
  {
    title: "Commercialize 4 products",
    description: [
      {
        key: "Specified Task",
        value: "Achieve $1 Billion in Company Revenue , Design Mance System",
      },
      {
        key: "Expected Outcome",
        value: "Design Mance System",
      },
      {
        key: "Weight",
        value: "100",
      },
      {
        key: "Percentage",
        value: "100%",
      },
      {
        key: "Resource",
        value: "Ayomipe Olorunshola, Segun Johnson",
      },
      {
        key: "22nd July 2022 - 15th Dec 2022",
        value: "",
      },
    ],
  },
];
export const freedom = [
  {
    title: "Transportation to and from client location",
    description: [],
  },
  {
    title: "Lack of experienced team members",
    description: [],
  },
];

export const constraints = [
  {
    title: "Ability to innovate design process",
    description: [],
  },
  {
    title: "Select skill to improve on",
    description: [],
  },
];

export const MissionWrapper = ({
  title,
  status,
  comment,
  children,
}: missionProp) => {
  return (
    <div className="border rounded-[5px] p-[22px] w-full text-sm">
      <div className="text-primary font-500">
        <h4>{title}</h4>
      </div>
      <div className="w-full grid pt-[1rem] grid-flow-col grid-cols-1 items-center">
        <div className="w-[80%]">{children}</div>
        <div className="capitalize grid-cols-2">
          <div className="flex  flex-col items-end gap-[10px]">
            <Badge
              variant={
                status.toLowerCase() === "rejected"
                  ? "danger"
                  : status.toLowerCase() === "approved"
                  ? "success"
                  : "pending"
              }
              className="select-none w-fit"
            >
              {status.toLowerCase()}
            </Badge>

            {status === "rejected" && comment && (
              <div className="text-sm">
                <p className="flex gap-2 items-center">
                  <span className="text-grayScale">View Comments</span>
                  <span className="bg-redText  text-redText p-[3px] px-[6px] rounded-full text-xs bg-opacity-20">
                    {comment}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MissionItems = ({ data }: dataProp) => {
  return (
    <div className="w-full">
      {data?.map(({ title, description }: missionItems, index: string) => {
        return (
          <div key={index}>
            <div className="text-custom-dark-blue leading-relaxed">
              <h4>- {title}</h4>
            </div>
            {description !== undefined &&
              description.map(({ key, value }, index) => {
                return (
                  <div className="pl-[1rem] leading-relaxed" key={index}>
                    <p className="flex gap-[5px]">
                      <span className="text-custom-dark-blue">
                        {key}
                        {index + 1 !== description.length ? (
                          <span> : </span>
                        ) : (
                          ""
                        )}
                      </span>
                      <span className="font-extralight">{value}</span>
                    </p>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export const MissionHeader = ({ title, link, index }: missionHeaderProp) => {
  return (
    <div className="w-full flex justify-between text-sm text-grayText bg-[var(--bg-primary-05)] p-[10px] bg-opacity-50">
      <div>
        <h4>
          <span>{index}. </span>
          <span>{title}</span>
        </h4>
      </div>
      <Link className="pr-[1rem]" href={link}>
        <Image src={update} alt="edit-icon" />
      </Link>
    </div>
  );
};

export const MissionPlanWrapper = ({ children }: prop) => {
  return <div className="flex flex-col gap-[10px] select-none">{children}</div>;
};
