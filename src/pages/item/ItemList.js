import { Card, Col, Image, Pagination, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiFactory from "../../api";
import ZoomImage from "../../components/img/ZoomImage";
import "./style.scss";

const ItemDetail = ({ item }) => {
  const [activeImg, setActiveImg] = useState(item?.detailUrls[0]);

  return (
    <Col span={8} className="p-[10px]">
      <Card hoverable>
        <div className="item">
          <div className="text-[20px] font-semibold">{item?.title}</div>
          <div className="flex justify-center gap-[10px] items-center">
            {/* <MdOutlineAccessTime size={25} /> */}
            <div>{item?.endTime}</div>
          </div>
          <div className="flex justify-center">
            <ZoomImage url={activeImg} />
          </div>
          <Row>
            <Col span={8}>
              <div>Rank</div>
              <div>{item?.rank}</div>
            </Col>
            <Col span={8}>
              <div>Price</div>
              <div>{item?.startPrice}</div>
            </Col>
            <Col span={8}>
              <div>Auction order</div>
              <div>{item?.auctionOrder}</div>
            </Col>
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

  const imageListRef = useRef(null); // Ref to access the image list

  const scroll = (direction) => {
    const { current } = imageListRef;
    if (current) {
      const scrollAmount = 150; // Adjust scroll amount as needed
      current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const fetchData = async () => {
    const result = await apiFactory.itemApi.list();

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }

    setItemList(result?.data);
  };

  useEffect(() => {
    fetchData();
  }, [bidId]);

  return (
    <div className="item-list">
      <div className="flex justify-center text-[30px] p-[20px] gap-[10px]">
        <button onClick={() => navigate("/bid-list")}>
          <IoArrowBackOutline size={25} />
        </button>
        <div>Danh sách các vật phẩm của phiên đấu giá A</div>
      </div>
      <Row>
        {itemList?.map((item) => (
          <ItemDetail item={item} key={item} />
        ))}
      </Row>
      <div className="paging-bottom">
        <Pagination
          defaultCurrent={1}
          total={500}
          className="paging"
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};
export { ItemList };
