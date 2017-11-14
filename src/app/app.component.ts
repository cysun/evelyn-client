import { Component, OnInit } from '@angular/core';

import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void { this.authService.writeTokenToCookie(); }

  get authenticated(): boolean { return this.authService.isAuthenticated(); }

  logout(): void { this.authService.logout(); }

}
