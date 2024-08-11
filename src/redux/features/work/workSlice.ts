import { REDUX } from "@/redux/constant/slice";
import { createSlice } from "@reduxjs/toolkit";

type IWorkState = {
  filters: IFilters;
};

const INITIAL_STATE: IWorkState = {
  filters: {},
};

const workSlice = createSlice({
  name: REDUX.SLICE.WORK,
  initialState: INITIAL_STATE,
  reducers: {},
});

export default workSlice.reducer;
