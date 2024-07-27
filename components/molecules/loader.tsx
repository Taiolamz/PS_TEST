import Lottie from "react-lottie";
import * as animationData from "../../lib-website/assets/loading.json";

export default function Loader() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
    };
  return (
    <div className="w-screen h-screen absolute left-0 right-0 top-0 flex justify-center items-center">
      <div className=" bg-black left-0 right-0 top-0 bottom-0 absolute opacity-70 z-[800]" />
      <div className="size-[80px] rounded-[10px] place-content-center grid bg-white z-[800]">
        {/* Loading... */}
        <Lottie
          options={defaultOptions}
          height={100}
          width={100}
        />
      </div>
    </div>
  );
}
