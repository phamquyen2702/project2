package com.phamvanquyen.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.phamvanquyen.entity.OrdersEntity;

public interface OrdersRepository extends JpaRepository<OrdersEntity, Long> {

}
