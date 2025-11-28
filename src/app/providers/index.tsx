import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./query";
import { AppRouter } from "./router";

export const Providers = () => {
  return (
    <QueryProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryProvider>
  );
};


