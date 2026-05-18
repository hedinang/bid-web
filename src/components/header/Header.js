import { Dropdown, Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { MdAccountCircle, MdPhone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./style.scss";
// import {useCartContext} from "../../context/CartContext";
import { useState } from "react";
import { LoginModal } from "../modal/LoginModal";
import { useLayoutContext } from "../../context/LayoutContext";
import { ProfileModal } from "../modal/ProfileModal";
import { FaFaceLaugh } from "react-icons/fa6";
import { SettingsModal } from "../modal/SettingsModal";

const MeDropdown = ({}) => {
  const { me, logout } = useLayoutContext();
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);
  const [isOpenModalSettings, setIsOpenModalSettings] = useState(false);

  const openProfileModal = () => {
    setIsModalProfileOpen(true);
  };

  const closeProfilerModal = () => {
    setIsModalProfileOpen(false);
  };

  const openModalSettings = () => {
    setIsOpenModalSettings(true);
  };

  const closeModalSettings = () => {
    setIsOpenModalSettings(false);
  };

  const options = [
    {
      key: "profile",
      label: <button onClick={openProfileModal}>Thông tin tài khoản</button>,
    },
    {
      key: "setting",
      label: <button onClick={openModalSettings}>Cài đặt</button>,
    },
    {
      key: "logout",
      label: <button onClick={logout}>Đăng xuất</button>,
    },
  ];

  return (
    <div>
      <Dropdown
        menu={{
          items: options, // onClick: handleMenuClick,
        }}
        placement="bottomLeft"
        trigger={["hover"]}
      >
        <button
          className="flex gap-[5px] items-center"
          type="text"
          size="small"
          onClick={(e) => e?.stopPropagation?.()}
        >
          <FaFaceLaugh size={25} />
          <div>{me?.username}</div>
        </button>
      </Dropdown>

      {isModalProfileOpen && (
        <ProfileModal
          closeModal={closeProfilerModal}
          isModalOpen={isModalProfileOpen}
        />
      )}

      {isOpenModalSettings && (
        <SettingsModal
          open={isOpenModalSettings}
          onCancel={closeModalSettings}
        />
      )}
    </div>
  );
};

export const Header = () => {
  const navigate = useNavigate();

  const { me } = useLayoutContext();
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const generateLabel = (text, key) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleMenuClick(key);
      }}
    >
      {text}
    </button>
  );

  const conversationOption = [
    {
      key: "vn",
      label: generateLabel("sim việt nam", "vn"),
      children: [
        {
          key: "viettel",
          label: generateLabel("sim việt nam", "vn"),
        },
        {
          key: "vina",
          label: generateLabel("sim việt nam", "vn"),
        },
        {
          key: "mobile",
          label: generateLabel("sim việt nam", "vn"),
        },
      ],
    },
    {
      key: "hk",
      label: generateLabel("sim hong kong", "hk"),
    },
    {
      key: "tw",
      label: generateLabel("sim đài loan", "tw"),
    },
  ];

  const handleMenuClick = (e) => {
    navigate(`/sim/search/${e}`);
  };

  const cancelLogin = () => {
    setIsOpenLogin(false);
  };

  return (
    <>
      <div className="desktop-topbar-1">
        <button className="logo" onClick={() => navigate("/nation-list")}>
          Stjtrading.com
        </button>

        <Input
          placeholder={"Bạn tìm gì..."}
          className="max-w-[500px] min-w-[200px]"
          prefix={<IoSearchOutline size={15} />}
          allowClear
        />

        <div className="flex items-center gap-[1px]">
          <MdPhone size={18} />
          <div>0982992628</div>
        </div>
        {me ? (
          <MeDropdown />
        ) : (
          <button
            className="flex items-center gap-[1px]"
            onClick={() => setIsOpenLogin(true)}
          >
            <MdAccountCircle size={18} />
            <div>Đăng nhập</div>
          </button>
        )}
      </div>

      <div className="mobile-topbar-1">
        <button className="logo" onClick={() => navigate("/nation-list")}>
          Stjtrading.com
        </button>

        {me ? (
          <MeDropdown />
        ) : (
          <button
            className="flex items-center gap-[1px]"
            onClick={() => setIsOpenLogin(true)}
          >
            <MdAccountCircle size={18} />
            <div>Đăng nhập</div>
          </button>
        )}
      </div>

      <div className="topbar-2">
        <button onClick={() => navigate("/nation-list")}>Trang chủ</button>
        {me && <button onClick={() => navigate("/cart")}>Đơn hàng</button>}
        <div>Chính sách</div>
        {["ADMIN", "SUPER_ADMIN"].includes(me?.role) && (
          <>
            <button onClick={() => navigate("/user-list")}>
              Danh sách người dùng
            </button>
            <button onClick={() => navigate("/mail-list")}>
              Danh sách email
            </button>
          </>
        )}
      </div>

      {isOpenLogin && <LoginModal open={isOpenLogin} onCancel={cancelLogin} />}
    </>
  );
};
