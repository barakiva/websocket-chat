import {Component}            from '@angular/core';
import {Subject}              from 'rxjs';
import {Message}              from '../data/message';
import {AppDataService}       from '../service/appdata.service';
import {ChatWebsocketService} from '../service/chatwebsocket.service'


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
  messages: Subject<Message>;

  constructor(chatWSService: ChatWebsocketService,
              private appDataService: AppDataService) {
    this.messages = chatWSService.getMessageSubscriptionStream();
    this.messages.subscribe(message => {
          if (message.type == "CHAT_MESSAGE") {
            this.publishedMessage.push(message);
          } else if (message.type == "USER_TYPING") {
            this.showUserTypingIndicator(message.fromUserName);
            setTimeout(this.hideUserTypingIndicator.bind(this), 1000);
          }
        });
    
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
    this.messages.next(message);
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
    this.messages.next(message);
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