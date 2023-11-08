import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductModel} from "../models/product.model";
import {ActivatedRoute} from "@angular/router";
import {ServerRequestFacadeService} from "../server-request-facade.service";
import {ToastService} from "../toast.service";
import {UpdateCartService} from "../update-cart.service";
import {LoginStateModel} from "../models/login-state.model";
import {LOGIN} from "../Helpers/variables";
import {AccountingService} from "../accounting.service";
import {ProductReviewModel} from "../models/product-review.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId: number;
  product: ProductModel | undefined;
  productReviews: ProductReviewModel[] | undefined;
  userHasReview: boolean = false;
  // @ts-ignore
  user: LoginStateModel;
  userReview: number = -1;
  starCount: number = 0;
  inUserWishlist: boolean = false
  constructor(
    private activatedRouter: ActivatedRoute,
    private serverRequestFacade: ServerRequestFacadeService,
    private toastService: ToastService,
    private cartUiUpdate: UpdateCartService,
    private accountingService: AccountingService) {
    this.productId = activatedRouter.snapshot.params["id"];
    this.serverRequestFacade.getProduct(this.productId, this.showProduct.bind(this));
    if(this.accountingService.isAuthenticated()){
      this.user = this.accountingService.getUser();
      this.serverRequestFacade.checkProductWishlist(this.user.id, this.productId, (status: boolean, response: any) => {
        console.log(response)
        if(status)
          this.inUserWishlist = response
        else
          this.toastService.show({message: "Error.", isError: true});
      });
    }
  }

  ngOnInit() {
    this.serverRequestFacade.getReviews(this.productId, 0, 10, "", (status: boolean, response: any) => {
      if(status) {
        this.productReviews = response as ProductReviewModel[];
        if(this.accountingService.isAuthenticated()) {
          for (let i = 0; i < this.productReviews.length; i++) {
            let rev = this.productReviews[i];
            if (rev.user["userId"] == this.user.id) {
              this.userHasReview = true;
              this.userReview = this.productReviews[i].reviewId;
            }
          }
        }
      } else {
        this.toastService.show({message: "Error fetching Product Reviews", isError: true});
      }
    });

  }


  toWishlist(){
    if(this.accountingService.isAuthenticated()) {
      if(this.inUserWishlist){
        this.serverRequestFacade.removeFromWishlist(this.user.id, this.productId, this.user.token, (status: boolean, response: any) => {
          if(status)
            this.inUserWishlist = response;
          else this.toastService.show({message: "Error fetching Product Reviews", isError: true});
        });
      } else {
        this.serverRequestFacade.addToWishlist(this.user.id, this.productId, this.user.token, (status: boolean, response: any) => {
          if(status)
            this.inUserWishlist = response;
          else
            this.toastService.show({message: "Error.", isError: true});
        });
      }
    }
  }

  newReview() {
    if(this.accountingService.isAuthenticated()) {
      let modal = document.getElementById("modal_");
      if(modal != null)
        modal.style.display = "block";
      let modalTitle = document.getElementById("modalTitle");
      let modalBody = document.getElementById("modalBody");
      if(modalTitle != null && modalBody != null) {
        modalTitle.innerText = "Edit Review";
        if(this.userHasReview) {
          this.serverRequestFacade.fetchUserReview(this.userReview, (status: boolean, result: any) => {
            if(status) {
              let bodyInput = document.getElementById("bodyInput") as HTMLTextAreaElement;
              let titleInput = document.getElementById("titleInput") as HTMLInputElement;
              if (bodyInput != null && titleInput != null) {
                bodyInput.value = result["body"];
                titleInput.value = result["title"];
              }
            } else {
              this.toastService.show({ message: "Error fetching review data.", isError: true});
            }
          }, this.user.token);
        }
      }
    }
  }

  submitForm(form:NgForm) {
    console.log(form)
    if(this.accountingService.isAuthenticated()) {
      this.serverRequestFacade.submitReview(this.user.id, form.value["title"], form.value["body"], (status: boolean, result: any) => {
        if (status) {
          this.toastService.show({message: this.userHasReview ? "Review Updated!" : "Review Done!", isError: false});
          //this.location.reload();
        } else {
          this.toastService.show({message: "Error.", isError: true});
          //this.location.reload();
        }
      }, this.user.token, this.userReview, this.productId, this.starCount);

    }
  }



  public showProduct(status: boolean, result: any) {
    this.product = result["message"] as ProductModel;
  }

  addToCart() {
    if(this.accountingService.isAuthenticated()) {
      // @ts-ignore
      this.serverRequestFacade.addElementToCart(this.productId, 1, this.user.cartId, this.showToast.bind(this), this.user.token);
    } else {
      this.toastService.show({message: "User Not Logged.", isError: true});
    }
  }

  showToast(status: boolean, result: any) {
    if(status){
      this.toastService.show({message: "Element Added to Cart.", isError: false});
      this.cartUiUpdate.update(1);
    }
  else
    this.toastService.show({message: "Error. Element not Added.", isError: true});
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

  setStarCount(value: number) {
    this.starCount = value;
    let starCountDiv = document.getElementById("starCount");
    if(starCountDiv != null) {
      let stars = starCountDiv.querySelectorAll("i");
      for(let i = 0; i < this.starCount; i++) {
        stars[i].classList.replace("fa-regular", "fa-solid");
      }
    }
  }

  protected readonly NgForm = NgForm;
}
