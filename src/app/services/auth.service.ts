import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

interface LoginResponse {
  token: string;
}

@Injectable()
export class AuthService implements CanActivate {

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/login', { username, password });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwtToken');
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') != null;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.isAuthenticated()) { this.router.navigate(['']); }
    return true;
  }

}
