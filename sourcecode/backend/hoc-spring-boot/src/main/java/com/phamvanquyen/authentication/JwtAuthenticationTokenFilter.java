package com.phamvanquyen.authentication;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import com.phamvanquyen.entity.UserEntity;
import com.phamvanquyen.service.JwtService;
import com.phamvanquyen.service.impl.UserService;

public class JwtAuthenticationTokenFilter extends UsernamePasswordAuthenticationFilter {

    private final static String TOKEN_HEADER = "authorization";

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService serviceUser;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
	    throws ServletException, IOException {

	HttpServletRequest httpRequest = (HttpServletRequest) request;

	String authToken = httpRequest.getHeader(TOKEN_HEADER);

	if (jwtService.validateTokenLogin(authToken)) {
	    String username = jwtService.getUsernameFromToken(authToken);

	    UserEntity entityUser = serviceUser.loadUserByUsername(username);

	    if (entityUser != null) {
		boolean enabled = true;
		boolean accountNonExpired = true;
		boolean credentialsNonExprired = true;
		boolean accountNonLocked = true;
		UserDetails userDetails = new User(username, entityUser.getPassword(), enabled, accountNonExpired,
			credentialsNonExprired, accountNonLocked, entityUser.getAuthorities());
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username,
			null, userDetails.getAuthorities());
		authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
		SecurityContextHolder.getContext().setAuthentication(authentication);

	    }
	}

	chain.doFilter(request, response);
    }

}
