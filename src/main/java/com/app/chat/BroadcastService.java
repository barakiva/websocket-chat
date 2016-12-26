package com.app.chat;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class BroadcastService {
	
	Map<String, WebSocketSession> liveSessions = new HashMap<>();
	
	public void addSession(String userName, WebSocketSession session) {
		liveSessions.put(userName, session);
	}
	
	public void removeSession(String userName) {
		liveSessions.remove(userName);
	}
	
	public void brodcast(String fromUser, TextMessage message) throws Exception {
		liveSessions.forEach((userName, session) -> {
			if (!userName.equalsIgnoreCase(fromUser)) {
				try {
					session.sendMessage(message);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
}
