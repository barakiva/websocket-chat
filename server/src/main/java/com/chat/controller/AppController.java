package com.chat.controller;

import com.chat.pojo.LoginRequest;
import com.chat.pojo.Message;
import com.chat.pojo.User;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
			validUsers.add(new User(1, "Frodo"));
			validUsers.add(new User(2, "Sam"));
			validUsers.add(new User(3, "Gollum"));
			return validUsers;
		}
	}

	@MessageMapping("/websocket")
	@SendTo("/topic/messages")
	public Message greeting(Message message) throws Exception {
		return new Message("Message", 2, "Message message!");
	}

}
