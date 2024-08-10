import MuiBox from "@/components/box/Box";
import MuiButton from "@/components/button/Button";
import MuiTypography from "@/components/typography/Typograph";
import React from "react";

const WorkListFilter = () => {
  return (
    <MuiBox className="w-full md:w-[700px] sm:w-[320px]">
      <MuiButton variant="text">
        <MuiTypography>2021</MuiTypography>
      </MuiButton>
      <MuiButton variant="text">
        <MuiTypography>2022</MuiTypography>
      </MuiButton>
      <MuiButton variant="text">
        <MuiTypography>2023</MuiTypography>
      </MuiButton>
    </MuiBox>
  );
};

export default WorkListFilter;
