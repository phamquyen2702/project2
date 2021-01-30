import React, { useState, useEffect, forwardRef } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import orderApi from "../../../api/orderApi";
import Empty from "./assets/cartempty.png";
import { Image, InputNumber } from "antd";
import { DeleteOutlined } from "@material-ui/icons";

function Cart(props) {
  const getCart = localStorage.getItem("cart");
  const ParseCart = JSON.parse(getCart);
  const [cart, setCart] = useState([]);
  const [cart1, setCart1] = useState([]);
  const [total, setTotal] = useState([]);
  const [sum, setSum] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setCart(ParseCart);
    SetCountCart(ParseCart);
    setSum(Total(ParseCart));
    setTotal(Total(ParseCart));
  }, []);

  const onClick = (item) => {
    const updateCart = cart.filter((t) => t.id !== item.id);
    setCart(updateCart);
    SetCountCart(updateCart);
    setSum(Total(updateCart));
    setTotal(Total(updateCart));
    localStorage.setItem("cart", JSON.stringify(updateCart));
  };

  const SetCountCart = (cart) => {
    const convert = [{ ...cart[0], count: 1 }];
    for (var i = 1; i < cart.length; i++) {
      for (var j = 0; j < convert.length; j++) {
        if (convert[j].id == cart[i].id) {
          convert[j].count += 1;
          break;
        } else if (j == convert.length - 1) {
          convert.push({ ...cart[i], count: 1 });
          break;
        }
      }
    }
    setCart1(convert);
  };
  const onChange = (value) => {
    setTime(value);
    setTotal(sum * value);
  };
  const Total = (cart) => {
    var t = 0;
    for (var i = 0; i < cart.length; i++) {
      t = t + parseInt(cart[i].perDay);
    }
    return t;
  };
  const Incre = (value) => {
    const arr = cart.concat([value]);
    setCart(arr);
    SetCountCart(arr);
    setSum(Total(arr));
    setTotal(Total(arr));
    localStorage.setItem("cart", JSON.stringify(arr));
  };

  const Decre = (value) => {
    const arr = cart;

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == value.id) {
        break;
      }
    }

    if (i != -1) {
      arr.splice(i, 1);
      setCart(arr);
      SetCountCart(arr);
      setSum(Total(arr));
      setTotal(Total(arr));
      localStorage.setItem("cart", JSON.stringify(arr));
    }
  };

  const Buy = () => {
    const values = {
      products: cart,
    };
    orderApi
      .add(values)
      .then((res) => {
        alert("success");
      })
      .catch((error) => alert("Chưa hoàn thiện"));
  };
  const content = cart1.map((item, index) => {
    return (
      <tr key={index}>
        <td width="40%" style={{ cursor: "pointer" }}>
          <Link to={`/home/product/item/${item.id}`} className="item-fullName">
            {item.fullName}
          </Link>
        </td>
        <td>{item.perDay}</td>
        <td className="row" style={{ paddingLeft: "50px" }}>
          <div className="update-cart-product" onClick={() => Decre(item)}>
            <i class="fas fa-arrow-left"></i>
          </div>
          {item.count}
          <div className="update-cart-product" onClick={() => Incre(item)}>
            <i class="fas fa-arrow-right"></i>
          </div>
        </td>
        <td>
          <DeleteOutlined
            onClick={() => onClick(item)}
            title="Xóa sản phẩm"
            style={{ color: "red", cursor: "pointer" }}
          />
        </td>
      </tr>
    );
  });
  if (cart === [] || cart == null || cart.length === 0) {
    return <CartEmpty />;
  } else {
    return (
      <div className="product-container-cart">
        <table>
          <tr>
            <th>Tên sản phẩm </th>
            <th>Giá thuê (vnd/ngày)</th>
            <th>Số lượng sản phẩm </th>
            <th>Tùy chỉnh</th>
          </tr>
          {content}
        </table>

        <div className="content-songay">
          <div className="songay">
            Chọn số ngày thuê:{" "}
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              onChange={onChange}
            />
            <div className="thanhtoan">
              Tổng số tiền thanh toán: {total} (vnd)
            </div>
          </div>
          <div>
            <button className="btnAddCart-thanhtoan" onClick={() => Buy()}>
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export const CartEmpty = () => {
  return (
    <div className="container cart-empty-container">
      <div>
        <Image src={Empty} />
      </div>
      <div>Giỏ hàng của bạn còn trống</div>
      <div>
        <Link
          to={`/home/product`}
          style={{ textDecoration: "none", fontSize: "25px" }}
        >
          Mua ngay
        </Link>
      </div>
    </div>
  );
};

export default Cart;
