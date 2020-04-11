import {Component}            from '@angular/core';
import {AppService}           from '../service/app.service';
import {LoginRequest}         from '../data/loginrequest';
import {Router}               from '@angular/router';
import {AppDataService}       from '../service/appdata.service';
import {ChatWebsocketService} from '../service/chatwebsocket.service';


@Component({
  selector: 'login',
  templateUrl: '../template/login.component.html'
})
export class LoginComponent {

  userName: string;
  password: string;
  showErrorMsg: boolean;

  constructor(private router: Router,
              private appService: AppService,
              private appDataService: AppDataService,
              private chatWSService: ChatWebsocketService) { }

  doLogin() {
    this.appService.userLogin({name: this.userName, password: this.password})
        .subscribe(response => {
          if (response.status != 401) {
            this.appDataService.userId = JSON.parse(response._body).id;
            this.appDataService.userName = JSON.parse(response._body).userName;
            this.chatWSService.createMessageStream();
            this.router.navigate(['/home']);
          } else {
            this.showErrorMsg = true;
          }
        });
  }
}