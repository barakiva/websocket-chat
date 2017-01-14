import {Component}        from '@angular/core';
import {AppService}       from '../service/app.service'

@Component({
  selector: 'users',
  templateUrl: 'app/template/users.component.html',
  styleUrls: ['./app/style/user.component.css']
})
export class UsersComponent {

  private users: any = new Array();

  constructor(private appService: AppService) {
    this.initUserList();
  }

  private initUserList() {
    this.appService.listUser().then(response => {
      this.users = JSON.parse(response._body);
    });
  }

}