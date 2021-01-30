package com.phamvanquyen.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.phamvanquyen.entity.UserEntity;
import com.phamvanquyen.exception.ResourceNotFoundException;
import com.phamvanquyen.exception.UniqueConstraintsException;
import com.phamvanquyen.repository.UserRepositoty;
import com.phamvanquyen.service.IService;

@Service
public class UserService implements IService<UserEntity> {

    @Autowired
    UserRepositoty userRepositoty;

    public List<UserEntity> getUserByRole(String role) {
	return userRepositoty.findByRole(role);
    }

    public UserEntity loadUserByUsername(String username) {
	return userRepositoty.findByUserName(username);
    }

    public boolean checkLogin(UserEntity userform) {

	List<UserEntity> userEntitys = userRepositoty.findAll();
	for (UserEntity userEntity : userEntitys) {
	    if (userform.getUserName().equals(userEntity.getUserName())
		    && userform.getPassword().equals(userEntity.getPassword())) {
		return true;
	    }
	}
	return false;
    }

    @Override
    public List<UserEntity> findAll() {
	return userRepositoty.findAll();
    }

    @Override
    public UserEntity save(UserEntity entity) throws ResourceNotFoundException, UniqueConstraintsException {
	if (entity.getId() != null) {
	    UserEntity entityCheck = userRepositoty.findOne(entity.getId());
	    if (entityCheck == null) {
		throw new ResourceNotFoundException("Account not found for this id : " + entity.getId());
	    }
	}
	UserEntity userEntity;
	try {
	    userEntity = userRepositoty.save(entity);
	} catch (Exception e) {
	    throw new UniqueConstraintsException("Username already exists");
	}
	return userEntity;
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
	UserEntity entityCheck = userRepositoty.findOne(id);
	if (entityCheck == null) {
	    throw new ResourceNotFoundException("Account not found for this id : " + id);
	}
	userRepositoty.delete(id);
    }

    @Override
    public List<UserEntity> findByUserName(String name) {
	// TODO Auto-generated method stub
	return null;
    }

    @Override
    public UserEntity findOne(Long id) {
	return userRepositoty.findOne(id);
    }

    @Override
    public void deletes(List<UserEntity> datas) throws ResourceNotFoundException {
	// TODO Auto-generated method stub

    }

    public List<UserEntity> getPage(int offset, int limit) {
	return userRepositoty.getUsers(offset, limit);
    }

}
