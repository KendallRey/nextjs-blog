"use client";

import { METHOD } from "@/components/constants/method";
import MuiDialog from "@/components/dialog/Dialog";
import { appEnqueueSnackbar } from "@/components/helper/snackbar";
import { SUCCESS } from "@/firebase/constants/message";
import useWork from "@/firebase/custom/useWork";
import { transformData, getValidationErrors } from "@/firebase/helper/data";
import { useFormChanged } from "@/hooks/useFormChanged";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesPrompt";
import { CreateWorkSchema } from "@/model/work-form";
import { clearWorkToCreate } from "@/redux/features/work/workDialogSlice";
import { clearWorkForm, INITIAL_STATE, setWorkFormError } from "@/redux/features/work/workFormSlice";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import React, { useCallback } from "react";
import WorkForm from "./WorkForm";

const CreateWorkDialog = () => {
  const dispatch = useAppDispatch();
  const workToCreate = useAppSelector((state) => state.workDialogSlice.workToCreate);

  const onClose = useCallback(() => {
    dispatch(clearWorkForm());
    dispatch(clearWorkToCreate());
  }, [dispatch]);

  const { error, ...form } = useAppSelector((state) => state.workFormSlice);

  const { isChanged } = useFormChanged(form, INITIAL_STATE);
  useUnsavedChangesWarning(isChanged);

  const { isLoading, createWorkApi } = useWork();

  const onCreateWork = useCallback(async () => {
    const data = await createWorkApi(form);
    if (data.status === "failed") {
      appEnqueueSnackbar({
        variant: "error",
        message: data.message,
      });
      return;
    }
    onClose();
    appEnqueueSnackbar({
      variant: "success",
      message: SUCCESS.WORK_CREATED,
    });
  }, [createWorkApi, onClose, dispatch]);

  const onValidateWork = useCallback(() => {
    const clearFormData = transformData(form, METHOD.POST);
    const workValidation = CreateWorkSchema.safeParse(clearFormData);
    if (!workValidation.success) {
      const error = getValidationErrors(workValidation);
      dispatch(setWorkFormError(error));
      return;
    }
    onCreateWork();
  }, [dispatch, form, onCreateWork]);

  return (
    <MuiDialog
      title={"Create Work"}
      onConfirm={onValidateWork}
      onClose={onClose}
      confirmText="Save Work"
      variant="form"
      maxWidth="md"
      fullWidth
      open={Boolean(workToCreate)}
      promptUnsaved={isChanged}
    >
      <WorkForm />
    </MuiDialog>
  );
};

export default CreateWorkDialog;
