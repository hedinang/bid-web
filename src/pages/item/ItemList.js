import { Button, Col, Row } from "antd";
import { useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import "./style.scss";

const ItemList = () => {
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
        "https://resize.ecoauc.com/images/item/20241209/247516678-1-zmcrnbqwxitkoheuvadsgljpfy.jpg?w=220&h=160",
        "https://resize.ecoauc.com/images/item/20241209/247516678-1-zmcrnbqwxitkoheuvadsgljpfy.jpg?w=220&h=160",
        "https://resize.ecoauc.com/images/item/20241209/247516678-1-zmcrnbqwxitkoheuvadsgljpfy.jpg?w=220&h=160",
        "https://resize.ecoauc.com/images/item/20241209/247516678-1-zmcrnbqwxitkoheuvadsgljpfy.jpg?w=220&h=160",
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

  const generateItem = (item) => {
    return (
      <Col span={6} className="p-[10px]">
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
            <img src={item?.itemImgs[0]} />
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
        </div>
      </Col>
    );
  };

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
