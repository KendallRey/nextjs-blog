import MuiBox from "@/components/box/Box";
import React from "react";
import ProjectListCard from "./ProjectListCard";

const ProjectList = () => {
  return (
    <MuiBox className="flex flex-col gap-12">
      <ProjectListCard />
      <ProjectListCard />
    </MuiBox>
  );
};

export default ProjectList;
