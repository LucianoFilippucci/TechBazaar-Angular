export class Order {
  constructor(
    public orderId: string,
    public date: string,
    public shippingAddr: string,
    public orderTotal: number,
    public orderStatus: string,
    public products: any[],
    public canBeReturned: boolean
  ) {}
}
