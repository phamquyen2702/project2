package com.phamvanquyen.dto;

import java.util.ArrayList;
import java.util.List;

public class ProductDTO extends ParentDTO {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    private Long id;

    private String fullName;

    private String buyPrice;

    private String salePrice;

    private String perDay;

    private String warrantyPrice;

    private String description;

    private String image;

    private String status;

    private Long categoryID;

    private List<OrdersDTO> orders = new ArrayList<OrdersDTO>();

    public ProductDTO() {
	super();
    }

    public List<OrdersDTO> getOrders() {
	return orders;
    }

    public void setOrders(List<OrdersDTO> orders) {
	this.orders = orders;
    }

    public ProductDTO(Long id, String fullName, String buyPrice, String salePrice, String perDay, String warrantyPrice,
	    String description, String image, String status) {
	super();
	this.id = id;
	this.fullName = fullName;
	this.buyPrice = buyPrice;
	this.salePrice = salePrice;
	this.perDay = perDay;
	this.warrantyPrice = warrantyPrice;
	this.description = description;
	this.image = image;
	this.status = status;
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

    public String getDescription() {
	return description;
    }

    public void setDescription(String description) {
	this.description = description;
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

    public Long getCategoryID() {
	return categoryID;
    }

    public void setCategoryID(Long categoryID) {
	this.categoryID = categoryID;
    }

    public Long getId() {
	return id;
    }

    public void setId(Long id) {
	this.id = id;
    }

}
