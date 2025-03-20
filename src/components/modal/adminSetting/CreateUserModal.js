import { LoadingOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useInfoUser } from "../../../store/UserStore";
import apiFactory from "../../../api";
import { role } from "../../../config/Constant";
import { GeneralModal } from "../GeneralModal";

const CreateUserModal = ({
  isModalOpen,
  cancelModal,
  title,
  editingUser,
  setUserList,
  userList,
  isActive,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModalResetPW, setIsOpenModalResetPW] = useState(null);
  const [isOpenModalConfirmSave, setIsOpenModalConfirmSave] = useState(null);
  const { languageMap } = useInfoUser();
  const [user, setUser] = useState({
    ...editingUser,
    roleCode: editingUser ? editingUser?.roleCode : "NORMAL",
    birthday: editingUser?.birthday ? dayjs(editingUser?.birthday) : null,
  });

  const [form] = Form.useForm();

  const preventSubmitOnEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onCreate = async (request) => {
    try {
      const result = await apiFactory.userApi.createUser(request);

      if (result?.status !== 200) {
        toast.error(result?.message);
        return;
      }

      if (!isActive) {
        const filteredUserList = userList?.filter(
          (user) => user?.userId !== result?.data?.userId
        );
        setUserList([...filteredUserList]);
        cancelModal();
        return;
      }

      if (userList?.some((user) => user?.userId === result?.data?.userId)) {
        const updatedUserList = userList?.map((user) => {
          if (user?.userId === result?.data?.userId) {
            return {
              ...result?.data,
              birthday: result?.data?.birthday
                ? dayjs(result?.data?.birthday)?.format("YYYY-MM-DD")
                : null,
              isNew: true,
            };
          }

          return { ...user, isNew: false };
        });

        setUserList([...updatedUserList]);
      } else {
        const updatedUserList = userList?.map(({ isNew, ...rest }) => rest);

        updatedUserList?.unshift({
          ...result?.data,
          birthday: result?.data?.birthday
            ? dayjs(result?.data?.birthday)?.format("YYYY-MM-DD")
            : null,
          isNew: true,
        });

        setUserList([...updatedUserList]);
      }

      cancelModal();
    } catch (error) {}
  };

  const onUpdate = async (request) => {
    const result = await apiFactory.userApi.updateUser(request);

    if (result?.status !== 200) {
      toast.error(result?.message);
      return;
    }

    const updatedUserList = userList?.map(({ isNew, ...rest }) => rest);

    const userIndex = updatedUserList?.findIndex(
      (usr) => usr?.userId === request?.userId
    );

    updatedUserList[userIndex] = {
      ...result?.data,
      birthday: result?.data?.birthday
        ? dayjs(result?.data?.birthday)?.format("YYYY-MM-DD")
        : null,
      isNew: true,
    };

    setUserList(
      [...updatedUserList]?.filter((user) => user?.isActive === isActive)
    );
    cancelModal();
  };

  const handleResetPassword = async () => {
    setIsOpenModalResetPW(false);

    try {
      const rs = await apiFactory.userApi.resetPassword(user?.userId);

      if (rs?.status === 200) {
        toast.success("Reset password was successful");
      } else {
        toast.success("Reset password unsuccessfully");
      }
    } catch (error) {
      console.error("Error reset password:", error);
    }
  };

  const handleConfirmCreateUser = async () => {
    setIsOpenModalResetPW(false);
    form.submit();
  };

  const handleCheckExistedUser = async () => {
    try {
      const rs = await apiFactory.userApi.checkExistedUser(
        form.getFieldValue("userId")
      );

      if (rs?.status === 200) {
        if (rs?.data) {
          setIsOpenModalConfirmSave(true);
        } else {
          form.submit();
        }
      }
    } catch (error) {
      cancelModal();
    }
  };

  const onFinish = async (values) => {
    if (values?.roleCode?.trim() !== role.SYSTEM) {
      if (!values?.userId?.trim()) {
        toast.warn("Please enter userId");
        return;
      }

      if (!values?.name?.trim()) {
        toast.warn("Please enter Name");
        return;
      }

      const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d-]+$/;

      if (!regex.test(values?.userId?.trim())) {
        toast.warn("UserId must contain both letters and numbers");
        return;
      }
    }

    setIsLoading(true);

    const formatValue = {
      ...values,
      userId: values?.userId?.trim(),
      name: values?.name?.trim(),
    };

    try {
      if (editingUser) {
        await onUpdate(formatValue);
      } else {
        await onCreate(formatValue);
      }
    } catch (error) {
      console.error("Error fetching alarm list data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const optionsRoleCode = useMemo(
    () => [
      {
        value: role.CUSTOMER,
        label: role.CUSTOMER,
      },
      {
        value: role.ADMIN,
        label: role.ADMIN,
      },
      // {
      //   value: role.SUPER_ADMIN,
      //   label: role.SUPER_ADMIN,
      // },
    ],
    [editingUser]
  );

  return (
    <Modal
      width="500px"
      open={isModalOpen}
      footer={false}
      closeIcon={false}
      onCancel={cancelModal}
      //   title={languageMap?.["modal.labelManagement.title"] ?? "Label management"}
      title={title}
      closable={true}
    >
      <Form
        onFinish={onFinish}
        autoComplete="off"
        layout="horizontal"
        form={form}
        onKeyDown={preventSubmitOnEnter}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={user}
      >
        <Form.Item
          name="userId"
          label="Username"
          rules={[
            {
              required: true,
              message:
                languageMap?.["as.menu.user.message.required"] ?? "Required!",
            },
            {
              pattern: /^[A-Za-z0-9-]+$/,
              message:
                languageMap?.["as.menu.user.message.requiredUserId"] ??
                "Only letters, numbers, and hyphens (-) are allowed!",
            },
          ]}
          normalize={(value) => (value ? value.toUpperCase() : "")}
        >
          <Input maxLength={30} type="text" disabled={editingUser} />
        </Form.Item>
        <Form.Item
          name="name"
          label={languageMap?.["as.menu.user.update.name"] ?? "Name"}
          rules={[
            {
              required: true,
              message:
                languageMap?.["as.menu.user.message.required"] ?? "Required!",
            },
          ]}
          normalize={(value) => (value ? value.toUpperCase() : "")}
        >
          <Input maxLength={30} type="text" />
        </Form.Item>
        <Form.Item
          name="email"
          label={languageMap?.["as.menu.user.update.email"] ?? "Email"}
          rules={[
            {
              message:
                languageMap?.["as.menu.user.message.requiredEmail"] ?? "Email!",
              type: "email",
            },
          ]}
        >
          <Input maxLength={50} type="text" />
        </Form.Item>
        <Form.Item
          name="phone"
          label={languageMap?.["as.menu.user.update.phone"] ?? "Phone"}
        >
          <Input maxLength={30} type="text" />
        </Form.Item>
        <Form.Item
          name="roleCode"
          label={languageMap?.["as.menu.user.update.role"] ?? "Role"}
        >
          <Select size={"middle"} options={optionsRoleCode} />
        </Form.Item>
        {!user?.isActive && (
          <Form.Item
            name="isActive"
            label={languageMap?.["as.menu.user.update.active"] ?? "Active"}
          >
            <Select
              size={"middle"}
              defaultValue={true}
              options={[
                {
                  value: true,
                  label:
                    languageMap?.["as.menu.user.update.activeSelect"] ??
                    "Active",
                },
                {
                  value: false,
                  label:
                    languageMap?.["as.menu.user.update.inactiveSelect"] ??
                    "Inactive",
                },
              ]}
            />
          </Form.Item>
        )}
        {isLoading ? (
          <div className="flex justify-center mt-[10px]">
            <Spin
              indicator={<LoadingOutlined className="loader-icon" spin />}
            />
          </div>
        ) : (
          <div className="flex gap-[10px] justify-center mt-[10px]">
            <Button type="primary" className="bg-[grey]" onClick={cancelModal}>
              {languageMap?.["as.menu.user.update.btnCancel"] ?? "Cancel"}
            </Button>
            <Button
              type="primary"
              className="bg-[#4db74d]"
              onClick={() =>
                editingUser ? form.submit() : handleCheckExistedUser()
              }
            >
              {editingUser
                ? languageMap?.["as.menu.user.update.btnUpdate"] ?? "Update"
                : languageMap?.["as.menu.user.update.btnCreate"] ?? "Create"}
            </Button>
            <Button
              type="primary"
              className="bg-[#4096FF]"
              onClick={() => setIsOpenModalResetPW(true)}
            >
              {languageMap?.["as.menu.user.update.btnResetPassword"] ??
                "Reset password"}
            </Button>
          </div>
        )}
      </Form>
      {isOpenModalResetPW && (
        <GeneralModal
          title={
            languageMap?.["as.menu.user.resetPassword"] ??
            "You want to confirm reset password"
          }
          onCancel={() => setIsOpenModalResetPW(false)}
          open={isOpenModalResetPW}
          onConfirm={handleResetPassword}
        />
      )}
      {isOpenModalConfirmSave && (
        <GeneralModal
          title={
            languageMap?.["as.menu.user.confirmExists"] ??
            "This user already exists in the system. Do you want to add or edit this user?"
          }
          onCancel={() => setIsOpenModalConfirmSave(false)}
          open={isOpenModalConfirmSave}
          onConfirm={handleConfirmCreateUser}
        />
      )}
    </Modal>
  );
};
export { CreateUserModal };
