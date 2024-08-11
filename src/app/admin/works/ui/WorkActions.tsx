"use client";

import MuiBox from "@/components/box/Box";
import MuiButton from "@/components/button/Button";
import MuiTypography from "@/components/typography/Typograph";
import { setWorkToCreate } from "@/redux/features/work/workDialogSlice";
import { useAppDispatch } from "@/redux/services/hooks";
import React, { useCallback } from "react";

const WorkActions = () => {
  const dispatch = useAppDispatch();

  const onClickAddWork = useCallback(() => {
    dispatch(setWorkToCreate({}));
  }, [dispatch]);

  return (
    <MuiBox className="flex justify-end w-full md:w-[700px] sm:w-[320px]">
      <MuiButton>
        <MuiTypography onClick={onClickAddWork}>Add Work</MuiTypography>
      </MuiButton>
    </MuiBox>
  );
};

export default WorkActions;
