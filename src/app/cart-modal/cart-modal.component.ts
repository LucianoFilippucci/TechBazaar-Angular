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
  public couponsList: string[] = [];
  public cartTotal: string = "";
  public tax: string = "";
  public cartTotalAfterCoupon = "0";
  private user: LoginStateModel | undefined;

  updated: boolean = false;
  constructor(private cartService: UpdateCartService, private serverRequest: ServerRequestFacadeService, private toastService: ToastService, private accountingService: AccountingService) {
    if(this.accountingService.isAuthenticated()) {
      this.user = this.accountingService.getUser();
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
        this.cartTotalAfterCoupon = result["message"]["cartTotalAfterCoupon"];
        localStorage.setItem("cartElems", result["message"]["cartElements"])
      });

      // @ts-ignore
      this.serverRequest.getCartCoupons(this.user.cartId, this.user.token, (status: boolean, response: any) => {
        if(status) {
          this.couponsList = response as [];
        } else {
          this.toastService.show({ message: "Error fetching Coupons List.", isError: true });
        }
      })
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
        this.cartService.update("CLEAR")
      } else {
        this.toastService.show({message: "Error While deleting cart.", isError: true});
      }
    });
  }

  checkOut() {
    // @ts-ignore
    this.serverRequest.checkOut(this.user.cartId, 1, this.user.token, (status: boolean, result: any) => {
      if(status) {
        this.cartElements = [];
        this.couponsList = [];
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
          this.cartService.update(-1)
          this.triggerUpdate();
        }
      });
    } else {
      this.toastService.show({ message: `Error while removing element`, isError: true})
    }
  }

  changeQty(index: number, qty: number) {
    if(this.accountingService.isAuthenticated() && this.user != null) {
      this.serverRequest.editCartElement(this.cartElements[index].productId, qty, this.user.cartId, (status: boolean, response: any) => {
        if(status) {
          this.triggerUpdate();
          this.toastService.show({ message: "Element updated.", isError: false });
        } else {
          this.toastService.show({ message: "Element not updated.", isError: true });
        }
      }, this.user.token)
    }
  }

  applyCoupon() {
    let couponText = document.getElementById("coupon") as HTMLInputElement;
    if(couponText != null){
      let couponCode = couponText.value;
      if(this.accountingService.isAuthenticated() && this.user != null) {
        this.serverRequest.applyPromotion(couponCode, this.user.cartId, this.user.token, (status: boolean, response: any) => {

          if(status) {
            this.toastService.show({ message: "Coupon Applied.", isError: false });
            this.triggerUpdate();
          } else {
            console.log(response.error.message)
            this.toastService.show({ message: response.error.message, isError: true });
          }
        });
      }
    }
  }
}
