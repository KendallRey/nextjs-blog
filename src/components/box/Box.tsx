"use client";

import React from "react";
import { motion } from "framer-motion";

import Box, { BoxProps } from "@mui/material/Box";

const BoxComponent = React.forwardRef((props: BoxProps, ref) => <Box {...props} ref={ref} />);

BoxComponent.displayName = "BoxComponent";

const MuiBox = motion(BoxComponent);

export default MuiBox;
