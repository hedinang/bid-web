import {LeftOutlined, SettingOutlined} from "@ant-design/icons";
import {Button, Divider, Form, Input, Modal} from "antd";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import apiFactory from "../../api";
import {tabSettings} from "../../config/Constant";
import {useInfoUser} from "../../store/UserStore";
import "./style.scss";
import copy from "copy-to-clipboard";

const SettingsModal = ({onCancel, open}) => {
  const {user, languageMap, updateUser, updateLanguageMap} = useInfoUser();
  const [tabNumb, setTabNumb] = useState(tabSettings.CHANGE_PASSWORD);
  const [isLeftSide, setIsLeftSide] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isHasPermissionNotifications, setIsHasPermissionNotifications] =
      useState(false);
  const [loading, setLoading] = useState(false);

  const changeLanguage = async (value) => {
    const params = {
      language: value,
      phone: user?.phone,
      mood: user?.mood,
    };
    const me = await apiFactory.userApi.saveMe(params);

    if (me?.status === 200) {
      updateUser(me?.data?.user);
      updateLanguageMap(me?.data?.languageMap);
    } else {
      toast.error(me?.message);
      updateUser(null);
    }
  };

  const switchTab = (value) => {
    setTabNumb(value);
    setIsLeftSide(false);
  };

  const handleClickLeftSide = () => {
    setIsLeftSide(true);
    setTabNumb(null);
  };

  const handleClickRightSide = () => {
    setIsLeftSide(false);
  };

  const onFinish = async () => {
    setLoading(true);
    try {
      const request = {
        currentPassword,
        newPassword,
      };

      const result = await apiFactory.userApi.changePassword(request);
      if (!result) return;

      if (result.status === 200) {
        toast.success("Thay đổi mật khẩu thành công");
        onCancel();
      } else if (result.status === 500) {
        return toast.error(result.message);
      } else {
        return toast.error(result.message);
      }
    } catch (error) {
      console.error("Error fetching change password data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLinkBrowserNotification = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    let browserNotificationLink = "";

    if (userAgent.includes("firefox")) {
      browserNotificationLink = "about:config";
    } else if (userAgent.includes("samsungbrowser")) {
      browserNotificationLink = "samsung://browser-settings";
    } else if (userAgent.includes("opera") || userAgent.includes("opr")) {
      browserNotificationLink = "opera://settings/content/notifications";
    } else if (userAgent.includes("edge")) {
      browserNotificationLink = "edge://settings/content/notifications";
    } else if (userAgent.includes("chrome")) {
      browserNotificationLink = "chrome://settings/content/notifications";
    } else if (userAgent.includes("safari")) {
      browserNotificationLink = "";
    }
    return browserNotificationLink;
  };

  const openNotificationSettings = (link) => {
    const isSuccess = copy(link);

    if (isSuccess) {
      toast.success(
          `${
              languageMap?.["modal.generalSettings.settingsNotificationAlert"] ??
              "Please paste the following link into your browser"
          }: \n${link}`
      );
    }
  };

  useEffect(() => {
    if ("Notification" in window) {
      setIsHasPermissionNotifications(Notification.permission === "granted");
    }
  }, []);

  const onChangePermissionNotifications = async () => {
    const permission = await Notification.requestPermission();
    setIsHasPermissionNotifications(permission === "granted");
  };

  const renderComponentTab = () => {
    const linkBrowserNotification = getLinkBrowserNotification();

    switch (tabNumb) {
      case tabSettings.CHANGE_PASSWORD: {
        return (
            <div className="py-2">
              <div>
                <div className="settings-right-titles">
                  Thay đổi mật khẩu
                </div>
              </div>
              <div className="flex flex-row bg-white rounded-[15px] mt-[20px] p-[15px] items-center">
                <div className="w-[100%]">
                  <Form name="change_password" className="" onFinish={onFinish}>
                    <div className="mb-2 flex gap-[2px]">
                      <b>Lưu ý:</b>
                      <div>Mật khẩu mới phải khác mật khẩu cũ</div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-[5px]">
                        <b>Mật khẩu hiện tại</b>
                      </div>
                      <div>
                        <Form.Item
                            name="current_password"
                            rules={[
                              {
                                required: true,
                                message:
                                    languageMap?.[
                                        "modal.changePassword.plsCurrentPass"
                                        ] ?? "Please input your current password!",
                              },
                            ]}
                        >
                          <Input.Password
                              id="current_password"
                              placeholder="Nhập mật khẩu hiển tại"
                              onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <Divider style={{borderColor: 'grey'}}/>
                    <div className="mb-3">
                      <div className="mb-[5px]">
                        <b>Mật khẩu mới</b>
                      </div>
                      <div>
                        <Form.Item
                            name="new_password"
                            rules={[
                              {
                                required: true,
                                message:
                                    languageMap?.["modal.changePassword.plsNewPass"] ??
                                    "Please input your new password!",
                              },
                            ]}
                        >
                          <Input.Password
                              id="new_password"
                              placeholder="Nhập mật khẩu mới"
                              onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-[5px]">
                        <b>Xác nhận mật khẩu mới</b>
                      </div>
                      <div>
                        <Form.Item
                            name="confirm_new_password"
                            rules={[
                              {
                                required: true,
                                message:
                                    languageMap?.[
                                        "modal.changePassword.plsConfirmPass"
                                        ] ?? "Please confirm your new password!",
                              },
                            ]}
                        >
                          <Input.Password
                              id="confirm_new_password"
                              placeholder="Xác nhận mật khẩu mới"
                              onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                          className="font-bold font-[16px] "
                          type="primary"
                          htmlType="submit"
                          disabled={
                              !currentPassword.trim() ||
                              !newPassword.trim() ||
                              !confirmPassword.trim() ||
                              newPassword !== confirmPassword ||
                              currentPassword === newPassword
                          }
                      >
                        Lưu
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
        );
      }
      default: {
        return <></>;
      }
    }
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth > 768) {
  //       setTabNumb(tabSettings.CHANGE_PASSWORD);
  //     }
  //   };
  //
  //   handleResize();
  //
  //   window.addEventListener("resize", handleResize);
  //
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
      <Modal
          open={open}
          onCancel={onCancel}
          footer={null}
          closeIcon={true}
          width={800}
          title={
            <>
              <div className="flex flex-row">
                {!isLeftSide && (
                    <a className="btn-back-to-settings" onClick={handleClickLeftSide}>
                      <LeftOutlined/>
                    </a>
                )}
                <div className="ml-3">
              <span className="settings-title">
                Cài đặt
              </span>
                </div>
              </div>
            </>
          }
          titleFontSize={24}
          className="mb-5"
      >
        <div className="desktop">
          <div className="list-group">
            <div className="list-group-column pr-4">
              <ul className="mt-5">
                {/* <li
                className={
                  tabNumb === tabSettings.GENERAL_SETTINGS ? "tab-active" : ""
                }
                onClick={() => {
                  switchTab(tabSettings.GENERAL_SETTINGS);
                  handleClickRightSide();
                }}
              >
                <SettingOutlined className="items-center pr-2" />
                <span className="settings-left-titles">
                  {languageMap?.["modal.generalSettings.tabName"] ??
                    "General settings"}
                </span>
              </li> */}

                <li
                    className={
                      tabNumb === tabSettings.CHANGE_PASSWORD ? "tab-active" : ""
                    }
                    onClick={() => {
                      switchTab(tabSettings.CHANGE_PASSWORD);
                      handleClickRightSide();
                    }}
                >
                  <SettingOutlined className="items-center pr-2"/>
                  <span className="settings-left-titles">
                  Thay đổi mật khẩu
                  </span>
                </li>
              </ul>
            </div>
            <div className="list-group-column p-5" key={tabNumb}>
              {tabNumb && renderComponentTab()}
            </div>
          </div>
        </div>
        <div className="mobile">
          <div className="list-group">
            <div
                className={
                  isLeftSide
                      ? "block list-group-column"
                      : "hidden list-group-column"
                }
            >
              <ul className="mt-5">
                <li
                    className={
                      tabNumb === tabSettings.GENERAL_SETTINGS ? "tab-active" : ""
                    }
                    onClick={() => switchTab(tabSettings.GENERAL_SETTINGS)}
                >
                  <SettingOutlined className="items-center pr-2"/>
                  <span className="settings-left-titles">
                  {languageMap?.["modal.generalSettings.tabName"] ??
                      "General settings"}
                </span>
                </li>
                <li
                    className={
                      tabNumb === tabSettings.CHANGE_PASSWORD ? "tab-active" : ""
                    }
                    onClick={() => switchTab(tabSettings.CHANGE_PASSWORD)}
                >
                  <SettingOutlined className="items-center pr-2"/>
                  <span className="settings-left-titles">
                  Thay đổi mật khẩu
                </span>
                </li>
              </ul>
            </div>
            <div
                className={
                  isLeftSide
                      ? "hidden list-group-column mt-5 pt-10 ml-5"
                      : "block list-group-column p-3"
                }
                key={tabNumb}
            >
              {tabNumb && renderComponentTab()}
            </div>
          </div>
        </div>
      </Modal>
  );
};

export {SettingsModal};
