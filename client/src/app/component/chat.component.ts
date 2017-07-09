import {Component}  from '@angular/core';
import {AppService} from '../service/app.service';

@Component({
  selector: 'chat',
  templateUrl: '../template/chat.component.html',
  styleUrls: ['../style/chat.component.css']
})
export class ChatComponent {

  constructor(private appService: AppService) { }

  private doLogout(){

  }

}