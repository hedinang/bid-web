import { Layout, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useInfoUser } from "../../store/UserStore";
import { verifiedAccessToken } from "../../utils/Utils";
import { SideBar } from "../sideBar";
import "./style.scss";
import { Footer } from "../footer/Footer";

const AuthLayout = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { updateUser } = useInfoUser();

  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  const process = async () => {
    setVerified(verifiedAccessToken(updateUser));

    if (!verifiedAccessToken(updateUser)) {
      if (!searchParams.get("callback")) {
        navigate("/login");
      } else {
        navigate("/login?callback=" + searchParams.get("callback"));
      }
    } else {
      // navigate("/admin/bid-list");
      // if (!searchParams.get("callback")) {
      //   window.location.href = CHAT_WEB;
      // } else {
      //   window.location.href = searchParams.get("callback");
      // }
    }
  };

  useEffect(() => {
    process();
  }, []);

  return (
    <Space className="space-app" direction="vertical" size={[0, 48]}>
      {verified && (
        <Layout className="layout-app">
          <SideBar />
          <Layout.Content>
            <div className="flex flex-col min-h-[100vh] justify-between">
              <Outlet />
              <Footer />
            </div>
          </Layout.Content>
        </Layout>
      )}
    </Space>
  );
};

export default AuthLayout;
