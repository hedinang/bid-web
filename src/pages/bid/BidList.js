import { Button, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import apiFactory from "../../api";
import { toast } from "react-toastify";

const BidList = () => {
  const navigate = useNavigate();
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

  const getBidStatusButotn = (bidStatus) => {
    switch (bidStatus) {
      case "Preview possible":
        return (
          <Button
            className="text-[#2d7717] text-[18px]"
            onClick={() => navigate("/item-list/1")}
          >
            Xem trước
          </Button>
        );

      case "In session":
        return (
          <Button
            className="bg-[#2d7717] text-[white] text-[18px]"
            onClick={() => navigate("/item-list/1")}
          >
            Tham gia
          </Button>
        );

      default:
        return (
          <Button
            className="text-[#2d7717] text-[18px]"
            onClick={() => navigate("/item-list/1")}
          >
            Chuẩn bị
          </Button>
        );
    }
  };

  const generateBid = (bid) => {
    return (
      <Col span={6} className="p-[10px]">
        <Card hoverable>
          <div className="bid">
            <div className="text-[20px] font-semibold">Thời gian đấu giá</div>
            <div className="flex justify-center gap-[10px] items-center">
              <MdOutlineAccessTime size={25} />
              <div>{bid?.openTime}</div>
            </div>
            <div className="flex justify-center">
              <img src={bid?.headerIcon} className="h-[40px]" />
            </div>
            {bid?.bidStatus !== "In session" ? (
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
            <div>{getBidStatusButotn(bid?.bidStatus)}</div>
          </div>
        </Card>
      </Col>
    );
  };

  const fetchData = async () => {
    const result = await apiFactory.bidApi.list();

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }

    setBidList(result?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
