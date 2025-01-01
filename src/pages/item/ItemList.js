import { Card, Col, Image, Pagination, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiFactory from "../../api";
import ZoomImage from "../../components/img/ZoomImage";
import "./style.scss";

const ItemDetail = ({ item }) => {
  const [activeImg, setActiveImg] = useState();

  useEffect(() => {
    setActiveImg(item?.detailUrls[0]);
  }, [item]);

  return (
    <Col xs={24} sm={24} md={12} xl={8} className="p-[10px]" key={item?.title}>
      <Card hoverable>
        <div className="item">
          <div className="item-title">
            <div className="text-[17px] text-[#194ee9]">{item?.itemId}</div>
            <div className="text-[17px] font-semibold">{item?.title}</div>
          </div>
          <div className="text-center h-[44px]">{item?.description}</div>
          <div className="flex justify-center gap-[10px] items-center">
            {/* <MdOutlineAccessTime size={25} /> */}
            <div>{item?.endTime}</div>
          </div>
          <div className="flex justify-center">
            <ZoomImage url={activeImg} />
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
            {/* <Col span={8}>
              <div>Auction order</div>
              <div>{item?.auctionOrder}</div>
            </Col> */}
          </Row>
          <Row>
            {item?.detailUrls?.map((itemImg) => (
              <Col
                span={4}
                className="p-[2px]"
                key={itemImg}
                onClick={() => setActiveImg(itemImg)}
              >
                <Image
                  className="slide-item"
                  src={itemImg}
                  preview={false}
                  key={itemImg}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Card>
    </Col>
  );
};

const ItemList = () => {
  const navigate = useNavigate();
  const { bidId } = useParams();
  const [itemList, setItemList] = useState([]);
  const [bid, setBid] = useState();
  const [searchItem, setSearchItem] = useState({
    limit: 4,
    page: 1,
  });

  const fetchData = async () => {
    if (!bidId) return;

    const result = await apiFactory.itemApi.list({
      ...searchItem,
      bidId,
    });

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }

    setItemList(result?.data);
  };

  const fetchBid = async () => {
    if (!bidId) return;
    const result = await apiFactory.bidApi.getBid(bidId);

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }

    setBid(result?.data);
  };

  const changePage = (e) => {
    setSearchItem({
      ...searchItem,
      page: e,
    });
  };

  useEffect(() => {
    fetchBid();
  }, [bidId]);

  useEffect(() => {
    fetchData();
  }, [bidId, searchItem]);

  return (
    <div className="item-list">
      <div className="flex justify-center text-[30px] p-[20px] gap-[10px]">
        <button onClick={() => navigate("/bid-list")}>
          <IoArrowBackOutline size={25} />
        </button>
        <div>Phiên đấu giá lúc {bid?.openTime}</div>
      </div>

      <Row>
        <Col span={12}>
          <Select
            placeholder="Chọn hãng"
            allowClear
            className="w-[200px]"
            // onChange={handleChange}
            options={[
              { value: "LOUIS VUITTON", label: "LOUIS VUITTON" },
              { value: "CHANEL", label: "CHANEL" },
              { value: "HERMES", label: "HERMES" },
              { value: "GUCCI", label: "GUCCI" },
            ]}
          />
        </Col>
        {/* <Col span={12}>
          <Select
            // defaultValue="lucy"
            style={{ width: 120 }}
            // onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Col> */}
      </Row>
      <Row>
        {itemList?.map((item) => (
          <ItemDetail item={item} key={item} />
        ))}
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
export { ItemList };
