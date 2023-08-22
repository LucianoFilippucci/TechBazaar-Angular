import {CartElementModel} from "./cart-element.model";

export class StoreOrderModel {
  constructor(
    public orderId: string,
    public userId: string,
    public productsInList: CartElementModel[],
    public date: string,
    public orderTotal: number,
    public orderAddress: string,
    public canBeReturned: boolean
  ) {
  }
}
