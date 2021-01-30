package com.phamvanquyen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.phamvanquyen.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    ProductEntity findByFullName(String name);

    @Query(value = "select * from product order by id asc limit :offset , :limit", nativeQuery = true)
    List<ProductEntity> findProducts(@Param("offset") int offset, @Param("limit") int limit);
}
