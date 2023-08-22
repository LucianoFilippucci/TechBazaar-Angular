import {Component, Input, OnInit} from '@angular/core';
import {Helpers} from "../Helpers/helpers";
import {ServerRequestFacadeService} from "../server-request-facade.service";
import {AccountingService} from "../accounting.service";
import {ToastService} from "../toast.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  @Input() review: any;

  helpers : Helpers = new Helpers();

  constructor(private serverRequest: ServerRequestFacadeService, private accountingService: AccountingService, private toastService: ToastService) {
  }

  ngOnInit() {
    let productStars = document.getElementById("reviewRatings");
    if(productStars != null) {
      let stars = productStars.querySelectorAll("i");
      for(let i = 0; i < this.review["starCount"]; i++) {
        stars[i].classList.replace("fa-regular", "fa-solid");
      }
    }
  }

  likeReview(reviewId: number) {
    if(this.accountingService.isAuthenticated()) {
      const user = this.accountingService.getUser();
      this.serverRequest.likeReview(reviewId, user.id, () => {
        this.toastService.show({ message: "Review Liked!", isError: false })
      }, user.token)
    } else {
      this.toastService.show({ message: "Log-In First!", isError: true })
    }
  }
}
