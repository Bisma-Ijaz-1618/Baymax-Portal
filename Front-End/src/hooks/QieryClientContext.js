import React, { createContext, useContext } from "react";
import { QueryClient } from "react-query";

const QueryClientContext = createContext();

export const useQueryClientContext = () => {
  return useContext(QueryClientContext);
};

export const QueryClientProvider = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientContext.Provider value={queryClient}>
      {children}
    </QueryClientContext.Provider>
  );
};
