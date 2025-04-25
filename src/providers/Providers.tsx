"use client";

import UserProvider from "@/contexts/UserContext";
import StoreProviders from "./StoreProviders";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <StoreProviders>{children}</StoreProviders>
    </UserProvider>
  );
};

export default Providers;
