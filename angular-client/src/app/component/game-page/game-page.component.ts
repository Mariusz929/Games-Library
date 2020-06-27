import {Component, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Game} from "../../model/game.model";
import {UserEditModalComponent} from "../user-edit-modal/user-edit-modal.component";
import {GameService} from "../../service/game.service";
import {ActivatedRoute} from "@angular/router";
import {FavoriteService} from "../../service/favorite.service";

@Component({
  selector: 'app-game-page',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})

export class GamePageComponent implements OnInit {

  @Input() game: Game = new Game();
  @Input() isFavorite: boolean;

  constructor(private route: ActivatedRoute, private favoriteService: FavoriteService, private gameService: GameService) {
  }

  ngOnInit() {
    this.getGame();
    this.getResult();
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
}
