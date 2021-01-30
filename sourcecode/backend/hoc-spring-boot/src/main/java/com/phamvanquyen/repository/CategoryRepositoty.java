package com.phamvanquyen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.phamvanquyen.entity.CategoryEntity;

public interface CategoryRepositoty extends JpaRepository<CategoryEntity, Long> {

    List<CategoryEntity> findByName(String name);

}
