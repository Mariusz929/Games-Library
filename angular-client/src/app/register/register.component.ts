import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {TokenStorage} from "../core/token.storage";
import {ToastrService} from "ngx-toastr";
import {User} from "../user/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
  // styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string;
  username: string;
  password: string;

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private token: TokenStorage, private toastr: ToastrService) {
  }

  register(): void {
    let user = {id: null, email: this.email, login: this.username, password: this.password, test: 'heh'};
    this.userService.save(user).subscribe(
      response => {
        if (response.status == 200) {
          this.toastr.success("pomyślnie zarejestrowano konto: " + this.username);
        } else this.toastr.error("niepowodzenie");
          }
    )


  }
}
