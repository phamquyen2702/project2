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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.phamvanquyen.dto.ProductDTO;
import com.phamvanquyen.entity.ProductEntity;
import com.phamvanquyen.exception.ResourceNotFoundException;
import com.phamvanquyen.exception.UniqueConstraintsException;
import com.phamvanquyen.service.impl.CategoryService;
import com.phamvanquyen.service.impl.ProductService;
import com.phamvanquyen.transfer.ProductUtil;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ProductAPI {

    @Autowired
    ProductService service;
    @Autowired
    CategoryService caservice;

    @Autowired
    ProductUtil productUtil;

    @GetMapping("/product")
    public ResponseEntity<List<ProductDTO>> getProducts() {
	List<ProductDTO> products = new ArrayList<>();
	for (ProductEntity entity : service.findAll()) {
	    products.add(productUtil.toDTO(entity));
	}
	return ResponseEntity.ok().body(products);
    }

    @PostMapping("/product")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO dto)
	    throws ResourceNotFoundException, UniqueConstraintsException {

	ProductEntity entity = productUtil.toEntity(dto);
	entity.setCategory(caservice.findOne(dto.getCategoryID()));
	return ResponseEntity.ok().body(productUtil.toDTO(service.save(entity)));
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductDTO dto, @PathVariable("id") long id)
	    throws ResourceNotFoundException, UniqueConstraintsException {
	ProductEntity proEntity = service.findOne(id);
	dto.setId(id);
	ProductEntity entity = productUtil.toEntity(dto);
	entity.setCreateBy(proEntity.getCreateBy());
	entity.setCreateDate(proEntity.getCreateDate());
	entity.setCategory(caservice.findOne(dto.getCategoryID()));
	return ResponseEntity.ok().body(productUtil.toDTO(service.save(entity)));
    }

    @DeleteMapping("/product/{id}")
    public Map<String, Boolean> deleteProduct(@PathVariable("id") long id) throws ResourceNotFoundException {
	service.delete(id);
	Map<String, Boolean> response = new HashMap<>();
	response.put("deleted", Boolean.TRUE);
	return response;
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable("id") long id) throws ResourceNotFoundException {
	return ResponseEntity.ok().body(productUtil.toDTO(service.findOne(id)));
    }

    @GetMapping("/product/page")
    public ResponseEntity<List<ProductDTO>> getProductPage(@RequestParam("offset") int offset,
	    @RequestParam("limit") int limit) {
	List<ProductDTO> products = new ArrayList<>();
	for (ProductEntity entity : service.findPage(offset, limit)) {
	    products.add(productUtil.toDTO(entity));
	}
	return ResponseEntity.ok().body(products);
    }
}
