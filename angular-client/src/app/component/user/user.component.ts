import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user.model";
import {TableService} from "../../service/table.service";
import {UserEditModalComponent} from "../user-edit-modal/user-edit-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

declare var $;

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user.component.html',
  styleUrls: [
    './user.component.css'
  ]
})
export class UserComponent implements OnInit {

  dataSource: User[];

  constructor(private router: Router, private userService: UserService, private modalService: NgbModal, public userEditModal: UserEditModalComponent, public tableService: TableService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.dataSource = data;
        this.userEditModal.successMessage = 'test';
      }
    );
  }

  openModal(user) {
    const modalRef = this.modalService.open(UserEditModalComponent);
    modalRef.componentInstance.user = user;
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(
      response => {
        if (response.status == 200)
          this.ngOnInit();
      }
    )
  }
}
