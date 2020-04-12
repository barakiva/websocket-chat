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
    this.websocket.onmessage = (event: MessageEvent) => {
      let message: Message = JSON.parse(event.data);
      console.log(message);
      if (message.type == 'MESSAGE') {
        this.publishedMessage.push(message);
      } else if (message.type == 'TYPING') {
        this.showUserTypingIndicator(message.fromUserName);
      }
    };
    this.loggedinUserId = this.appDataService.userId;
  }

  sendMessage() {
    let msg = this.message;
    if (msg == '' || msg == undefined) return;

    let message: Message = {
      type: 'MESSAGE',
      from: this.appDataService.userId,
      fromUserName: this.appDataService.userName,
      message: msg
    }
    this.websocket.send(JSON.stringify(message));
    this.message = '';
  }

  sendTypeIndicator() {
    let message: Message = {
      type: 'TYPING',
      from: this.appDataService.userId,
      fromUserName: this.appDataService.userName,
      message: null
    }
    this.websocket.send(JSON.stringify(message));
  }

  showUserTypingIndicator(userName: string) {
    this.typingUser = userName;
    this.showTypingIndicator = true;
    setTimeout(() => {
      console.log('hide');
      this.hideUserTypingIndicator();
    }, 1000);
    
  }

  hideUserTypingIndicator() {
    if (this.showTypingIndicator) {
      this.showTypingIndicator = false;
    }
  }

}