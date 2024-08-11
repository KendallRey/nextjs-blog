import { TEXT } from "@/components/helper/field";
import MuiTextField from "@/components/text-field/TextField";
import { editWorkForm } from "@/redux/features/work/workFormSlice";
import { getInputRecord, InputRecord } from "@/redux/helper/input";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import React, { useCallback } from "react";

const WorkForm = () => {
  const dispatch = useAppDispatch();

  const { error, ...form } = useAppSelector((state) => state.workFormSlice);

  const onChangeWorkForm = useCallback(
    (e: InputRecord) => {
      const record = getInputRecord(e);
      dispatch(editWorkForm(record));
    },
    [dispatch],
  );

  return (
    <div className="flex flex-col gap-2">
      <MuiTextField
        label="Title"
        name="Title"
        value={form.title || ""}
        onChange={onChangeWorkForm}
        maxLength={TEXT.MAX.TITLE}
        errorText={error?.title}
      />
      <MuiTextField
        multiline
        label="Description"
        name="description"
        value={form.description || ""}
        rows={2}
        onChange={onChangeWorkForm}
        maxLength={TEXT.MAX.LONG}
        errorText={error?.description}
      />
    </div>
  );
};

export default WorkForm;
