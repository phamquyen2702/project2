import React, { useState, useEffect } from "react";
import "./style.scss";
import { Image } from "antd";

export const Preview = ({ product }) => {
  const getCart = localStorage.getItem("cart");
  const ParseCart = JSON.parse(getCart);

  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (ParseCart == null || ParseCart === undefined) {
      setCart([]);
    } else {
      setCart(ParseCart);
    }
  }, []);

  const onClick = () => {
    const saveCart = cart.concat(product);
    setCart(cart.concat(product));
    localStorage.setItem("cart", JSON.stringify(saveCart));
    alert("Thêm vào giỏ thành công");
  };
  return (
    <div className=" product-container">
      <div className="row preview">
        <div className="col-lg-4 product-image">
          <Image
            src={product.image}
            width="100%"
            height="103%"
            preview="true"
          />
        </div>
        <div className="col-lg-6 infor-product">
          <div className="title-product ">{product.fullName}</div>

          <div className="row description-product">
            Giá thuê sản phẩm :&emsp;
            <div style={{ color: "green" }}>{product.perDay} (vnd/1 ngày)</div>
          </div>
          <div className="row description-product">
            Tình trạng :&emsp;
            <div style={{ color: "green" }}>
              {product.status === "conhang" ? "Còn hàng" : "Hết hàng"}
            </div>
          </div>

          <div className="row description-product">
            Vận chuyển :&emsp;
            <div style={{ color: "green" }}>
              <i class="fas fa-shipping-fast"></i> Miễn phí vận chuyển
            </div>
          </div>
          <div className="row description-product">Mô tả chi tiết :</div>
          <div className="desc">{product.description}</div>
          <button className="btnAddCart" onClick={() => onClick()}>
            <i class="fas fa-cart-plus"></i>&emsp;Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      <hr className="solid" />
    </div>
  );
};
