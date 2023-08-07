import {Component, OnInit} from '@angular/core';
import {ShowElementsService} from "../show-elements.service";
import {NgForm} from "@angular/forms";
import {ServerRequestFacadeService} from "../server-request-facade.service";
import {LoginStateModel} from "../models/login-state.model";
import {Router} from "@angular/router";
import {AccountingService} from "../accounting.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private showElementsService: ShowElementsService, private serverRequest: ServerRequestFacadeService, private router: Router, private accountingService: AccountingService) {
    this.showElementsService.update(false);

  }

  ngOnInit() {
  }

  login(loginForm:NgForm) {
    this.accountingService.performLogin(loginForm.value["username"], loginForm.value["password"], this.loginCallback.bind(this));
  }

  private loginCallback(status: boolean){
    if(status) {
      this.router.navigate([""]);
    }
  }


}
