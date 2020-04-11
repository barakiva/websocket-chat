import {Component}            from '@angular/core';
import {AppService}           from '../service/app.service';
import {User}                 from '../data/user';
import {ChatWebsocketService} from '../service/chatwebsocket.service';
import {Subject}              from 'rxjs/Rx';
import {Message}              from '../data/message';

@Component({
  selector: 'users',
  templateUrl: '../template/users.component.html',
  styleUrls: ['../style/user.component.css']
})
export class UsersComponent {

  private users: any[] = new Array();
  private messages: Subject<Message>;

  constructor(private appService: AppService,
              private chatWSService: ChatWebsocketService) {
    this.initUserList();
    this.messages = chatWSService.getMessageSubscriptionStream();
    this.messages.subscribe(message => {
          if (message.type == "USER_ONLINE") {
            this.setUserOnlineOffline(message.from, true);
          } else if (message.type == "USER_OFFLINE") {
            this.setUserOnlineOffline(message.from, false);
          }
        });
  }

  private initUserList() {
    this.appService.listUser().then(response => {
      this.users = JSON.parse(response._body);
      this.setEachUserOnlineOffline();
      console.log(this.users);
    });
  }

  private setEachUserOnlineOffline() {
    this.users.forEach(user => user.isOnline = false);
  }

  private setUserOnlineOffline(userId: Number, isOnline: boolean) {
    console.log(userId, isOnline);
  }

}