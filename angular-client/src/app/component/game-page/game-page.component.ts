import {Component, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Game} from "../../model/game.model";
import {GameService} from "../../service/game.service";
import {ActivatedRoute} from "@angular/router";
import {FavoriteService} from "../../service/favorite.service";
import {AuthService} from "../../core/auth.service";
import {RateService} from "../../service/rate.service";

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

  constructor(private route: ActivatedRoute, private rateService: RateService, public authService: AuthService, private favoriteService: FavoriteService, private gameService: GameService) {
  }

  ngOnInit() {
    this.getRates();
    this.getGame();
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
}
