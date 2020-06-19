import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenStorage} from "./token.storage";

const DECODED_ROLES = 'userRole';

@Injectable()
export class AuthService {

  redirectURL: string;

  constructor(private http: HttpClient, private token: TokenStorage) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {login: username, password: password};
    console.log('attempAuth');
    return this.http.post<any>('http://localhost:8080/token/generate-token', credentials);
  }

  findRoles() {
      let decodedJwtData = JSON.parse(atob(this.token.getToken().split('.')[1]));
      let userRoles: string = ''
      for (let role of decodedJwtData.scopes) {
        role = role.authority;
        userRoles += role;
      }
      sessionStorage.setItem(DECODED_ROLES, userRoles);
  }

  public userLoggedIn(): boolean {
    return sessionStorage.getItem('AuthToken') != null;
  }

  public currentUserRoles() {
    if (!this.userLoggedIn()) return;
    return sessionStorage.getItem('userRole');
  }

  public isAdmin() {
    return this.currentUserRoles().includes("ROLE_ADMIN");
  }

  public isRegularUser() {
    return this.currentUserRoles().includes("ROLE_REGULAR_USER");
  }

  userCanAccessPageWithRole(role: string) {
    const userRole: string = sessionStorage.getItem('userRole');
    return role != null && userRole.includes((role));
  }
}
