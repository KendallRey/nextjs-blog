import { IWorkModel } from "@/model/work-model";
import { REDUX } from "@/redux/constant/slice";
import { clearAction, setAction } from "@/redux/helper/action";
import { createSlice } from "@reduxjs/toolkit";

type IWorkDialogState = {
  workToCreate?: IWorkModel;
  workToUpdate?: IWorkModel;
  workToDelete?: IWorkModel;
};

const INITIAL_STATE: IWorkDialogState = {
  workToCreate: undefined,
  workToUpdate: undefined,
  workToDelete: undefined,
};

const workDialogSlice = createSlice({
  name: REDUX.SLICE.WORK_DIALOG,
  initialState: INITIAL_STATE,
  reducers: {
    setWorkToCreate: setAction<IWorkDialogState, Partial<IWorkModel>>("workToCreate"),
    clearWorkToCreate: clearAction("workToCreate"),
    setWorkToUpdate: setAction<IWorkDialogState, Partial<IWorkModel>>("workToUpdate"),
    clearWorkToUpdate: clearAction("workToUpdate"),
    setWorkToDelete: setAction<IWorkDialogState, Partial<IWorkModel>>("workToDelete"),
    clearWorkToDelete: clearAction("workToDelete"),
  },
});

export const {
  setWorkToCreate,
  clearWorkToCreate,
  setWorkToUpdate,
  clearWorkToUpdate,
  setWorkToDelete,
  clearWorkToDelete,
} = workDialogSlice.actions;
export default workDialogSlice.reducer;
