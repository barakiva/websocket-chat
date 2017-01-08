package com.app.chat;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class BroadcastService {
	
	Map<String, WebSocketSession> liveSessions = new HashMap<>();
	
	public void addSession(String sessionId, WebSocketSession session) {
		liveSessions.put(sessionId, session);
	}
	
	public void removeSession(String sessionId) {
		liveSessions.remove(sessionId);
	}
	
	public void brodcast(String fromSessionId, TextMessage message) throws Exception {
		liveSessions.forEach((sessionId, session) -> {
			if (!sessionId.equalsIgnoreCase(fromSessionId)) {
				try {
					session.sendMessage(message);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
}
