import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading";

const Home = React.lazy(() => import("./containers/homepage"));
const Login = React.lazy(() => import("./containers/login"));
const Register = React.lazy(() => import("./containers/register"));
const Admin = React.lazy(() => import("./containers/adminpage"));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/login" component={Login} />{" "}
          <Route exact path="/register" component={Register} />{" "}
          <Route path="/home" component={Home} />{" "}
          <Route path="/admin" component={Admin} />{" "}
          <Route component={NotFound} />{" "}
        </Switch>{" "}
      </BrowserRouter>{" "}
    </Suspense>
  );
};

export default App;
