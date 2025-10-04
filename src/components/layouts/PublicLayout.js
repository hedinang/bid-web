import { Button } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useInfoUser } from "../../store/UserStore";
import { verifiedAccessToken } from "../../utils/Utils";
import { Footer } from "../footer/Footer";

/* eslint-disable react-hooks/exhaustive-deps */
export const PublicLayout = ({ children }) => {
  const { updateUser } = useInfoUser();

  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  const process = async () => {
    setVerified(await verifiedAccessToken(updateUser));

    if (await verifiedAccessToken(updateUser)) {
      navigate("/inside/bid/bid-list");
    }
  };

  const logout = async () => {
    // await apiFactory.userApi.logout();
    // Cookies.remove("access_token");
    navigate("/login");
  };

  useEffect(() => {
    process();
  }, []);

  return (
    <div className="flex flex-col min-h-[100vh] justify-between">
      <Outlet />
      <div className="absolute top-[20px] right-[10px]">
        <Button type="primary" onClick={logout}>
          login
        </Button>
      </div>
      <Footer />
    </div>
  );
};
