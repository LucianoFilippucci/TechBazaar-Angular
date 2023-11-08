import {Component, Input} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProductModel} from "../../models/product.model";
import {AccountingService} from "../../accounting.service";
import {ServerRequestFacadeService} from "../../server-request-facade.service";
import {ToastService} from "../../toast.service";
import {CouponModel} from "../../models/coupon-model";
import {BuildFormService} from "../../build-form.service";

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {

  promotionList: CouponModel[] = [];
  user;
  newPromoMaxUses: number = 0;

  //modalElements : any []

  constructor(private accountingService: AccountingService, private serverRequest: ServerRequestFacadeService, private toastService: ToastService, private buildFormService : BuildFormService) {

    // this.modalElements = []
    // this.modalElements.push("New Promotion")
    // this.modalElements.push(this.submitForm.bind(this))
    // this.modalElements.push("<div class='input-group'><input type='text' class='form-control-text' id='promotionName' placeholder='Promotion Code' ngModel name='promotionName' style='width: 100%;'></div>" )
    // this.modalElements.push("<div class='input-group'><input type='text' class='form-control-text' id='promotionCategory' placeholder='Category' ngModel name='promotionCategory'></div>")
    // this.modalElements.push("<div class='input-group'> <span class='cart-product-qty'> <span class='down' (click)='changeQty(-1)'><</span> <input type='text' value='{{newPromoMaxUses}}' id='qty'> <span class='up' (click)='changeQty(1)'>></span> </span> </div>\n")
    // this.modalElements.push("<div class='input-group'><input type='number' class='form-control-text' id='promoDiscount' placeholder='0' ngModel name='promoDiscount'></div>\n")
    // this.modalElements.push("<div class='input-group'><input type='date' id='promoExpiration' ngModel name='promoExpiration'></div>\n")





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
    console.log(form)
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

  submit(result : any) {
    if(this.accountingService.isAuthenticated()) {
      if(this.user != undefined) {
        this.serverRequest.newPromotion(
          result["promotionName"],
          result["promotionDiscount"],
          this.user.id,
          result["promotionCategory"],
          result["promotionMaxUses"],
          (status: boolean, response: any) => {
            if(status){
              console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
              console.log(response)
              console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
              //this.promotionList.push(new CouponModel())
              this.toastService.show({ message: "Promotion Created", isError : false});
            } else
              this.toastService.show({ message: "Error saving new promo.", isError: true});
          },
          this.user.token,
          result["promotionExpiration"]
        )
      }
    }
  }
  disablePromotion(couponCode: string) {

  }

  editPromotion(couponCode: string) {

  }

  newPromotion() {
    if(this.accountingService.isAuthenticated()) {
      let modal = document.getElementById("modal_");
      if (modal != null)
        modal.style.display = "block";


      this.buildFormService.newInputControl("promotionName", "text", "Promotion Code");
      this.buildFormService.newInputControl("promotionCategory", "text", "Promotion Category");
      this.buildFormService.newInputControl("promotionMaxUses", "number", "Promotion Max Uses (-1 => unlimited)");
      this.buildFormService.newInputControl("promotionDiscount", "number", "Promotion Discount (%)");
      this.buildFormService.newInputControl("promotionExpiration", "date", "Expiration Date");
      this.buildFormService.setCallbackFunction(this.submit.bind(this))
    }
  }

  changeQty(qty: number) {
    if(this.accountingService.isAuthenticated() && this.user != null) {
      this.newPromoMaxUses += qty;
    }
  }
}
