import Dashboard from "@/app/ui/dashboard/Dashboard";
import MuiBox from "@/components/box/Box";
import MuiTypography from "@/components/typography/Typograph";
import React from "react";

const AboutPage = () => {
  return (
    <Dashboard className="flex flex-col gap-8">
      <MuiTypography fontSize={40}>About Me</MuiTypography>
      <MuiBox></MuiBox>
    </Dashboard>
  );
};

export default AboutPage;
