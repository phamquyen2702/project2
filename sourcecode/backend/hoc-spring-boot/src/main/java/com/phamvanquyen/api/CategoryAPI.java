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
import org.springframework.web.bind.annotation.RestController;

import com.phamvanquyen.dto.CategoryDTO;
import com.phamvanquyen.entity.CategoryEntity;
import com.phamvanquyen.exception.ResourceNotFoundException;
import com.phamvanquyen.exception.UniqueConstraintsException;
import com.phamvanquyen.service.impl.CategoryService;
import com.phamvanquyen.transfer.CategoryUtil;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class CategoryAPI {

    @Autowired
    CategoryService service;

    @Autowired
    CategoryUtil categoryUtil;

    @GetMapping("/category")
    public ResponseEntity<List<CategoryDTO>> getCategories() {
	List<CategoryDTO> categoDTOs = new ArrayList<>();
	for (CategoryEntity entity : service.findAll()) {
	    categoDTOs.add(categoryUtil.toDTO(entity));
	}
	return ResponseEntity.ok().body(categoDTOs);
    }

    @PostMapping("/category")
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO dto)
	    throws ResourceNotFoundException, UniqueConstraintsException {
	return ResponseEntity.ok().body(categoryUtil.toDTO(service.save(categoryUtil.toEntity(dto))));
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@RequestBody CategoryDTO dto, @PathVariable("id") long id)
	    throws ResourceNotFoundException, UniqueConstraintsException {
	CategoryEntity caEntity = service.findOne(id);
	dto.setId(id);
	CategoryEntity entity = categoryUtil.toEntity(dto);
	entity.setCreateBy(caEntity.getCreateBy());
	entity.setCreateDate(caEntity.getCreateDate());
	return ResponseEntity.ok().body(categoryUtil.toDTO(service.save(entity)));
    }

    @DeleteMapping("/category/{id}")
    public Map<String, Boolean> deleteCategory(@PathVariable("id") long id) throws ResourceNotFoundException {
	service.delete(id);
	Map<String, Boolean> response = new HashMap<>();
	response.put("deleted", Boolean.TRUE);
	return response;
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<CategoryDTO> findOne(@PathVariable("id") long id) throws ResourceNotFoundException {
	CategoryEntity entity = service.findOne(id);
	return ResponseEntity.ok().header("Success", "201").body(categoryUtil.toDTO(entity));
    }
}
