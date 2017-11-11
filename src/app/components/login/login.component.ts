import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize/dist';
import { decode as jwtDecode } from 'jsonwebtoken';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  materializeActions = new EventEmitter<string | MaterializeAction>();

  constructor(private authService: AuthService, private router: Router) { }

  login(form: any): void {
    this.authService.login(this.username, this.password).subscribe(data => {
      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('currentUser', JSON.stringify(jwtDecode(data.token)));
      this.materializeActions.emit({ action: 'modal', params: ['close'] });
      this.router.navigate(['bookmarks']);
    }, err => {
      this.username = '';
      this.password = '';
    });
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['bookmarks']);
    }
  }


}
