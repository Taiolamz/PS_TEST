"use client";

import React from "react";
import ProfileReusableLayout from "../../ProfileReusableLayout";
import AddressInfoBox from "./AddressInformation";
import PasswordInfoBox from "./PasswordinfoBox";
import PersonalInfoBox from "./PersonalInfoBox";

const ProfilePersonalPage = () => {
  return (
    <>
      <ProfileReusableLayout pageTitle="Personal Profile">
        <PersonalInfoBox />
        <AddressInfoBox />
        <PasswordInfoBox />
      </ProfileReusableLayout>
    </>
  );
};

export default ProfilePersonalPage;
