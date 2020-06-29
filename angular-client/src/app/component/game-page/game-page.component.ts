import {Component, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Game} from "../../model/game.model";
import {GameService} from "../../service/game.service";
import {ActivatedRoute} from "@angular/router";
import {FavoriteService} from "../../service/favorite.service";
import {AuthService} from "../../core/auth.service";
import {RateService} from "../../service/rate.service";
import {ReviewService} from "../../service/review.service";
import {Review} from "../../model/review.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-game-page',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})

export class GamePageComponent implements OnInit {

  @Input() game: Game = new Game();
  @Input() isFavorite: boolean;
  @Input() gameRate: number;
  @Input() currentUserRate: number;
  reviewList: Review[] = [];
  commentText;
  successMessage;

  constructor(private route: ActivatedRoute, private reviewService: ReviewService, private rateService: RateService, public authService: AuthService, private favoriteService: FavoriteService, private gameService: GameService) {
  }

  ngOnInit() {
    this.getRates();
    this.getGame();
    this.getReviews();
    if (this.authService.userLoggedIn()) {
      this.getResult();
    }
  }

  getGame(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.gameService.getGame(id).subscribe(
      game => {
        this.game = game;
      }
    );
  }

  getResult(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.favoriteService.check(id).subscribe(
      result => {
        this.isFavorite = result.success;
      }
    );
  }

  getRates(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.rateService.getGameRate(id).subscribe(
      result => {
        this.gameRate = result.sum;
      }
    );
    this.rateService.getUserRateForGame(id).subscribe(
      result => {
        this.currentUserRate = result.sum;
      }
    );
  }

  getReviews(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.reviewService.getGameReviews(id).subscribe(
      result => {
        this.reviewList = result;
      }
    );
  }

  onFormSubmit(form: NgForm) {
    this.addComment(this.commentText)
    form.resetForm()
  }

  addComment(text: string): void {
    let review = {username: sessionStorage.getItem('userName'), text: text};
    this.reviewService.save(review, this.game.id).subscribe(
      response => {
        if (response.status == 200) {
          this.reviewList.push(review);
        } else this.successMessage = "An error Occured!";
      }
    )
  }
}
