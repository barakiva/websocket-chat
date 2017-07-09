package com.chat.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.*;

import com.chat.pojo.LoginRequest;
import com.chat.pojo.User;

@CrossOrigin
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
	
	@RequestMapping(value = "/user/list", method = RequestMethod.GET)
	public List<User> listUsers() {
		return getValidUsers();
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
