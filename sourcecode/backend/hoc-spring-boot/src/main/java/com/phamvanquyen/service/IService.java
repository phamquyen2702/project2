package com.phamvanquyen.service;

import java.util.List;

import com.phamvanquyen.exception.ResourceNotFoundException;
import com.phamvanquyen.exception.UniqueConstraintsException;

public interface IService<T> {

    List<T> findAll();

    T save(T entity) throws ResourceNotFoundException, UniqueConstraintsException;

    void delete(Long id) throws ResourceNotFoundException;

    List<T> findByUserName(String name);

    T findOne(Long id);

    void deletes(List<T> datas) throws ResourceNotFoundException;

}
