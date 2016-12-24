package com.app.chat;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class BroadcastService {
	
	List<WebSocketSession> liveSessions = new ArrayList<>();
	
	public void addSession(WebSocketSession session) {
		this.liveSessions.add(session);
	}
	
	public void removeSession(WebSocketSession session) {
		this.liveSessions.remove(session);
	}
	
	public void brodcast(TextMessage message) throws Exception {
		for (WebSocketSession s : liveSessions) {
			s.sendMessage(message);
		}
	}
}
