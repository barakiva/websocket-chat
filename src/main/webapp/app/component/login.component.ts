import {Component} from '@angular/core';
import {AppService} from '../service/app.service';

@Component({
  selector: 'login',
  templateUrl: 'app/template/login.component.html'
})
export class LoginComponent {

  constructor(private appService: AppService) {}

  
}