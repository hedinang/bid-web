import { Table } from "antd";

const Cart = () => {
  const columns = [
    {
      title: "Bid Id",
      dataIndex: "deptCd",
      align: "center",
      key: "deptCd",
    },
    // {
    //   title: "Bid Id",
    //   dataIndex: "deptCd",
    //   align: "center",
    //   key: "deptCd",
    // },
    // {
    //   title: "Item Id",
    //   dataIndex: "deptNm",
    //   align: "center",
    //   key: "deptNm",
    // },
    {
      title: "Title",
      dataIndex: "deptAbbr",
      align: "center",
      key: "deptAbbr",
    },
    {
      title: "Category",
      dataIndex: "openDate",
      align: "center",
      key: "openDate",
    },
    {
      title: "Branch",
      dataIndex: "opStatCd",
      align: "center",
      key: "opStatCd",
      //   render: (e) => getLabelByCode(e, opStatCode, user?.language),
    },
    {
      title: "Rank",
      dataIndex: "highDeptNm",
      align: "center",
      key: "highDeptNm",
    },
    {
      title: "Bid Price",
      dataIndex: "workClsCd",
      align: "center",
      key: "workClsCd",
      //   render: (e) => getLabelByCode(e, workClsCode, user?.language),
    },
    {
        title: "Order Date",
        dataIndex: "workClsCd",
        align: "center",
        key: "workClsCd",
        //   render: (e) => getLabelByCode(e, workClsCode, user?.language),
      },
  ];

  return (
    <div>
      <Table
        // className="custom-table"
        size="small"
        columns={columns}
        // dataSource={dataSource}
        // loading={isLoading}
        bordered
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: () => handleRowClick(record, rowIndex),
        //   };
        // }}
        // rowClassName={rowClassName}
        // rowKey={rowKey}
        // rowSelection={rowSelection}
        // pagination={false}
        // scroll={{
        //   scrollToFirstRowOnChange: true,
        // }}
      />
    </div>
  );
};

export { Cart };
