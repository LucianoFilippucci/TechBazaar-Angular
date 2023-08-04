export class LoginStateModel {
  constructor(
    public token: string,
    public id: number,
    public username: string,
    public email: string,
    public roles: string[],
    public cartId: string
  ) {
  }
}
