import {Component}  from '@angular/core';
import {AppService} from '../service/app.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'users',
  templateUrl: '../template/users.component.html',
  styleUrls: ['../style/user.component.css']
})
export class UsersComponent {

  users: any[] = new Array();
  messages: Observable<any>;

  constructor(private appService: AppService) {
    this.initUserList();
  }

  initUserList() {
    this.appService.listUser().subscribe(response => {
      this.users = response;
      this.setEachUserOnlineOffline();
      console.log(this.users);
    });
  }

  setEachUserOnlineOffline() {
    this.users.forEach(user => user.isOnline = false);
  }

  setUserStatus(userId: Number, isOnline: boolean) {
    console.log(userId, isOnline);
  }

}