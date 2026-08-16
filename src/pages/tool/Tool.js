import {sortBy} from "lodash";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import apiFactory from "../../api";
import {useLayoutContext} from "../../context/LayoutContext";
import "./style.scss";
import {Input, InputNumber} from "antd";
import {formatter} from "../../utils/Utils";

const Tool = () => {
  const {me, setPageLink} = useLayoutContext();
  const navigate = useNavigate();
  const [bidList, setBidList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [threadList, setThreadList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const result = await apiFactory.bidApi.list();

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }
    setIsLoading(false);

    const preparedBidList = result?.data
        ?.map((e) => {
          const [datePart, timePart] = e?.openTime?.split(" ");
          return {
            ...e,
            compareTime: new Date(`${datePart}T${timePart}`),
          };
        })
        ?.filter((e) => e?.compareTime > new Date());

    setBidList(sortBy(preparedBidList, "compareTime"));
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

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setPageLink("BID_LIST")

    fetchData();
  }, []);

  return (
      <div className="flex flex-col gap-[10px] p-[20px]">
        <div className="flex gap-[10px]">
          <div className="w-[400px]">Xóa dữ liệu phiên đấu giá nhỏ hơn</div>
          <InputNumber placeholder="Nhập giá trị max price muốn thay đổi" className="w-[200px]"
              // value={maxPrice}
                       formatter={formatter}
                       parser={value => value?.replace(/\$\s?|(,*)/g, '')}
              // onChange={onChangeMaxPrice}
          />
        </div>
        <div className="flex gap-[10px]">
          <div className="w-[400px]">Xóa dữ liệu đơn đặt hàng có phiên đấu giá nhỏ hơn</div>
          <InputNumber placeholder="Nhập giá trị max price muốn thay đổi" className="w-[200px]"
              // value={maxPrice}
                       formatter={formatter}
                       parser={value => value?.replace(/\$\s?|(,*)/g, '')}
              // onChange={onChangeMaxPrice}
          />
        </div>
      </div>
  );
};
export {Tool};
