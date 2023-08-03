import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(this.apiUrl + 'auth/login', {
      email,
      password,
    });
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
}
