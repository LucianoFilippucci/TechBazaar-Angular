import { Component } from '@angular/core';
import {StoreOrderModel} from "../../models/store-order-model";
import {CartElementModel} from "../../models/cart-element.model";
import {AccountingService} from "../../accounting.service";
import {ServerRequestFacadeService} from "../../server-request-facade.service";
import {ToastService} from "../../toast.service";

@Component({
  selector: 'app-store-orders',
  templateUrl: './store-orders.component.html',
  styleUrls: ['./store-orders.component.css']
})
export class StoreOrdersComponent {

  storeOrders: StoreOrderModel[] = [];
  user;
  myDataArray : any

  constructor(private accountingService: AccountingService, private serverRequest: ServerRequestFacadeService, private toastService: ToastService) {
    this.user = this.accountingService.isAuthenticated() ? this.accountingService.getUser() : null;
    if(this.user != null) {
      this.serverRequest.getStoreOrders(this.user.id, this.user.token, (status: boolean, response: any) => {
        if(status) {
          for(let i = 0; i < response.length; i++) {
            let pp: CartElementModel[] = [];
            for(let j = 0; j < response[i]["productInPurchases"].length; j++) {
              let element = response[i]["productInPurchases"][j];
              pp.push(new CartElementModel(element["productName"], element["unitaryPrice"], element["productQuantity"], element["productId"]));
            }
            let element = response[i];
            this.storeOrders.push(new StoreOrderModel(element["orderId"], element["userOrderId"], pp, element["orderDate"], element["total"], element["userAddress"], true));
          }
        } else {
          this.toastService.show({ message: "Error Fetching Store Orders.", isError: true });
        }
      })
    }
  }

  protected readonly Number = Number;
}
