package com.phamvanquyen.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "product", uniqueConstraints = { @UniqueConstraint(columnNames = "fullName") })
public class ProductEntity extends ParentEntity {

    @Column(nullable = false, length = 255)
    private String fullName;

    @Column(nullable = false, length = 20)
    private String buyPrice;

    @Column(length = 20)
    private String salePrice;

    @Column(nullable = false, length = 20)
    private String perDay;

    @Column(nullable = false, length = 20)
    private String warrantyPrice;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "status")
    private String status;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "product_orders", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "orders_id"))
    private List<OrdersEntity> orders;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;

    public CategoryEntity getCategory() {
	return category;
    }

    public void setCategory(CategoryEntity category) {
	this.category = category;
    }

    public String getDescription() {
	return description;
    }

    public void setDescription(String description) {
	this.description = description;
    }

    public String getFullName() {
	return fullName;
    }

    public void setFullName(String fullName) {
	this.fullName = fullName;
    }

    public String getBuyPrice() {
	return buyPrice;
    }

    public void setBuyPrice(String buyPrice) {
	this.buyPrice = buyPrice;
    }

    public String getSalePrice() {
	return salePrice;
    }

    public void setSalePrice(String salePrice) {
	this.salePrice = salePrice;
    }

    public String getPerDay() {
	return perDay;
    }

    public void setPerDay(String perDay) {
	this.perDay = perDay;
    }

    public String getWarrantyPrice() {
	return warrantyPrice;
    }

    public void setWarrantyPrice(String warrantyPrice) {
	this.warrantyPrice = warrantyPrice;
    }

    public String getImage() {
	return image;
    }

    public void setImage(String image) {
	this.image = image;
    }

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
    }

    public List<OrdersEntity> getOrders() {
	return orders;
    }

    public void setOrders(List<OrdersEntity> orders) {
	this.orders = orders;
    }

}
