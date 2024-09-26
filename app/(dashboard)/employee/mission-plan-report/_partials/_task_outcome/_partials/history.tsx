import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { historyData } from "../_data/data";
import HistoryCard from "../../../_component/history-card";
import { SearchIcon } from "@/public/assets/icons";

const History = () => {
  return (
    <div>
      <div className="relative mb-4">
        <Input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          // value={searchVal}
          // onChange={onSearchChange}
          onChange={() => {}}
          className="border-custom-divider bg-white flex-1 placeholder:text-custom-gray-scale-300 font-normal text-xs border rounded-[6px] text-custom-dark-blue"
        />
        <Image
          src={SearchIcon}
          alt="search"
          // onClick={handleSearchClick}
          className="absolute right-0 mr-4 top-3"
        />
      </div>
      <div className="grid gap-y-3">
        {historyData.map((item, idx) => (
          <div className="">
            <HistoryCard
              key={item?.id}
              month={item?.month}
              status={item.status}
              title={item.title}
              percentage={item.percentage}
              target={item.target}
              achievement={item.achievement}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
