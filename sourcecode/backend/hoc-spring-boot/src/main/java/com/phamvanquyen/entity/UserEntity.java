package com.phamvanquyen.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Entity
@Table(name = "user", uniqueConstraints = { @UniqueConstraint(columnNames = "username") })
public class UserEntity extends ParentEntity {

    @Column(name = "username", nullable = false)
    private String userName;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "fullname", nullable = false)
    private String fullName;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "role", nullable = false)
    private String role = "ROLE_ADMIN";

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "age", nullable = false)
    private int age;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<OrdersEntity> orders;

//    @Transient
//    public List<GrantedAuthority> getAuthorities() {
//	List<GrantedAuthority> authorities = new ArrayList<>();
//	List<RoleEntity> entityRoles = new ArrayList<>();
//	entityRoles = getRoles();
//	for (RoleEntity role : entityRoles) {
//	    authorities.add(new SimpleGrantedAuthority(role.getCode()));
//	}
//	return authorities;
//
//    }
    @Transient
    public List<GrantedAuthority> getAuthorities() {
	List<GrantedAuthority> authorities = new ArrayList<>();
	authorities.add(new SimpleGrantedAuthority(role));
	return authorities;

    }

    public String getRole() {
	return role;
    }

    public void setRole(String role) {
	this.role = role;
    }

    public List<OrdersEntity> getOrders() {
	return orders;
    }

    public void setOrders(List<OrdersEntity> orders) {
	this.orders = orders;
    }

    public String getUserName() {
	return userName;
    }

    public void setUserName(String userName) {
	this.userName = userName;
    }

    public String getPassword() {
	return password;
    }

    public void setPassword(String password) {
	this.password = password;
    }

    public String getFullName() {
	return fullName;
    }

    public void setFullName(String fullName) {
	this.fullName = fullName;
    }

    public String getGender() {
	return gender;
    }

    public void setGender(String gender) {
	this.gender = gender;
    }

    public int getAge() {
	return age;
    }

    public void setAge(int age) {
	this.age = age;
    }

    public String getAddress() {
	return address;
    }

    public void setAddress(String address) {
	this.address = address;
    }

    public String getPhone() {
	return phone;
    }

    public void setPhone(String phone) {
	this.phone = phone;
    }

}
