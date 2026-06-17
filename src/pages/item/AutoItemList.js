import {Button, Table, Upload} from "antd";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import apiFactory from "../../api";
import {useLayoutContext} from "../../context/LayoutContext";
import {UploadOutlined} from "@ant-design/icons";
import {useSendingContext} from "../../context/global/SendingProvider";
import {v4 as uuidv4} from "uuid";
import {AutoItemPanel} from "../../components/panel/AutoItemPanel";
import {IoMenu} from "react-icons/io5";

const AutoItemList = () => {
  const {me, setPageLink} = useLayoutContext();
  const {uploadFile} = useSendingContext()

  const [autoItemSearch, setAutoItemSearch] = useState({
    limit: 30, page: 0, search: {},
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedMail, setSelectedMail] = useState(null);
  const [autoItemList, setAutoItemList] = useState([]);
  const [openPanel, setOpenPanel] = useState(false);
  const columns = [{
    title: "item id", dataIndex: "itemId", key: "itemId", width: 500,
  }, {
    title: "item number", dataIndex: "itemNumber", key: "itemNumber",
  }, {
    title: "item name", dataIndex: "itemName", key: "itemName",
  }, {
    title: "rank", dataIndex: "rank", key: "rank",
  }, {
    title: "pre bidding price", dataIndex: "preBiddingPrice", key: "preBiddingPrice",
  }, {
    title: "max price", dataIndex: "maxPrice", key: "maxPrice",
  },];

  const [pagination, setPagination] = useState({
    pageSize: 15,
    total: 0,
    current: 1,
  });

  const rowClassName = (record) => {
    return record?.isNew ? "bg-[#ffe678]" : "";
  };

  const initAutoItem = async () => {
    setIsLoading(true);
    const result = await apiFactory.autoItemApi.list({
      limit: pagination?.pageSize, page: pagination?.current, search: {},
    });

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }

    setIsLoading(false);
    setAutoItemList(result?.data?.items);
    setPagination(prev => {
      return {...prev, total: result?.data?.totalItems};
    })
  };

  const fetchMoreAutoItem = async (page) => {
    setIsLoading(true);
    const result = await apiFactory.autoItemApi.list({
      limit: pagination?.pageSize, page: page, search: {},
    });

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }

    setIsLoading(false);
    setAutoItemList(result?.data?.items);
    setPagination(prev => {
      return {...prev, total: result?.data?.totalItems};
    })
  };


  const getSelectedColor = (record) => {
    if (record?.userId === selectedMail?.userId) return "bg-red";
  };

  const handleChange = async (event) => {
    const originFile = event?.file?.originFileObj;

    if (originFile?.webkitRelativePath && originFile.webkitRelativePath.includes("/")) {
      toast.error("You can not send folder")
      return;
    }

    if (event?.file?.size > 300000) {
      toast.error("File size exceeds the 1GB limit");
      return;
    }

    originFile.uid = uuidv4();
    const uploadRes = await uploadFile(originFile, "FILE", null);

    const res = await apiFactory.autoItemApi.importCSV({
      resourceId: uploadRes?.data?.resourceId,
    });

    toast.success("Import file thành công")
  };

  const handlePageChange = async ({current}) => {
    setPagination((prev) => ({
      ...prev,
      current: current,
    }));

    await fetchMoreAutoItem(current)
  }

  useEffect(() => {
    initAutoItem();
  }, [autoItemSearch]);

  useEffect(() => {
    setPageLink("MAIL")
  }, [])

  return (<div className="overflow-hidden flex flex-row justify-between items-start">
        <div className="flex-1">
          <div className="font-semibold text-[20px] pl-[16px] pt-[16px] flex justify-center">
            Quản lý tự động đặt giá
          </div>
          <div className="p-[16px]">
            <div className="user-list ">
              <div className="flex justify-between mb-[10px]">
                <div/>
                <Upload
                    showUploadList={false}
                    listType="picture"
                    onChange={handleChange}
                >
                  <Button type="primary" icon={<UploadOutlined/>}>
                    Upload csv
                  </Button>
                </Upload>
              </div>
              <div className="min-h-[645px]">
                <Table
                    columns={columns}
                    dataSource={autoItemList}
                    loading={isLoading}
                    size={"middle"}
                    className="max-h-[1000px]"
                    rowClassName={rowClassName}
                    onRow={(record, index) => ({
                      // onDoubleClick: (e) => onDoubleClick(record),
                      className: getSelectedColor(record), // ref: index === userList?.length - 1 ? lastRecordRef : null,
                    })}
                    pagination={pagination}
                    onChange={handlePageChange}

                />
              </div>
            </div>
          </div>
        </div>
        {openPanel ?
            <AutoItemPanel closePanel={() => setOpenPanel(false)}/> :
            <div className="w-[80px] flex justify-center mt-[10px]">
              <button onClick={() => setOpenPanel(true)}>
                <IoMenu size={25} color="#2a56b9"/>
              </button>
            </div>
        }
      </div>
  );
};

export {AutoItemList};
