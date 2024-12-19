import { Col, Row } from "antd";
import { useState } from "react";

const ItemDetail = () => {
  const [itemDetail, setItemDetail] = useState({
    imgs: [
      {
        url: "https://assets.ecoauc.com/images/item/20241212/247206132-1-higupdxjvaywfcqksnbotzmrle.jpg",
        id: 0,
        status: "active",
      },
      {
        url: "https://assets.ecoauc.com/images/item/20241212/247206132-1-higupdxjvaywfcqksnbotzmrle.jpg",
        id: 1,
      },
      {
        url: "https://assets.ecoauc.com/images/item/20241212/247206132-1-higupdxjvaywfcqksnbotzmrle.jpg",
        id: 2,
      },
      {
        url: "https://assets.ecoauc.com/images/item/20241212/247206132-1-higupdxjvaywfcqksnbotzmrle.jpg",
        id: 3,
      },
      {
        url: "https://assets.ecoauc.com/images/item/20241212/247206132-1-higupdxjvaywfcqksnbotzmrle.jpg",
        id: 4,
      },
    ],
  });

  const generateActiveImage = () => {
    const activeImg = itemDetail?.imgs?.find((img) => img?.status);
    return <img src={activeImg?.url} className="a" />;
  };

  const generateActiveImage2 = () => {
    const activeImg = itemDetail?.imgs?.find((img) => img?.status);
    return <img src={activeImg?.url} className="xyz"></img>;
  };

  const generateImage = (img) => {
    return (
      <Col span={6} className="p-[5px]">
        <img src={img?.url} className="slide-item" />
      </Col>
    );
  };

  return (
    <div className="bid-list">
      <div className="flex justify-between">
        <div className="w-[40%]">
          {generateActiveImage()}
          <Row>{itemDetail?.imgs?.map((img) => generateImage(img))}</Row>
        </div>
        <div className="w-[55%]">
          <div>
            <div className="flex justify-center gap-[10px] p-[50px]">
              <div>HERMES (8172_0013) HERMES Key scarf</div>
              <div>B</div>
            </div>
            <div className="flex">
              <div className="w-[200px] ">Starting price</div>
              <div>0</div>
            </div>
            <div className="flex">
              <div className="w-[200px] ">Starting price</div>
              <div>0</div>
            </div>
            <div className="flex">
              <div className="w-[200px] ">Starting price</div>
              <div>0</div>
            </div>
            <div className="flex">
              <div className="w-[200px] ">Starting price</div>
              <div>0</div>
            </div>
            <div className="flex">
              <div className="w-[200px] ">Starting price</div>
              <div>0</div>
            </div>
            <div className="flex">
              <div className="w-[200px] ">Starting price</div>
              <div>0</div>
            </div>
            <div className="flex">
              <div className="w-[200px] ">Starting price</div>
              <div>0</div>
            </div>
            <div className="flex">
              <div className="w-[200px] ">Starting price</div>
              <div>0</div>
            </div>
          </div>
          <div><img src='https://assets.ecoauc.com/images/item/20241212/247206132-1-higupdxjvaywfcqksnbotzmrle.jpg' className="xyz"></img></div>
        </div>
      </div>
    </div>
  );
};

export { ItemDetail };
