import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Result} from "../model/result.model";

@Injectable()
export class FavoriteService {

  private favoriteUrl = 'http://localhost:8080/favorites';

  constructor(private http: HttpClient) {
  }

  public check(id: number): Observable<Result> {
    return this.http.get<Result>(this.favoriteUrl + "/check/" + id);
  }

  public add(id: number) {
    return this.http.post<String>(this.favoriteUrl + "/add", id, {observe: 'response'});
  }

  public delete(id: number) {
    return this.http.post<String>(this.favoriteUrl + '/delete', id, {observe: 'response'});
  }

}
