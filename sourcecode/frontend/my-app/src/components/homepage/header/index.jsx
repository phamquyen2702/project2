import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.scss";
import userApi from "../../../api/userApi";
import { Dropdown, Menu } from "antd";

export const Header = () => {
  const history = useHistory();
  const users = localStorage.getItem("user");
  const handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/login");
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
    </Menu>
  );
  if (!users) {
    history.push("/login");
  }
  const [name, setName] = useState("");
  useEffect(() => {
    const getUserByUserName = async () => {
      if (users) {
        const userPar = JSON.parse(users);
        const userName = userPar.username;
        const user = await userApi.get(userName);
        setName(user.fullName);
      }
    };
    getUserByUserName();
  }, []);

  return (
    <div className="header">
      <div>Liên hệ ngay - 0969 456 215</div>
      <div className="space">|</div>
      <div>
        <Dropdown overlay={menu}>
          <Link className="name-headers">
            {name ? `  ${name}` : "Đăng nhập"}
          </Link>
        </Dropdown>
      </div>
    </div>
  );
};
