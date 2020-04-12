import {Component}            from '@angular/core';
import {Message}              from '../data/message';
import {AppDataService}       from '../service/appdata.service';

const WEBSOCKET_URL = 'ws://localhost:8185/websocket';

@Component({
  selector: 'chat-stream',
  templateUrl: '../template/chatstream.component.html',
  styleUrls: ['../style/chatstream.component.css']
})
export class ChatStreamComponent {

  message: string = ''; 
  publishedMessage: Message[] = new Array();
  showTypingIndicator: boolean = false;
  typingUser: string;
  loggedinUserId: number;
  websocket: WebSocket;

  constructor(private appDataService: AppDataService) {
    this.websocket = new WebSocket(WEBSOCKET_URL);
    this.websocket.onmessage = this.handleMessage;
    this.loggedinUserId = this.appDataService.userId;
  }

  sendMessage() {
    let msg = this.message;
    if (msg == '' || msg == undefined) return;

    let message: Message = {
      type: 'CHAT_MESSAGE',
      from: this.appDataService.userId,
      fromUserName: this.appDataService.userName,
      message: msg
    }
    this.websocket.send(JSON.stringify(message));
    this.publishedMessage.push(message);
    this.message = '';
  }

  sendTypeIndicator() {
    let message: Message = {
      type: 'USER_TYPING',
      from: this.appDataService.userId,
      fromUserName: this.appDataService.userName,
      message: null
    }
    this.websocket.send(JSON.stringify(message));
  }

  handleMessage(event: MessageEvent) {
    let data = event.data; 
    console.log(data);
    if (data.type == 'CHAT_MESSAGE') {
      this.publishedMessage.push(data);
    } else if (data.type == 'USER_TYPING') {
      this.showUserTypingIndicator(data.fromUserName);
    }
  }

  showUserTypingIndicator(userName: string) {
    this.typingUser = userName;
    this.showTypingIndicator = true;
  }

  hideUserTypingIndicator() {
    if (this.showTypingIndicator) {
      this.showTypingIndicator = false;
    }
  }

}