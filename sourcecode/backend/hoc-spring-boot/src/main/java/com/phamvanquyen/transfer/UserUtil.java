package com.phamvanquyen.transfer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.phamvanquyen.dto.UserDTO;
import com.phamvanquyen.entity.UserEntity;

@Component
public class UserUtil {

    @Autowired
    ParentUtil parentUtil;

    @Autowired
    OrderUtil orderUtil;

    public UserDTO toDTO(UserEntity entity) {
	UserDTO dto = new UserDTO();
	if (entity.getId() != null) {
	    dto.setId(entity.getId());
	}
	dto.setUserName(entity.getUserName());
	dto.setFullName(entity.getFullName());
	dto.setAddress(entity.getAddress());
	dto.setPassword(entity.getPassword());
	dto.setPhone(entity.getPhone());
	dto.setRole(entity.getRole());
	dto.setAge(entity.getAge());
	dto.setGender(entity.getGender());
	parentUtil.converter(entity, dto);
	return dto;
    }

    public UserEntity toEntity(UserDTO dto) {
	UserEntity entity = new UserEntity();
	entity.setId(dto.getId());
	entity.setUserName(dto.getUserName());
	entity.setFullName(dto.getFullName());
	entity.setAddress(dto.getAddress());
	entity.setPassword(dto.getPassword());
	entity.setPhone(dto.getPhone());
	entity.setRole(dto.getRole());
	entity.setAge(dto.getAge());
	entity.setGender(dto.getGender());
	return entity;
    }
}
