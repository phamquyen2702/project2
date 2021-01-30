package com.phamvanquyen.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.phamvanquyen.dto.OrdersDTO;
import com.phamvanquyen.dto.ProductDTO;
import com.phamvanquyen.entity.OrdersEntity;
import com.phamvanquyen.entity.ProductEntity;
import com.phamvanquyen.exception.ResourceNotFoundException;
import com.phamvanquyen.exception.UniqueConstraintsException;
import com.phamvanquyen.service.impl.OrdersService;
import com.phamvanquyen.service.impl.UserService;
import com.phamvanquyen.transfer.OrderUtil;
import com.phamvanquyen.transfer.ProductUtil;

@CrossOrigin
@RestController
public class OrdersAPI {

    @Autowired
    OrdersService service;

    @Autowired
    OrderUtil orderUtil;

    @Autowired
    ProductUtil productUtil;

    @Autowired
    UserService userService;

    @GetMapping("/order")
    public ResponseEntity<List<OrdersDTO>> getProducts() {
	List<OrdersDTO> orders = new ArrayList<>();
	for (OrdersEntity entity : service.findAll()) {
	    orders.add(orderUtil.toDTO(entity));
	}
	return ResponseEntity.ok().body(orders);
    }

    @PostMapping("/order")
    public ResponseEntity<OrdersDTO> createOrders(@RequestBody OrdersDTO dto)
	    throws ResourceNotFoundException, UniqueConstraintsException {
	OrdersEntity entity = orderUtil.toEntity(dto);
	entity.setUser(userService.findOne(dto.getUserID()));
	return ResponseEntity.ok().body(orderUtil.toDTO(service.save(entity)));
    }

    @PutMapping("/order/{id}")
    public ResponseEntity<OrdersDTO> updateOrders(@RequestBody OrdersDTO dto, @PathVariable("id") long id)
	    throws ResourceNotFoundException, UniqueConstraintsException {
	OrdersEntity orEntity = service.findOne(id);
	dto.setId(id);
	OrdersEntity entity = orderUtil.toEntity(dto);
	entity.setCreateBy(orEntity.getCreateBy());
	entity.setCreateDate(orEntity.getCreateDate());
	entity.setUser(userService.findOne(dto.getUserID()));
	List<ProductEntity> list = new ArrayList<>();
	for (ProductDTO pro : dto.getProductDTO()) {
	    list.add(productUtil.toEntity(pro));
	}
	entity.setProducts(list);
	return ResponseEntity.ok().body(orderUtil.toDTO(service.save(entity)));
    }

    @DeleteMapping("/order/{id}")
    public Map<String, Boolean> deleteOrderst(@PathVariable("id") long id) throws ResourceNotFoundException {
	service.delete(id);
	Map<String, Boolean> response = new HashMap<>();
	response.put("deleted", Boolean.TRUE);
	return response;
    }

}
