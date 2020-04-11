import {Observable}     from 'rxjs/Rx';
import {Subject}        from 'rxjs/Rx';
import {Observer}       from 'rxjs/Rx';
import {Injectable}     from '@angular/core';
import {Message}        from '../data/message';
import {AppDataService} from '../service/appdata.service';

const WEBSOCKET_URL = 'ws://localhost:8080/reception';

@Injectable()
export class ChatWebsocketService {

  private subject: Subject<MessageEvent>;
  private messages: Subject<Message>;

  constructor(private appDataService: AppDataService) { }

  public createMessageStream() {
    this.messages = <Subject<Message>> this.connect(WEBSOCKET_URL)
                        .map((response: MessageEvent): Message => {
                          let data = JSON.parse(response.data);
                          let message: Message = {
                            type: data.type,
                            from: data.from,
                            fromUserName: data.fromUserName,
                            message: data.message
                          };
                          return message;
                        });
  }

  public connect(url): Subject<MessageEvent> {
    if(!this.subject) {
      this.subject = this.createWebsocket(url);
    }
    return this.subject;
  }

  private createWebsocket(url): Subject<MessageEvent> {
    let ws = new WebSocket(url);
    ws.onopen = (evt: Event) => {
      console.log('Socket opened');
      this.sendUserOnlineOfflineMessage(true);
    }
    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };
    
    return Subject.create(observer, observable);
  }

  public getMessageSubscriptionStream() : Subject<Message> {
    return this.messages;
  }  

  public sendUserOnlineOfflineMessage(isOnline: boolean) {
    let message: Message = {
      type: isOnline ? 'USER_ONLINE' : 'USER_OFFLINE',
      from: this.appDataService.userId,
      fromUserName: this.appDataService.userName,
      message: null
    }
    this.messages.next(message);
  }

}