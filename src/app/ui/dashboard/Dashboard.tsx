import MuiBox from "@/components/box/Box";
import React from "react";

type IDashboard = {
  className?: string;
} & ILayout;

const Dashboard: React.FC<IDashboard> = (props) => {
  const { children, className } = props;

  return (
    <MuiBox className={`gap-4 md:p-24 sm:p-8 p-4 ${className || ""}`} component={"main"}>
      {children}
    </MuiBox>
  );
};

export default Dashboard;
