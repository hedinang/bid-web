import {
  Button,
  Card,
  Col,
  Image,
  Input,
  Pagination,
  Row,
  Select,
  Spin,
} from "antd";
import copy from "copy-to-clipboard";
import {useEffect, useState} from "react";
import {FaCopy} from "react-icons/fa";
import {IoArrowBackOutline, IoCartOutline} from "react-icons/io5";
import {MdCancel} from "react-icons/md";
import {NumericFormat} from "react-number-format";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import apiFactory from "../../api";
import {brand, quality, role} from "../../config/Constant";
import {useItemContext} from "../../context/ItemContext";
import {useLayoutContext} from "../../context/LayoutContext";
import {
  expiredBidOrder,
  extractDay,
  formatTime,
  minusFormatTime,
} from "../../utils/formatTime";
import "./style.scss";

const parseInt = (numberString) => {
  return Number(numberString?.replace(/¥/g, "")?.replace(/,/g, ""));
};

const ItemDetail = ({item, itemList, setItemList}) => {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState();
  const [bidPrice, setBidPrice] = useState(item?.bidPrice);

  const {me} = useLayoutContext();
  const {bid} = useItemContext();

  const addToCard = async () => {
    const rs = await apiFactory.orderApi.addToCard({
      bidId: item?.bidId,
      itemId: item?.itemId,
      bidPrice: bidPrice,
      orderId: item?.orderId,
    });

    if (rs?.status === 200) {
      toast.success("Action successfully");
      const itemIndex = itemList?.findIndex((e) => e?.itemId === item?.itemId);

      if (itemIndex > -1) {
        itemList[itemIndex].orderType = "ORDER";
        itemList[itemIndex].orderId = rs?.data?.orderId;
      }

      setItemList([...itemList]);
    } else {
      toast.success("Action unsuccessfully");
    }
  };

  const onCancel = async () => {
    const rs = await apiFactory.orderApi.changeStatus({
      orderId: item?.orderId,
      type: "CANCEL",
    });

    if (rs?.status === 200) {
      toast.success("Action successfully");
      const itemIndex = itemList?.findIndex(
          (e) => e?.orderId === item?.orderId,
      );

      if (itemIndex > -1) {
        itemList[itemIndex].orderType = "CANCEL";
      }

      setItemList([...itemList]);
    } else {
      toast.success("Action unsuccessfully");
    }
  };

  const showItemStatus = () => {
    if (item?.orderType === "ORDER")
      return <div className="item-status bg-[#2a56b9]">Đợi đặt</div>;

    if (item?.orderType === "BIDDING")
      return <div className="item-status bg-[#c9ac12]">Đã đặt</div>;

    if (item?.orderType === "CANCEL")
      return <div className="item-status bg-[#e81224]">Hủy đặt</div>;

    if (item?.orderType === "SUCCESS")
      return <div className="item-status bg-[#78b43d]">Đấu thành công</div>;

    if (item?.orderType === "FAILED")
      return <div className="item-status bg-[#dd5930]">Đấu thất bại</div>;
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

  useEffect(() => {
    setActiveImg(
        item?.detailUrls?.[0]?.replace(
            "https://resize.ecoauc.com",
            "https://assets.ecoauc.com",
        ),
    );
  }, [item]);

  return (
      <Col
          xs={24}
          sm={24}
          md={12}
          xl={8}
          className="p-[10px]"
          key={item?.itemId + item?.title}
      >
        {showItemStatus()}
        <Card hoverable>
          <div className="item">
            <div className="item-title">
              <div className="flex gap-[10px] items-center">
                <div className="text-[17px] text-[#194ee9]">{item?.itemId}</div>
                <button
                    onClick={() => handleCopy(item?.itemId)}
                    className="height-[18px]"
                >
                  <FaCopy size={20} color="#2a56b9"/>
                </button>
              </div>
              <div className="text-[17px] font-semibold">{item?.title}</div>
              {me && me?.role !== role.CUSTOMER && (
                  <a href={item?.itemUrl} target="_blank" className="text-[blue]">
                    Original link
                  </a>
              )}
            </div>
            <div className="text-center h-[44px]">{item?.description}</div>
            {me &&
                me?.role === role.CUSTOMER &&
                !expiredBidOrder(bid?.openTime) && (
                    <div className="text-center p-[5px] font-semibold flex flex-row gap-[10px] justify-center">
                      <NumericFormat
                          className="w-[150px]"
                          value={bidPrice}
                          prefix="¥"
                          customInput={Input}
                          isAllowed={(values) =>
                              values.floatValue === undefined ||
                              values.floatValue <= 10000000
                          }
                          onValueChange={(values, sourceInfo) => {
                            setBidPrice(values?.floatValue);
                          }}
                          disabled={["BIDDING", "SUCCESS", "FAILED"]?.includes(
                              item?.orderType,
                          )}
                      />
                      {!["BIDDING", "SUCCESS", "FAILED"]?.includes(
                          item?.orderType,
                      ) && (
                          <Button
                              shape="circle"
                              icon={<IoCartOutline size={20}/>}
                              className=""
                              onClick={addToCard}
                              disabled={
                                  !bidPrice || bidPrice < parseInt(item?.startPrice)
                              }
                          />
                      )}
                      {item?.orderType === "ORDER" && (
                          <Button
                              shape="circle"
                              icon={<MdCancel size={20}/>}
                              className=""
                              onClick={onCancel}
                          />
                      )}
                    </div>
                )}
            <div className="flex justify-center gap-[10px] items-center">
              <div>{item?.endTime}</div>
            </div>
            <div className="flex justify-center p-[5px]">
              {/* <ZoomImage url={activeImg} cssSize={"small"} /> */}
              <Image
                  src={activeImg}
                  height={300}
                  // className="!w-[100%] !h-[300px]"
              />
            </div>
            <Row>
              <Col span={12}>
                <div>Chất lượng</div>
                <div>{item?.rank}</div>
              </Col>
              <Col span={12}>
                <div>Giá khởi điểm</div>
                <div>{item?.startPrice}</div>
              </Col>
            </Row>

            <div>
              <Button
                  className="text-[#2d7717] text-[18px]"
                  onClick={() =>
                      navigate(`/item-detail/${item?.itemId}`)
                  }
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        </Card>
      </Col>
  );
};

const AdminItemList = () => {
  const navigate = useNavigate();
  const {
    itemList,
    bid,
    isLoading,
    searchItem,
    onChooseBranch,
    onChooseRank,
    onChooseCategory,
    changePage,
    setItemList,
  } = useItemContext();

  const {setPageLink} = useLayoutContext()

  useEffect(() => {
    setPageLink("ITEM_LIST")
  }, [])

  return (
      <div className="item-list">
        <div className="flex justify-center text-[30px] p-[20px] gap-[10px]">
          <button onClick={() => navigate("/inside/bid/bid-list")}>
            <IoArrowBackOutline size={25}/>
          </button>
          <div className="text-center">
            <div>
              Phiên đấu giá {extractDay(bid?.openTime)}{" "}
              {formatTime(bid?.openTime)}
            </div>
            <div>
              Đặt giá trước {extractDay(minusFormatTime(bid?.openTime))}{" "}
              {minusFormatTime(bid?.openTime)}
            </div>
          </div>
        </div>

        <Row className="flex items-center">
          <Col xs={24} md={8} className="p-[10px]">
            <Select
                placeholder="Chọn hãng"
                allowClear
                className="w-[200px]"
                options={brand}
                onChange={onChooseBranch}
            />
          </Col>
          <Col xs={24} md={8} className="p-[10px]">
            <Select
                placeholder="Chọn loại sản phẩm"
                allowClear
                className="w-[200px]"
                onChange={onChooseCategory}
                options={[
                  {value: "WATCH", label: "WATCH"},
                  {value: "BAG", label: "BAG"},
                  {value: "Jewelry", label: "Jewelry"},
                  {value: "Accessory", label: "Accessory"},
                  {value: "Fashion accessories", label: "Fashion accessories"},
                  {value: "Pottery", label: "Pottery"},
                  {value: "Camera", label: "Camera"},
                  {value: "Apparel", label: "Apparel"},
                  {value: "Shoes", label: "Shoes"},
                  {value: "Art quality", label: "Art quality"},
                  {value: "furniture", label: "furniture"},
                  {value: "bicycle", label: "bicycle"},
                  {value: "Consumer electronics", label: "Consumer electronics"},
                  {value: "Hobby", label: "Hobby"},
                  {value: "Sport", label: "Sport"},
                  {value: "Musical instrument", label: "Musical instrument"},
                  {value: "the expendables", label: "the expendables"},
                  {value: "game", label: "game"},
                  {value: "PC", label: "PC"},
                  {value: "Camping Equipment", label: "Camping Equipment"},
                  {value: "Audio Equipment", label: "Audio Equipment"},
                  {value: "education", label: "education"},
                  {value: "media", label: "media"},
                  {value: "Smoking device", label: "Smoking device"},
                  {value: "cellphone", label: "cellphone"},
                  {value: "kimono", label: "kimono"},
                  {value: "Brand empty box", label: "Brand empty box"},
                  {value: "Car bike equipment", label: "Car bike equipment"},
                  {value: "sewing machine", label: "sewing machine"},
                ]}
            />
          </Col>
          <Col xs={24} md={8} className="p-[10px]">
            <Select
                placeholder="Chọn chất lượng"
                allowClear
                className="w-[200px]"
                onChange={onChooseRank}
                options={quality}
            />
          </Col>
        </Row>
        <Row>
          {isLoading ? (
              <div className="w-full flex justify-center">
                <Spin/>
              </div>
          ) : (
              itemList?.map((item) => (
                  <ItemDetail
                      item={item}
                      key={item}
                      itemList={itemList}
                      setItemList={setItemList}
                  />
              ))
          )}
        </Row>
        <div className="paging-bottom">
          <Pagination
              current={searchItem?.page}
              total={bid?.totalItem}
              pageSize={searchItem?.limit}
              className="paging"
              showSizeChanger={false}
              onChange={changePage}
          />
        </div>
      </div>
  );
};
export {AdminItemList};
