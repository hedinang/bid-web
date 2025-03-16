import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { IoArrowBackOutline, IoCartOutline } from "react-icons/io5";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import apiFactory from "../../api";
import ZoomImage from "../../components/img/ZoomImage";
import { role } from "../../config/Constant";
import { useItemContext } from "../../context/ItemContext";
import { useInfoUser } from "../../store/UserStore";

const AdminItemDetail = () => {
  const navigate = useNavigate();
  const { item, activeUrl, bid, setFullActiveUrl } = useItemContext();
  const [bidPrice, setBidPrice] = useState(0);
  const { user } = useInfoUser();

  const generateImage = (img) => {
    const fillImg = img.replace(
      "https://resize.ecoauc.com",
      "https://assets.ecoauc.com"
    );

    return (
      <Col
        span={6}
        className="col-slide-item"
        onClick={() => setFullActiveUrl(img)}
        key={img}
      >
        <img src={fillImg} className="slide-item" />
      </Col>
    );
  };

  const onBackPage = () => {
    if (bid?.bidId) {
      navigate(`/inside/bid/item-list/${bid?.bidId}/${bid?.bidStatus}`);
    } else {
      navigate(`/inside/bid/bid-list`);
    }
  };

  const addToCard = async () => {
    const result = await apiFactory.orderApi.addToCard({
      bidId: item?.bidId,
      itemId: item?.itemId,
      bidPrice: bidPrice,
    });

    console.log(result);
  };

  useEffect(() => {
    setBidPrice(item?.bidPrice);
  }, [item?.itemId]);

  return (
    <div className="item-list">
      <div className="item-header">
        <div className="flex justify-center text-[20px] p-[5px] gap-[10px]">
          <button onClick={onBackPage}>
            <IoArrowBackOutline size={25} />
          </button>
          <div className="font-semibold">{item?.itemId}</div>
        </div>
        {user?.role !== role.CUSTOMER && (
          <div className="text-center p-[5px]">
            <a href={item?.itemUrl} target="_blank" className="text-[blue]">
              Original link
            </a>
          </div>
        )}
        <div className="text-center p-[5px] font-semibold">{item?.title}</div>
        <div className="text-center p-[5px] font-semibold">
          {item?.description}
        </div>
        {user?.role === role.CUSTOMER && (
          <div className="text-center p-[5px] font-semibold flex flex-row gap-[10px] justify-center">
            <NumericFormat
              className="w-[150px]"
              value={bidPrice}
              prefix="¥"
              customInput={Input}
              isAllowed={(values) =>
                values.floatValue === undefined || values.floatValue <= 1000000
              }
              onValueChange={(values, sourceInfo) => {
                setBidPrice(values?.floatValue);
              }}
            />
            <Button
              shape="circle"
              icon={<IoCartOutline size={20} />}
              className=""
              onClick={addToCard}
            />
          </div>
        )}
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
                <button onClick={onBackPage}>
                  <IoArrowBackOutline size={25} />
                </button>
                <div className="font-semibold">{item?.itemId}</div>
              </div>
              {user?.role !== role.CUSTOMER && (
                <div className="text-center p-[5px]">
                  <a
                    href={item?.itemUrl}
                    target="_blank"
                    className="text-[blue]"
                  >
                    Original link
                  </a>
                </div>
              )}
              <div className="text-center p-[5px] font-semibold">
                {item?.title}
              </div>
              <div className="text-center p-[5px] font-semibold">
                {item?.description}
              </div>
              {user?.role === role.CUSTOMER && (
                <div className="text-center p-[5px] font-semibold flex flex-row gap-[10px] justify-center">
                  <NumericFormat
                    className="w-[150px]"
                    value={bidPrice}
                    prefix="¥"
                    customInput={Input}
                    isAllowed={(values) =>
                      values.floatValue === undefined ||
                      values.floatValue <= 1000000
                    }
                    onValueChange={(values, sourceInfo) => {
                      setBidPrice(values?.floatValue);
                    }}
                  />
                  <Button
                    shape="circle"
                    icon={<IoCartOutline size={20} />}
                    className=""
                    onClick={addToCard}
                  />
                </div>
              )}
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

export { AdminItemDetail };
