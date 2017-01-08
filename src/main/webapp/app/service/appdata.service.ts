import {Injectable}     from '@angular/core';
import {SessionStorage} from "ng2-webstorage";

@Injectable() 
export class AppDataService {

  @SessionStorage("userId")
  public userId: number;

  @SessionStorage("userName")
  public userName: string;

  public clearData(){
    this.userId = null;
    this.userName = null;
  }

}