import { Col, Row } from "antd";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ZoomImage from "../../components/img/ZoomImage";
import { useItemContext } from "../../context/ItemContext";

const ItemDetail = () => {
  const navigate = useNavigate();
  const { item, activeUrl, setActiveUrl, bid } = useItemContext();

  const generateImage = (img) => {
    return (
      <Col
        span={6}
        className="col-slide-item"
        onClick={() => setActiveUrl(img)}
        key={img}
      >
        <img src={img} className="slide-item" />
      </Col>
    );
  };

  return (
    <div className="item-list">
      <div className="item-header">
        <div className="flex justify-center text-[20px] p-[5px] gap-[10px]">
          <button
            onClick={() =>
              navigate(`/item-list/${bid?.bidId}/${bid?.bidStatus}`)
            }
          >
            <IoArrowBackOutline size={25} />
          </button>
          <div className="font-semibold">{item?.itemId}</div>
        </div>
        <div className="text-center p-[5px] font-semibold">{item?.title}</div>
        <div className="text-center p-[5px] font-semibold">
          {item?.description}
        </div>
      </div>

      <div className="content">
        <div className="content-left">
          <ZoomImage url={activeUrl} cssSize={"big"} />
          <Row>{item?.detailUrls?.map((img) => generateImage(img))}</Row>
        </div>
        <div className="content-right">
          <div>
            <span className="item-header-right">
              <div className="flex justify-center text-[20px] p-[5px] gap-[10px]">
                <button
                  onClick={() =>
                    navigate(`/item-list/${bid?.bidId}/${bid?.bidStatus}`)
                  }
                >
                  <IoArrowBackOutline size={25} />
                </button>
                <div className="font-semibold">{item?.itemId}</div>
              </div>
              <div className="text-center p-[5px] font-semibold">
                {item?.title}
              </div>
              <div className="text-center p-[5px] font-semibold">
                {item?.description}
              </div>
            </span>
            <div className="flex p-[5px]">
              <div className="w-[200px] font-semibold">Bid id</div>
              <div>{bid?.bidId}</div>
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

export { ItemDetail };
