package com.phamvanquyen.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.phamvanquyen.authentication.CustomAccessDeniedHandler;
import com.phamvanquyen.authentication.JwtAuthenticationTokenFilter;
import com.phamvanquyen.authentication.RestAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public UserDetailsService userDetailsService() {
	return super.userDetailsService();
    }

    @Bean
    public JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter() throws Exception {
	JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter = new JwtAuthenticationTokenFilter();
	jwtAuthenticationTokenFilter.setAuthenticationManager(authenticationManager());
	return jwtAuthenticationTokenFilter;
    }

    @Bean
    public RestAuthenticationEntryPoint restServicesEntryPointt() {
	return new RestAuthenticationEntryPoint();
    }

    @Bean
    public CustomAccessDeniedHandler customAccessDeniedHandler() {
	return new CustomAccessDeniedHandler();
    }

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
	return super.authenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
	return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
	auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    protected void configure(HttpSecurity http) throws Exception {

	http.cors().and();
	http.csrf().ignoringAntMatchers("/**");
	http.authorizeRequests().antMatchers("/auth/**").permitAll().and();
	http.antMatcher("/**").httpBasic().authenticationEntryPoint(restServicesEntryPointt()).and().sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
		.antMatchers(HttpMethod.POST, "/api/**").access("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
		.antMatchers(HttpMethod.GET, "/api/**")
		.access("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
		.antMatchers(HttpMethod.PUT, "/api/**").access("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
		.antMatchers(HttpMethod.DELETE, "/api/**").access("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
		.antMatchers(HttpMethod.DELETE, "/api/user").access("hasRole('ROLE_ADMIN')").and()
		.addFilterBefore(jwtAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
		.exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());

    }
}
