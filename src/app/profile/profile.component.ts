import {Component, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {AccountingService} from "../accounting.service";
import {USER_EDIT_EMAIL} from "../Helpers/variables";
import {Subscription} from "rxjs";
import { LoginStateModel } from '../models/login-state.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: LoginStateModel | undefined;

  constructor(private accountingService: AccountingService, private cdr: ChangeDetectorRef) {
    if(this.accountingService.isAuthenticated()) {
      let u = this.accountingService.getUser();
      if(u != false)
        this.user = u;
    }
  }


  logout() {
    this.accountingService.performLogout();
  }

  editInfo(type: string) {
    switch(type) {
      case "access":
        let container = document.getElementById("container");
        let dataToSend = {
          type: "access",
          service: USER_EDIT_EMAIL
        }
        // @ts-ignore
        container.innerHTML += "<app-modal [data] = 'dataToSend'></app-modal>";
        break;
    }

  }


}
