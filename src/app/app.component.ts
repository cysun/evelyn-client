import { Component, OnInit, EventEmitter } from '@angular/core';

import { AuthService } from './core/auth.service';
import { MaterializeAction } from 'angular2-materialize';
import { BookmarkService } from './core/bookmark.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  childComponent: any;

  materializeActions = new EventEmitter<string | MaterializeAction>();

  constructor(private authService: AuthService, private bookmarkService: BookmarkService) { }

  ngOnInit(): void { this.authService.writeTokenToCookie(); }

  onRouterOutletActivate(component) {
    this.childComponent = component;
  }

  get authenticated(): boolean { return this.authService.isAuthenticated(); }

  logout(): void { this.authService.logout(); }

  cancelDeleteBookmarks(): void {
    this.materializeActions.emit({ action: 'modal', params: ['close'] });
  }

  confirmDeleteBookmarks(): void {
    this.materializeActions.emit({ action: 'modal', params: ['close'] });
    this.bookmarkService.deleteAllBookmarks().subscribe(() => {
      if (this.childComponent.bookmarks) {
        this.childComponent.bookmarks = [];
      }
    });
  }

}
