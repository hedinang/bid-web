import React, {useState} from "react";
import "./style.scss";
import {Button, InputNumber} from "antd";
import {formatter} from "../../utils/Utils";
import {GeneralModal} from "../../components/modal/GeneralModal";
import apiFactory from "../../api";
import {toast} from "react-toastify";

const Tool = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [orderBidId, setOrderBidId] = useState(null);
  const [bidBidId, setBidBidId] = useState(null);

  const [openBidModalConfirm, setOpenBidModalConfirm] = useState(false);
  const [openOrderModalConfirm, setOpenOrderModalConfirm] = useState(false);


  const onChangeOrderBidId = (e) => {
    setOrderBidId(e);
  }

  const onChangeBidBidId = (e) => {
    setBidBidId(e);
  }


  const removeBid = async () => {
    const result = await apiFactory.bidApi.deleteLteBid({bidId: bidBidId})
    if (result?.status === 200) {
      toast.success("Xóa thành công")
      setBidBidId(null)
      setOpenBidModalConfirm(false);
    }
  }

  const removeOrder = async () => {
    const result = await apiFactory.orderApi.deleteLteBid({bidId: orderBidId})

    if (result?.status === 200) {
      toast.success("Xóa thành công")
      setOrderBidId(null)
      setOpenOrderModalConfirm(false);
    }
  }

  return (
      <div className="flex flex-col gap-[10px] p-[20px]">
        <div className="flex gap-[20px] items-center">
          <div className="w-[400px]">Xóa dữ liệu phiên đấu giá nhỏ hơn</div>
          <InputNumber placeholder="vd: 1542" className="w-[200px]"
                       value={bidBidId}
                       formatter={formatter}
                       parser={value => value?.replace(/\$\s?|(,*)/g, '')}
                       onChange={onChangeBidBidId}
          />
          <Button onClick={() => setOpenBidModalConfirm(true)}>Xóa</Button>
        </div>
        <div className="flex gap-[20px] items-center">
          <div className="w-[400px]">Xóa dữ liệu đơn đặt hàng có phiên đấu giá nhỏ hơn</div>
          <InputNumber placeholder="vd: 1542" className="w-[200px]"
                       value={orderBidId}
                       formatter={formatter}
                       parser={value => value?.replace(/\$\s?|(,*)/g, '')}
                       onChange={onChangeOrderBidId}
          />
          <Button onClick={() => setOpenOrderModalConfirm(true)}>Xóa</Button>
        </div>
        {openBidModalConfirm && (
            <GeneralModal
                open={openBidModalConfirm}
                onCancel={() => setOpenBidModalConfirm(false)}
                content={"Xác nhận xóa dữ liệu"}
                title={"Xác nhận xóa bid"}
                onConfirm={removeBid}
            />
        )}

        {openOrderModalConfirm && (
            <GeneralModal
                open={openOrderModalConfirm}
                onCancel={() => setOpenOrderModalConfirm(false)}
                content={"Xác nhận xóa dữ liệu"}
                title={"Xác nhận xóa order"}
                onConfirm={removeOrder}
            />
        )}
      </div>
  );
};
export {Tool};
