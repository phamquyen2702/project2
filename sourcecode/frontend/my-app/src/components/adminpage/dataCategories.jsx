import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import "./styleUser.scss";
import categoryApi from "../../api/categoryApi";
import { Link, useRouteMatch } from "react-router-dom";

export const DataCategories = () => {
  const { url } = useRouteMatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([] | null);
  const [check, setCheck] = useState(true);
  const handleClick = async (id) => {
    try {
      if (window.confirm("Bạn có chắc chắn muốn xóa")) {
        await categoryApi.remove(id);
        setCheck(!check);
      }
    } catch (error) {
      alert("Unauthorization!");
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryList = await categoryApi.getAll();
        setData(categoryList);
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
          placeholder={`Search ${dataIndex}`}
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
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },

    {
      title: "CreateBy",
      dataIndex: "createBy",
      key: "createBy",
      ...getColumnSearchProps("createBy"),
    },
    {
      title: "CreateDate",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to="">Product</Link>
          <Button
            onClick={() => handleClick(record.id)}
            style={{ border: "none" }}
          >
            Delete
          </Button>
          <Link to={`${url}/new/${record.id}`}>Edit</Link>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="admin-hea">
        <div className="create-new-a">
          <Link to={`${url}/new`} style={{ color: "red", padding: "10px" }}>
            <FormOutlined /> Thêm mới Category
          </Link>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};
