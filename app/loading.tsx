import { PageLoader } from "@/components/custom-loader";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="min-h-screen grid place-content-center">
      <PageLoader />
    </div>
  );
};

export default loading;
