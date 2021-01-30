package com.phamvanquyen.transfer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.phamvanquyen.dto.ProductDTO;
import com.phamvanquyen.entity.ProductEntity;
import com.phamvanquyen.service.impl.CategoryService;

@Component
public class ProductUtil {

    @Autowired
    CategoryService service;

    @Autowired
    ParentUtil parentUtil;

    @Autowired
    CategoryUtil categoryUtil;

    @Autowired
    OrderUtil orderUtil;

    public ProductDTO toDTO(ProductEntity entity) {
	ProductDTO dto = new ProductDTO();
	if (entity.getId() != null) {
	    dto.setId(entity.getId());
	}

	dto.setFullName(entity.getFullName());
	dto.setDescription(entity.getDescription());
	dto.setBuyPrice(entity.getBuyPrice());
	dto.setPerDay(entity.getPerDay());
	dto.setSalePrice(entity.getSalePrice());
	dto.setWarrantyPrice(entity.getWarrantyPrice());
	dto.setImage(entity.getImage());
	dto.setStatus(entity.getStatus());
	dto.setCategoryID(entity.getCategory().getId());
	parentUtil.converter(entity, dto);
	return dto;
    }

    public ProductEntity toEntity(ProductDTO dto) {
	ProductEntity entity = new ProductEntity();
	entity.setId(dto.getId());
	entity.setFullName(dto.getFullName());
	entity.setDescription(dto.getDescription());
	entity.setBuyPrice(dto.getBuyPrice());
	entity.setPerDay(dto.getPerDay());
	entity.setSalePrice(dto.getSalePrice());
	entity.setWarrantyPrice(dto.getWarrantyPrice());
	entity.setImage(dto.getImage());
	entity.setStatus(dto.getStatus());
	return entity;
    }
}
