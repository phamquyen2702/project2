package com.phamvanquyen.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.phamvanquyen.entity.ProductEntity;
import com.phamvanquyen.exception.ResourceNotFoundException;
import com.phamvanquyen.exception.UniqueConstraintsException;
import com.phamvanquyen.repository.ProductRepository;
import com.phamvanquyen.service.IService;

@Service
public class ProductService implements IService<ProductEntity> {

    @Autowired
    ProductRepository productRepository;

    @Override
    public List<ProductEntity> findAll() {
	return productRepository.findAll();
    }

    @Override
    public ProductEntity save(ProductEntity entity) throws ResourceNotFoundException, UniqueConstraintsException {
	if (entity.getId() != null) {
	    ProductEntity entityCheck = productRepository.findOne(entity.getId());
	    if (entityCheck == null) {
		throw new ResourceNotFoundException("Product not found for this id : " + entity.getId());
	    }
	}
	ProductEntity productEntity;
	try {
	    productEntity = productRepository.save(entity);
	} catch (Exception e) {
	    throw new UniqueConstraintsException("Product already exists");
	}
	return productEntity;
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
	ProductEntity entityCheck = productRepository.findOne(id);
	if (entityCheck == null) {
	    throw new ResourceNotFoundException("Product not found for this id : " + id);
	}
	productRepository.delete(entityCheck);

    }

    @Override
    public List<ProductEntity> findByUserName(String name) {
	// TODO Auto-generated method stub
	return null;
    }

    @Override
    public ProductEntity findOne(Long id) {
	return productRepository.findOne(id);
    }

    @Override
    public void deletes(List<ProductEntity> datas) throws ResourceNotFoundException {
	// TODO Auto-generated method stub

    }

    public ProductEntity findByFullName(String name) {
	return productRepository.findByFullName(name);
    }

    public List<ProductEntity> findPage(int offset, int limit) {
	return productRepository.findProducts(offset, limit);
    }

}
