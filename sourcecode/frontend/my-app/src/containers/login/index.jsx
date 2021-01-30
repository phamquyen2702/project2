import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import "./style.scss";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      history.push("/home");
    } catch (error) {
      alert("Tài khoản hoặc mật khẩu không đúng");
    }
  };
  return (
    <div className="form-login">
      <h1 className="welcome">Welcome!</h1>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="userName"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            hasFeedback
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="remember">Remember me</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" to="">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button button-submit"
          >
            Log in
          </Button>
          <Link to="/register" className="register-now">
            register now!
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
