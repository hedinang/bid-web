import { Button, Col, Image, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import "./style.scss";
import ZoomImage from "../../components/img/ZoomImage";

const ItemList = () => {
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
        "https://resize.ecoauc.com/images/item/20241209/247516678-1-zmcrnbqwxitkoheuvadsgljpfy.jpg?w=220&h=160",
        "https://resize.ecoauc.com/images/item/20241209/247516678-1-zmcrnbqwxitkoheuvadsgljpfy.jpg?w=220&h=160",
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
        "https://resize.ecoauc.com/images/item/20241209/247516678-1-zmcrnbqwxitkoheuvadsgljpfy.jpg?w=220&h=160",
        "https://resize.ecoauc.com/images/item/20241209/247516678-1-zmcrnbqwxitkoheuvadsgljpfy.jpg?w=220&h=160",
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
        "https://resize.ecoauc.com/images/item/20241209/247516678-1-zmcrnbqwxitkoheuvadsgljpfy.jpg?w=220&h=160",
        "https://resize.ecoauc.com/images/item/20241209/247516678-1-zmcrnbqwxitkoheuvadsgljpfy.jpg?w=220&h=160",
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
        <div
          className="bid"
          //   style={{ backgroundColor: `${getBidBgColor(item)}` }}
        >
          <div>{item?.title}</div>
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
              <Col span={6} className="p-[5px]" key={itemImg}>
                <Image
                  className="slide-item"
                  src={itemImg}
                  preview={false}
                  key={itemImg}
                />
                {/* <ZoomImage url={itemImg}/> */}
              </Col>
            ))}
          </Row>
          {/* <div className="flex ">
            {item?.itemImgs?.map((itemImg) => (
              <div
                //   span={6}
                key={itemImg}
                className="p-[5px]"
              >
                <div className="slide-item w-[100%]">
                  <img src={itemImg} className="w-[25%]"/>
                </div>
              </div>
            ))}
          </div> */}
          {/* <div class="scroll-container">
            <button class="scroll-btn prev-btn" onClick={() => scroll("prev")}>
              &lt;
            </button>
            <div class="image-list" ref={imageListRef}>
              {item?.itemImgs?.map((itemImg) => (
                <Image
                  // width={200}
                  className="!w-[150px]"
                  src={itemImg}
                  preview={false}
                  key={itemImg}
                />
              ))}
            </div>
            <button class="scroll-btn next-btn" onClick={() => scroll("next")}>
              &gt;
            </button>
          </div> */}
        </div>
      </Col>
    );
  };

  useEffect(() => {
    

  }, [bidId]);

  return (
    <div className="bid-list">
      <div className="flex justify-center text-[30px] p-[20px]">
        Danh sách các vật phẩm của phiên đấu giá A
      </div>
      <Row>{itemList?.map((item) => generateItem(item))}</Row>
    </div>
  );
};
export { ItemList };
