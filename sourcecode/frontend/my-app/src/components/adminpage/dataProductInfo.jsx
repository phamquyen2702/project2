import React, { useState, useEffect } from "react";
import {
  UploadOutlined,
  RestOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  Mentions,
  Upload,
  Image,
} from "antd";
import { useParams } from "react-router-dom";
import productApi from "../../api/productApi";
import categoryApi from "../../api/categoryApi";

export const DataProductInfo = () => {
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState("default");
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [category, setCatefory] = useState([]);
  const [image, setImage] = useState("");
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryList = await categoryApi.getAll();
        setCatefory(categoryList);
        onReset();
      } catch (error) {}
    };
    fetchCategory();
  }, []);
  useEffect(() => {
    const fetchProductInfo = async () => {
      if (id) {
        try {
          const productinfo = await productApi.get(id);
          setData(productinfo);
          onReset();
        } catch (error) {
          alert("Không tồn tại product!");
        }
      }
    };
    fetchProductInfo();
  }, [id]);
  const onFinish = async (values) => {
    if (image !== "") {
      values.image = image;
    }
    try {
      if (id) {
        await productApi.update(values);
      } else {
        await productApi.add(values);
      }
      form.resetFields();
      alert("Success!");
    } catch (error) {
      alert("Product đã tồn tại");
    }
  };
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const onReset = () => {
    form.resetFields();
  };
  const options = category.map((item, index) => {
    return (
      <Select.Option key={index} value={item.id}>
        {item.name}
      </Select.Option>
    );
  });

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
        Thông tin sản phẩm
      </div>

      <Row>
        <Col span={12}>
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
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            onFinish={onFinish}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ tên sản phẩm!",
                },
              ]}
            >
              <Input placeholder="Tên sản phẩm" />
            </Form.Item>
            <Form.Item
              label="Giá mua"
              name="buyPrice"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá trị sản phẩm!",
                },
              ]}
            >
              <Input placeholder="Giá mua" addonAfter="vnđ" />
            </Form.Item>
            <Form.Item
              label="Giá cho thuê"
              name="perDay"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá cho thuê sản phẩm!",
                },
              ]}
            >
              <Input placeholder="Giá cho thuê" addonAfter="vnđ/ngày" />
            </Form.Item>
            <Form.Item
              label="Giá bảo hành"
              name="warrantyPrice"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá bảo hành sản phẩm!",
                },
              ]}
            >
              <Input placeholder="Giá bảo hành" addonAfter="vnđ" />
            </Form.Item>
            <Form.Item
              label="Danh mục"
              name="categoryID"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Danh mục">{options}</Select>
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Status">
                <Select.Option value="conhang">Còn hàng</Select.Option>
                <Select.Option value="hethang">Hết hàng</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả chi tiết"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 15 }}
              rules={[{ required: true }]}
            >
              <Mentions rows="7" placeholder="Mô tả chi tiết"></Mentions>
            </Form.Item>
            <Form.Item
              name="id"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input hidden></Input>
            </Form.Item>
            <Form.Item name="image">
              <Input hidden />
            </Form.Item>
            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
                icon={<UploadOutlined />}
                block
              >
                Cập nhật thông tin
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
        </Col>
        <Col span={12}>
          <Upload
            customRequest={(options) => {
              const data = new FormData();
              data.append("file", options.file);
              productApi
                .uploadfile(data)
                .then((res) => {
                  setImage(res.fileDownloadUri);
                  options.onSuccess(res.data, options.file);
                })
                .catch((err) => {
                  options.onError(err, err.data, options.file);
                });
            }}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          <div
            style={{
              marginTop: "25px",
              width: "100%",
              height: "413px",
              border: "1px dotted red",
            }}
          >
            <Image
              preview="true"
              src={image === "" ? data.image : image}
              width="100%"
              height="100%"
            ></Image>
          </div>
        </Col>
      </Row>

      <br />
      <br />
    </div>
  );
};
