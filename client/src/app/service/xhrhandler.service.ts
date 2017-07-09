import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {CommonHeader} from './header.service';
import 'rxjs/add/operator/toPromise';

const SERVER_BASE_URL = "http://localhost:8080/";

@Injectable()
export class XHRHandler {
    
  constructor(private http: Http) {}

  doGet(path : string) {
    return this.http.get(SERVER_BASE_URL + path)
            .toPromise()
            .then(response => {
              return response;
            })
            .catch(response => {
              return response;
            });
  }

  doPost(path : string, reqData : any) {
    return this.http.post(SERVER_BASE_URL + path, JSON.stringify(reqData), {headers: CommonHeader.getCommonHeaders()})
            .toPromise()
            .then(response => {
              return response;
            })
            .catch(response => {
              return response;
            });
  }
}