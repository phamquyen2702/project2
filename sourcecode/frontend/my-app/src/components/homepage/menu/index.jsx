import React, { useState, useEffect } from "react";
import "./style.scss";
import logo from "./logo-1.png";
import { Link, useRouteMatch } from "react-router-dom";
import categoryApi from "../../../api/categoryApi";

export const Menu = () => {
  const [display, setDisplay] = useState(false);
  const [displayTv, setDisplayTv] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);

  const handleOnclick = () => {
    setDisplay(!display);
  };
  const handleOnclickTv = () => {
    setDisplayTv(!displayTv);
  };

  const { url } = useRouteMatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryList = await categoryApi.getAll();
        setDataCategory(categoryList);
      } catch (error) {}
    };
    fetchProducts();
  }, []);

  const categoryItem = dataCategory.map((data) => {
    return (
      <li key={data.id}>
        <Link className="menu-style" to={`${url}/product/${data.id}`}>
          {data.name}
        </Link>
      </li>
    );
  });
  return (
    <div className="container-fluid fix">
      <div className="row menu">
        <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 logo-border">
          <img className="logo" src={logo} alt="Home page" />
        </div>
        <div
          className={
            display
              ? "col-lg-9 col-md-12 col-sm-12 col-xs-12 dropdown dropdownShow"
              : "col-lg-9 col-md-12 col-sm-12 col-xs-12 dropdown dropdownHidden"
          }
        >
          <ul className="lv1">
            <li>
              <Link to="/home" className="menu-style">
                Trang chủ
              </Link>
            </li>
            <li className={displayTv ? "menu-show" : "menu-hide"}>
              <Link to={`${url}/product`} className="menu-style">
                Sản phẩm
              </Link>
              <i
                onClick={handleOnclickTv}
                className="fas fa-angle-down icon-down"
              ></i>
              <ul className="lv2">{categoryItem}</ul>
            </li>
            <li>Dịch vụ</li>
            <li>Liên hệ</li>
            <li>
              <Link to={`${url}/cart`} className="menu-style">
                Giỏ Hàng
              </Link>
            </li>
          </ul>
        </div>
        <Search></Search>
        <div className="menu-icon">
          <i onClick={handleOnclick} className="fas fa-bars"></i>
        </div>
      </div>
    </div>
  );
};
export const Search = () => {
  return (
    <form action="">
      <div className="search">
        <input
          type="text"
          placeholder="Search product"
          className="search-input"
        ></input>
        <span>
          <i className="fas fa-search"></i>
        </span>
      </div>
    </form>
  );
};
