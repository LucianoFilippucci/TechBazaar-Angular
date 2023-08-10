export class ProductReviewModel {
  constructor(
    public reviewId: number,
    public user: any,
    public starCount: number,
    public title: string,
    public body: string,
    public likes: number
  ) {
  }
}
