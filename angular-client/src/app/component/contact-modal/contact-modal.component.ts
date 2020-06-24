import {Component, ViewEncapsulation} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../core/auth.service";
import {Message} from "../../model/message.model";
import {MessageService} from "../../service/message.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'contact-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent {
  closeResult = '';
  message = new Message();
  successMessage = '';
  isMailSent = false;
  isValidFormSubmitted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";


  constructor(private messageService: MessageService, private authService: AuthService, private modalService: NgbModal) {
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
    this.sendMessage();
    form.resetForm();
  }

  sendMessage(): void {
    this.messageService.send(this.message).subscribe(
      response => {
        if (response.status == 200) {
          this.successMessage = "Message successfully sent!";
          this.isMailSent = true;
        } else this.successMessage = "An error Occured!";
      }
    )
  }

}
