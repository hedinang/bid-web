import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import ZoomImage from "../../components/img/ZoomImage";
import { useNavigate, useParams } from "react-router-dom";
import apiFactory from "../../api";
import { toast } from "react-toastify";
import { IoArrowBackOutline } from "react-icons/io5";

const AdminItemDetail = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState({});
  const [activeUrl, setActiveUrl] = useState({});
  const { itemId } = useParams();
  const fetchData = async () => {
    setIsLoading(true);
    if (!itemId) return;

    const result = await apiFactory.itemApi.getDetail(itemId);

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }
    setIsLoading(false);
    setItem(result?.data);
    setActiveUrl(result?.data?.detailUrls?.[0]);
  };

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
    return <ZoomImage url={activeUrl} />;
  };

  const generateImage = (img) => {
    return (
      <Col span={6} className="p-[5px]" onClick={() => setActiveUrl(img)}>
        <img src={img} className="slide-item" />
      </Col>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bid-list">
      <div className="flex justify-between">
        <div className="w-[40%] p-[10px]">
          <ZoomImage url={activeUrl} cssSize={"big"} />
          <Row>{item?.detailUrls?.map((img) => generateImage(img))}</Row>
        </div>
        <div className="w-[55%]">
          <div>
            <div className="flex justify-center text-[20px] p-[5px] gap-[10px]">
              <button onClick={() => navigate("/admin/bid-list")}>
                <IoArrowBackOutline size={25} />
              </button>
              <div className="font-semibold">{item?.itemId}</div>
            </div>
            <div className="text-center p-[5px]">
              <a href={item?.itemUrl} target="_blank" className="text-[blue]">
                Original link
              </a>
            </div>
            <div className="text-center p-[5px] font-semibold">{item?.title}</div>
            <div className="text-center p-[5px] font-semibold">{item?.description}</div>
            <div className="flex p-[5px]">
              <div className="w-[200px] font-semibold">Bid id</div>
              <div>{item?.bidId}</div>
            </div>
            <div className="flex p-[5px]">
              <div className="w-[200px] font-semibold">Rank</div>
              <div>{item?.rank}</div>
            </div>
            <div className="flex p-[5px]">
              <div className="w-[200px] font-semibold">Starting price</div>
              <div>{item?.startPrice}</div>
            </div>
            <div className="flex p-[5px]">
              <div className="w-[200px] font-semibold">Branch</div>
              <div>{item?.branch}</div>
            </div>
            <div className="flex p-[5px]">
              <div className="w-[200px] font-semibold">Category</div>
              <div>{item?.category}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AdminItemDetail };
