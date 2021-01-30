import React from "react";
import { Header } from "../../components/homepage/header";
import { Menu } from "../../components/homepage/menu";
import "bootstrap/dist/css/bootstrap.min.css";
import { FooterBot } from "../../components/homepage/footer/index";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MainProduct from "../../components/homepage/main/mainProduct";
import MainHome from "../../components/homepage/main/mainHome";
import Product from "../../components/homepage/product/";
import Cart from "../../components/homepage/cart";

const Home = (props) => {
  const { url } = useRouteMatch();

  return (
    <div className="container-fluid blur">
      <Header />
      <Menu />
      <Switch>
        <Route exact path={`${url}/product`} component={MainProduct} />
        <Route exact path={`${url}/product/:id`} component={MainProduct} />
        <Route exact path={`${url}/product/item/:id`} component={Product} />
        <Route exact path={`${url}/`} component={MainHome} />
        <Route exact path={`${url}/cart`} component={Cart} />
      </Switch>

      <FooterBot />
    </div>
  );
};

export default Home;
