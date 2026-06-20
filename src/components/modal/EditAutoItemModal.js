import {Button, InputNumber, Modal} from "antd";
import React, {useState} from "react";
import {GeneralModal} from "./GeneralModal";
import apiFactory from "../../api";

const EditAutoItemModal = ({
                             isModalOpen,
                             cancelModal,
                             title,
                             record,
                             setAutoItemList,
                             initAutoItem
                           }) => {

  const formatter = value => {
    const [start, end] = `${value}`.split('.') || [];
    const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${end ? `${v}.${end}` : `${v}`}`;
  };

  const [maxPrice, setMaxPrice] = useState()
  const [isOpenModalConfirmSave, setIsOpenModalConfirmSave] = useState(null);

  const onChangeMaxPrice = (value) => {
    setMaxPrice(value)
  }

  const handleConfirmDelete = async () => {
    await apiFactory.autoItemApi.deleteItem(record?.itemId)
    await initAutoItem()
    cancelModal()
  }

  const confirmEdit = async () => {
    await apiFactory.autoItemApi.edit({
      itemId: record?.itemId,
      maxPrice,
    })

    setAutoItemList(prev => {
      const autoItemIndex = prev?.findIndex(i => i?.itemId === record?.itemId)
      prev[autoItemIndex].maxPrice = maxPrice;
      return [...prev]
    })
    cancelModal()
  }


  return (
      <Modal
          width="500px"
          open={isModalOpen}
          footer={false}
          closeIcon={false}
          onCancel={cancelModal}
          title={title}
          closable={true}
      >
        <div className="flex gap-[5px] items-center">
          <div>Max price:</div>
          <InputNumber placeholder="Nhập giá trị max price muốn thay đổi" className="w-[300px]"
                       value={maxPrice}
                       formatter={formatter}
                       parser={value => value?.replace(/\$\s?|(,*)/g, '')}
                       onChange={onChangeMaxPrice}/>
        </div>

        <div className="flex gap-[10px] justify-center mt-[40px]">
          <Button type="primary" className="bg-[grey] w-[100px]" onClick={cancelModal}>
            Close
          </Button>
          <Button
              type="primary"
              className="bg-[green] w-[100px]"
              onClick={confirmEdit}
          >
            Sửa
          </Button>
          <Button
              type="primary"
              className="bg-[red] w-[100px]"
              onClick={() => setIsOpenModalConfirmSave(true)}
          >
            Xóa
          </Button>
        </div>
        {isOpenModalConfirmSave && (
            <GeneralModal
                title="Bạn có chắc chắn xóa không"
                onCancel={() => setIsOpenModalConfirmSave(false)}
                open={isOpenModalConfirmSave}
                onConfirm={handleConfirmDelete}
            />
        )}
      </Modal>
  );
};
export {EditAutoItemModal};
