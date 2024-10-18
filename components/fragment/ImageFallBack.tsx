import React, { useState, useEffect } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Define the type for the props
interface CheckUrlFragmentProps {
  url: string;
  children?: React.ReactNode;
  className?: string;
  width?: number; // Required for Next.js Image component
  height?: number; // Required for Next.js Image component
  alt?: string; // Optional alt text for the image
  loadSize?: number;
  circleSkeleton?: boolean;
}

// Add type annotations to the `checkImageURL` function
const checkImageURL = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new window.Image();

    img.onload = () => {
      resolve(true);
    };

    img.onerror = () => {
      resolve(false);
    };

    img.src = url;
  });
};

const CheckUrlFragment: React.FC<CheckUrlFragmentProps> = ({
  url,
  children,
  className,
  width = 100,
  height = 100,
  alt,
  circleSkeleton,
  loadSize,
}) => {
  const [imageValid, setImageValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const imageUrl = url;
    if (imageUrl) {
      checkImageURL(imageUrl).then((isValid) => {
        setImageValid(isValid);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [url]);

  if (loading) {
    return (
      <div
        style={{ overflow: "hidden", display: "grid", placeItems: "center" }}
        className={className}
      >
        <Skeleton
          width={loadSize || 45}
          height={loadSize || 45}
          circle={circleSkeleton || true}
        />
      </div>
    );
  }

  return (
    <div>
      {imageValid ? (
        <figure className={className}>
          <Image
            src={url}
            alt={alt || "Image"} // Alt text is required for accessibility
            width={width}
            height={height}
            className="img"
          />
        </figure>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default CheckUrlFragment;
