import { Outlet } from "react-router-dom";
import { Footer } from "../footer/Footer";

/* eslint-disable react-hooks/exhaustive-deps */
export const PublicLayout = ({ children }) => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};
