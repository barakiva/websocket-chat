import {Component}  from '@angular/core';
import {AppService} from '../service/app.service';

@Component({
  selector: 'chat',
  templateUrl: 'app/template/chat.component.html',
  styleUrls: ['./app/style/chat.component.css']
})
export class ChatComponent {

  constructor(private appService: AppService) { }

  private doLogout(){

  }

}