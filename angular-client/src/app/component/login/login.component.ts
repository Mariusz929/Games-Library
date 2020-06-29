import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth.service';
import {TokenStorage} from "../../core/token.storage";
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isFormSubmitted = false;

  username: string;
  password: string;
  errorMessage: string;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private token: TokenStorage, private toastr: ToastrService) {
  }

  login(): void {
    this.isFormSubmitted = true;
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        if (data != null) {
          this.token.saveToken(data.token);
          this.authService.findRoles();
          this.authService.findUsername();
          this.router.navigate(['/games']);
        } else this.errorMessage = "Nieprawidłowy login lub hasło";
      }
    );
  }
}
