import MuiBox from "@/components/box/Box";
import React from "react";
import WorkListCard from "./WorkListCard";

const WorkList = () => {
  return (
    <MuiBox className="flex flex-col gap-12">
      <WorkListCard />
      <WorkListCard />
    </MuiBox>
  );
};

export default WorkList;
