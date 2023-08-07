import {Component, DoCheck, OnInit} from '@angular/core';
import {UpdateCartService} from "../update-cart.service";
import {CartElementModel} from "../models/cart-element.model";
import {ServerRequestFacadeService} from "../server-request-facade.service";
import {LoginStateModel} from "../models/login-state.model";
import {ToastService} from "../toast.service";
import {AccountingService} from "../accounting.service";

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit, DoCheck{

  public cartElements: CartElementModel[] = [];
  public cartTotal: string = "";
  public tax: string = "";

  private user: LoginStateModel | undefined;

  updated: boolean = false;
  constructor(private cartService: UpdateCartService, private serverRequest: ServerRequestFacadeService, private toastService: ToastService, private accountingService: AccountingService) {
    if(this.accountingService.isAuthenticated()) {
      let u = this.accountingService.getUser();
      if(u != false)
        this.user = u;
    }
  }

  ngOnInit() {
    this.triggerUpdate();
  }
  ngDoCheck() {
    let me = document.getElementById("cartModal");
    if(me != null && !this.updated) {
      if(me.style.display == "block") {
        this.triggerUpdate();
        this.updated = true;
      }
    }
  }

  triggerUpdate() {
    if(this.accountingService.isAuthenticated()) {
      // @ts-ignore
      this.serverRequest.getCart(this.user.cartId, this.user.token, (status: boolean, result: any) => {
        this.cartElements = [];
        for(let i = 0; i < result["message"]["products"].length; i++) {
          this.cartElements.push(new CartElementModel(result["message"]["products"][i]["productName"], result["message"]["products"][i]["productPrice"].toString(), result["message"]["products"][i]["productQty"], result["message"]["products"][i]["productId"]))
        }
        this.cartTotal = result["message"]["cartTotal"];
        this.tax = result["message"]["taxTotal"];
      });
    }

  }

  // @ts-ignore
  closeModal(event) {
    let cartModal = document.getElementById("cartModal")
    let cart = document.getElementById("modalContent");
    let cartCloseButton = document.getElementById("modalClose");

    if(cartModal != null && cart != null && cartCloseButton != null) {
      if(!cart.contains(event.target) || event.target == cartCloseButton) {
        cartModal.style.display = "none";
      }
    }

    this.updated = false;
  }

  clearCart() {
    // @ts-ignore
    this.serverRequest.clearCart(this.user.cartId, this.user.token, (status: boolean, result: any) => {
      if(status) {
        this.cartElements = [];
        this.toastService.show({message: "Cart Cleared", isError: false});
      } else {
        this.toastService.show({message: "Error While deleting cart.", isError: true});
      }
    });
  }

  checkOut() {
    // @ts-ignore
    this.serverRequest.checkOut(this.user.cartId, 4, this.user.token, (status: boolean, result: any) => {
      if(status) {
        this.cartElements = [];
        this.toastService.show({
          message: "Order correctly Placed.",
          isError: false
        });
      }
    })
  }

  removeElement(productId: number) {
    // @ts-ignore
    this.serverRequest.removeCartElement(this.user.cartId, productId, this.removeElementCallback.bind(this), this.user.token)
  }

  private removeElementCallback(status: boolean, result: any) {
    if(status) {
      this.cartElements.forEach((elem) => {
        if(elem.productId == result) {
          this.cartElements = this.cartElements.splice(this.cartElements.indexOf(elem), this.cartElements.indexOf(elem));
          this.toastService.show({ message: `${elem.name} removed.`, isError: false});
          this.triggerUpdate();
        }
      });
    } else {
      this.toastService.show({ message: `Error while removing element`, isError: true})
    }
  }
}
