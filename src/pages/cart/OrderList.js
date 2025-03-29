import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Image,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Table,
} from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaCopy, FaInfoCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FiTrash } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { IoHammerOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import apiFactory from "../../api";
import { GeneralModal } from "../../components/modal/GeneralModal";
import { role } from "../../config/Constant";
import { useInfoUser } from "../../store/UserStore";
import { formatDate, formatDateTime, formatTime } from "../../utils/formatTime";
import "./style.scss";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import updateLocale from "dayjs/plugin/updateLocale";
import copy from "copy-to-clipboard";

dayjs.locale("vi");
dayjs.extend(updateLocale);

// Cập nhật định dạng hiển thị tháng và ngày trong tuần
dayjs.updateLocale("vi", {
  weekdays: ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
  months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
});

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
  const [isLoading, setIsLoading] = useState(false);
  const [clientDetail, setClientDetail] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [searchOrder, setSearchOrder] = useState({
    limit: 15,
    page: 1,
    search: {
      username: "",
      itemId: "",
      itemName: "",
      category: "",
      branch: "",
      rank: "",
      orderType: "",
      orderDate: "",
      itemDate: "",
    },
  });

  const [confirmTitle, setConfirmTitle] = useState();

  const changePage = (e) => {
    setSearchOrder({
      ...searchOrder,
      page: e,
    });
  };

  const handleCopy = (itemId) => {
    try {
      const isSuccess = copy(itemId);
      if (!isSuccess) {
        toast.error("Chép mã sản phẩm lỗi !");
      } else {
        toast.success("Chép mã sản phẩm thành công");
      }
    } catch (error) {
      toast.error("Chép mã sản phẩm lỗi !");
    }
  };

  const fetchOrders = async (query) => {
    setIsLoading(true);
    const result = await apiFactory.orderApi.list({
      ...query,
      search: {
        ...query?.search,
        orderDate: query?.search?.orderDate
          ? formatDateTime(
              query?.search?.orderDate.toString(),
              "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
            )
          : query?.search?.orderDate,
        itemDate: query?.search?.itemDate
          ? formatDateTime(
              query?.search?.itemDate.toString(),
              "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
            )
          : query?.search?.itemDate,
      },
    });

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
        title: "Mã sản phẩm",
        dataIndex: "itemId",
        align: "center",
        key: "itemId",
        render: (e, record) => {
          return user?.role === role?.CUSTOMER ? (
            <div>
              <a
                href={ROOL_WEB + "/inside/bid/item-detail/" + e}
                target="_blank"
                className="text-[blue]"
              >
                {e}
              </a>
              <button onClick={() => handleCopy(e)} className="height-[18px]">
                <FaCopy size={20} color="#2a56b9" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-[10px]">
              <a href={record?.itemUrl} target="_blank" className="text-[blue]">
                {e}
              </a>
              <button onClick={() => handleCopy(e)} className="height-[18px]">
                <FaCopy size={20} color="#2a56b9" />
              </button>
            </div>
          );
        },
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "title",
        align: "center",
        key: "deptAbbr",
        width: "400px",
      },
      {
        title: "Loại",
        dataIndex: "category",
        align: "center",
        key: "openDate",
      },
      {
        title: "Hãng",
        dataIndex: "branch",
        align: "center",
        key: "opStatCd",
        width: "140px",
      },
      {
        title: "Chất lượng",
        dataIndex: "rank",
        align: "center",
        key: "highDeptNm",
      },
      {
        title: "Giá đặt",
        dataIndex: "bidPrice",
        align: "center",
        key: "workClsCd",
        width: "80px",
      },
      {
        title: "Ngày đặt giá",
        dataIndex: "updatedAt",
        align: "center",
        key: "workClsCd",
        render: (e) => formatTime(e),
        width: "100px",
      },
      {
        title: "Ngày đấu giá",
        dataIndex: "itemDate",
        align: "center",
        key: "workClsCd",
        render: (e) => formatTime(e),
        width: "100px",
      },
      {
        title: "Tình trạng",
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
        title: "Thao tác",
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
          title: "Tên tài khoản",
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

  const onChangeDebounceFilter = useCallback(
    debounce((searchOrder) => {
      fetchOrders(searchOrder);
    }, 500),
    []
  );

  const onChangeFilter = (key, value) => {
    setSearchOrder({
      ...searchOrder,
      search: {
        ...searchOrder?.search,
        [key]: value,
      },
    });
  };

  useEffect(() => {
    onChangeDebounceFilter(searchOrder);
  }, [searchOrder]);

  return (
    <ConfigProvider locale={viVN}>
      <div className="order-list">
        <div className="font-semibold text-[20px] pl-[16px] pt-[16px]  flex items-center">
          Giỏ hàng
        </div>
        {user?.role !== "CUSTOMER" && (
          <>
            <div className="font-semibold gap-[10px] pl-[16px] pt-[16px]  flex items-center">
              <Button
                type="primary"
                onClick={() =>
                  setConfirmTitle(
                    `Nếu bạn ấn đồng ý thì tất cả các order đang đợi đặt của các user đặt trong ngày ${formatDate(searchOrder?.search?.orderDate)} sẽ tự động chuyển sang trạng thái đã đặt!`
                  )
                }
                disabled={!searchOrder?.search?.orderDate}
              >
                Đã đặt theo ngày đặt
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  setConfirmTitle(
                    `Nếu bạn ấn đồng ý thì tất cả các order của các user đặt trong ngày ${formatDate(searchOrder?.search?.orderDate)} sẽ tự động chuyển sang trạng thái đấu thất bại!`
                  )
                }
                disabled={!searchOrder?.search?.orderDate}
              >
                Đấu thất bại theo ngày đặt
              </Button>

              <Button
                type="primary"
                onClick={() =>
                  setConfirmTitle(
                    `Nếu bạn ấn đồng ý thì tất cả các order đang đợi đặt của các user đặt trong ngày ${formatDate(searchOrder?.search?.itemDate)} sẽ tự động chuyển sang trạng thái đã đặt!`
                  )
                }
                disabled={!searchOrder?.search?.itemDate}
              >
                Đã đặt theo ngày item
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  setConfirmTitle(
                    `Nếu bạn ấn đồng ý thì tất cả các order đang đợi đặt của các user đặt trong ngày ${formatDate(searchOrder?.search?.itemDate)} sẽ tự động chuyển sang trạng thái đấu thất bại!`
                  )
                }
                disabled={!searchOrder?.search?.itemDate}
              >
                Đấu thất bại theo ngày item
              </Button>
            </div>
            <div className="font-semibold gap-[10px] pl-[16px] pt-[16px]  flex items-center">
              <Button
                type="primary"
                onClick={() =>
                  setConfirmTitle(
                    `Nếu bạn ấn đồng ý thì tất cả các order của các user đặt trong ngày ${formatDate(searchOrder?.search?.orderDate)} sẽ tự động khôi phục sang trạng thái đã đặt!`
                  )
                }
                disabled={!searchOrder?.search?.orderDate}
              >
                Khôi phục đã đặt theo ngày đặt
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  setConfirmTitle(
                    `Nếu bạn ấn đồng ý thì tất cả các order đang đợi đặt của các user đặt trong ngày ${formatDate(searchOrder?.search?.itemDate)} sẽ tự động khôi phục sang trạng thái đã đặt!`
                  )
                }
                disabled={!searchOrder?.search?.itemDate}
              >
                Khôi phục đã đặt theo ngày đặt
              </Button>
            </div>
          </>
        )}
        <Row className="text-[20px] pl-[16px] pt-[16px]">
          {user?.role !== "CUSTOMER" && (
            <Col
              xs={24}
              sm={12}
              md={6}
              span={3}
              className="flex flex-col gap-[10px]"
            >
              <div>Mã user</div>
              <Input
                placeholder="Tìm kiếm mã user"
                className="w-[200px]"
                value={searchOrder?.search?.username}
                onChange={(e) => onChangeFilter("username", e?.target?.value)}
                allowClear
              />
            </Col>
          )}
          <Col
            xs={24}
            sm={12}
            md={6}
            span={3}
            className="flex flex-col gap-[10px]"
          >
            <div>Mã sản phẩm</div>
            <Input
              placeholder="Tìm kiếm mã sản phẩm"
              className="w-[200px]"
              value={searchOrder?.search?.itemId}
              onChange={(e) => onChangeFilter("itemId", e?.target?.value)}
              allowClear
            />
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            span={3}
            className="flex flex-col gap-[10px]"
          >
            <div>Loại sản phẩm</div>
            <Select
              placeholder="Chọn loại sản phẩm"
              allowClear
              className="w-[200px]"
              value={searchOrder?.search?.category}
              onChange={(e) => onChangeFilter("category", e)}
              options={[
                { value: "WATCH", label: "WATCH" },
                { value: "BAG", label: "BAG" },
                { value: "Jewelry", label: "Jewelry" },
                { value: "Accessory", label: "Accessory" },
                { value: "Fashion accessories", label: "Fashion accessories" },
                { value: "Pottery", label: "Pottery" },
                { value: "Camera", label: "Camera" },
                { value: "Apparel", label: "Apparel" },
                { value: "Shoes", label: "Shoes" },
                { value: "Art quality", label: "Art quality" },
                { value: "furniture", label: "furniture" },
                { value: "bicycle", label: "bicycle" },
                {
                  value: "Consumer electronics",
                  label: "Consumer electronics",
                },
                { value: "Hobby", label: "Hobby" },
                { value: "Sport", label: "Sport" },
                { value: "Musical instrument", label: "Musical instrument" },
                { value: "the expendables", label: "the expendables" },
                { value: "game", label: "game" },
                { value: "PC", label: "PC" },
                { value: "Camping Equipment", label: "Camping Equipment" },
                { value: "Audio Equipment", label: "Audio Equipment" },
                { value: "education", label: "education" },
                { value: "media", label: "media" },
                { value: "Smoking device", label: "Smoking device" },
                { value: "cellphone", label: "cellphone" },
                { value: "kimono", label: "kimono" },
                { value: "Brand empty box", label: "Brand empty box" },
                { value: "Car bike equipment", label: "Car bike equipment" },
                { value: "sewing machine", label: "sewing machine" },
              ]}
            />
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            span={3}
            className="flex flex-col gap-[10px]"
          >
            <div>Hãng sản phẩm</div>
            <Select
              placeholder="Chọn hãng"
              allowClear
              className="w-[200px]"
              value={searchOrder?.search?.branch}
              onChange={(e) => onChangeFilter("branch", e)}
              options={[
                { value: "LOUIS VUITTON", label: "LOUIS VUITTON" },
                { value: "CHANEL", label: "CHANEL" },
                { value: "HERMES", label: "HERMES" },
                { value: "GUCCI", label: "GUCCI" },
                { value: "PRADA", label: "PRADA" },
                { value: "ROLEX", label: "ROLEX" },
                { value: "OMEGA", label: "OMEGA" },
                { value: "TAG Heuer", label: "TAG Heuer" },
                { value: "Catier", label: "Catier" },
                { value: "BVLGARI", label: "BVLGARI" },
                { value: "Tiffany＆Co.", label: "Tiffany＆Co." },
                { value: "HARRY WINSTON", label: "HARRY WINSTON" },
                { value: "Van Cleef＆Arpels", label: "Van Cleef＆Arpels" },
                { value: "A. LANGE & SOHNE", label: "A. LANGE & SOHNE" },
                { value: "AUDEMARS PIGUET", label: "AUDEMARS PIGUET" },
                { value: "Baccarat", label: "Baccarat" },
                { value: "BALENCIAGA", label: "BALENCIAGA" },
                { value: "BALLY", label: "BALLY" },
                { value: "BAUME＆MERCIER", label: "BAUME＆MERCIER" },
                { value: "Bell & Ross", label: "Bell & Ross" },
                { value: "Berluti", label: "Berluti" },
                { value: "BOTTEGA VENETA", label: "BOTTEGA VENETA" },
                { value: "BOUCHERON", label: "BOUCHERON" },
                { value: "BREGUET", label: "BREGUET" },
                { value: "BREITLING", label: "BREITLING" },
                { value: "Buccellati", label: "Buccellati" },
                { value: "BURBERRY", label: "BURBERRY" },
                { value: "Carlo Parlati", label: "Carlo Parlati" },
                { value: "Carrera y Carrera", label: "Carrera y Carrera" },
                { value: "CASIO", label: "CASIO" },
                { value: "CAZZANIGA", label: "CAZZANIGA" },
                { value: "CELINE", label: "CELINE" },
                { value: "CHARRIOL", label: "CHARRIOL" },
                { value: "CHAUMET", label: "CHAUMET" },
                { value: "chloe", label: "chloe" },
                { value: "Chopard", label: "Chopard" },
                { value: "Christian Louboutin", label: "Christian Louboutin" },
                { value: "CHROME HEARTS", label: "CHROME HEARTS" },
                { value: "CITIZEN", label: "CITIZEN" },
                { value: "COACH", label: "COACH" },
                { value: "Cole Haan", label: "Cole Haan" },
                { value: "COMME des GARCONS", label: "COMME des GARCONS" },
                { value: "CORUM", label: "CORUM" },
                { value: "D＆G", label: "D＆G" },
                { value: "Damiani", label: "Damiani" },
                { value: "DE BEERS", label: "DE BEERS" },
                { value: "Dior", label: "Dior" },
                { value: "DOLCE＆GABBANA", label: "DOLCE＆GABBANA" },
                { value: "DSQUARED3", label: "DSQUARED3" },
                { value: "dunhill", label: "dunhill" },
                { value: "EDOX", label: "EDOX" },
                { value: "EMILIO PUCCI", label: "EMILIO PUCCI" },
                { value: "ETRO", label: "ETRO" },
                { value: "FEDERICO BUCCELLATI", label: "FEDERICO BUCCELLATI" },
                { value: "Felisi", label: "Felisi" },
                { value: "FENDI", label: "FENDI" },
                { value: "FRANCK MULLER", label: "FRANCK MULLER" },
                { value: "FRED", label: "FRED" },
                { value: "FREDERIQUE CONSTANT", label: "FREDERIQUE CONSTANT" },
                { value: "FURLA", label: "FURLA" },
                { value: "Gaga Milano", label: "Gaga Milano" },
                { value: "Georg Jensen", label: "Georg Jensen" },
                { value: "gimel", label: "gimel" },
                { value: "GIRARD PERREGAUX", label: "GIRARD PERREGAUX" },
                { value: "GIVENCHY", label: "GIVENCHY" },
                { value: "GOYARD", label: "GOYARD" },
                { value: "GRAFF", label: "GRAFF" },
                { value: "GRAHAM", label: "GRAHAM" },
                { value: "HUBLOT", label: "HUBLOT" },
                { value: "IWC", label: "IWC" },
                { value: "Jacob & CO", label: "Jacob & CO" },
                { value: "JAEGER LECOULTRE", label: "JAEGER LECOULTRE" },
                { value: "Jeunet", label: "Jeunet" },
                { value: "JEWEL STUDIO", label: "JEWEL STUDIO" },
                { value: "JILSANDER", label: "JILSANDER" },
                { value: "JIMMY CHOO", label: "JIMMY CHOO" },
                { value: "Justin Davis", label: "Justin Davis" },
                { value: "Kashikey", label: "Kashikey" },
                { value: "Kate Spade", label: "Kate Spade" },
                { value: "LANVIN", label: "LANVIN" },
                { value: "LOEWE", label: "LOEWE" },
                { value: "LONG CHAMP", label: "LONG CHAMP" },
                { value: "LONGINES", label: "LONGINES" },
                { value: "MACKINTOSH", label: "MACKINTOSH" },
                { value: "MARC BY MARC JACOBS", label: "MARC BY MARC JACOBS" },
                { value: "MARC JACOBS", label: "MARC JACOBS" },
                { value: "MAUBOUSSIN", label: "MAUBOUSSIN" },
                { value: "MAURICE LACROIX", label: "MAURICE LACROIX" },
                { value: "MCM", label: "MCM" },
                { value: "Meissen", label: "Meissen" },
                { value: "Michael Kors", label: "Michael Kors" },
                { value: "MIKIMOTO", label: "MIKIMOTO" },
                { value: "miu miu", label: "miu miu" },
                { value: "MONCLER", label: "MONCLER" },
                { value: "MONTBLANC", label: "MONTBLANC" },
                { value: "ORIENT", label: "ORIENT" },
                { value: "Orobianco", label: "Orobianco" },
                { value: "PANERAI", label: "PANERAI" },
                { value: "PATEK PHILIPPE", label: "PATEK PHILIPPE" },
                { value: "PIAGET", label: "PIAGET" },
                { value: "POLA", label: "POLA" },
                { value: "POMELLATO", label: "POMELLATO" },
                { value: "Ponte Vecchio", label: "Ponte Vecchio" },
                { value: "RADO", label: "RADO" },
                { value: "RayBan", label: "RayBan" },
                { value: "REGAL", label: "REGAL" },
                { value: "RICHARD MILLE", label: "RICHARD MILLE" },
                { value: "RIMOWA", label: "RIMOWA" },
                { value: "Ritmo latino", label: "Ritmo latino" },
                { value: "ROGER DUBUIS", label: "ROGER DUBUIS" },
                { value: "SAINT LAURENT", label: "SAINT LAURENT" },
                { value: "Salvatore Ferragamo", label: "Salvatore Ferragamo" },
                { value: "SEE BY CHLOE", label: "SEE BY CHLOE" },
                { value: "SEIKO", label: "SEIKO" },
                { value: "Sergio Rossi", label: "Sergio Rossi" },
                { value: "SINN", label: "SINN" },
                { value: "SOUTHERN CROSS", label: "SOUTHERN CROSS" },
                { value: "SUPREME", label: "SUPREME" },
                { value: "TASAKI", label: "TASAKI" },
                { value: "TOD’S", label: "TOD’S" },
                { value: "Tom Ford", label: "Tom Ford" },
                { value: "Tory Burch", label: "Tory Burch" },
                { value: "TUDOR", label: "TUDOR" },
                { value: "TUMI", label: "TUMI" },
                { value: "ULYSSE NARDIN", label: "ULYSSE NARDIN" },
                { value: "UNIVERSAL GENEVE", label: "UNIVERSAL GENEVE" },
                { value: "UNOAERRE", label: "UNOAERRE" },
                { value: "VACHERON CONSTANTIN", label: "VACHERON CONSTANTIN" },
                { value: "VALENTINO", label: "VALENTINO" },
                { value: "Vendome Aoyama", label: "Vendome Aoyama" },
                { value: "Verite", label: "Verite" },
                { value: "VERSACE", label: "VERSACE" },
                { value: "Waltham", label: "Waltham" },
                { value: "Yves Saint Laurent", label: "Yves Saint Laurent" },
                { value: "ZENITH", label: "ZENITH" },
                { value: "MITSUO KAJI", label: "MITSUO KAJI" },
                { value: "Historical history", label: "Historical history" },
                { value: "NOBUKO ISHIKAWA", label: "NOBUKO ISHIKAWA" },
                { value: "SHUNICHI TAMURA", label: "SHUNICHI TAMURA" },
                { value: "OTHER", label: "OTHER" },
              ]}
            />
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            span={3}
            className="flex flex-col gap-[10px]"
          >
            <div>Chất lượng sản phẩm</div>
            <Select
              placeholder="Chọn chất lượng"
              allowClear
              className="w-[200px]"
              value={searchOrder?.search?.rank}
              onChange={(e) => onChangeFilter("rank", e)}
              options={[
                { value: "N", label: "N" },
                { value: "S", label: "S" },
                { value: "A", label: "A" },
                { value: "AB", label: "AB" },
                { value: "B", label: "B" },
                { value: "BC", label: "BC" },
                { value: "C", label: "C" },
                { value: "D", label: "D" },
                { value: "F", label: "F" },
                { value: "10", label: "10" },
                { value: "9", label: "9" },
                { value: "8", label: "8" },
                { value: "7", label: "7" },
                { value: "6", label: "6" },
                { value: "5", label: "5" },
                { value: "4", label: "4" },
                { value: "3", label: "3" },
                { value: "2", label: "2" },
                { value: "1", label: "1" },
              ]}
            />
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            span={3}
            className="flex flex-col gap-[10px]"
          >
            <div>Trạng thái đơn hàng</div>
            <Select
              placeholder="Trạng thái đơn hàng"
              allowClear
              className="w-[200px]"
              value={searchOrder?.search?.orderType}
              onChange={(e) => onChangeFilter("orderType", e)}
              options={[
                { value: "ORDER", label: "Đợi đặt" },
                { value: "BIDDING", label: "Đã đặt" },
                { value: "CANCEL", label: "Huỷ đặt" },
                { value: "SUCCESS", label: "Đấu thành công" },
                { value: "FAILED", label: "Đấu thất bại" },
              ]}
            />
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            span={3}
            className="flex flex-col gap-[10px]"
          >
            <div>Ngày đặt</div>

            <DatePicker
              className="w-[200px]"
              placeholder="Ngày đặt"
              value={searchOrder?.search?.orderDate}
              onChange={(date, dateString) => onChangeFilter("orderDate", date)}

              // disabled
            />
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            span={3}
            className="flex flex-col gap-[10px]"
          >
            <div>Ngày sản phẩm</div>
            <DatePicker
              className="w-[200px]"
              placeholder="Ngày sản phẩm"
              value={searchOrder?.search?.itemDate}
              onChange={(date, dateString) => onChangeFilter("itemDate", date)}
              // disabled
            />
          </Col>
        </Row>

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
              <div className="text-[16px] mx-[5px]">
                {clientDetail?.username}
              </div>
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

        {confirmTitle && (
          <GeneralModal
            title={confirmTitle}
            open={confirmTitle}
            onCancel={() => setConfirmTitle(null)}
          />
        )}
      </div>
    </ConfigProvider>
  );
};

export { OrderList };
