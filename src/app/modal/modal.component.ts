import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() data: any;

  // @ts-ignore
  close(event) {
    let cartModal = document.getElementById("modal")
    let cart = document.getElementById("modalContent");
    let cartCloseButton = document.getElementById("modalClose");

    if(cartModal != null && cart != null && cartCloseButton != null) {
      if(!cart.contains(event.target) || event.target == cartCloseButton) {
        cartModal.style.display = "none";
      }
    }

  }

}
