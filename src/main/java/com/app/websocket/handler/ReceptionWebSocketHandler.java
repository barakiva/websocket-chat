package com.app.websocket.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.app.chat.BroadcastService;

public class ReceptionWebSocketHandler extends TextWebSocketHandler{
	
	@Autowired
	BroadcastService broadcastService;

    @Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    	System.out.println("CONNECTION SUCCESSFULLY ESTABLISHED");
    	broadcastService.addSession(session);
    }


    @Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    	String payload = message.getPayload();
    	System.out.println("MAH PAYLOAD :: " + payload);
    	broadcastService.brodcast(message);
    }


    @Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    	System.out.println("CONNECTION CLOSED");
    	broadcastService.removeSession(session);
    }

}
