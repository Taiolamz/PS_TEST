"use client";

import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const faqData = [
  {
    id: 1,
    title: "What is Mance for and how does it work?",
    message:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    id: 2,
    title: "How do I onboard my multiple organisation on mance?",
    message:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    id: 3,
    title: "How do I create and manage subsidiary to my company?",
    message:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    id: 4,
    title: "Is it possible to activate and deactivate a branch when created?",
    message:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    id: 5,
    title: "How do I add employees to my company?",
    message:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
];

export default function Faq() {
  const [active, setActive] = React.useState<null | number>(null);
  const handleActive = (id: number) => {
    if (id === active) {
      setActive(null);
    } else {
      setActive(id);
    }
  };
  return (
    <section className="pt-14">
      <div className="text-center space-y-4 mb-14">
        <h2 className="text-[var(--btn-color)] font-medium text-lg md:text-xl">
          Frequently Asked Question
        </h2>
        <p className="md:text-3xl text-2xl font-semibold">
          Quick Insightful Information
        </p>
      </div>
      <section className="w-[90%] mx-auto space-y-6 mb-14">
        {faqData?.map((data) => (
          <div
            key={data.id}
            className=" border group first:rounded-t-xl last:rounded-b-xl"
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="4000"
          >
            <div
              onClick={() => handleActive(data?.id)}
              className={`${
                data?.id === active && "bg-[var(--btn-color)] text-white"
              } transition-all ease-linear group-first:first:rounded-t-xl flex justify-between items-center px-5 py-4`}
            >
              <h2 className=" max-sm:text-sm">{data?.title}</h2>
              <MdKeyboardArrowDown
                className={`size-6 transition-all ease-linear ml-4 ${
                  data?.id !== active && "rotate-180"
                }`}
              />
            </div>
            <p
              className={`px-5 py-4 transition-all ease-linear ${
                data?.id !== active && "opacity-0 hidden"
              }`}
            >
              {data?.message}
            </p>
          </div>
        ))}
      </section>
    </section>
  );
}
