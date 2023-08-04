import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

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
    setCookie('token-trello', token, { expires: 1, path: '/' });
  }

  getToken() {
    const token = getCookie('token-trello');
    return token;

  }

  removeToken() {
    console.log('delete Token');

    removeCookie('token-trello');
    console.log(this._cookies.get('token-trello'));
  }
}
