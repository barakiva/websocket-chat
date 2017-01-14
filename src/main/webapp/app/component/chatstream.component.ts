import {Component}            from '@angular/core';
import {Subject}              from 'rxjs/Rx';
import {Message}              from '../data/message';
import {AppDataService}       from '../service/appdata.service';
import {ChatWebsocketService} from '../service/chatwebsocket.service'

const WEBSOCKET_URL = 'ws://localhost:8080/websocket-chat/reception';

@Component({
  selector: 'chat-stream',
  templateUrl: 'app/template/chatstream.component.html',
  styleUrls: ['./app/style/chatstream.component.css']
})
export class ChatStreamComponent {

  private message: string = ''; 
  private messages: Subject<Message>;
  private publishedMessage: Message[] = new Array();

  constructor(chatWSService: ChatWebsocketService,
              private appDataService: AppDataService) {
    
    console.log(appDataService.userId, appDataService.userName);

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
      from: this.appDataService.userId,
      message: msg
    }
    this.messages.next(message);
    this.publishedMessage.push(message);
    this.message = '';
  }

  private sendTypeIndicator() {
    let message: Message = {
      type: 'USER_TYPING',
      from: 1,
      message: null
    }
    this.messages.next(message);
  }

}