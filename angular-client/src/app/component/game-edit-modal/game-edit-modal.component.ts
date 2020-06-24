import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../core/auth.service";
import {NgForm} from "@angular/forms";
import {Game} from "../../model/game.model";
import {GameService} from "../../service/game.service";

@Component({
  selector: 'app-game-edit-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './game-edit-modal.component.html',
  styleUrls: ['./game-edit-modal.component.css']
})
export class GameEditModalComponent implements OnInit {

  closeResult = '';
  @Input() public game = new Game();
  successMessage = '';
  isEdited = false;
  isValidFormSubmitted = false;

  constructor(private gameService: GameService, private authService: AuthService, public modalService: NgbModal) {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.editGame();
  }

  editGame(): void {
    this.gameService.update(this.game).subscribe(
      response => {
        if (response.status == 200) {
          this.successMessage = "Game data edited!";
          this.isEdited = true;
        } else this.successMessage = "An error Occured!";
      }
    )
  }

  ngOnInit() {
  }

}
