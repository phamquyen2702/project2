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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.phamvanquyen.dto.UserDTO;
import com.phamvanquyen.entity.UserEntity;
import com.phamvanquyen.exception.ResourceNotFoundException;
import com.phamvanquyen.exception.UniqueConstraintsException;
import com.phamvanquyen.service.impl.UserService;
import com.phamvanquyen.transfer.UserUtil;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserAPI {

    @Autowired
    private UserService service;

    @Autowired
    private UserUtil userUtil;

    @PutMapping("/user/{id}")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserEntity entity, @PathVariable("id") long id)
	    throws ResourceNotFoundException, UniqueConstraintsException {
	UserEntity uEntity = service.findOne(id);
	entity.setCreateBy(uEntity.getCreateBy());
	entity.setCreateDate(uEntity.getCreateDate());
	entity.setId(id);
	return ResponseEntity.ok().body(userUtil.toDTO(service.save(entity)));
    }

    @DeleteMapping("/user/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable("id") long id) throws ResourceNotFoundException {
	service.delete(id);
	Map<String, Boolean> response = new HashMap<>();
	response.put("deleted", Boolean.TRUE);
	return response;
    }

    @GetMapping("/user")
    public ResponseEntity<List<UserDTO>> getUser() {
	List<UserEntity> users = service.findAll();
	List<UserDTO> userDTOs = new ArrayList<>();
	for (UserEntity entity : users) {
	    userDTOs.add(userUtil.toDTO(entity));
	}
	return ResponseEntity.ok().body(userDTOs);
    }

    @GetMapping("/userOne/{userName}")
    public ResponseEntity<UserDTO> getUserByUserName(@PathVariable("userName") String userName) {
	return ResponseEntity.ok().body(userUtil.toDTO(service.loadUserByUsername(userName)));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDTO> getUserByID(@PathVariable("id") Long id) {
	return ResponseEntity.ok().body(userUtil.toDTO(service.findOne(id)));
    }

    @GetMapping("/user/{role}")
    public ResponseEntity<List<UserEntity>> getRoleByRole(@PathVariable("role") String role) {
	return ResponseEntity.ok().header("Success", "200").body(service.getUserByRole(role));
    }

    @GetMapping("/user/page")
    public ResponseEntity<List<UserDTO>> getUserPage(@RequestParam("offset") int offset,
	    @RequestParam("limit") int limit) {
	List<UserDTO> users = new ArrayList<>();
	for (UserEntity entity : service.getPage(offset, limit)) {
	    users.add(userUtil.toDTO(entity));
	}
	return ResponseEntity.ok().body(users);
    }
}
