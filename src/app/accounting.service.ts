import { Injectable } from '@angular/core';
import {ServerRequestFacadeService} from "./server-request-facade.service";
import {LoginStateModel} from "./models/login-state.model";
import {JwtDecoder} from "./Helpers/jwtDecoder";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  private precondition: boolean = false;
  //TODO: Add Token Expire check + Refresh

  constructor(private serverRequest: ServerRequestFacadeService, private router: Router, private toastService : ToastService) {
  }

  performLogout() {
    if(this.isAuthenticated()) {
      localStorage.removeItem("user");
      localStorage.setItem("isLogged", "false");
      window.location.reload()
    }
  }

  performLogin(username: string, password: string) {
    this.serverRequest.login(username, password, (status: boolean, response: any) => {
      if(status) {
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("isLogged", "true");

        console.log(response["roles"])
        window.location.href = response["roles"][0] == "ROLE_STORE" ? "/store/administration" : "/"

        // this.router.navigate([redirect]).then(r => {
        //   if(!r)
        //     this.toastService.show({message: "Generic Error.", isError: true})
        // });
      }
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
