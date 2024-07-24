"use client";

import { persistor, store } from "@/redux/services/store";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SESSION } from "@/constants/SESSION";
import { MuiTheme } from "@/components/theme/theme";

type IProviders = {
  children: React.ReactNode;
};

export const Providers: React.FC<IProviders> = (props) => {
  const { children } = props;

  return (
    // <SessionProvider refetchInterval={SESSION.LIFE_TIME}>
    <SnackbarProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={MuiTheme}>{children}</ThemeProvider>
        </PersistGate>
      </Provider>
    </SnackbarProvider>
    // </SessionProvider>
  );
};

export default Providers;
