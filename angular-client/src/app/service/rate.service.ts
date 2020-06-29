import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Rate} from "../model/rate.model";
import {Game} from "../model/game.model";

@Injectable()
export class RateService {

  private rateUrl = 'http://localhost:8080/rates/';

  constructor(private http: HttpClient) {
  }

  public getGameRate(id: number): Observable<Rate> {
    return this.http.get<Rate>(this.rateUrl + id);
  }

  public getUserRateForGame(id: number): Observable<Rate> {
    return this.http.get<Rate>(this.rateUrl + "myRate/" + id);
  }

  public update(id: number, rate: number) {
    return this.http.post<String>(this.rateUrl + 'update/' + id, rate, {observe: 'response'})
  }
}
