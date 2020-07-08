import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../core/auth.service";
import {NgForm} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-user-edit-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})

export class UserEditModalComponent implements OnInit {

  closeResult = '';
  @Input() public user = new User();
  successMessage = '';
  isEdited = false;
  isValidFormSubmitted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";


  constructor(private userService: UserService, private authService: AuthService, public modalService: NgbModal) {
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
    this.editUser();
    //this.modalService.dismissAll();
  }

  editUser(): void {
    this.userService.update(this.user).subscribe(
      response => {
        if (response.status == 200) {
          this.successMessage = "User data updated!";
          this.isEdited = true;
        } else this.successMessage = "An error Occured!";
      }
    )
  }

  ngOnInit() {
  }

}
