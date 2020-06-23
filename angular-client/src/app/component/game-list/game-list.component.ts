import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Game} from "../../model/game.model";
import {GameService} from "../../service/game.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../core/auth.service";
import {log} from "util";

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-game-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  dataSource: Game[] = [];
  gameInput: Game = new Game();
  name: string;
  successMessage: string;
  isGameAdded = false;
  image;

  constructor(public router: Router, public authService: AuthService, private gameService: GameService) {
  }

  ngOnInit() {
    this.displayList();
    console.log(this.router.url);
  }

  displayList() {
    if (this.router.url == "/my-games") {
      this.gameService.getMyGames().subscribe(
        data => {
          this.dataSource = data;
        }
      );
    } else {
      this.gameService.getGames().subscribe(
        data => {
          this.dataSource = data;
        }
      );
    }
  }

  onFormSubmit(form: NgForm) {
    this.isGameAdded = false;
    if (form.invalid) {
      return;
    }
    this.addGame();
    form.resetForm();
    this.image = null;
    this.gameInput.thumbnail = null;
  }

  addGame() {
    console.log(this.gameInput);
    this.gameService.save(this.gameInput).subscribe(
      response => {
        if (response.status == 200) {
          this.successMessage = "Game added successfully";
          this.isGameAdded = true;
          this.ngOnInit();
        } else this.successMessage = "An erorr occured!";
      }
    )
  }

  //TODO redirect to exact game page
  gameRedirect(id: number) {
    console.log(id);
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {


    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;

      return new Promise((res, rej) => {
        const img = new Image();
        img.src = myReader.result.toString();
        img.onload = () => {
          const elem = document.createElement('canvas');

          const ctx = elem.getContext('2d');

          ctx.drawImage(img, 0, 0, elem.width, elem.height);
          this.gameInput.thumbnail = ctx.canvas.toDataURL(); //base64
        };
        img.onerror = error => rej(error);
      });

    };
    myReader.readAsDataURL(file);
  }

}
