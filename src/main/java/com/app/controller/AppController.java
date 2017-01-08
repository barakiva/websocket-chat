package com.app.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojo.LoginRequest;
import com.app.pojo.User;

@RestController
public class AppController {
	
	@RequestMapping(value = "/user/login", method = RequestMethod.POST)
	public User userLogin(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
		Optional<User> user = getValidUsers()
								.stream()
								.filter(u -> u.getUserName().equalsIgnoreCase(loginRequest.getName()))
								.findFirst();
		
		if (user.isPresent()) {
			return user.get();
		} else {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return null;
		}
	}
	
	private List<User> getValidUsers() {
		List<User> validUsers = new ArrayList<>();
		
		if (!validUsers.isEmpty()) {
			return validUsers;
		} else {
			validUsers = new ArrayList<>();
			validUsers.add(new User(1, "user1"));
			validUsers.add(new User(2, "user2"));
			validUsers.add(new User(3, "user3"));
			return validUsers;
		}
	}

}
