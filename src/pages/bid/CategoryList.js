import {Button, Card, Col, Row} from "antd";
import {useEffect, useState} from "react";
import {IoShirt} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import winitechLogo from "../../assets/bid-icon.png";
import {useLayoutContext} from "../../context/LayoutContext";
import "./style.scss";
import apiFactory from "../../api";

const SummaryCategory = ({category}) => {
  const navigate = useNavigate();

  const getBidStatusButton = (bid) => {
    switch (bid?.donePage) {
      case Math.ceil(bid?.totalItem / 50):
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
                    navigate(
                        `/item-category-list/${category?.categoryName}`
                    )
                }
            >
              Xem trước
            </Button>
        );
    }
  };

  return <Col
      xs={24}
      sm={12}
      md={8}
      lg={6}
      className="p-[10px]"
      key={`${category?.categoryName}`}
  >
    <Card>
      <div className="bid">
        <div className="text-[20px] font-semibold">
          {category?.categoryName}
        </div>
        <div className="flex justify-center">
          <img src={winitechLogo} className="h-[40px]"/>
        </div>
        <div className="flex justify-center items-center gap-[10px]">
          <IoShirt size={20} color="#fccc14"/>{" "}
          {category?.uploadedCount}
        </div>
        <div>{getBidStatusButton({donePage: 10, totalItem: 10})}</div>
      </div>
    </Card>
  </Col>
}

const CategoryList = () => {
  const {me, setPageLink} = useLayoutContext();
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([
    {
      name: "Jewelry",
      totalItem: 20,
      uploadedCount: 10
    },
    {
      name: "Accessory",
      totalItem: 20,
      uploadedCount: 10
    },
    {
      name: "Musical instrument",
      totalItem: 20,
      uploadedCount: 10
    },
    {
      name: "Smoking device",
      totalItem: 20,
      uploadedCount: 10
    }]);

  const fetchCategoryList = async () => {
    const result = await apiFactory.bidApi.getCategoryList()

    if (result?.status === 200) {
      setCategoryList(result?.data)
    }
  }


  useEffect(() => {
    fetchCategoryList()
  }, []);

  return (
      <div className="bid-list">
        <div>
          <div className="text-[30px] p-[20px] text-center">
            Tài sản sắp được đấu giá được phân loại
          </div>
        </div>
        <Row className="min-h-[680px]">
          {categoryList
              ?.map((category) => (
                  <SummaryCategory category={category}/>
              ))}
        </Row>
      </div>
  );
};
export {CategoryList};
