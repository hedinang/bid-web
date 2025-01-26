import { Button, Card, Col, Modal, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import apiFactory from "../../api";
import { toast } from "react-toastify";
import winitechLogo from "../../assets/bid-icon.png";
import { sortBy } from "lodash";
import { IoShirt } from "react-icons/io5";
import Cookies from "js-cookie";
import { useInfoUser } from "../../store/UserStore";

const SummaryBid = ({ bid }) => {
  const { user } = useInfoUser();
  const navigate = useNavigate();

  const [isUpdating, setIsUpdating] = useState(false);
  const [doneItem, setDoneItem] = useState(false);

  const getBidStatusButotn = (bid) => {
    switch (bid?.donePage) {
      case 0:
        return (
          <Button className="text-[#2d7717] text-[18px]" disabled>
            Chuẩn bị
          </Button>
        );

      default:
        return (
          <Button
            className="text-[#2d7717] text-[18px]"
            onClick={() =>
              navigate("/admin/item-list/" + bid?.bidId + "/" + bid?.bidStatus)
            }
          >
            Xem trước
          </Button>
        );
    }
  };

  const syncBid = async () => {
    const result = await apiFactory.bidApi.syncBid(bid);
    if (result?.status === 200) {
      toast.success(
        `You are just syncronizing bid: ${bid?.bidId} - ${bid?.bidStatus}`
      );
      return;
    }

    toast.error(`You sync wrong bid: ${bid?.bidId} - ${bid?.bidStatus}`);
  };

  const stopSyncBid = async () => {
    const result = await apiFactory.bidApi.stopSyncBid({
      threadName: `bid-${bid?.bidId}-${bid?.bidStatus}`,
    });
    if (result?.status === 200) {
      toast.success(
        `You stop syncronizing bid: ${bid?.bidId} - ${bid?.bidStatus}`
      );
      return;
    }

    toast.error(
      `You stop syncronizing wrong bid: ${bid?.bidId} - ${bid?.bidStatus}`
    );
  };

  useEffect(() => {
    setIsUpdating(
      bid?.donePage && Math.ceil(bid?.totalItem / 50) + 2 !== bid?.donePage
    );

    setDoneItem(
      Math.ceil(bid?.totalItem / 50) + 2 === bid?.donePage
        ? bid?.totalItem
        : bid?.donePage * 50
    );
  }, [bid]);

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
          {user?.role === "SUPER_ADMIN" && (
            <div className="flex justify-center gap-[10px]">
              <Button
                className="text-[#2d7717] text-[18px]"
                onClick={stopSyncBid}
              >
                stop sync
              </Button>
              <Button className="text-[#2d7717] text-[18px]" onClick={syncBid}>
                sync
              </Button>
            </div>
          )}
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

const AdminBidList = () => {
  const { user } = useInfoUser();
  const navigate = useNavigate();
  const [bidList, setBidList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [threadList, setThreadList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const syncBidList = async () => {
    setIsLoading(true);
    const result = await apiFactory.bidApi.syncBidList();

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }
    setIsLoading(false);
  };

  const getThreadList = async () => {
    setIsLoading(true);
    const result = await apiFactory.bidApi.getThreadList();

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }

    setThreadList(result?.data);
    setIsModalOpen(true);
    setIsLoading(false);
  };

  const logout = async () => {
    await apiFactory.userApi.logout();
    Cookies.remove("access_token");
    navigate("/login");
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bid-list">
      <div>
        <div className="text-[30px] p-[20px] text-center">
          Tài sản sắp được đấu giá
        </div>
        <div className="absolute top-[20px] right-[10px]">
          <Button onClick={logout}>logout</Button>
        </div>
      </div>
      {user?.role === "SUPER_ADMIN" && (
        <div className="flex justify-center gap-[10px]">
          <Button
            className="text-[#2d7717] text-[18px]"
            onClick={getThreadList}
          >
            Get thread list
          </Button>
          <Button className="text-[#2d7717] text-[18px]" onClick={syncBidList}>
            Get bid list
          </Button>
        </div>
      )}
      <Row>
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Spin />
          </div>
        ) : (
          bidList
            ?.filter((bid) => bid?.bidStatus)
            ?.map((bid) => (
              <SummaryBid bid={bid} key={`${bid?.bidId}-${bid?.bidStatus}`} />
            ))
        )}
      </Row>
      <Modal
        open={isModalOpen}
        footer={false}
        closeIcon={true}
        onCancel={cancelModal}
        centered
        // className="preview-image-wrap"
      >
        <div>Running thread list: </div>
        <div>
          {threadList?.map((th) => (
            <div key={th}>{th}</div>
          ))}
        </div>
      </Modal>
    </div>
  );
};
export { AdminBidList };
