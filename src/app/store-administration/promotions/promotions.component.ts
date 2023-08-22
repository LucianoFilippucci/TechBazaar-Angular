import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProductModel} from "../../models/product.model";
import {AccountingService} from "../../accounting.service";
import {ServerRequestFacadeService} from "../../server-request-facade.service";
import {ToastService} from "../../toast.service";
import {CouponModel} from "../../models/coupon-model";

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {

  promotionList: CouponModel[] = [];
  user;
  newPromoMaxUses: number = 0;

  constructor(private accountingService: AccountingService, private serverRequest: ServerRequestFacadeService, private toastService: ToastService) {
    if(this.accountingService.isAuthenticated()) {
      this.user = this.accountingService.getUser();
      if( this.user != undefined) {

        this.serverRequest.getStorePromotions(this.user.id, this.user.token, (status: boolean, response: any) => {
          if (status) {
            console.log(response)
            for(let i = 0; i < response.length; i++) {
              let elem = response[i];
              this.promotionList.push(new CouponModel(elem["code"], elem["discount"], elem["category"], 5, elem["timesUsed"], elem["expirationDate"], elem["maxUses"]));
            }
          } else {
            this.toastService.show({ message: "Error Fetching Coupons.", isError: true })
          }
        })
      }
    }
  }

  submitForm(form: NgForm) {
    if(this.accountingService.isAuthenticated()) {
      if(this.user != undefined) {
        let cartModal = document.getElementById("modal_");
        if(cartModal != null) {
          cartModal.style.display = "none";
        }

        this.serverRequest.newPromotion(form.value["promotionName"], form.value["promoDiscount"], this.user.id, form.value["promotionCategory"], this.newPromoMaxUses, (status: boolean, response: any) => {
          if(status) {
            // update this.promotionList
            this.toastService.show({ message: "Promotion Created.", isError: false });
          } else {
            this.toastService.show({ message: "Error saving new promo.", isError: true });
          }
        }, this.user.token, form.value["promoExpiration"]);
      }
    }
  }

  disablePromotion(couponCode: string) {

  }

  editPromotion(couponCode: string) {

  }

  // @ts-ignore
  close(event) {
    let cartModal = document.getElementById("modal_")
    let cart = document.getElementById("modal_Content");
    let cartCloseButton = document.getElementById("modal_Close");

    if(cartModal != null && cart != null && cartCloseButton != null) {
      if(!cart.contains(event.target) || event.target == cartCloseButton) {
        cartModal.style.display = "none";
      }
    }

  }

  newPromotion() {
    if(this.accountingService.isAuthenticated()) {
      let modal = document.getElementById("modal_");
      if (modal != null)
        modal.style.display = "block";
      let modalTitle = document.getElementById("modalTitle");
      if(modalTitle != null) {
        modalTitle.innerText = "New Product";
      }
    }
  }

  changeQty(qty: number) {
    if(this.accountingService.isAuthenticated() && this.user != null) {
      this.newPromoMaxUses += qty;
    }
  }
}
