import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from "../model/user.model";

@Injectable()
export class UserService {

  private userUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  public save(user: User) {
    return this.http.post<String>('http://localhost:8080/register', user, {observe: 'response'})
  }

  public update(user: User) {
    return this.http.post<String>(this.userUrl + '/update', user, {observe: 'response'})
  }

  public delete(id: number) {
    return this.http.post<String>(this.userUrl + '/delete', id, {observe: 'response'})
  }
}
