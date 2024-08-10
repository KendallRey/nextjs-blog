import Dashboard from "@/app/ui/dashboard/Dashboard";
import MuiTypography from "@/components/typography/Typograph";
import React from "react";
import ProjectList from "./ui/ProjectList";
import ProjectListFilter from "./ui/ProjectListFilter";

const ProjectsPage = () => {
  return (
    <Dashboard className="flex flex-col gap-8">
      <MuiTypography variant="h1" fontSize={40}>
        Projects
      </MuiTypography>
      <MuiTypography variant="body1">A description</MuiTypography>
      <ProjectListFilter />
      <ProjectList />
    </Dashboard>
  );
};

export default ProjectsPage;
