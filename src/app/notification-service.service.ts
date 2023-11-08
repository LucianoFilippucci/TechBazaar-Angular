import { Injectable } from '@angular/core';
import {JwtDecoder} from "./Helpers/jwtDecoder";
import {AccountingService} from "./accounting.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {


  constructor( private accountingService : AccountingService) { }


  getVal() {
    if(this.accountingService.isAuthenticated()) {
      let user = this.accountingService.getUser();
      return user.totalUnreadNotifications
    } return 0
  }

}
