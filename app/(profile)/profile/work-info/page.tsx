"use client";
// import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import React from "react";
import ProfileReusableLayout from "../../ProfileReusableLayout";
import WorkInfoBox from "./WorkInfoBox";

const ProfileWorkPage = () => {

  

  return (
    <>
      <ProfileReusableLayout pageTitle="Work Profile">
        <WorkInfoBox />
      </ProfileReusableLayout>
    </>
  );
};

export default ProfileWorkPage;
