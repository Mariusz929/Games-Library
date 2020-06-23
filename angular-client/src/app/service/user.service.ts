import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User} from "../model/user.model";

@Injectable()
export class UserService {

  private userUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/users');
  }

  public save(user: User) {
    return this.http.post<String>(this.userUrl + '/register', user, {observe: 'response'})
  }
}
