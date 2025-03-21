import { Button, Image, Modal, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { toast } from "react-toastify";
import apiFactory from "../../api";
import { role } from "../../config/Constant";
import { useInfoUser } from "../../store/UserStore";
import { formatTime } from "../../utils/formatTime";

const OrderList = () => {
  const { user } = useInfoUser();

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
      // {
      //   title: "Item Id",
      //   dataIndex: "deptNm",
      //   align: "center",
      //   key: "deptNm",
      // },
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
        dataIndex: "status",
        align: "center",
        key: "workClsCd",
        render: (e) => {
          if (e === 0)
            return (
              <div className="bg-[#2a56b9] text-[white] py-[10px] rounded-[2px]">
                Đợi đặt
              </div>
            );

          if (e === 1)
            return (
              <div className="bg-[#c9ac12] text-[white] py-[10px] rounded-[2px]">
                Đã đặt
              </div>
            );

          if (e === 2)
            return (
              <div className="bg-[red] text-[white] py-[10px] rounded-[2px]">
                Hủy đặt
              </div>
            );

          if (e === 3)
            return (
              <div className="bg-[green] text-[white] py-[10px] rounded-[2px]">
                Đấu thành công
              </div>
            );

          if (e === 4)
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
        render: (e) => {
          if (e === 0)
            return (
              <Button
                className="bg-[#e00d0d] text-[white]"
                // onClick={}
                icon={<FiTrash className="text-[18px]" />}
              />
            );

          if (e === 1)
            return (
              <Button
                className="bg-[#e00d0d] text-[white]"
                // onClick={}
                icon={<FiTrash className="text-[18px]" />}
              />
            );

          if (e === 2)
            return (
              <Button
                className="bg-[#2a56b9] text-[white]"
                // onClick={}
                icon={<IoMdRefresh className="text-[18px]" />}
              />
            );
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
  }, [user?.role]);

  const [isLoading, setIsLoading] = useState(false);
  const [clientDetail, setClientDetail] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [searchOrder, setSearchOrder] = useState({
    limit: 24,
    page: 1,
    // searchBranch: "",
    // searchRank: "",
  });

  const fetchOrders = async () => {
    setIsLoading(true);
    const result = await apiFactory.orderApi.list(searchOrder);

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }
    setIsLoading(false);

    let data = [];
    for (let index = 0; index < result?.data?.items?.length; index++) {
      data?.push({
        ...result?.data?.items[index],
        status: index,
        action: index,
      });
    }
    setOrderList(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="font-semibold text-[20px] pl-[16px] pt-[16px]  flex items-center">
        Giỏ hàng
      </div>
      <div className="p-[16px]">
        <Table
          // className="custom-table"
          size="small"
          columns={columns}
          dataSource={orderList}
          // loading={isLoading}
          bordered
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
