import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from "../model/game.model";

@Injectable()
export class GameService {

  private gameUrl = 'http://localhost:8080/games';

  constructor(private http: HttpClient) {
  }

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gameUrl);
  }

  public getMyGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gameUrl + "/my-games");
  }

  public getUpcomingGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gameUrl + "/upcoming");
  }

  public save(game: Game) {
    return this.http.post<String>(this.gameUrl + '/add', game, {observe: 'response'})
  }

  public update(game: Game) {
    return this.http.post<String>(this.gameUrl + '/update', game, {observe: 'response'})
  }

  public delete(id: number) {
    return this.http.post<String>(this.gameUrl + '/delete', id, {observe: 'response'})
  }

}
