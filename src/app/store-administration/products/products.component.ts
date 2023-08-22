import { Component } from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {AccountingService} from "../../accounting.service";
import {ServerRequestFacadeService} from "../../server-request-facade.service";
import {ToastService} from "../../toast.service";
import {LoginStateModel} from "../../models/login-state.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  storeProducts: ProductModel[] = [];

  store: LoginStateModel | undefined;

  constructor(private accountingService: AccountingService, private serverRequest: ServerRequestFacadeService, private toastService: ToastService) {
    if(this.accountingService.isAuthenticated()) {

      this.store = this.accountingService.getUser();
      if(this.store != undefined) {
        this.serverRequest.getStoreProducts(this.store.id, (status: boolean, response: any) => {
          if (status) {
            for(let i = 0; i < response.length; i++) {
              this.storeProducts.push(new ProductModel(response[i]["productName"], response[i]["productDescription"], response[i]["productCategory"], response[i]["productPrice"], response[i]["productQuantity"], this.store, response[i]["productTotalSelt"], response[i]["productId"]));
            }
          }
          console.log(response)
        });
      }
    }
  }

  newProduct() {
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

  submitForm(form: NgForm) {
    if(this.accountingService.isAuthenticated()) {
      let cartModal = document.getElementById("modal_");
      if(cartModal != null)
        cartModal.style.display = "none";
      // @ts-ignore
      let id = this.store.id;
      // @ts-ignore
      let token = this.store.token;

      this.serverRequest.newProduct(
        form.value["productName"],
        form.value["productDescription"],
        form.value["productCategory"],
        form.value["productPrice"],
        form.value["productQuantity"],
        id,
        token,
        (status: boolean, response:any) => {

          if(status) {
            // @ts-ignore
            let id = this.store.id;
            this.storeProducts.push(new ProductModel(
              response["productName"],
              response["productDescription"],
              response["productCategory"],
              response["productPrice"],
              response["productQuantity"],
              id,
              response["productTotalSelt"],
              response["id"]
            ))



            this.toastService.show({ message: "Product Inserted.", isError: false });
          } else {
            this.toastService.show({ message: "Error Occurred.", isError: true });
          }


        });
    }
  }

  deleteProduct(productId: number) {
    let cartModal = document.getElementById("modal_");
    if(cartModal != null)
      cartModal.style.display = "none";
    //TODO: modal to confirm.
    if(confirm("Ya Sure?")) {

      // @ts-ignore
      let id = this.store.id;
      // @ts-ignore
      let token = this.store.token;
      this.serverRequest.deleteProduct(productId, id, token, (status: boolean, response: any) => {
        if(status) {
          for(let i = 0; i < this.storeProducts.length; i++){
            if(this.storeProducts[i].id == productId) {
              this.storeProducts.splice(i, 1);
              this.toastService.show({ message: "Product Deleted.", isError: false });
            }
          }
        } else {
          this.toastService.show({ message: "Error Occurred.", isError: true });
        }
      });
    }
  }

  editProduct(productId: number) {

  }


}
