import MuiBox from "@/components/box/Box";
import MuiTypography from "@/components/typography/Typograph";
import React from "react";
import { LabelImportantOutlined } from "@mui/icons-material";

const ProjectCard = () => {
  return (
    <MuiBox className="w-full md:w-[700px] sm:w-[320px]">
      <div className="flex gap-6">
        <div className="flex flex-col gap-2 justify-center items-center">
          <LabelImportantOutlined />
          <span className="border-l-2 flex-grow"></span>
        </div>
        <div className="flex flex-col gap-3">
          <MuiTypography variant="h2" fontSize={30}>
            Title
          </MuiTypography>
          <MuiTypography variant="caption">January</MuiTypography>
          <MuiBox></MuiBox>
          <MuiTypography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum
          </MuiTypography>
        </div>
      </div>
    </MuiBox>
  );
};

export default ProjectCard;
