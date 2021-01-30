import React, { useState, useEffect } from "react";
import { Dropdown, Layout, Menu } from "antd";
import "./style.scss";
import {
  AppstoreOutlined,
  HomeOutlined,
  DollarCircleOutlined,
  UserOutlined,
  CodepenOutlined,
  BackwardOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { DataUsers } from "../../components/adminpage/dataUsers";
import { DataCategories } from "../../components/adminpage/dataCategories";
import { DataProducts } from "../../components/adminpage/dataProducts";
import { DataCategoryInfo } from "../../components/adminpage/dataCategoryinfo";
import { DataProductInfo } from "../../components/adminpage/dataProductInfo";
import { DataUserInfo } from "../../components/adminpage/dataUserInfo";
import userApi from "../../api/userApi";
import { dashboard } from "../../components/adminpage/dashboard";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Admin = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/login");
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
    </Menu>
  );
  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState("");
  const users = localStorage.getItem("user");
  const history = useHistory();

  if (!users) {
    history.push("/login");
  }
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
  const { path, url } = useRouteMatch();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo-admin" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to={`${url}/`}>Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            <Link to={`${url}/category`}>Danh mục</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to={`${url}/user`}>Tài khoản</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<CodepenOutlined />}>
            <Link to={`${url}/product`}>Sản phẩm</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<DollarCircleOutlined />} title="Thống kê">
            <Menu.Item key="6">
              <Link>Đơn hàng</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link>Lợi nhuận</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background-header"
          style={{ padding: 0 }}
        >
          <div className="comeback-home">
            <Link to="/home">
              <BackwardOutlined />
              <span> Quay về trang chủ</span>
            </Link>
          </div>
          <div>
            <UserSwitchOutlined />
            <Dropdown overlay={menu}>
              <Link>{name ? `   ${name}` : "Đăng nhập"}</Link>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Switch>
            <Route exact path={`${path}/`} component={dashboard} />
            <Route exact path={`${path}/category`} component={DataCategories} />
            <Route exact path={`${path}/product`} component={DataProducts} />
            <Route exact path={`${path}/user`} component={DataUsers} />
            <Route exact path={`${path}/orders`} component={DataProducts} />
            <Route
              exact
              path={`${path}/category/new/:id`}
              component={DataCategoryInfo}
            />
            <Route
              exact
              path={`${path}/category/new/`}
              component={DataCategoryInfo}
            />
            <Route
              exact
              path={`${path}/product/new`}
              component={DataProductInfo}
            />
            <Route
              exact
              path={`${path}/user/new/:id`}
              component={DataUserInfo}
            />
            <Route
              exact
              path={`${path}/product/new/:id`}
              component={DataProductInfo}
            />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>Công nghê Web-BTL</Footer>
      </Layout>
    </Layout>
  );
};
export default Admin;
