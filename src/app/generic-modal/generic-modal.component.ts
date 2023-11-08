import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BuildFormService} from "../build-form.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements OnInit{

  @Input() isForm : boolean = false
  ngOnInit() {
  }

  constructor(private formService : BuildFormService) {
  }

  //@ts-ignore
  close(event) {
    let cartModal = document.getElementById("modal_")
    let cart = document.getElementById("modal_Content");
    let cartCloseButton = document.getElementById("modal_Close");

    if(cartModal != null && cart != null && cartCloseButton != null) {
      if(!cart.contains(event.target) || event.target == cartCloseButton) {
        cartModal.style.display = "none";
        if(this.isForm)
          this.formService.doClearForm();
        else
          this.clear()
      }
    }

  }

  private clear() {
    let modalBody = document.getElementById("modalBody");
    if(modalBody != null) {
      if(!this.isForm)
        modalBody.innerHTML = ""
    }
  }
}
