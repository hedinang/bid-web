import { Button, Card, Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import apiFactory from "../../api";
import { toast } from "react-toastify";
import winitechLogo from "../../assets/bid-icon.png";
import { sortBy } from "lodash";
import { IoShirt } from "react-icons/io5";

const AdminBidList = () => {
  const navigate = useNavigate();
  const [bidList, setBidList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBidStatusButotn = (bid) => {
    // return (
    //   <Button
    //     className="text-[#2d7717] text-[18px]"
    //     onClick={() =>
    //       navigate("/item-list/" + bid?.bidId + "/" + bid?.bidStatus)
    //     }
    //   >
    //     Xem trước
    //   </Button>
    // );

    switch (bid?.donePage) {
      case 0:
        return (
          <Button className="text-[#2d7717] text-[18px]" disabled>
            Chuẩn bị
          </Button>
        );

      // case "In session":
      //   return (
      //     <Button
      //       className="bg-[#2d7717] text-[white] text-[18px]"
      //       onClick={() =>
      //         navigate("/item-list/" + bid?.bidId + "/" + bid?.bidStatus)
      //       }
      //     >
      //       Tham gia
      //     </Button>
      //   );

      default:
        return (
          <Button
            className="text-[#2d7717] text-[18px]"
            onClick={() =>
              navigate("/item-list/" + bid?.bidId + "/" + bid?.bidStatus)
            }
          >
            Xem trước
          </Button>
        );
    }
  };

  const generateBid = (bid) => {
    if (!bid?.bidStatus) return null;
    const isUpdating =
      bid?.donePage && Math.ceil(bid?.totalItem / 50) + 2 !== bid?.donePage;

    const doneItem =
      Math.ceil(bid?.totalItem / 50) + 2 === bid?.donePage
        ? bid?.totalItem
        : bid?.donePage * 50;

    return (
      <Col
        xs={24}
        sm={12}
        md={8}
        lg={6}
        className="p-[10px]"
        key={`${bid?.bidId}-${bid?.bidStatus}`}
      >
        <Card hoverable>
          <div className="bid">
            {isUpdating ? <div className="bid-update">Cập nhật</div> : <></>}
            <div className="text-[20px] font-semibold">
              {bid?.bidId} - Thời gian đấu giá
            </div>
            <div className="flex justify-center gap-[10px] items-center">
              <MdOutlineAccessTime size={25} />
              <div>{bid?.openTime}</div>
            </div>
            <div className="flex justify-center items-center gap-[10px]">
              <IoShirt size={20} color="#fccc14" />{" "}
              {`${doneItem} / ${bid?.totalItem}`}
            </div>
            <div className="flex justify-center">
              <img src={winitechLogo} className="h-[40px]" />
            </div>
            <a href={bid?.detailUrl} target="_blank" className="text-[blue]">
              Original link
            </a>
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
            <div>{getBidStatusButotn(bid)}</div>
          </div>
        </Card>
      </Col>
    );
  };

  const fetchData = async () => {
    setIsLoading(true);
    const result = await apiFactory.bidApi.list();

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }
    setIsLoading(false);

    setBidList(
      sortBy(result?.data, (e) => {
        const [timePart, datePart] = e?.openTime?.split(" ");
        return new Date(`${datePart}T${timePart}`);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bid-list">
      <div className="text-[30px] p-[20px] text-center">
        Tài sản sắp được đấu giá
      </div>
      <Row>
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Spin />
          </div>
        ) : (
          bidList?.map((bid) => generateBid(bid))
        )}
      </Row>
    </div>
  );
};
export { AdminBidList };
