import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {TokenStorage} from "../core/token.storage";
import {ToastrService} from "ngx-toastr";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isValidFormSubmitted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  successMessage: string;

  email: string;
  username: string;
  password: string;

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private token: TokenStorage, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  register(): void {
    let user = {id: null, email: this.email, login: this.username, password: this.password, test: 'heh'};
    this.userService.save(user).subscribe(
      response => {
        if (response.status == 200) {
          this.successMessage = "Pomyślnie zarejestrowano konto: " + user.login;
        } else this.successMessage = "Użytkownik o podanym adresie lub loginie już istnieje";
      }
    )
  }

  onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.register();
    form.resetForm();
  }
}
