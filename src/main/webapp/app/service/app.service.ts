import {Injectable} from '@angular/core';
import {XHRHandler} from './xhrhandler.service';
import {LoginRequest} from '../data/loginRequest'

@Injectable() 
export class AppService {
  constructor(private xhrhandler: XHRHandler) {}

  userLogin(request: LoginRequest){
    this.xhrhandler.doPost('user/login', request);
  }
}