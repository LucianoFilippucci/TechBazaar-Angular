export class CouponModel {
  constructor(
    public couponCode: string,
    public discount: number,
    public category: string,
    public emitter: number,
    public usedTimes: number,
    public expiration: Date,
    public maxUses: number
  ) {
  }
}
