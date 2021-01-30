package com.phamvanquyen.transfer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.phamvanquyen.dto.CategoryDTO;
import com.phamvanquyen.entity.CategoryEntity;

@Component
public class CategoryUtil {

    @Autowired
    ParentUtil parentUtil;

    @Autowired
    ProductUtil productUtil;

    public CategoryDTO toDTO(CategoryEntity entity) {
	CategoryDTO dto = new CategoryDTO();
	if (entity.getId() != null) {
	    dto.setId(entity.getId());
	}
	dto.setName(entity.getName());
	parentUtil.converter(entity, dto);
	return dto;
    }

    public CategoryEntity toEntity(CategoryDTO dto) {
	CategoryEntity entity = new CategoryEntity();
	entity.setId(dto.getId());
	entity.setName(dto.getName());
	return entity;
    }
}
