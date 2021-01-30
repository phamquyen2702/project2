import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, useParams } from "react-router-dom";
import productApi from "../../../api/productApi";

export const Content = () => {
  const [list, setList] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await productApi.getAll();
        if (id != null) {
          const categoryList = productList.filter((i) => i.categoryID == id);
          setList(categoryList);
        } else {
          setList(productList);
        }
      } catch (error) {}
    };
    fetchProducts();
  }, [id]);

  const content = list.map((data) => {
    return <Item data={data} />;
  });

  return <div className="content">{content}</div>;
};
export const Item = ({ data }) => {
  return (
    <Link
      to={`/home/product/item/${data.id}`}
      style={{ textDecoration: "none" }}
      className="all-item"
    >
      <div className="item">
        <div className="image">
          <img className="image-s" src={data.image} alt={data.fullName} />
        </div>
        <div className="title">{data.fullName}</div>
        <div className="description">{data.description}</div>
      </div>
    </Link>
  );
};
