export class ProductModel {
  constructor(
    public name: string,
    public description: string,
    public category: string,
    public price: number,
    public qty: number,
    public store: any,
    public totalSelt: number,
    public id: number
  ) {}

}
