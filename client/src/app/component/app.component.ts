import {Component}      from '@angular/core';
import {LoginComponent} from './login.component';
import {ChatComponent}  from './chat.component';

@Component({
  selector: 'app-root',
  templateUrl: '../template/app.component.html',
  entryComponents: [LoginComponent, ChatComponent]
})
export class AppComponent {
  
  constructor() {}

}
