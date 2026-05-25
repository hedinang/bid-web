import {Avatar, Dropdown, Image, Input} from "antd";
import {IoCartSharp, IoSearchOutline} from "react-icons/io5";
import {MdAccountCircle, MdEmail, MdPhone} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import "./style.scss";
// import {useCartContext} from "../../context/CartContext";
import React, {useMemo, useState} from "react";
import {LoginModal} from "../modal/LoginModal";
import {useLayoutContext} from "../../context/LayoutContext";
import {ProfileModal} from "../modal/ProfileModal";
import {FaFaceLaugh} from "react-icons/fa6";
import {SettingsModal} from "../modal/SettingsModal";
import {IoMdHome} from "react-icons/io";
import {GiWhiteBook} from "react-icons/gi";
import {FaUser} from "react-icons/fa";
import {useImageLoader} from "../../hooks/ImageLoader";
import {getColorFromInitial} from "../../utils/Utils";

const MeDropdown = ({}) => {
  const {me, logout} = useLayoutContext();
  const {imageUrl, setImageUrl} = useImageLoader(me?.avatar);
  const [isPreview, setIsPreview] = useState(false);
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

  const options = [{
    key: "profile", label: <button onClick={openProfileModal}>Thông tin tài khoản</button>,
  }, {
    key: "setting", label: <button onClick={openModalSettings}>Cài đặt</button>,
  }, {
    key: "logout", label: <button onClick={logout}>Đăng xuất</button>,
  },];

  const genderAvatar = useMemo(() => {
    return (
        <>
          <Avatar
              style={
                  !me?.avatar && {
                    backgroundColor: getColorFromInitial(me?.name),
                    color: "white",
                  }
              }
              size={50}
              onClick={() => setIsPreview(true)}
              src={imageUrl}
          >
            {!me?.avatar && me?.name}
          </Avatar>
          {imageUrl && (
              <Image
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: isPreview,
                    onVisibleChange: (visible) => setIsPreview(visible),
                  }}
                  src={imageUrl}
              />
          )}
        </>
    );
  }, [me, isPreview, imageUrl]);

  return (<div>
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
        {genderAvatar}
        <div>{me?.name}</div>
      </button>
    </Dropdown>

    {isModalProfileOpen && (<ProfileModal
        closeModal={closeProfilerModal}
        isModalOpen={isModalProfileOpen}
    />)}

    {isOpenModalSettings && (<SettingsModal
        open={isOpenModalSettings}
        onCancel={closeModalSettings}
    />)}
  </div>);
};

export const Header = () => {
  const navigate = useNavigate();

  const {me} = useLayoutContext();
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const generateLabel = (text, key) => (<button
      onClick={(e) => {
        e.stopPropagation();
        handleMenuClick(key);
      }}
  >
    {text}
  </button>);

  const conversationOption = [{
    key: "vn", label: generateLabel("sim việt nam", "vn"), children: [{
      key: "viettel", label: generateLabel("sim việt nam", "vn"),
    }, {
      key: "vina", label: generateLabel("sim việt nam", "vn"),
    }, {
      key: "mobile", label: generateLabel("sim việt nam", "vn"),
    },],
  }, {
    key: "hk", label: generateLabel("sim hong kong", "hk"),
  }, {
    key: "tw", label: generateLabel("sim đài loan", "tw"),
  },];

  const handleMenuClick = (e) => {
    navigate(`/sim/search/${e}`);
  };

  const cancelLogin = () => {
    setIsOpenLogin(false);
  };

  return (<>
    <div className="desktop-topbar-1">
      <button className="logo" onClick={() => navigate("/nation-list")}>
        Stjtrading.com
      </button>

      <Input
          placeholder={"Bạn tìm gì..."}
          className="max-w-[500px] min-w-[200px]"
          prefix={<IoSearchOutline size={15}/>}
          allowClear
      />

      <div className="flex items-center gap-[1px]">
        <MdPhone size={18}/>
        <div>0982992628</div>
      </div>
      {me ? (<MeDropdown/>) : (<button
          className="flex items-center gap-[1px]"
          onClick={() => setIsOpenLogin(true)}
      >
        <MdAccountCircle size={18}/>
        <div>Đăng nhập</div>
      </button>)}
    </div>

    <div className="mobile-topbar-1">
      <button className="logo" onClick={() => navigate("/nation-list")}>
        Stjtrading.com
      </button>

      {me ? (<MeDropdown/>) : (<button
          className="flex items-center gap-[1px]"
          onClick={() => setIsOpenLogin(true)}
      >
        <MdAccountCircle size={18}/>
        <div>Đăng nhập</div>
      </button>)}
    </div>

    <div className="desktop-topbar-2">
      <button onClick={() => navigate("/nation-list")}>Trang chủ</button>
      {me && <button onClick={() => navigate("/cart")}>Đơn hàng</button>}
      <div>Chính sách</div>
      {["ADMIN", "SUPER_ADMIN"].includes(me?.role) && (<>
        <button onClick={() => navigate("/user-list")}>
          Danh sách người dùng
        </button>
        <button onClick={() => navigate("/mail-list")}>
          Danh sách email
        </button>
      </>)}
    </div>

    <div className="mobile-topbar-2">
      <button onClick={() => navigate("/nation-list")}><IoMdHome color="#46ac40" size={40}/></button>
      {me && <button onClick={() => navigate("/cart")}><IoCartSharp size={40} color="#2a56c9"/></button>}
      <div><GiWhiteBook size={32} color="#fccc14"/></div>
      {["ADMIN", "SUPER_ADMIN"].includes(me?.role) && (<>
        <button onClick={() => navigate("/user-list")}>
          <FaUser size={30} color="#46ac40"/>
        </button>
        <button onClick={() => navigate("/mail-list")}>
          <MdEmail size={36} color="#2a56c9"/>
        </button>
      </>)}
    </div>

    {isOpenLogin && <LoginModal open={isOpenLogin} onCancel={cancelLogin}/>}
  </>);
};
