import { Link } from "@mui/material";
import NextLink, { LinkProps } from "next/link";
import { ReactNode } from "react";

type IMuiLink = {
  children?: ReactNode;
  className?: string;
} & LinkProps;

const MuiLink: React.FC<IMuiLink> = (props) => {
  return <Link component={NextLink} {...props} />;
};

export default MuiLink;
