import {Component} from '@angular/core';
import {AppService} from '../service/app.service';
import {LoginRequest} from '../data/loginrequest';
import {Router}  from '@angular/router';

@Component({
  templateUrl: 'app/template/login.component.html',
  providers: [AppService]
})
export class LoginComponent {

  private userName: string;
  private password: string;

  constructor(private router: Router,
    private appService: AppService) { }

  doLogin() {
    let loginRequest: LoginRequest = {
      name: this.userName,
      password: this.password
    };
    
    this.appService.userLogin(loginRequest).then(response => {
      if (response.status != 401) {
        this.router.navigate(['/home']);
      }
    });
  }
}