package com.phamvanquyen.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class OrdersEntity extends ParentEntity {

    @Column
    private String status;

    @Column
    private String time;

    @Column
    private String total;

    @ManyToMany(mappedBy = "orders")
    private List<ProductEntity> products;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
    }

    public String getTime() {
	return time;
    }

    public void setTime(String time) {
	this.time = time;
    }

    public List<ProductEntity> getProducts() {
	return products;
    }

    public void setProducts(List<ProductEntity> products) {
	this.products = products;
    }

    public UserEntity getUser() {
	return user;
    }

    public void setUser(UserEntity user) {
	this.user = user;
    }

    public String getTotal() {
	return total;
    }

    public void setTotal(String total) {
	this.total = total;
    }

}
