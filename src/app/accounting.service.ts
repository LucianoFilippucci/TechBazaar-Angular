import { Injectable } from '@angular/core';
import {ServerRequestFacadeService} from "./server-request-facade.service";
import {LoginStateModel} from "./models/login-state.model";
import {JwtDecoder} from "./Helpers/jwtDecoder";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  private precondition: boolean = false;
  //TODO: Add Token Expire check + Refresh

  constructor(private serverRequest: ServerRequestFacadeService) {
  }

  performLogout() {
    if(this.isAuthenticated()) {
      localStorage.removeItem("user");
      localStorage.setItem("isLogged", "false");
    }
  }

  performLogin(username: string, password: string, callback: any) {
    this.serverRequest.login(username, password, (status: boolean, response: any) => {
      if(status) {
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("isLogged", "true");
      }
      callback(status);
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
    if(this.precondition) { // @ts-ignore
        return JSON.parse(localStorage.getItem("user")) as LoginStateModel;
    }
    return false;
  }
}
