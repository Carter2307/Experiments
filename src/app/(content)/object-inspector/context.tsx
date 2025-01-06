"use client";

import React, { ReactNode } from "react";

type AppProps = {
  pixels: number;
};

export const AppContext = React.createContext<AppProps>({
  pixels: 0,
});

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AppContext.Provider value={{ pixels: 0 }}>
      {children}
    </AppContext.Provider>
  );
}
