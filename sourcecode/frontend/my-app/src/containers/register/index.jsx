import React from "react";
import { Form, Input, Button, Row, Col, Select, InputNumber } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";

import "./style.scss";
import { register } from "../../reducers/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Register(props) {
  const { Option } = Select;
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      if (values.password === values.confirm) {
        const action = register(values);
        const resultAction = await dispatch(action);
        const user = unwrapResult(resultAction);
        if (window.confirm("Đăng kí thành công " + user.userName)) {
          history.push("/login");
        }
      } else {
        alert("Confirm password không đúng!");
      }
    } catch (error) {
      alert("UserName đã tồn tại");
    }
  };
  return (
    <div className="form-register">
      <h1 className="welcome">Tạo tài khoản</h1>
      <Form
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 10,
        }}
        name="basic"
        layout="horizontal"
        className="register-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: "Hãy nhập thông tin tài khoản" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Tài khoản"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Mật khẩu"
            hasFeedback
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          rules={[
            {
              required: true,
              message: "Hãy nhập xác nhận mật khẩu",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Xác nhận mật khẩu"
            hasFeedback
          />
        </Form.Item>
        <Form.Item
          name="fullName"
          rules={[{ required: true, message: "Hãy nhập đầy đủ họ tên" }]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item
          name="gender"
          rules={[{ required: true, message: "Hãy nhập giới tính" }]}
        >
          <Select placeholder="Giới tính">
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="age"
          rules={[
            {
              type: "number",
              required: true,
              message: "Hãy nhập tuổi",
              min: 0,
              max: 99,
            },
          ]}
        >
          <InputNumber placeholder="Tuổi" />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: "Hãy  nhập địa chỉ" }]}
        >
          <Input placeholder="Địa chỉ" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Hãy  nhập số điện thoại" }]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            block
            className="create-account"
          >
            Đăng kí tài khoản
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
