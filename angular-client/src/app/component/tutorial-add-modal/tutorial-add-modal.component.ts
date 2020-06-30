import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {Tutorial} from "../../model/tutorial.model";
import {AuthService} from "../../core/auth.service";
import {TutorialService} from "../../service/tutorial.service";

@Component({
  selector: 'app-tutorial-add-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tutorial-add-modal.component.html',
  styleUrls: ['./tutorial-add-modal.component.css']
})
export class TutorialAddModalComponent implements OnInit {

  @Input() gameId: number;
  closeResult = '';
  tutorial = new Tutorial();
  successMessage = '';
  isAdded = false;
  isValidFormSubmitted = false;
  pdfFile;

  constructor(private tutorialService: TutorialService, public authService: AuthService, public modalService: NgbModal) {
  }

  ngOnInit() {
  }

  open(content) {
    this.successMessage = '';
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
    this.addTutorial();
    form.resetForm();
  }

  addTutorial(): void {
    this.tutorialService.save(this.tutorial, this.gameId).subscribe(
      response => {
        if (response.status == 200) {
          this.successMessage = "Tutorial successfully added!";
          this.isAdded = true;
        } else this.successMessage = "An error Occured!";
      }
    )
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {

    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.pdfFile = myReader.result;

      return new Promise((res, rej) => {
        this.tutorial.pdfFile = this.pdfFile;
        console.log(this.pdfFile);
      });
    };
    myReader.readAsDataURL(file);
  }

}
