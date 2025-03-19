import { Button, Input, Popover, Switch, Table } from "antd";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { useSideBarStore } from "../../store/SideBarStore";

const UserManagement = () => {
  const [userSearch, setUserSearch] = useState({
    limit: 30,
    skip: 0,
    userName: null,
    isActive: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreData, setIsLoadMoreData] = useState(true);
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const [isRemoveUserModal, setIsRemoveUserModal] = useState(false);
  const [removingUserId, setRemovingUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpenModalResetPW, setIsOpenModalResetPW] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 860);
  //   const { user, languageMap } = useInfoUser();
  const { switchIsWorkManagementOptions, isWorkManagementOptions } =
    useSideBarStore((state) => state);
  const [userList, setUserList] = useState([]);

  const columns = [
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
      width: "150px",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "100px",
      render: (text, record) =>
        record?.isActive ? (
          <Button
            className="bg-[#e00d0d] text-[white]"
            onClick={() => {
              setIsRemoveUserModal(true);
              setRemovingUserId(record?.userId);
            }}
            icon={<FiTrash className="text-[18px]" />}
          />
        ) : null,
    },
  ];

  const rowClassName = (record) => {
    return record?.isNew ? "bg-[#ffe678]" : "";
  };

  return (
    <div>
      <div className="font-semibold text-[20px] pl-[16px] pt-[16px]  flex items-center">
        User
      </div>
      <div className="p-[16px]">
        <div className="user-list ">
          <div className="flex justify-between mb-[10px]">
            <div className="flex justify-center items-center">
              <Popover
                //   content={languageMap?.["as.menu.user.placeHolderSearch"] ?? "Search user code, username, email"}
                trigger="hover"
              >
                <Input
                  className="w-full mr-2"
                  //   placeholder={languageMap?.["as.menu.user.placeHolderSearch"] ?? "Search user code, username, email"}
                  //   onChange={(e) => debouncedSetUsernameSearch(e)}
                  allowClear
                />
              </Popover>
              <Popover
                //   content={userSearch?.isActive ? languageMap?.["as.menu.user.btnActive"] ?? "Active" : languageMap?.["as.menu.user.btnInactive"] ?? "Inactive"}
                trigger="hover"
              >
                <Switch
                  value={userSearch?.isActive}
                  style={{ zoom: isMobile && "0.7" }}
                  className="ml-2 w-[10px]"
                  onChange={(checked, e) => {
                    // scrollToTopTable();
                    setIsLoadMoreData(true);
                    setUserSearch({
                      ...userSearch,
                      limit: 30,
                      skip: 0,
                      isActive: checked,
                    });
                  }}
                />
              </Popover>
            </div>
            <Button
              className="ml-2"
              type="primary"
              //   onClick={onAdd}
              style={{ zoom: isMobile && "0.9" }}
            >
              Create User
            </Button>
          </div>
          <div className="">
            <Table
              columns={columns}
              dataSource={userList}
              pagination={false}
              loading={isLoading}
              size={"middle"}
              className="max-h-[1000px]"
              rowClassName={rowClassName}
              //   onRow={(record, index) => ({
              //     onDoubleClick: (e) => onDoubleClick(record),
              //     className: getSelectedColor(record),
              //     ref: index === userList?.length - 1 ? lastRecordRef : null,
              //   })}
              //   scroll={
              //     isMobile
              //       ? {
              //           x: 700,
              //           y: 420,
              //         }
              //       : {
              //           x: 1000,
              //           y: 700,
              //         }
              //   }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserManagement };
