import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  dataSource: User[];

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.dataSource = data;
      }
    );
  }
}

