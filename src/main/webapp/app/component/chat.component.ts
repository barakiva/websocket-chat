import {Component} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ChatWebsocketService} from '../service/chatwebsocket.service'
import {Message} from '../data/message';

const WEBSOCKET_URL = 'ws://localhost:8080/websocket-chat/reception';

@Component({
  templateUrl: 'app/template/chat.component.html',
  providers: [ChatWebsocketService]
})
export class ChatComponent {

  private message: string = ''; 
  private messages: Subject<Message>;
  private publishedMessage: Message[] = new Array();

  constructor(chatWSService: ChatWebsocketService) {
    this.messages = <Subject<Message>>chatWSService
                        .connect(WEBSOCKET_URL)
                        .map((response: MessageEvent): Message => {
                          let data = JSON.parse(response.data);
                          let message: Message = {
                            type: data.type,
                            from: data.from,
                            message: data.message
                          };
                          return message;
                        });

    this.messages.subscribe(message => {
      this.publishedMessage.push(message);
    });
  }

  private sendMessage() {
    let msg = this.message;
    if (msg == '' || msg == undefined) return;

    let message: Message = {
      type: 'CHAT_MESSAGE',
      from: 1,
      message: msg
    }
    this.messages.next(message);
    this.publishedMessage.push(message);
  }

  private sendTypeIndicator() {
    let message: Message = {
      type: 'USER_TYPING',
      from: 1,
      message: ''
    }
    this.messages.next(message);
  }

}