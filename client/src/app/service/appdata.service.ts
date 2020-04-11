import {Injectable} from '@angular/core';

@Injectable() 
export class AppDataService {
  
  public userId: number;

  public userName: string;

  public clearData(){
    this.userId = null;
    this.userName = null;
  }

}