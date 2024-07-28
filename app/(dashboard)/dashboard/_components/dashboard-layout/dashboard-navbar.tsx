import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  BellIcon,
  LogoutIcon,
  SearchIcon,
} from "@/public/assets/icons";
import { AvatarImg } from "@/public/assets/images";
// import { AvatarImg } from "@/public/assets/images";
import Image from "next/image";
import * as React from "react";

const DashboardNav = ({ dynamiccontent }: any) => {
  const [search, setSearch] = React.useState("");
  // const searchField = (
  //   <div className="grid place-items-center relative">
  //     <Input
  //       placeholder="Search keyword #"
  //       className="bg-custom-light-gray p-3 border-0 rounded-2xl placeholder:font-light placeholder:text-xs px-4 w-[340px] font-sm text-custom-dark-blue font-light focus-none focus-visible:ring-transparent"
  //       type="text"
  //       value={search}
  //       onChange={(e) => setSearch(e.target.value)}
  //     />
  //     <Image src={SearchIcon} alt="search" className="absolute right-0 mr-3" />
  //   </div>
  // );

  const notify = (
    <div className="border-r pr-4 ml-10 cursor-pointer relative">
      <Image src={BellIcon} alt="bell" />
      <span className="bg-custom-notify-red absolute p-1 rounded-full w-3 h-3 flex justify-center place-items-center text-[10px] top-0 right-[15px] -mt-1 ">
        2
      </span>
    </div>
  );

  const profileRow = "flex items-center w-full justify-between";
  const Profile = (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-3 items-center cursor-pointer ">
          {/* <Avatar /> */}
          {/* <Avatar>
            <AvatarImage src={AvatarImg} alt="arrow down" />
            <AvatarFallback>HL</AvatarFallback>
          </Avatar> */}
          <Image src={AvatarImg} alt="avatar" />
          <Image src={ArrowDownIcon} alt="arrow down" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex flex-col min-w-[15rem] mt-3 p-0 "
      >
        <DropdownMenuCheckboxItem className="capitalize bg-custom-bg hover:bg-custom-gray text-custom-dark-blue font-medium text-xs hover:border-none ">
          <div className="flex gap-3 items-center">
            <Image src={AvatarImg} alt="avatar" />
            <div>
              <p>Hassan Lamidi</p>
              <p>hlamidi@zojaech.com</p>
            </div>
          </div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className={profileRow}>
          <p>IT Horizons</p>
          <Image src={ArrowRightIcon} alt="arrow right" />
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className={profileRow}>
          <p>Switch to employee account</p>
          <Image src={ArrowRightIcon} alt="arrow right" />
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          <p>Profile & Preference</p>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className="flex gap-2 items-center">
          <Image src={LogoutIcon} alt="logout" />
          <p>Sign out</p>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const content = (
    <div className="flex gap-10 items-center mt-5 ">
      <div className="flex flex-col ">
        <p className="text-custom-dark-gray-200 font-normal text-sm ml-3">
          My Organization
        </p>
        <span className="border-custom-hover border-[1.5px] rounded-sm  w-[128px] rounded-tr-4 rounded-tl-4 rounded-br-none round absolute bottom-0"></span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-3 cursor-pointer">
            <p className="text-custom-gray-scale-400 font-light text-xs">
              My Subsidiaries
            </p>
            <Image src={ArrowDownIcon} alt="arrow down" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="flex flex-col min-w-[15rem] mt-3 "
        >
          <DropdownMenuCheckboxItem
            className="capitalize text-custom-dark-blue font-medium text-xs hover:border-none "
            // onCheckedChange={(value) => column.toggleVisibility(!!value)}
          >
            IT Horizons
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className="capitalize text-custom-dark-blue font-medium text-xs "
            // onCheckedChange={(value) => column.toggleVisibility(!!value)}
          >
            Zojatech
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
  return (
    <div className="sticky top-0 h-[60px] bg-custom-bg right-0 w-full z-50 flex justify-between items-center p-3 px-5">
      {dynamiccontent ? dynamiccontent : content}
      <div className="flex gap-5 items-center">
        {/* {searchField} */}
        {notify}
        {Profile}
      </div>
    </div>
  );
};

export default DashboardNav;
