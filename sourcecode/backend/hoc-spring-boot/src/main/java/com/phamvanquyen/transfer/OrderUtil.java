package com.phamvanquyen.transfer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.phamvanquyen.dto.OrdersDTO;
import com.phamvanquyen.entity.OrdersEntity;
import com.phamvanquyen.service.impl.UserService;

@Component
public class OrderUtil {

    @Autowired
    UserService service;

    @Autowired
    ParentUtil parentUtil;

    @Autowired
    UserUtil userUtil;

    @Autowired
    ProductUtil productUtil;

    /**
     * Transfer OrdersEntity -> OrdersDTO
     * 
     * @param entity
     * @return OrdersDTO
     */
    public OrdersDTO toDTO(OrdersEntity entity) {
	OrdersDTO dto = new OrdersDTO();
	dto.setTotal(entity.getTotal());
	dto.setId(entity.getId());
	dto.setTime(entity.getTime());
	dto.setStatus(entity.getStatus());
	dto.setUserID(entity.getUser().getId());
	parentUtil.converter(entity, dto);
	return dto;
    }

    public OrdersEntity toEntity(OrdersDTO dto) {
	OrdersEntity entity = new OrdersEntity();
	entity.setId(dto.getId());
	entity.setTotal(dto.getTotal());
	entity.setTime(dto.getTime());
	entity.setStatus(dto.getStatus());
	return entity;
    }

}
