package com.app.enums;

public enum MessageType {
	
	CHAT_MESSAGE(1),
	TYPE_INDICATOR(2),
	USER_ONLINE(3),
	USER_OFFLINE(4);
	
	private final int messageType;
	
	MessageType(int messageType) {
		this.messageType = messageType;
	}
	
	public int getType() {
		return messageType;
	}
}
