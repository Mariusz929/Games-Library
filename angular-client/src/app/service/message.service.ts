import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Message} from "../model/message.model";

@Injectable()
export class MessageService {

  private contactUrl = 'http://localhost:8080/contact';

  constructor(private http: HttpClient) {
  }

  public send(message: Message) {
    return this.http.post<String>(this.contactUrl, message, {observe: 'response'})
  }

}
