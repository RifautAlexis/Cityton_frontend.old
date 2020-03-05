import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser as User } from '@shared/models/User';
import { IUserRegister as UserRegister } from '@shared/models/UserRegister';
import { Role } from '@shared/models/Enum';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import * as jwtdecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentToken: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    const data = localStorage.getItem('currentToken');

    this.currentToken = new BehaviorSubject<string>(data ? data : null);
  }

  updateCurrentToken(token: string) {
    this.currentToken.next(token);
  }

  currentTokenValue() {
    return localStorage.getItem('currentToken');
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(environment.apiUrl + 'authenticate/login', { email, password })
      .pipe(map((data: any) => {
        let token = data.token;

        if (token) {
          localStorage.setItem('currentToken', token);
          this.currentToken.next(token);
        }

        return token;
      })

      )
  }

  register(userRegister: UserRegister): Observable<string> {
    return this.http.post<string>(environment.apiUrl + 'authenticate/register', userRegister)
      .pipe(map((token: string) => {

        if (token) {
          localStorage.setItem('currentToken', token);
          this.currentToken.next(token);
        }

        return token;
      })

      )
  }

  logout() {
    localStorage.removeItem('currentToken');
    this.currentToken.next(null);
  }

  getConnectedUser(): Observable<User> {
    return this.http.get<User>(environment.apiUrl + 'authenticate');
  }

  getUserId(): number {
    let token: string = localStorage.getItem('currentToken');
    let decodedToken: Token = jwtdecode(token);
    return Number(decodedToken.unique_name);
  }

  getUserRole(): Role {
    let token: string = localStorage.getItem('currentToken');
    let decodedToken: Token = jwtdecode(token);

    if (decodedToken.role === "Admin") {
      return Role.Admin;
    } else if (decodedToken.role === "Checker") {
      return Role.Checker;
    } else if (decodedToken.role === "Member") {
      return Role.Member;
    }
  }

}

interface Token {
  unique_name: string
  role: string;
}
