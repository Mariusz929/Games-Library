import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FavoriteService} from "../../service/favorite.service";

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {

  @Input() selected: boolean;
  @Input() gameId: number;
  @Output() selectedChange = new EventEmitter<boolean>();
  successMessage = '';

  constructor(private favoriteService: FavoriteService) {
  }

  ngOnInit() {
  }

  public toggleSelected() {
    if (!this.selected) {
      this.favoriteService.add(this.gameId).subscribe(
        response => {
          if (response.status == 200) {
            this.selected = true;
          } else this.successMessage = "An erorr occured!";
        }
      )
    } else this.favoriteService.delete(this.gameId).subscribe(
      response => {
        if (response.status == 200) {
          this.selected = false;
        } else this.successMessage = "An erorr occured!";
      }
    )
    this.selectedChange.emit(this.selected);
  }
}

