import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";

export const Providers = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};


