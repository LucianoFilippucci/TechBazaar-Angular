import { Injectable } from '@angular/core';
import {ServerRequestFacadeService} from "./server-request-facade.service";
import {LoginStateModel} from "./models/login-state.model";
import {JwtDecoder} from "./Helpers/jwtDecoder";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  private precondition: boolean = false;
  //TODO: Add Token Expire check + Refresh

  constructor(private serverRequest: ServerRequestFacadeService, private router: Router) {
  }

  performLogout() {
    if(this.isAuthenticated()) {
      localStorage.removeItem("user");
      localStorage.setItem("isLogged", "false");
      this.router.createUrlTree([""]);
    }
  }

  performLogin(username: string, password: string, callback: any) {
    this.serverRequest.login(username, password, (status: boolean, response: any) => {
      if(status) {
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("isLogged", "true");
      }
      callback(status, response);
    });
  }

  isAuthenticated() {
    if(localStorage.getItem("isLogged") == "true") {
      this.precondition = true;
      return true;
    }
    return false;
  }

  getUser() {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("user")) as LoginStateModel;
  }
}
