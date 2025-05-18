import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserCredentials } from '../app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  signIn(credentials: IUserCredentials): Observable<any> {
return this.http.post(`${this.apiUrl}/api/signin`, credentials);
  }
}