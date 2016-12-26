import {BrowserModule}  from '@angular/platform-browser';
import {NgModule}       from '@angular/core';
import {FormsModule}    from '@angular/forms';
import {HttpModule}     from '@angular/http';
import {RouterModule}   from '@angular/router';

import {AppComponent }  from './component/app.component';
import {LoginComponent} from './component/login.component';
import {ChatComponent}  from './component/chat.component';

import {AppService}     from './service/app.service';
import {XHRHandler}     from './service/xhrhandler.service';

@NgModule({
  declarations: [AppComponent, LoginComponent, ChatComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    RouterModule.forRoot([
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'home', component: ChatComponent}
    ])
  ],
  providers: [AppService, XHRHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
