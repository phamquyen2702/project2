import React from "react";
import image from "./assets/Beko-WDR7543121B.jpg";
import "./style.scss";

export const Relate = () => {
  return (
    <div
      className="container"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        SẢN PHẨM LIÊN QUAN
      </div>
      <div className="content" style={{ backgroundColor: "white" }}>
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};
export const Item = () => {
  return (
    <div className="all-item" style={{ height: "400px" }}>
      <div className="item">
        <div className="image">
          <img className="image-s" src={image} alt="tv" />
        </div>
        <div className="title">Toshiba 24″ Smart HD LED TV with DVD Combi</div>
      </div>
    </div>
  );
};
