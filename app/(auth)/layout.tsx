import ManceLogo from "@/components/atoms/manceLogo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import routesPath from "@/utils/routes";
import Link from "next/link";

const { HOME } = routesPath;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <Link href={HOME} className="flex absolute ml-10 mt-5">
        <ManceLogo width={74} height={15} />
      </Link>
      <div className="h-screen flex justify-between items-start font-lex">
        <div className="bg-primary hidden md:flex items-center md:flex-col h-full w-full md:w-2/5 text-white">
          <p className="text-xs font-normal mt-[30%]">Message from the CPO</p>
          <p className="text-center text-2xl font-medium mt-3">
            “Transforming and maintaining the
            <br />
            employee’s performance ratio has
            <br />
            been our top priority”
          </p>
          <div className="rounded-2xl relative bg-[#228f8f] py-1 px-2 mt-3">
            <Avatar className="absolute left-0 top-0 size-8">
              <AvatarFallback className="bg-primary">LO</AvatarFallback>
            </Avatar>
            <span className="pl-9">Larry Odunuga</span>
          </div>
          <div className="text-xs font-normal mt-[40%]">
            © 2024 Mance. All rights reserved
          </div>
        </div>
        <div className="bg-white h-full w-full md:w-3/5 md:pt-[5%]">
          <div className="flex flex-col items-center min-h-screen mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
