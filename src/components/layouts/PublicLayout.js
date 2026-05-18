import {Outlet} from "react-router-dom";
import {Footer} from "../footer/Footer";
import {Header} from "../header/Header";

/* eslint-disable react-hooks/exhaustive-deps */
export const PublicLayout = ({children}) => {
  return (
      <div className="">
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
  );
};
