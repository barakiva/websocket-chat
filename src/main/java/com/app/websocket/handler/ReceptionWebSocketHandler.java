package com.app.websocket.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.app.chat.BroadcastService;

public class ReceptionWebSocketHandler extends TextWebSocketHandler {
	
	@Autowired
	BroadcastService broadcastService;

    @Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    	broadcastService.addSession(session.getId(), session);
    	System.out.println("ADDED SESSION :: " + session.getId());
    }

    @Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    	String payload = message.getPayload();
    	System.out.println("INCOMING MESSAGE FROM SESSION :: " + session.getId() + ", MESSAGE:: " + payload);
    	broadcastService.brodcast(session.getId(), message);
    }

    @Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    	broadcastService.removeSession(session.getId());
    	System.out.println("REMOVED SESSION :: " + session.getId());
    }

}
