import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Pagination } from "antd";
import Highlighter from "react-highlight-words";
import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import "./styleUser.scss";
import { Link, useRouteMatch } from "react-router-dom";
import productApi from "../../api/productApi";

export const DataProducts = () => {
  const { url } = useRouteMatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [check, setCheck] = useState(true);
  const [data, setData] = useState([] | null);
  const handleClick = async (id) => {
    try {
      if (window.confirm("Bạn có chắc chắn muốn xóa")) {
        await productApi.remove(id);
        setCheck(!check);
      }
    } catch (error) {
      alert("Unauthorization!");
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await productApi.getAll();
        setData(productList);
      } catch (error) {}
    };
    fetchProducts();
  }, [check]);
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm kiếm`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Giá mua",
      dataIndex: "buyPrice",
      key: "buyPrice",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.buyPrice - b.buyPrice,
      ...getColumnSearchProps("buyPrice"),
    },
    {
      title: "Giá cho thuê",
      dataIndex: "perDay",
      key: "perDay",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.perDay - b.perDay,
      ...getColumnSearchProps("perDay"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleClick(record.id)}
            style={{ border: "none" }}
          >
            Xóa
          </Button>
          <Link to={`${url}/new/${record.id}`}>Sửa</Link>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="admin-hea">
        <div className="create-new-a">
          <Link to={`${url}/new`} style={{ color: "red", padding: "10px" }}>
            <FormOutlined /> Thêm mới Product
          </Link>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={data} pagination={false} />
        <Pagination defaultCurrent={1} total={100} />
      </div>
    </div>
  );
};
