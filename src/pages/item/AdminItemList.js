import {
  Button,
  Card,
  Col,
  Image,
  Input,
  Pagination,
  Row,
  Select,
  Spin,
} from "antd";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { IoArrowBackOutline, IoCartOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiFactory from "../../api";
import { role } from "../../config/Constant";
import { useItemContext } from "../../context/ItemContext";
import { useInfoUser } from "../../store/UserStore";
import {
  expiredBidOrder,
  formatTime,
  minusFormatTime,
} from "../../utils/formatTime";
import "./style.scss";

const parseInt = (numberString) => {
  return Number(numberString?.replace(/¥/g, "")?.replace(/,/g, ""));
};

const ItemDetail = ({ item, itemList, setItemList }) => {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState();
  const [bidPrice, setBidPrice] = useState(item?.bidPrice);

  const { user, languageMap } = useInfoUser();
  const {
    // itemList,
    bid,
    // setItemList,
  } = useItemContext();

  const addToCard = async () => {
    const rs = await apiFactory.orderApi.addToCard({
      bidId: item?.bidId,
      itemId: item?.itemId,
      bidPrice: bidPrice,
    });

    if (rs?.status === 200) {
      toast.success("Action successfully");
      const itemIndex = itemList?.findIndex((e) => e?.itemId === item?.itemId);

      if (itemIndex > -1) {
        itemList[itemIndex].orderType = "ORDER";
        itemList[itemIndex].orderId = rs?.data?.orderId;
      }

      setItemList([...itemList]);
    } else {
      toast.success("Action unsuccessfully");
    }
  };

  const onCancel = async () => {
    const rs = await apiFactory.orderApi.changeStatus({
      orderId: item?.orderId,
      type: "CANCEL",
    });

    if (rs?.status === 200) {
      toast.success("Action successfully");
      const itemIndex = itemList?.findIndex(
        (e) => e?.orderId === item?.orderId
      );

      if (itemIndex > -1) {
        itemList[itemIndex].orderType = "CANCEL";
      }

      setItemList([...itemList]);
    } else {
      toast.success("Action unsuccessfully");
    }
  };

  const showItemStatus = () => {
    if (item?.orderType === "ORDER")
      return <div className="item-status bg-[#2a56b9]">Đợi đặt</div>;

    if (item?.orderType === "BIDDING")
      return <div className="item-status bg-[#c9ac12]">Đã đặt</div>;

    if (item?.orderType === "CANCEL")
      return <div className="item-status bg-[#e81224]">Hủy đặt</div>;

    if (item?.orderType === "SUCCESS")
      return <div className="item-status bg-[#78b43d]">Đấu thành công</div>;

    if (item?.orderType === "FAILED")
      return <div className="item-status bg-[#dd5930]">Đấu thất bại</div>;
  };

  const handleCopy = (itemId) => {
    try {
      const isSuccess = copy(itemId);
      if (!isSuccess) {
        toast.error("Chép mã sản phẩm lỗi !");
      } else {
        toast.success("Chép mã sản phẩm thành công");
      }
    } catch (error) {
      toast.error("Chép mã sản phẩm lỗi !");
    }
  };

  useEffect(() => {
    setActiveImg(
      item?.detailUrls?.[0]?.replace(
        "https://resize.ecoauc.com",
        "https://assets.ecoauc.com"
      )
    );
  }, [item]);

  return (
    <Col
      xs={24}
      sm={24}
      md={12}
      xl={8}
      className="p-[10px]"
      key={item?.itemId + item?.title}
    >
      {showItemStatus()}
      <Card hoverable>
        <div className="item">
          <div className="item-title">
            <div className="flex gap-[10px] items-center">
              <div className="text-[17px] text-[#194ee9]">{item?.itemId}</div>
              <button
                onClick={() => handleCopy(item?.itemId)}
                className="height-[18px]"
              >
                <FaCopy size={20} color="#2a56b9" />
              </button>
            </div>
            <div className="text-[17px] font-semibold">{item?.title}</div>
            {user?.role !== role.CUSTOMER && (
              <a href={item?.itemUrl} target="_blank" className="text-[blue]">
                Original link
              </a>
            )}
          </div>
          <div className="text-center h-[44px]">{item?.description}</div>
          {user?.role === role.CUSTOMER && !expiredBidOrder(bid?.openTime) && (
            <div className="text-center p-[5px] font-semibold flex flex-row gap-[10px] justify-center">
              <NumericFormat
                className="w-[150px]"
                value={bidPrice}
                prefix="¥"
                customInput={Input}
                isAllowed={(values) =>
                  values.floatValue === undefined ||
                  values.floatValue <= 10000000
                }
                onValueChange={(values, sourceInfo) => {
                  setBidPrice(values?.floatValue);
                }}
                disabled={["BIDDING", "SUCCESS", "FAILED"]?.includes(
                  item?.orderType
                )}
              />
              {!["BIDDING", "SUCCESS", "FAILED"]?.includes(item?.orderType) && (
                <Button
                  shape="circle"
                  icon={<IoCartOutline size={20} />}
                  className=""
                  onClick={addToCard}
                  disabled={!bidPrice || bidPrice < parseInt(item?.startPrice)}
                />
              )}
              {item?.orderType === "ORDER" && (
                <Button
                  shape="circle"
                  icon={<MdCancel size={20} />}
                  className=""
                  onClick={onCancel}
                />
              )}
            </div>
          )}
          <div className="flex justify-center gap-[10px] items-center">
            <div>{item?.endTime}</div>
          </div>
          <div className="flex justify-center p-[5px]">
            {/* <ZoomImage url={activeImg} cssSize={"small"} /> */}
            <Image
              src={activeImg}
              height={300}
              // className="!w-[100%] !h-[300px]"
            />
          </div>
          <Row>
            <Col span={12}>
              <div>Chất lượng</div>
              <div>{item?.rank}</div>
            </Col>
            <Col span={12}>
              <div>Giá khởi điểm</div>
              <div>{item?.startPrice}</div>
            </Col>
          </Row>

          <div>
            <Button
              className="text-[#2d7717] text-[18px]"
              onClick={() =>
                navigate(`/inside/bid/item-detail/${item?.itemId}`)
              }
            >
              Xem chi tiết
            </Button>
          </div>
        </div>
      </Card>
    </Col>
  );
};

const AdminItemList = () => {
  const navigate = useNavigate();
  const {
    itemList,
    bid,
    isLoading,
    searchItem,
    onChooseBranch,
    onChooseRank,
    onChooseCategory,
    changePage,
    setItemList,
  } = useItemContext();

  return (
    <div className="item-list">
      <div className="flex justify-center text-[30px] p-[20px] gap-[10px]">
        <button onClick={() => navigate("/inside/bid/bid-list")}>
          <IoArrowBackOutline size={25} />
        </button>
        <div className="text-center">
          <div>Phiên đấu giá lúc {formatTime(bid?.openTime)}</div>
          <div>Đặt giá trước {minusFormatTime(bid?.openTime)}</div>
        </div>
      </div>

      <Row className="flex items-center">
        <Col xs={24} md={8} className="p-[10px]">
          <Select
            placeholder="Chọn hãng"
            allowClear
            className="w-[200px]"
            options={[
              { value: "LOUIS VUITTON", label: "LOUIS VUITTON" },
              { value: "CHANEL", label: "CHANEL" },
              { value: "HERMES", label: "HERMES" },
              { value: "GUCCI", label: "GUCCI" },
              { value: "PRADA", label: "PRADA" },
              { value: "ROLEX", label: "ROLEX" },
              { value: "OMEGA", label: "OMEGA" },
              { value: "TAG Heuer", label: "TAG Heuer" },
              { value: "Catier", label: "Catier" },
              { value: "BVLGARI", label: "BVLGARI" },
              { value: "Tiffany＆Co.", label: "Tiffany＆Co." },
              { value: "HARRY WINSTON", label: "HARRY WINSTON" },
              { value: "Van Cleef＆Arpels", label: "Van Cleef＆Arpels" },
              { value: "A. LANGE & SOHNE", label: "A. LANGE & SOHNE" },
              { value: "AUDEMARS PIGUET", label: "AUDEMARS PIGUET" },
              { value: "Baccarat", label: "Baccarat" },
              { value: "BALENCIAGA", label: "BALENCIAGA" },
              { value: "BALLY", label: "BALLY" },
              { value: "BAUME＆MERCIER", label: "BAUME＆MERCIER" },
              { value: "Bell & Ross", label: "Bell & Ross" },
              { value: "Berluti", label: "Berluti" },
              { value: "BOTTEGA VENETA", label: "BOTTEGA VENETA" },
              { value: "BOUCHERON", label: "BOUCHERON" },
              { value: "BREGUET", label: "BREGUET" },
              { value: "BREITLING", label: "BREITLING" },
              { value: "Buccellati", label: "Buccellati" },
              { value: "BURBERRY", label: "BURBERRY" },
              { value: "Carlo Parlati", label: "Carlo Parlati" },
              { value: "Carrera y Carrera", label: "Carrera y Carrera" },
              { value: "CASIO", label: "CASIO" },
              { value: "CAZZANIGA", label: "CAZZANIGA" },
              { value: "CELINE", label: "CELINE" },
              { value: "CHARRIOL", label: "CHARRIOL" },
              { value: "CHAUMET", label: "CHAUMET" },
              { value: "chloe", label: "chloe" },
              { value: "Chopard", label: "Chopard" },
              { value: "Christian Louboutin", label: "Christian Louboutin" },
              { value: "CHROME HEARTS", label: "CHROME HEARTS" },
              { value: "CITIZEN", label: "CITIZEN" },
              { value: "COACH", label: "COACH" },
              { value: "Cole Haan", label: "Cole Haan" },
              { value: "COMME des GARCONS", label: "COMME des GARCONS" },
              { value: "CORUM", label: "CORUM" },
              { value: "D＆G", label: "D＆G" },
              { value: "Damiani", label: "Damiani" },
              { value: "DE BEERS", label: "DE BEERS" },
              { value: "Dior", label: "Dior" },
              { value: "DOLCE＆GABBANA", label: "DOLCE＆GABBANA" },
              { value: "DSQUARED3", label: "DSQUARED3" },
              { value: "dunhill", label: "dunhill" },
              { value: "EDOX", label: "EDOX" },
              { value: "EMILIO PUCCI", label: "EMILIO PUCCI" },
              { value: "ETRO", label: "ETRO" },
              { value: "FEDERICO BUCCELLATI", label: "FEDERICO BUCCELLATI" },
              { value: "Felisi", label: "Felisi" },
              { value: "FENDI", label: "FENDI" },
              { value: "FRANCK MULLER", label: "FRANCK MULLER" },
              { value: "FRED", label: "FRED" },
              { value: "FREDERIQUE CONSTANT", label: "FREDERIQUE CONSTANT" },
              { value: "FURLA", label: "FURLA" },
              { value: "Gaga Milano", label: "Gaga Milano" },
              { value: "Georg Jensen", label: "Georg Jensen" },
              { value: "gimel", label: "gimel" },
              { value: "GIRARD PERREGAUX", label: "GIRARD PERREGAUX" },
              { value: "GIVENCHY", label: "GIVENCHY" },
              { value: "GOYARD", label: "GOYARD" },
              { value: "GRAFF", label: "GRAFF" },
              { value: "GRAHAM", label: "GRAHAM" },
              { value: "HUBLOT", label: "HUBLOT" },
              { value: "IWC", label: "IWC" },
              { value: "Jacob & CO", label: "Jacob & CO" },
              { value: "JAEGER LECOULTRE", label: "JAEGER LECOULTRE" },
              { value: "Jeunet", label: "Jeunet" },
              { value: "JEWEL STUDIO", label: "JEWEL STUDIO" },
              { value: "JILSANDER", label: "JILSANDER" },
              { value: "JIMMY CHOO", label: "JIMMY CHOO" },
              { value: "Justin Davis", label: "Justin Davis" },
              { value: "Kashikey", label: "Kashikey" },
              { value: "Kate Spade", label: "Kate Spade" },
              { value: "LANVIN", label: "LANVIN" },
              { value: "LOEWE", label: "LOEWE" },
              { value: "LONG CHAMP", label: "LONG CHAMP" },
              { value: "LONGINES", label: "LONGINES" },
              { value: "MACKINTOSH", label: "MACKINTOSH" },
              { value: "MARC BY MARC JACOBS", label: "MARC BY MARC JACOBS" },
              { value: "MARC JACOBS", label: "MARC JACOBS" },
              { value: "MAUBOUSSIN", label: "MAUBOUSSIN" },
              { value: "MAURICE LACROIX", label: "MAURICE LACROIX" },
              { value: "MCM", label: "MCM" },
              { value: "Meissen", label: "Meissen" },
              { value: "Michael Kors", label: "Michael Kors" },
              { value: "MIKIMOTO", label: "MIKIMOTO" },
              { value: "miu miu", label: "miu miu" },
              { value: "MONCLER", label: "MONCLER" },
              { value: "MONTBLANC", label: "MONTBLANC" },
              { value: "ORIENT", label: "ORIENT" },
              { value: "Orobianco", label: "Orobianco" },
              { value: "PANERAI", label: "PANERAI" },
              { value: "PATEK PHILIPPE", label: "PATEK PHILIPPE" },
              { value: "PIAGET", label: "PIAGET" },
              { value: "POLA", label: "POLA" },
              { value: "POMELLATO", label: "POMELLATO" },
              { value: "Ponte Vecchio", label: "Ponte Vecchio" },
              { value: "RADO", label: "RADO" },
              { value: "RayBan", label: "RayBan" },
              { value: "REGAL", label: "REGAL" },
              { value: "RICHARD MILLE", label: "RICHARD MILLE" },
              { value: "RIMOWA", label: "RIMOWA" },
              { value: "Ritmo latino", label: "Ritmo latino" },
              { value: "ROGER DUBUIS", label: "ROGER DUBUIS" },
              { value: "SAINT LAURENT", label: "SAINT LAURENT" },
              { value: "Salvatore Ferragamo", label: "Salvatore Ferragamo" },
              { value: "SEE BY CHLOE", label: "SEE BY CHLOE" },
              { value: "SEIKO", label: "SEIKO" },
              { value: "Sergio Rossi", label: "Sergio Rossi" },
              { value: "SINN", label: "SINN" },
              { value: "SOUTHERN CROSS", label: "SOUTHERN CROSS" },
              { value: "SUPREME", label: "SUPREME" },
              { value: "TASAKI", label: "TASAKI" },
              { value: "TOD’S", label: "TOD’S" },
              { value: "Tom Ford", label: "Tom Ford" },
              { value: "Tory Burch", label: "Tory Burch" },
              { value: "TUDOR", label: "TUDOR" },
              { value: "TUMI", label: "TUMI" },
              { value: "ULYSSE NARDIN", label: "ULYSSE NARDIN" },
              { value: "UNIVERSAL GENEVE", label: "UNIVERSAL GENEVE" },
              { value: "UNOAERRE", label: "UNOAERRE" },
              { value: "VACHERON CONSTANTIN", label: "VACHERON CONSTANTIN" },
              { value: "VALENTINO", label: "VALENTINO" },
              { value: "Vendome Aoyama", label: "Vendome Aoyama" },
              { value: "Verite", label: "Verite" },
              { value: "VERSACE", label: "VERSACE" },
              { value: "Waltham", label: "Waltham" },
              { value: "Yves Saint Laurent", label: "Yves Saint Laurent" },
              { value: "ZENITH", label: "ZENITH" },
              { value: "MITSUO KAJI", label: "MITSUO KAJI" },
              { value: "Historical history", label: "Historical history" },
              { value: "NOBUKO ISHIKAWA", label: "NOBUKO ISHIKAWA" },
              { value: "SHUNICHI TAMURA", label: "SHUNICHI TAMURA" },
              { value: "OTHER", label: "OTHER" },
            ]}
            onChange={onChooseBranch}
          />
        </Col>
        <Col xs={24} md={8} className="p-[10px]">
          <Select
            placeholder="Chọn loại sản phẩm"
            allowClear
            className="w-[200px]"
            onChange={onChooseCategory}
            options={[
              { value: "WATCH", label: "WATCH" },
              { value: "BAG", label: "BAG" },
              { value: "Jewelry", label: "Jewelry" },
              { value: "Accessory", label: "Accessory" },
              { value: "Fashion accessories", label: "Fashion accessories" },
              { value: "Pottery", label: "Pottery" },
              { value: "Camera", label: "Camera" },
              { value: "Apparel", label: "Apparel" },
              { value: "Shoes", label: "Shoes" },
              { value: "Art quality", label: "Art quality" },
              { value: "furniture", label: "furniture" },
              { value: "bicycle", label: "bicycle" },
              { value: "Consumer electronics", label: "Consumer electronics" },
              { value: "Hobby", label: "Hobby" },
              { value: "Sport", label: "Sport" },
              { value: "Musical instrument", label: "Musical instrument" },
              { value: "the expendables", label: "the expendables" },
              { value: "game", label: "game" },
              { value: "PC", label: "PC" },
              { value: "Camping Equipment", label: "Camping Equipment" },
              { value: "Audio Equipment", label: "Audio Equipment" },
              { value: "education", label: "education" },
              { value: "media", label: "media" },
              { value: "Smoking device", label: "Smoking device" },
              { value: "cellphone", label: "cellphone" },
              { value: "kimono", label: "kimono" },
              { value: "Brand empty box", label: "Brand empty box" },
              { value: "Car bike equipment", label: "Car bike equipment" },
              { value: "sewing machine", label: "sewing machine" },
            ]}
          />
        </Col>
        <Col xs={24} md={8} className="p-[10px]">
          <Select
            placeholder="Chọn chất lượng"
            allowClear
            className="w-[200px]"
            onChange={onChooseRank}
            options={[
              { value: "N", label: "N" },
              { value: "S", label: "S" },
              { value: "A", label: "A" },
              { value: "AB", label: "AB" },
              { value: "B", label: "B" },
              { value: "BC", label: "BC" },
              { value: "C", label: "C" },
              { value: "D", label: "D" },
              { value: "F", label: "F" },
              { value: "10", label: "10" },
              { value: "9", label: "9" },
              { value: "8", label: "8" },
              { value: "7", label: "7" },
              { value: "6", label: "6" },
              { value: "5", label: "5" },
              { value: "4", label: "4" },
              { value: "3", label: "3" },
              { value: "2", label: "2" },
              { value: "1", label: "1" },
            ]}
          />
        </Col>
      </Row>
      <Row>
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Spin />
          </div>
        ) : (
          itemList?.map((item) => (
            <ItemDetail
              item={item}
              key={item}
              itemList={itemList}
              setItemList={setItemList}
            />
          ))
        )}
      </Row>
      <div className="paging-bottom">
        <Pagination
          current={searchItem?.page}
          total={bid?.totalItem}
          pageSize={searchItem?.limit}
          className="paging"
          showSizeChanger={false}
          onChange={changePage}
        />
      </div>
    </div>
  );
};
export { AdminItemList };
