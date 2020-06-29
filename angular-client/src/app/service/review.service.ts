import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Review} from "../model/review.model";

@Injectable()
export class ReviewService {

  private reviewUrl = 'http://localhost:8080/reviews/';

  constructor(private http: HttpClient) {
  }

  public getGameReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.reviewUrl + id);
  }

  public save(review: Review, gameId: number) {
    return this.http.post<String>(this.reviewUrl + 'add/' + gameId, review, {observe: 'response'})
  }
}
