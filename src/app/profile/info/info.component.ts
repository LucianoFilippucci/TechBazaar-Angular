import { Component } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {LoginStateModel} from "../../models/login-state.model";
import {AccountingService} from "../../accounting.service";
import {BuildFormService} from "../../build-form.service";
import {ServerRequestFacadeService} from "../../server-request-facade.service";
import {ToastService} from "../../toast.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  user: LoginStateModel

  constructor(private accountingService: AccountingService, private formBuilder: BuildFormService, private serverRequest: ServerRequestFacadeService, private toastService: ToastService) {
    this.user = this.accountingService.getUser();
  }

  form = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(),
    address: new FormControl()
  })

  hidePassword = true;
  edit(type: string) {
    this.showModal(type)
    switch (type) {
      case 'password':
        //TODO:  ask server to send otp
        this.formBuilder.newInputControl("newPassword", "password", "New Password")
        this.formBuilder.setCallbackFunction(this.onSubmit.bind(this))
    }

  }

  onSubmit(result: any) {
    this.serverRequest.editPassword(this.user.id, result["newPassword"], this.user.token, (status: boolean, response: any) => {
      if(status) {
        this.toastService.show({message: "Password Updated.", isError: false});
      } else {
        this.toastService.show({message: "Error.", isError: true});
      }
    });
  }

  private showModal(type: string) {
    let modal = document.getElementById("modal_");
    if (modal != null)
      modal.style.display = "block";
    let modalTitle = document.getElementById("modalTitle");
    if(modalTitle != null) {
      modalTitle.innerText = "Edit " + type;
    }


  }

}
