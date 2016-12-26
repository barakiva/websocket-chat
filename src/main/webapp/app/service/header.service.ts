import { Headers } from '@angular/http';

export class CommonHeader {
    static getCommonHeaders() : Headers {
        return new Headers({
          'Content-Type': 'application/json', 
          'Accept': 'application/json'
        });
    }
}