import Dashboard from "@/app/ui/dashboard/Dashboard";
import MuiTypography from "@/components/typography/Typograph";
import React from "react";
import WorkList from "./ui/WorkList";
import WorkListFilter from "./ui/WorkListFilter";
import CreateWorkDialog from "./ui/CreateWorkDialog";
import WorkActions from "./ui/WorkActions";

const WorkPage = () => {
  return (
    <Dashboard className="flex flex-col gap-8">
      <MuiTypography variant="h1" fontSize={40}>
        Works
      </MuiTypography>
      <MuiTypography variant="body1">A description</MuiTypography>
      <WorkActions />
      <WorkListFilter />
      <WorkList />

      <CreateWorkDialog />
    </Dashboard>
  );
};

export default WorkPage;
