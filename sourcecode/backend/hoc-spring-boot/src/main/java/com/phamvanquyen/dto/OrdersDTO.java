package com.phamvanquyen.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class OrdersDTO extends ParentDTO {

    private Long id;

    private String status;

    private String time;

    private String total;

    private Long userID;

    private List<ProductDTO> productDTO = new ArrayList<>();

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

    public Long getUserID() {
	return userID;
    }

    public void setUserID(Long userID) {
	this.userID = userID;
    }

    public List<ProductDTO> getProductDTO() {
	return productDTO;
    }

    public void setProductDTO(List<ProductDTO> productDTO) {
	this.productDTO = productDTO;
    }

    public Long getId() {
	return id;
    }

    public void setId(Long id) {
	this.id = id;
    }

    public String getTotal() {
	return total;
    }

    public void setTotal(String total) {
	this.total = total;
    }

}
