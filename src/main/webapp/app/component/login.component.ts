import {Component} from '@angular/core';
import {AppService} from '../service/app.service';
import {LoginRequest} from '../data/loginrequest';

@Component({
  templateUrl: 'app/template/login.component.html',
  providers: [AppService]
})
export class LoginComponent {

  constructor(private appService: AppService) { }

  doLogin() {
    let loginRequest: LoginRequest = {
      name: 'user1',
      password: 'pswd'
    };
    console.log(JSON.stringify(loginRequest));
    this.appService.userLogin(loginRequest);
  }
}