package com.phamvanquyen.dto;

import java.util.ArrayList;
import java.util.List;

public class CategoryDTO extends ParentDTO {

    private Long id;
    private String name;

    private List<ProductDTO> products = new ArrayList<>();

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public List<ProductDTO> getProducts() {
	return products;
    }

    public void setProducts(List<ProductDTO> products) {
	this.products = products;
    }

    public Long getId() {
	return id;
    }

    public void setId(Long id) {
	this.id = id;
    }

}