package com.app.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojo.LoginRequest;

@RestController
public class AppController {
	
	@RequestMapping(value = "/user/login", method = RequestMethod.POST)
	public void userogin(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
		if (!getValidUsers().contains(loginRequest.getName())) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		}
	}
	
	private List<String> getValidUsers() {
		List<String> validUsers = new ArrayList<>();
		
		if (!validUsers.isEmpty()) {
			return validUsers;
		} else {
			validUsers = new ArrayList<>();
			validUsers.add("user1");
			validUsers.add("user2");
			validUsers.add("user3");
			return validUsers;
		}
	}

}
