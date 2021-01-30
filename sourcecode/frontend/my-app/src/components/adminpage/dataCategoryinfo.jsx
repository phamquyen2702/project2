import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  UploadOutlined,
  RestOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { Form, Input, Row, Col, Button } from "antd";
import categoryApi from "../../api/categoryApi";

export const DataCategoryInfo = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCategoryinfo = async () => {
      if (id) {
        try {
          const categoryinfo = await categoryApi.get(id);
          setData(categoryinfo);
          onReset();
        } catch (error) {
          alert("Không tồn tại category!");
        }
      }
    };

    fetchCategoryinfo();
  }, [id]);

  const onFinish = async (values) => {
    try {
      if (id) {
        await categoryApi.update(values);
      } else {
        await categoryApi.add(values);
      }
      form.resetFields();
      alert("Success!");
    } catch (error) {
      alert("Category đã tồn tại");
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div className="form-info">
      <div
        style={{
          margin: "35px 0",
          textAlign: "center",
          fontSize: "25px",
          color: "#0000FF",
        }}
      >
        Create or Update Category
      </div>
      <Form
        initialValues={data}
        form={form}
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name!",
            },
          ]}
        >
          <Input />
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
      </Form>
      <br />
      <br />
    </div>
  );
};
