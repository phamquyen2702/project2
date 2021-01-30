package com.phamvanquyen.api;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.phamvanquyen.dto.UserDTO;
import com.phamvanquyen.entity.UserEntity;
import com.phamvanquyen.exception.ResourceNotFoundException;
import com.phamvanquyen.exception.UniqueConstraintsException;
import com.phamvanquyen.service.JwtService;
import com.phamvanquyen.service.impl.UserService;
import com.phamvanquyen.transfer.UserUtil;

import net.minidev.json.JSONObject;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class Auth {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserUtil userUtil;

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public String login(HttpServletRequest request, @RequestBody UserEntity user) {
	String result = "";
	HttpStatus httpStatus = null;
	JSONObject resp = new JSONObject();

	try {
	    if (userService.checkLogin(user)) {
		result = jwtService.generateTokenLogin(user.getUserName());
//		resp.put("accessToken", result);
		httpStatus = HttpStatus.OK;
	    } else {
		result = "Wrong userId and Password";
		httpStatus = HttpStatus.BAD_REQUEST;
	    }

	} catch (Exception e) {
	    result = "Server Error";
	    httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
	}
	return result;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserEntity entity)
	    throws ResourceNotFoundException, UniqueConstraintsException {
	return ResponseEntity.ok().body(userUtil.toDTO(userService.save(entity)));
    }
}
