import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Pagination } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";
import "./styleUser.scss";
import userApi from "../../api/userApi";

export const DataUsers = () => {
  const { url } = useRouteMatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [check, setCheck] = useState(true);
  const [data, setData] = useState([] | null);
  const handleClick = async (id) => {
    try {
      const userCurrent = JSON.parse(localStorage.getItem("user"));
      const user = await userApi.getUser(id);
      if (userCurrent.username !== user.userName) {
        if (window.confirm("Bạn có chắc chắn muốn xóa")) {
          await userApi.remove(id);
          setCheck(!check);
        }
      } else {
        alert("Tài khoản đang được log in");
      }
    } catch (error) {
      alert("Error");
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await userApi.getAll();
      setData(userList);
    };
    fetchUsers();
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
      title: "FullName",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      ...getColumnSearchProps("gender"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
      ...getColumnSearchProps("age"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`${url}/new/${record.id}`}>Edit</Link>
          <Button
            onClick={() => handleClick(record.id)}
            style={{ border: "none" }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div style={{ marginTop: "60px" }}>
        <Table columns={columns} dataSource={data} pagination={false} />
        <Pagination defaultCurrent={1} total={100} />
      </div>
    </div>
  );
};
