import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {CommonHeader} from './header.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class XHRHandler {
    constructor(private http: Http) {}
    
    doGet(path : string){
        return this.http.get(path)
               .toPromise()
               .then(response => {
				          return response.json();
			          })
               .catch();
    }
    
    doPost(path : string, reqData : any){
        return this.http.post(path, JSON.stringify(reqData), {headers: CommonHeader.getCommonHeaders()})
                .toPromise()
                .then(response => {
                  return response.json();
                })
                .catch();
    }
    
    doDelete(path : string){
        return this.http.delete(path)
               .toPromise()
               .then(response => {
                  return response.json();
                })
               .catch();
    }
}