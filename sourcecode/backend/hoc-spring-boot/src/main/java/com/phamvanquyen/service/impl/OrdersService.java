package com.phamvanquyen.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.phamvanquyen.entity.OrdersEntity;
import com.phamvanquyen.exception.ResourceNotFoundException;
import com.phamvanquyen.exception.UniqueConstraintsException;
import com.phamvanquyen.repository.OrdersRepository;
import com.phamvanquyen.service.IService;

@Service
public class OrdersService implements IService<OrdersEntity> {

    @Autowired
    OrdersRepository ordersRepository;

    @Override
    public List<OrdersEntity> findAll() {
	return ordersRepository.findAll();
    }

    @Override
    public OrdersEntity save(OrdersEntity entity) throws ResourceNotFoundException, UniqueConstraintsException {
	if (entity.getId() != null) {
	    OrdersEntity entityCheck = ordersRepository.findOne(entity.getId());
	    if (entityCheck == null) {
		throw new ResourceNotFoundException("Order not found for this id : " + entity.getId());
	    }
	}
	OrdersEntity ordersEntity;
	try {
	    ordersEntity = ordersRepository.save(entity);
	} catch (Exception e) {
	    throw new UniqueConstraintsException("Order already exists");
	}
	return ordersEntity;
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
	OrdersEntity entityCheck = ordersRepository.findOne(id);
	if (entityCheck == null) {
	    throw new ResourceNotFoundException("Order not found for this id : " + id);
	}
	ordersRepository.delete(entityCheck);

    }

    @Override
    public List<OrdersEntity> findByUserName(String name) {
	// TODO Auto-generated method stub
	return null;
    }

    @Override
    public OrdersEntity findOne(Long id) {
	return ordersRepository.findOne(id);
    }

    @Override
    public void deletes(List<OrdersEntity> datas) throws ResourceNotFoundException {
	// TODO Auto-generated method stub

    }

}
