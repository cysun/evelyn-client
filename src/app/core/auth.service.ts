import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

import { User } from '../models/user.model';

interface LoginResponse {
  token: string;
}

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/login', { username, password });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwtToken');
    this.router.navigate(['']);
  }

  getCurrentUser(): User {
    const s = localStorage.getItem('currentUser');
    return s != null ? JSON.parse(s) : null;
  }

  isAuthenticated(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser != null ? currentUser.exp * 1000 > Date.now() : false;
  }

  writeTokenToCookie() {
    if (this.isAuthenticated() && !this.cookieService.get('jwtToken')) {
      this.cookieService.put('jwtToken', localStorage.getItem('jwtToken'));
    }
  }

}
