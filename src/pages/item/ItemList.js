import { Button, Card, Col, Image, Pagination, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import "./style.scss";
import ZoomImage from "../../components/img/ZoomImage";
import { useNavigate, useParams } from "react-router-dom";

const ItemList = () => {
  const navigate = useNavigate();
  const { bidId } = useParams();
  const [itemList, setItemList] = useState([
    {
      id: 1,
      title: "Colon Hermes Eau de Mandarin 100ml",
      endTime: "20/12/2024 09:00:00",
      rank: "B",
      price: "3000",
      availableStatus: "Bán hết",
      itemImgs: [
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
      ],
    },
    {
      id: 1,
      title: "Colon Hermes Eau de Mandarin 100ml",
      endTime: "20/12/2024 09:00:00",
      rank: "B",
      price: "3000",
      availableStatus: "Chưa có hàng",
      itemImgs: [
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
      ],
    },
    {
      id: 1,
      title: "Colon Hermes Eau de Mandarin 100ml",
      endTime: "20/12/2024 09:00:00",
      rank: "B",
      price: "3000",
      availableStatus: "Chưa có hàng",
      itemImgs: [
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
      ],
    },
    {
      id: 1,
      title: "Colon Hermes Eau de Mandarin 100ml",
      endTime: "20/12/2024 09:00:00",
      rank: "B",
      price: "3000",
      availableStatus: "Bán hết",
      itemImgs: [
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
      ],
    },
    {
      id: 1,
      title: "Colon Hermes Eau de Mandarin 100ml",
      endTime: "20/12/2024 09:00:00",
      rank: "B",
      price: "3000",
      availableStatus: "Bán hết",
      itemImgs: [
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
      ],
    },
    {
      id: 1,
      title: "Colon Hermes Eau de Mandarin 100ml",
      endTime: "20/12/2024 09:00:00",
      rank: "B",
      price: "3000",
      availableStatus: "Bán hết",
      itemImgs: [
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
        "https://assets.ecoauc.com/images/item/20241212/247663469-1-wixjqnfzlohrdpvgmtbackesyu.jpg",
      ],
    },
  ]);

  const getBidBgColor = (bid) => {
    if (bid?.status === "preview posible") return "#e7c5a3";
    return "#94b3e1";
  };

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

  const generateItem = (item) => {
    return (
      <Col span={8} className="p-[10px]">
        <Card hoverable>
          <div
            className="item"
            //   style={{ backgroundColor: `${getBidBgColor(item)}` }}
          >
            <div className="text-[20px] font-semibold">{item?.title}</div>
            <div className="flex justify-center gap-[10px] items-center">
              <MdOutlineAccessTime size={25} />
              <div>{item?.endTime}</div>
            </div>
            <div className="flex justify-center">
              {/* <img src={item?.itemImgs[0]} className="image"/> */}
              <ZoomImage url={item?.itemImgs[0]} />
            </div>
            <Row>
              <Col span={8}>
                <div>Rank</div>
                <div>{item?.rank}</div>
              </Col>
              <Col span={8}>
                <div>Price</div>
                <div>{item?.price}</div>
              </Col>
              <Col span={8}>
                <div>{item?.availableStatus}</div>
              </Col>
            </Row>
            <Row>
              {item?.itemImgs?.map((itemImg) => (
                <Col span={4} className="p-[2px]" key={itemImg}>
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

  useEffect(() => {}, [bidId]);

  return (
    <div className="item-list">
      <div className="flex justify-center text-[30px] p-[20px] gap-[10px]">
        <button onClick={() => navigate("/bid-list")}>
          <IoArrowBackOutline size={25} />
        </button>
        <div>Danh sách các vật phẩm của phiên đấu giá A</div>
      </div>
      <Row>{itemList?.map((item) => generateItem(item))}</Row>
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
