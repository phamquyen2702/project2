import React, { useState, useEffect } from "react";
import {
  UploadOutlined,
  RestOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { Form, Input, InputNumber, Select, Row, Col, Button } from "antd";
import userApi from "../../api/userApi";
import { useParams } from "react-router-dom";

export const DataUserInfo = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserinfo = async () => {
      try {
        const userinfo = await userApi.getUser(id);
        setData(userinfo);
        onReset();
      } catch (error) {
        alert("Không tồn tại user!");
      }
    };
    fetchUserinfo();
  }, [id]);
  const onFinish = async (values) => {
    try {
      await userApi.update(values);
      form.resetFields();
      alert("Success!");
    } catch (error) {
      alert("Unauthorization");
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div className="form-info">
      <div
        style={{
          margin: "40px 0",
          textAlign: "center",
          fontSize: "25px",
          color: "red",
        }}
      >
        Update Account
      </div>
      <Form
        form={form}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 15,
        }}
        layout="horizontal"
        initialValues={data}
        onFinish={onFinish}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label="FullName"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input fullName!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please input gender!",
                },
              ]}
            >
              <Select>
                <Select.Option value="Nam">Nam</Select.Option>
                <Select.Option value="Nữ">Nữ</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Age"
              name="age"
              rules={[
                {
                  type: "number",
                  required: true,
                  message: "Please input age!",
                  min: 0,
                  max: 99,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input phone!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="id">
              <Input hidden />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="UserName"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Please input userName!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input password!",
                },
              ]}
            >
              <Input.Password disabled />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                <Select.Option value="ROLE_ADMIN">Admin</Select.Option>
                <Select.Option value="ROLE_EMPLOYEE">Employee</Select.Option>
                <Select.Option value="ROLE_CUSTOMER">Customer</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
                icon={<UploadOutlined />}
                block
              >
                Update Now
              </Button>
            </Form.Item>
            <Form.Item className="reset-cancel" label=" ">
              <Row>
                <Col span={16}>
                  <Button
                    htmlType="button"
                    onClick={onReset}
                    icon={<RestOutlined />}
                    block
                  >
                    Reset
                  </Button>
                </Col>
                <Col span={8}>
                  <Button
                    htmlType="button"
                    onClick={onReset}
                    icon={<ArrowRightOutlined />}
                    block
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <br />
      <br />
    </div>
  );
};
