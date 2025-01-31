import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { ResponseLogin } from '@models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<ResponseLogin>(this.apiUrl + 'auth/login', {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.access_token);
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(this.apiUrl + 'auth/register', {
      name,
      email,
      password,
    });
  }

  regissterAndLogin(name: string, email: string, password: string) {
    return this.register(name, email, password).pipe(
      switchMap(() => this.login(email, password))
    );
  }
  isAvailableEmail(email: string) {
    return this.http.post<{ isAvailable: boolean }>(
      this.apiUrl + 'auth/is-available',
      {
        email,
      }
    );
  }

  recovery(email: string) {
    return this.http.post(this.apiUrl + 'auth/recovery', {
      email,
    });
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(this.apiUrl + 'auth/change-password', {
      token,
      newPassword,
    });
  }

  logout(){
    this.tokenService.removeToken();
  }
}
