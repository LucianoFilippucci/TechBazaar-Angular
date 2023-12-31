import {Component, ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {AccountingService} from "../accounting.service";
import {USER_EDIT_EMAIL} from "../Helpers/variables";
import { LoginStateModel } from '../models/login-state.model';
import {NgOptimizedImage} from "@angular/common";
import {ServerRequestFacadeService} from "../server-request-facade.service";
import {ToastService} from "../toast.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  // @ts-ignore
  user: LoginStateModel;
  thumbnailPath : string = "";

  countries : any
  cities: any

  showComponent = "INFO"

  constructor(private accountingService: AccountingService, private cdr: ChangeDetectorRef, private requestFacade : ServerRequestFacadeService, private toastService : ToastService) {
    if(this.accountingService.isAuthenticated()) {
      this.user = this.accountingService.getUser();
      this.thumbnailPath = this.user.thumbnailPath;

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
