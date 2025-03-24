import { Button, Divider, Image, Modal, Pagination, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import apiFactory from "../../api";
import { role } from "../../config/Constant";
import { useInfoUser } from "../../store/UserStore";
import { formatTime } from "../../utils/formatTime";
import { IoHammerOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const ROOL_WEB = process.env.REACT_APP_WEB || "https://stjtrading.com/";

const Order = ({ order, changeOrderStatus, setClientDetail }) => {
  const { user } = useInfoUser();

  const showStatus = () => {
    if (order?.type === "ORDER")
      return (
        <div className="px-[10px] bg-[#2a56b9] text-[white] py-[10px] rounded-[2px]">
          Đợi đặt
        </div>
      );

    if (order?.type === "BIDDING")
      return (
        <div className="px-[10px] bg-[#c9ac12] text-[white] py-[10px] rounded-[2px]">
          Đã đặt
        </div>
      );

    if (order?.type === "CANCEL")
      return (
        <div className="px-[10px] bg-[#e81224] text-[white] py-[10px] rounded-[2px]">
          Hủy đặt
        </div>
      );

    if (order?.type === "SUCCESS")
      return (
        <div className="px-[10px] bg-[#78b43d] text-[white] py-[10px] rounded-[2px]">
          Đấu thành công
        </div>
      );

    if (order?.type === "FAILED")
      return (
        <div className="px-[10px] bg-[#dd5930] text-[white] py-[10px] rounded-[2px]">
          Đấu thất bại
        </div>
      );
  };

  const showAction = () => {
    if (order?.type === "ORDER") {
      if (user?.role === role.CUSTOMER) {
        return (
          <Button
            className="bg-[#e00d0d] text-[white]"
            onClick={() => changeOrderStatus(order, "CANCEL")}
            icon={<FiTrash className="text-[18px]" />}
          />
        );
      } else {
        return (
          <Button
            className="bg-[#2a56b9] text-[white]"
            onClick={() => changeOrderStatus(order, "BIDDING")}
            icon={<IoHammerOutline className="text-[18px]" />}
          />
        );
      }
    }

    if (order?.type === "CANCEL") {
      if (user?.role === role.CUSTOMER) {
        return (
          <Button
            className="bg-[green] text-[white]"
            onClick={() => changeOrderStatus(order, "ORDER")}
            icon={<IoMdRefresh className="text-[18px]" />}
          />
        );
      }
    }

    if (order?.type === "BIDDING") {
      if (user?.role !== role.CUSTOMER) {
        return (
          <div className="flex gap-[10px] justify-center">
            <Button
              className="bg-[green] text-[white]"
              onClick={() => changeOrderStatus(order, "SUCCESS")}
              icon={<FaCheck className="text-[18px]" />}
            />
            <Button
              className="bg-[grey] text-[white]"
              onClick={() => changeOrderStatus(order, "FAILED")}
              icon={<FaInfoCircle className="text-[18px]" />}
            />
          </div>
        );
      }
    }
  };

  return (
    <div className="flex flex-col gap-[5px]">
      {user?.role !== role.CUSTOMER && (
        <div className="flex items-center">
          <div className="w-[100px] font-semibold">Username: </div>
          <Button
            type="primary"
            onClick={() => {
              setClientDetail(order);
            }}
          >
            {order?.username}
          </Button>
        </div>
      )}
      <div className="flex items-center">
        <div className="w-[100px] font-semibold"></div>
        <div className="flex justify-center">
          <button>
            <Image.PreviewGroup items={order?.detailUrls}>
              <Image width={100} src={order?.detailUrls?.[0]} />
            </Image.PreviewGroup>
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[100px] font-semibold">Item Id: </div>
        <div>
          {user?.role === role?.CUSTOMER ? (
            <a
              href={ROOL_WEB + "/inside/bid/item-detail/" + order?.itemId}
              target="_blank"
              className="text-[blue]"
            >
              {order?.itemId}
            </a>
          ) : (
            <a href={order?.itemUrl} target="_blank" className="text-[blue]">
              {order?.itemId}
            </a>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[100px] font-semibold">Title: </div>
        <div className="flex-1">{order?.title}</div>
      </div>
      <div className="flex items-center">
        <div className="w-[100px] font-semibold">Category: </div>
        <div>{order?.category}</div>
      </div>
      <div className="flex items-center">
        <div className="w-[100px] font-semibold">Branch: </div>
        <div>{order?.branch}</div>
      </div>
      <div className="flex items-center">
        <div className="w-[100px] font-semibold">Rank: </div>
        <div>{order?.rank}</div>
      </div>
      <div className="flex items-center">
        <div className="w-[100px] font-semibold">Bid Price: </div>
        <div>{order?.bidPrice}</div>
      </div>
      <div className="flex items-center">
        <div className="w-[100px] font-semibold">Order date: </div>
        <div>{formatTime(order?.updatedAt)}</div>
      </div>
      <div className="flex items-center">
        <div className="w-[100px] font-semibold">Status: </div>
        <div>{showStatus()}</div>
      </div>
      <div className="flex items-center">
        <div className="w-[100px] font-semibold">Action: </div>
        <div>{showAction()}</div>
      </div>
      <Divider style={{ borderColor: "#7cb305" }} />
    </div>
  );
};

const OrderList = () => {
  const { user } = useInfoUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [clientDetail, setClientDetail] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [searchOrder, setSearchOrder] = useState({
    limit: 15,
    page: 1,
    // searchBranch: "",
    // searchRank: "",
  });

  const changePage = (e) => {
    setSearchOrder({
      ...searchOrder,
      page: e,
    });
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    const result = await apiFactory.orderApi.list(searchOrder);

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }
    setIsLoading(false);
    const data = result?.data?.items?.map((e) => ({
      ...e,
      action: e?.type,
    }));
    setOrderList([...data]);
    setTotalOrder(result?.data?.totalItems);
  };

  const columns = useMemo(() => {
    let rawColumn = [
      {
        // title: "Bid Id",
        dataIndex: "detailUrls",
        align: "center",
        key: "deptCd",
        render: (e) => {
          return (
            <div className="flex justify-center">
              <button>
                <Image.PreviewGroup items={e}>
                  <Image width={100} src={e?.[0]} />
                </Image.PreviewGroup>
              </button>
            </div>
          );
        },
      },
      {
        title: "Item Id",
        dataIndex: "itemId",
        align: "center",
        key: "itemId",
        render: (e, record) => {
          return user?.role === role?.CUSTOMER ? (
            <a
              href={ROOL_WEB + "/inside/bid/item-detail/" + e}
              target="_blank"
              className="text-[blue]"
            >
              {e}
            </a>
          ) : (
            <a href={record?.itemUrl} target="_blank" className="text-[blue]">
              {e}
            </a>
          );
        },
      },
      {
        title: "Title",
        dataIndex: "title",
        align: "center",
        key: "deptAbbr",
        width: "400px",
      },
      {
        title: "Category",
        dataIndex: "category",
        align: "center",
        key: "openDate",
      },
      {
        title: "Branch",
        dataIndex: "branch",
        align: "center",
        key: "opStatCd",
        width: "140px",
      },
      {
        title: "Rank",
        dataIndex: "rank",
        align: "center",
        key: "highDeptNm",
      },
      {
        title: "Bid Price",
        dataIndex: "bidPrice",
        align: "center",
        key: "workClsCd",
        width: "80px",
      },
      {
        title: "Order Date",
        dataIndex: "updatedAt",
        align: "center",
        key: "workClsCd",
        render: (e) => formatTime(e),
        width: "100px",
      },
      {
        title: "Status",
        dataIndex: "type",
        align: "center",
        key: "workClsCd",
        render: (e) => {
          if (e === "ORDER")
            return (
              <div className="bg-[#2a56b9] text-[white] py-[10px] rounded-[2px]">
                Đợi đặt
              </div>
            );

          if (e === "BIDDING")
            return (
              <div className="bg-[#c9ac12] text-[white] py-[10px] rounded-[2px]">
                Đã đặt
              </div>
            );

          if (e === "CANCEL")
            return (
              <div className="bg-[#e81224] text-[white] py-[10px] rounded-[2px]">
                Hủy đặt
              </div>
            );

          if (e === "SUCCESS")
            return (
              <div className="bg-[#78b43d] text-[white] py-[10px] rounded-[2px]">
                Đấu thành công
              </div>
            );

          if (e === "FAILED")
            return (
              <div className="bg-[#dd5930] text-[white] py-[10px] rounded-[2px]">
                Đấu thất bại
              </div>
            );
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        align: "center",
        key: "action",
        render: (e, record) => {
          if (e === "ORDER") {
            if (user?.role === role.CUSTOMER) {
              return (
                <Button
                  className="bg-[#e00d0d] text-[white]"
                  onClick={() => changeOrderStatus(record, "CANCEL")}
                  icon={<FiTrash className="text-[18px]" />}
                />
              );
            } else {
              return (
                <Button
                  className="bg-[#2a56b9] text-[white]"
                  onClick={() => changeOrderStatus(record, "BIDDING")}
                  icon={<IoHammerOutline className="text-[18px]" />}
                />
              );
            }
          }

          if (e === "CANCEL") {
            if (user?.role === role.CUSTOMER) {
              return (
                <Button
                  className="bg-[green] text-[white]"
                  onClick={() => changeOrderStatus(record, "ORDER")}
                  icon={<IoMdRefresh className="text-[18px]" />}
                />
              );
            }
          }

          if (e === "BIDDING") {
            if (user?.role !== role.CUSTOMER) {
              return (
                <div className="flex gap-[10px] justify-center">
                  <Button
                    className="bg-[green] text-[white]"
                    onClick={() => changeOrderStatus(record, "SUCCESS")}
                    icon={<FaCheck className="text-[18px]" />}
                  />
                  <Button
                    className="bg-[grey] text-[white]"
                    onClick={() => changeOrderStatus(record, "FAILED")}
                    icon={<FaInfoCircle className="text-[18px]" />}
                  />
                </div>
              );
            }
          }
        },
      },
    ];

    if (user?.role !== role.CUSTOMER) {
      rawColumn = [
        {
          title: "Username",
          dataIndex: "username",
          align: "center",
          key: "deptCd",
          render: (text, record) => (
            <Button
              type="primary"
              onClick={() => {
                setClientDetail(record);
              }}
            >
              {text}
            </Button>
          ),
        },
        ...rawColumn,
      ];
    }

    return rawColumn;
  }, [user?.role, orderList]);

  const changeOrderStatus = async (record, type) => {
    const rs = await apiFactory.orderApi.changeStatus({
      orderId: record?.orderId,
      type,
    });

    if (rs?.status === 200) {
      toast.success("Action successfully");
      const orderIndex = orderList?.findIndex(
        (order) => order?.orderId === record?.orderId
      );

      if (orderIndex > -1) {
        orderList[orderIndex].type = type;
        orderList[orderIndex].action = type;
      }

      setOrderList([...orderList]);
    } else {
      toast.success("Action unsuccessfully");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchOrder]);

  return (
    <div className="order-list">
      <div className="font-semibold text-[20px] pl-[16px] pt-[16px]  flex items-center">
        Giỏ hàng
      </div>
      <div className="desktop p-[16px] mb-[40px]">
        <Table
          // className="custom-table"
          size="small"
          columns={columns}
          dataSource={orderList}
          loading={isLoading}
          bordered
          // pagination={{
          //   current: searchOrder?.page,
          //   pageSize: searchOrder?.limit,
          //   total: totalOrder,
          // }}
          pagination={false}

          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: () => handleRowClick(record, rowIndex),
          //   };
          // }}
          // rowClassName={rowClassName}
          // rowKey={rowKey}
          // rowSelection={rowSelection}
          // pagination={false}
          // scroll={{
          //   scrollToFirstRowOnChange: true,
          // }}
        />
      </div>

      <div className="mobile mt-[15px] mx-[10px] mb-[50px]">
        {orderList?.map((order) => (
          <Order
            order={order}
            changeOrderStatus={changeOrderStatus}
            setClientDetail={setClientDetail}
            key={order?.orderId}
          />
        ))}
      </div>

      <div className="paging-bottom">
        <Pagination
          current={searchOrder?.page}
          total={totalOrder}
          pageSize={searchOrder?.limit}
          className="paging"
          showSizeChanger={false}
          onChange={changePage}
        />
      </div>

      {clientDetail && (
        <Modal
          open={clientDetail}
          footer={false}
          closeIcon={true}
          onCancel={() => setClientDetail(null)}
          centered
          // className="preview-image-wrap"
        >
          <div className="flex">
            <div className="text-[16px] font-semibold">Username: </div>
            <div className="text-[16px] mx-[5px]">{clientDetail?.username}</div>
          </div>
          <div className="flex">
            <div className="text-[16px] font-semibold">Name: </div>
            <div className="text-[16px] mx-[5px]">{clientDetail?.name}</div>
          </div>
          <div className="flex">
            <div className="text-[16px] font-semibold">Email: </div>
            <div className="text-[16px] mx-[5px]">{clientDetail?.email}</div>
          </div>
          <div className="flex">
            <div className="text-[16px] font-semibold">Phone: </div>
            <div className="text-[16px] mx-[5px]">{clientDetail?.phone}</div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export { OrderList };
