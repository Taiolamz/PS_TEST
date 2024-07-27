import PrimaryButton from "@/components/atoms/primary-btn";
import Image from "next/image";
import Link from "next/link";

export default function WaitlistSuccess() {
  return (
    <section className="w-full">
      <div className=" w-[90%] md:w-[55%] mx-auto mt-12">
        <span>
          <Image
          width={200}
          height={150}
           src="/assets-website/svg/send.svg" alt="" className="mx-auto" />
        </span>

        <div className="text-center space-y-3">
          <h3 className=" font-semibold text-4xl text-[var(--text-color3)]">
            You’re now officially on the waitlist
          </h3>
          <p className="px-3 font-normal text-base text-[var(--text-color4)]">
            Our sales team will reach out to you once the product is available
            for launch and ready to use
          </p>
        </div>
        <div className="mt-6 w-fit mx-auto">
        <Link href="/mance-web/home">
          <PrimaryButton
            title="Go to homepage"
            styles="px-9 py-[10px] "
          />
        </Link>
        </div>
      </div>
    </section>
  );
}
