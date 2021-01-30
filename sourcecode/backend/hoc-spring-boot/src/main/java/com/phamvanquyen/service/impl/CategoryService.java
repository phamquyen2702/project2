package com.phamvanquyen.service.impl;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.phamvanquyen.entity.CategoryEntity;
import com.phamvanquyen.exception.ResourceNotFoundException;
import com.phamvanquyen.exception.UniqueConstraintsException;
import com.phamvanquyen.repository.CategoryRepositoty;
import com.phamvanquyen.service.IService;

@Service
public class CategoryService implements IService<CategoryEntity> {

    @Autowired
    CategoryRepositoty categoryRepository;

    @Override
    public CategoryEntity save(CategoryEntity entity) throws ResourceNotFoundException, UniqueConstraintsException {
	if (entity.getId() != null) {
	    CategoryEntity entityCheck = categoryRepository.findOne(entity.getId());
	    if (entityCheck == null) {
		throw new ResourceNotFoundException("Category not found for this id : " + entity.getId());
	    }
	}
	CategoryEntity categoryEntity;
	try {
	    categoryEntity = categoryRepository.save(entity);
	} catch (Exception e) {
	    throw new UniqueConstraintsException("Name already exists");
	}
	return categoryEntity;
    }

    @Override
    public List<CategoryEntity> findByUserName(String name) {
	return categoryRepository.findByName(name);
    }

    @Override
    public List<CategoryEntity> findAll() {
	return categoryRepository.findAll();
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
	CategoryEntity entityCheck = categoryRepository.findOne(id);
	if (entityCheck == null) {
	    throw new ResourceNotFoundException("Category not found for this id : " + id);
	}
	categoryRepository.delete(entityCheck);
    }

    @Override
    public void deletes(List<CategoryEntity> datas) throws ResourceNotFoundException {
	Iterator<CategoryEntity> iterator = datas.iterator();
	while (iterator.hasNext()) {
	    CategoryEntity entityCheck = categoryRepository.findOne(iterator.next().getId());
	    if (entityCheck == null) {
		throw new ResourceNotFoundException("Category not found for this id : " + iterator.next().getId());
	    }
	    categoryRepository.delete(iterator.next().getId());
	}

    }

    @Override
    public CategoryEntity findOne(Long id) {
	return categoryRepository.findOne(id);
    }

}
