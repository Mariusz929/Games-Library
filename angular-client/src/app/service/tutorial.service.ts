import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Tutorial} from "../model/tutorial.model";

@Injectable()
export class TutorialService {

  private tutorialUrl = 'http://localhost:8080/tutorials/';

  constructor(private http: HttpClient) {
  }

  public getAllTutorials(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(this.tutorialUrl);
  }

  public getGameTutorials(id: number): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(this.tutorialUrl + 'game/' + id);
  }

  public getTutorial(id: number): Observable<Tutorial> {
    return this.http.get<Tutorial>(this.tutorialUrl + id);
  }

  public save(tutorial: Tutorial, gameId: number) {
    return this.http.post<String>(this.tutorialUrl + 'add/' + gameId, tutorial, {observe: 'response'})
  }
}
