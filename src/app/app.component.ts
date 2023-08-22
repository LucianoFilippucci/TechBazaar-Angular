import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ServerRequestFacadeService} from "./server-request-facade.service";
import {ToastService} from "./toast.service";
import {Subscription} from "rxjs";
import {UpdateCartService} from "./update-cart.service";
import {ShowElementsService} from "./show-elements.service";
import {JwtDecoder} from "./Helpers/jwtDecoder";
import {LoginStateModel} from "./models/login-state.model";
import {CartModalComponent} from "./cart-modal/cart-modal.component";
import {AccountingService} from "./accounting.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit{
  title = 'TechBazaar-Angular';
  cartItemNum: number = 0;
  private toastSubscription: Subscription;
  public isLogged: boolean = false;
  public showNav: boolean = true;
  showNavSubs: Subscription;




  constructor(private showElemServ: ShowElementsService, private toastService: ToastService, private cartUIUpdateService: UpdateCartService, public showElementsService: ShowElementsService, private accountingService: AccountingService) {
    this.toastSubscription = this.toastService.showToast$.subscribe((message) => {
      this.showToast(message);
    });

    this.cartUIUpdateService.updateValue$.subscribe((val: number) => { this.cartItemNum = val; })

    this.isLogged = this.accountingService.isAuthenticated();

    this.showNavSubs = this.showElemServ.getShowNav().subscribe(newVal => {
      this.showNav = newVal;
    });

    if(!this.showNav) {
      this.showElemServ.update(true);
    }

  }

  ngOnInit() {
    this.cartItemNum = this.cartUIUpdateService.getVal();
  }

  openCartModal() {
    let cartModal = document.getElementById("cartModal");

    if(cartModal != null && this.accountingService.isAuthenticated()) {
      cartModal.style.display = "block";
    }
  }

  showToast(message: any) {
    let x = document.getElementById("toast");
    if(x != null) {
      x.innerHTML = message["message"];
      x.className += "show";
      if(message["isError"] == true)
        x.className += " toast-error"
      else
        x.className += " toast-success"
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
    this.accountingService.performLogout();
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
    this.showNavSubs.unsubscribe();
  }

}
