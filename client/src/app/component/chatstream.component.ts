import {Component}            from '@angular/core';
import {Subject}              from 'rxjs/Rx';
import {Message}              from '../data/message';
import {AppDataService}       from '../service/appdata.service';
import {ChatWebsocketService} from '../service/chatwebsocket.service'


@Component({
  selector: 'chat-stream',
  templateUrl: '../template/chatstream.component.html',
  styleUrls: ['../style/chatstream.component.css']
})
export class ChatStreamComponent {

  private message: string = ''; 
  private publishedMessage: Message[] = new Array();
  private showTypingIndicator: boolean = false;
  private typingUser: string;
  private loggedinUserId: number;
  private messages: Subject<Message>;

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

  private sendMessage() {
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

  private sendTypeIndicator() {
    let message: Message = {
      type: 'USER_TYPING',
      from: this.appDataService.userId,
      fromUserName: this.appDataService.userName,
      message: null
    }
    this.messages.next(message);
  }

  private showUserTypingIndicator(userName: string) {
    this.typingUser = userName;
    this.showTypingIndicator = true;
  }

  private hideUserTypingIndicator() {
    if (this.showTypingIndicator) {
      this.showTypingIndicator = false;
    }
  }

}