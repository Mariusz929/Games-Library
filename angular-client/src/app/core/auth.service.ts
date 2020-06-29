import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenStorage} from "./token.storage";
import {Router} from "@angular/router";

const DECODED_ROLES = 'userRole';
const DECODED_USERNAME = 'userName';

@Injectable()
export class AuthService {

  redirectURL: string;

  constructor(private http: HttpClient, private router: Router, private token: TokenStorage) {
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

  findUsername() {
    let decodedJwtData = JSON.parse(atob(this.token.getToken().split('.')[1]));
    let userName: string = '';
    userName = decodedJwtData.sub;
    sessionStorage.setItem(DECODED_USERNAME, userName);
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

  public logOut() {
    sessionStorage.removeItem('AuthToken');
    sessionStorage.removeItem('userRole');
    this.http.get<any>('http://localhost:8080/logout');
  }
}
