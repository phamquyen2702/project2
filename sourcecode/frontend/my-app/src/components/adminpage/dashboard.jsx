import React from "react";
import { Link } from "react-router-dom";

export const dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="dashboard-container">
        <div className="dashboard-title">Xin chào!</div>
        <div className="dashboard-body">
          <div
            className="dashboard-content"
            style={{ backgroundColor: "#6699FF" }}
          >
            <div className="dashboard-content-title">Quản lý danh mục</div>
            <Link to={`/admin/category`} className="dashboard-content-link">
              Xem thêm
            </Link>
          </div>
          <div
            className="dashboard-content"
            style={{ backgroundColor: "#FFD700" }}
          >
            <div className="dashboard-content-title">Quản lý tài khoản</div>
            <Link to={`/admin/user`} className="dashboard-content-link">
              Xem thêm
            </Link>
          </div>
          <div
            className="dashboard-content"
            style={{ backgroundColor: "#008B45" }}
          >
            <div className="dashboard-content-title">Quản lý sản phẩm</div>
            <Link to={`/admin/product`} className="dashboard-content-link">
              Xem thêm
            </Link>
          </div>
          <div
            className="dashboard-content"
            style={{ backgroundColor: "#FF3333" }}
          >
            <div className="dashboard-content-title">Thống kê</div>
            <Link to={`/admin`} className="dashboard-content-link">
              Xem thêm
            </Link>
          </div>
        </div>
        <div className="dashboard-footer">
          <div className="dashboard-footer-content">
            <i className="fas fa-table mr-1"></i> Bài tập lớn web thuê đồ của
            nhóm 28
          </div>
        </div>
      </div>
    </div>
  );
};
