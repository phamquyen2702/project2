import React, { useState, useEffect } from "react";
import { Preview } from "./preview";
import { Relate } from "./relate";
import { useParams } from "react-router-dom";
import productApi from "../../../api/productApi";

function Product(props) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchProductInfo = async () => {
      if (id) {
        try {
          const productinfo = await productApi.get(id);
          setData(productinfo);
        } catch (error) {
          alert("Không tồn tại product!");
        }
      }
    };
    fetchProductInfo();
  }, [id]);
  return (
    <div>
      <Preview product={data} />
      <Relate />
    </div>
  );
}
export default Product;
