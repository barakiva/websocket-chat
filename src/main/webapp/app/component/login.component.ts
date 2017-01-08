import {Component} from '@angular/core';
import {AppService} from '../service/app.service';
import {LoginRequest} from '../data/loginrequest';
import {Router}  from '@angular/router';
import {AppDataService} from '../service/appdata.service';

@Component({
  templateUrl: 'app/template/login.component.html',
  providers: [AppService, AppDataService]
})
export class LoginComponent {

  private userName: string;
  private password: string;
  private showErrorMsg: boolean;

  constructor(private router: Router,
              private appService: AppService,
              private appDataService: AppDataService) { }

  doLogin() {
    let loginRequest: LoginRequest = {
      name: this.userName,
      password: this.password
    };
    
    this.appService.userLogin(loginRequest).then(response => {
      if (response.status != 401) {
        this.appDataService.userId = JSON.parse(response._body).id;
        this.appDataService.userName = JSON.parse(response._body).userName;
        console.log(this.appDataService.userId, this.appDataService.userName);
        this.router.navigate(['/home']);
      } else {
        this.showErrorMsg = true;
      }
    });
  }
}