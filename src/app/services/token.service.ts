import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private _cookies: CookieService) {}

  /* saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  removeToken() {
    localStorage.removeItem('token');
  } */

  saveToken(token: string) {
    this._cookies.set('token-trello', token, 1, '/');
  }

  getToken() {
    return this._cookies.get('token-trello');
  }

  removeToken() {
    this._cookies.delete('token-trello');
  }
}
