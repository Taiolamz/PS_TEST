import React, { useRef, useEffect } from "react";

const LottieAnimation = ({
  animationData,
  height = "unset", /* use rem for better result */
}: {
  animationData: any;
  height?: number | string;
}) => {
  const container = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if running on the client-side
      import("lottie-web").then((lottie) => {
        if (container.current) {
          lottie.default.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData,
          });
        }
      });
    }
  }, [animationData]);

  return (
    <div
      ref={container}
      className="overflow-hidden"
      style={{ height: height }}
    />
  );
};

export default LottieAnimation;