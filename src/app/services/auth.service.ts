import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { decode as jwtDecode } from 'jsonwebtoken';
import { Observable } from 'rxjs/Observable';

interface LoginResponse {
  token: string;
}

@Injectable()
export class AuthService implements CanActivate {

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    this.http.post<LoginResponse>('/api/login', { username, password }).subscribe(data => {
      console.log(jwtDecode(data.token));
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') != null;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.isAuthenticated()) { return true; }

    this.router.navigate(['login']);
    return false;
  }

}
