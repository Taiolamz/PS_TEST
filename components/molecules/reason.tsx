import Image from "next/image";
import Link from "next/link";

export default function Reason() {
  return (
    <>
      <div className=" mx-auto md:w-[90%] pt-12 space-y-14">
        <div className="md:flex justify-between mb-10">
          <div className="md:w-[40%] max-sm:px-6">
            <div className="space-y-8 md:space-y-10">
              <h3 className="text-4xl md:text-[40px] font-extrabold leading-tight">
                Your Company is distinct.
                <br /> So should your performance management plan!
              </h3>
              <p className="text-sm font-normal text-[var(--text-color)]">
                Mance captures your expectations so you can manage every aspect
                of your mission (and the executors) in one place, including
                goals, core values & associated behvaiour as well as provide
                feedback
              </p>
              <div>
                <Link
                  href="/mance-web/waitlist"
                  className="group w-44 text-[var(--btn-color)] hover:text-white border border-[var(--btn-color)] hover:bg-[var(--btn-hover-backgroundColor)] text-base font-medium rounded-md px-4 py-1.5 inline-flex items-center justify-center transition-all ease-linear gap-2"
                >
                  Join Waitlist
                  <svg
                    width="15"
                    height="12"
                    className="fill-[var(--btn-color)] group-hover:fill-white group-hover:translate-x-2 transition-all ease-linear"
                    viewBox="0 0 15 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0.5 5.75013C0.5 5.42785 0.739489 5.1615 1.05021 5.11935L1.13659 5.11354L13.8684 5.11354C14.22 5.11354 14.505 5.39855 14.505 5.75013C14.505 6.07241 14.2655 6.33875 13.9548 6.38091L13.8684 6.38672L1.13659 6.38672C0.785012 6.38672 0.5 6.10171 0.5 5.75013Z" />
                    <path d="M8.2841 1.08745C8.03496 0.839385 8.0341 0.436318 8.28216 0.18718C8.50768 -0.0393105 8.8613 -0.0606174 9.11091 0.123757L9.18244 0.185241L14.3176 5.29835C14.5448 5.52454 14.5654 5.87943 14.3796 6.12903L14.3177 6.20052L9.18248 11.3145C8.93336 11.5626 8.53029 11.5617 8.2822 11.3126C8.05667 11.0861 8.03685 10.7324 8.22228 10.4836L8.28407 10.4123L12.966 5.7492L8.2841 1.08745Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-[50%] mt-8 md:mt-0">
            <Image
            width={600}
            height={450}
              src="/assets-website/svg/PlanImg.svg"
              data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="1000"
              alt="performace mgt plan image"
            />
          </div>
        </div>

        {/* Second */}

        <div className="flex max-sm:flex-col-reverse max-sm:pt-8 md:justify-between pb-14">
          <div className="md:w-[45%]  px-4 md:px-0 mt-8 md:mt-0">
            <Image
            width={600}
            height={450}
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="1000"
              src="/assets-website/svg/HappyImg.svg"
              className="rounded-lg"
              alt="performace mgt plan image"
            />
          </div>
          <div className="md:w-[45%] max-sm:px-6">
            <div className="space-y-8 md:space-y-10">
              <h3 className="text-4xl md:text-[40px] font-extrabold leading-tight">
                <q className="font-extrabold">
                  68% of people who recieved accurate and continous feedback
                  claim they felt fulfilled at their job
                </q>
                <cite className=" font-light text-3xl text-[var(--text-color)]">
                  <small>- Clutch</small>{" "}
                </cite>
              </h3>
              <p className="text-sm font-normal text-[var(--text-color)]">
                Employees are happier at work if they recieve regular and
                accurate feedback, as shown by the organizations with the best
                performance management systems
              </p>
              <div>
                <Link
                  href="/mance-web/waitlist"
                  className="group transition-all ease-linear w-44 text-[var(--btn-color)] hover:text-white border border-[var(--btn-color)] hover:bg-[var(--btn-hover-backgroundColor)] text-base font-medium rounded-md px-4 py-1.5 inline-flex items-center justify-center gap-2"
                >
                  Request Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
