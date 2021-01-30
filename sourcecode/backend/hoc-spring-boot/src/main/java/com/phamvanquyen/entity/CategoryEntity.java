package com.phamvanquyen.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "category", uniqueConstraints = { @UniqueConstraint(columnNames = "name") })
public class CategoryEntity extends ParentEntity {

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductEntity> products;

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public List<ProductEntity> getProducts() {
	return products;
    }

    public void setProducts(List<ProductEntity> products) {
	this.products = products;
    }

}
