import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerRequestFacadeService} from "./server-request-facade.service";
import {ToastService} from "./toast.service";
import {Subscription} from "rxjs";
import {UpdateCartService} from "./update-cart.service";
import {ShowElementsService} from "./show-elements.service";
import {JwtDecoder} from "./Helpers/jwtDecoder";
import {LoginStateModel} from "./models/login-state.model";
import {CartModalComponent} from "./cart-modal/cart-modal.component";
import {LogoutService} from "./logout.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'TechBazaar-Angular';
  userId = "1"
  cartItemNum: number = 0;
  serverRequestFacade: ServerRequestFacadeService;
  private toastSubscription: Subscription;
  private cartUpdateUI: Subscription;

  public jwtParser: JwtDecoder = new JwtDecoder();
  public user?: LoginStateModel;
  public isLogged: boolean = false;



  constructor(serverRequestFacade: ServerRequestFacadeService, private toastService: ToastService, private cartUIUpdateService: UpdateCartService, public showElementsService: ShowElementsService, private logoutService: LogoutService) {
    this.serverRequestFacade = serverRequestFacade;
    this.toastSubscription = this.toastService.showToast$.subscribe((message) => {
      this.showToast(message);
    });

    this.cartUpdateUI = this.cartUIUpdateService.cartUIUpdate$.subscribe(() => {
      // @ts-ignore
      this.cartItemNum = parseInt(localStorage.getItem("cartItemNum"));
    });

    const userJson = localStorage.getItem("user");
    if(userJson){
      this.user = JSON.parse(userJson);
      this.isLogged = true;
    }

    if(localStorage.getItem("isLogged") == "true") {
      console.log("CIAOOO")
      // @ts-ignore
      let {header, payload, signature} = this.jwtParser.decodeJwt(this.user.token);
      // TODO: Check token expiration date and refresh it
    }
  }

  openCartModal() {
    let cartModal = document.getElementById("cartModal");

    if(cartModal != null) {
      cartModal.style.display = "block";

    }
  }

  showToast(message: any) {
    let x = document.getElementById("toast");
    if(x != null) {
      console.log(message);

      x.innerHTML = message["message"];
      x.className += "show";
      if(message["isError"])
        x.className += "toast-error"
      setTimeout(function() { // @ts-ignore
        x.className = x.className.replace("show", "");
        if(message["isError"]) {
          // @ts-ignore
          x.className = x.className.replace("toast-error", "");
        }
        }, 3000);
    }
  }

  logout() {
    this.logoutService.performLogout();
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
  }

}
