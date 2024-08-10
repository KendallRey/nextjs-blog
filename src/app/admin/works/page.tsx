import Dashboard from "@/app/ui/dashboard/Dashboard";
import MuiBox from "@/components/box/Box";
import MuiTypography from "@/components/typography/Typograph";
import React from "react";
import WorkList from "./ui/WorkList";
import WorkListFilter from "./ui/WorkListFilter";

const WorkPage = () => {
  return (
    <Dashboard className="flex flex-col gap-8">
      <MuiTypography variant="h1" fontSize={40}>
        Works
      </MuiTypography>
      <MuiTypography variant="body1">A description</MuiTypography>
      <WorkListFilter />
      <WorkList />
    </Dashboard>
  );
};

export default WorkPage;
