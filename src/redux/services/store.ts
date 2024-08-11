import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import sampleSlice from "../features/sample/sampleSlice";
import { sampleApi } from "../features/sample/sampleApi";
import unsavedChangesSlice from "../features/prompt/unsavedChangesSlice";
import workFormSlice from "../features/work/workFormSlice";
import workSlice from "../features/work/workSlice";
import workDialogSlice from "../features/work/workDialogSlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  sampleSlice: sampleSlice,
  workSlice: workSlice,
  workDialogSlice: workDialogSlice,
  workFormSlice: workFormSlice,
  [sampleApi.reducerPath]: sampleApi.reducer,
  unsavedChangesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat([sampleApi.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
