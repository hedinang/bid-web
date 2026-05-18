import {Outlet, useNavigate} from "react-router-dom";
import {Footer} from "../footer/Footer";
import {Header} from "../header/Header";
import {useLayoutContext} from "../../context/LayoutContext";
import {useEffect} from "react";

/* eslint-disable react-hooks/exhaustive-deps */
export const PublicLayout = ({children}) => {
  const navigate = useNavigate();

  const {me, pageLink} = useLayoutContext()

  useEffect(() => {
    if (!me && !["BID_LIST", "ITEM_LIST", "ITEM_DETAIL"].includes(pageLink)) {
      navigate("/bid-list");
    }
  }, [me])

  return (
      <div className="">
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
  );
};
