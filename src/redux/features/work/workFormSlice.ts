import { IWorFormSchema } from "@/model/work-form";
import { REDUX } from "@/redux/constant/slice";
import { editFormAction, setFormAction, setFormErrorAction } from "@/redux/helper/action";
import { createSlice } from "@reduxjs/toolkit";

type IWorkFormState = IReduxFormState<IWorFormSchema>;

export const INITIAL_STATE: IWorkFormState = {
  error: {}
}

const workFormSlice = createSlice({
  name: REDUX.SLICE.WORK_FORM,
  initialState: INITIAL_STATE,
  reducers: {
    setWorkForm: setFormAction<IWorFormSchema>,
    editWorkForm: editFormAction<IWorFormSchema>,
    setWorkFormError: setFormErrorAction<IWorFormSchema>,
    clearWorkForm: () => INITIAL_STATE, 
  },
});

export const {
  setWorkForm,
  editWorkForm,
  setWorkFormError,
  clearWorkForm,
} = workFormSlice.actions;
export default workFormSlice.reducer;
