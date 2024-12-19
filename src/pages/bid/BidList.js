import { Button, Col, Row } from "antd";
import { useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import "./style.scss";

const BidList = () => {
  const [bidList, setBidList] = useState([
    {
      id: 1,
      status: "preview posible",
      auctionType: "Realtime",
      headerIcon: "https://www.ecoauc.com/images/ecotra_header.png",
      startPreviewTime: "20/12/2024 09:00:00",
      endPreviewTime: "20/12/2024 09:00:00",
      openTime: "20/12/2024 09:00:00",
    },
    {
      id: 1,
      status: "preview posible",
      auctionType: "Realtime",
      headerIcon: "https://www.ecoauc.com/images/ecotra_header.png",
      startPreviewTime: "20/12/2024 09:00:00",
      endPreviewTime: "20/12/2024 09:00:00",
      openTime: "20/12/2024 09:00:00",
    },
    {
      id: 1,
      status: "preview posible",
      auctionType: "Realtime",
      headerIcon: "https://www.ecoauc.com/images/ecotra_header.png",
      startPreviewTime: "20/12/2024 09:00:00",
      endPreviewTime: "20/12/2024 09:00:00",
      openTime: "20/12/2024 09:00:00",
    },
    {
      id: 1,
      status: "in session",
      auctionType: "Realtime",
      headerIcon: "https://www.ecoauc.com/images/ecotra_header.png",
      startPreviewTime: "20/12/2024 09:00:00",
      endPreviewTime: "20/12/2024 09:00:00",
      openTime: "20/12/2024 09:00:00",
    },
    {
      id: 1,
      status: "preview posible",
      auctionType: "Realtime",
      headerIcon: "https://www.ecoauc.com/images/ecotra_header.png",
      startPreviewTime: "20/12/2024 09:00:00",
      endPreviewTime: "20/12/2024 09:00:00",
      openTime: "20/12/2024 09:00:00",
    },
    {
      id: 1,
      status: "in session",
      headerIcon: "https://www.ecoauc.com/images/ecotra_header.png",
      startPreviewTime: "20/12/2024 09:00:00",
      endPreviewTime: "20/12/2024 09:00:00",
      openTime: "20/12/2024 09:00:00",
    },
  ]);

  const getBidBgColor = (bid) => {
    if (bid?.status === "preview posible") return "#e7c5a3";
    return "#94b3e1";
  };

  const generateBid = (bid) => {
    return (
      <Col span={6} className="p-[10px]">
        <div
          className="bid"
          style={{ backgroundColor: `${getBidBgColor(bid)}` }}
        >
          <div className="text-[20px]">Thời gian đấu giá</div>
          <div className="flex justify-center gap-[10px] items-center">
            <MdOutlineAccessTime size={25} />
            <div>{bid?.openTime}</div>
          </div>
          <div className="flex justify-center">
            <img src={bid?.headerIcon} width={150} />
          </div>
          {bid?.status === "preview posible" ? (
            <div className="flex gap-[30px] justify-center">
              <div className="flex items-center">Xem trước: </div>
              <div>
                <div>{bid?.startPreviewTime}</div>
                <div>~</div>
                <div>{bid?.endPreviewTime}</div>
              </div>
            </div>
          ) : (
            <div className="h-[62px]"></div>
          )}
          <div>
            {bid?.status === "preview posible" ? (
              <Button className="text-[#2d7717] text-[18px]">Xem trước</Button>
            ) : (
              <Button className="bg-[#2d7717] text-[white] text-[18px]">
                Tham gia
              </Button>
            )}
          </div>
        </div>
      </Col>
    );
  };

  return (
    <div className="bid-list">
      <div className="flex justify-center text-[30px] p-[20px]">
        Tài sản sắp được đấu giá
      </div>
      <Row>{bidList?.map((bid) => generateBid(bid))}</Row>
    </div>
  );
};
export { BidList };
