import { Component, OnInit, EventEmitter } from '@angular/core';

import { AuthService } from './core/auth.service';
import { MaterializeAction } from 'angular2-materialize';
import { BookmarkService } from './core/bookmark.service';
import { BookService } from './core/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  childComponent: any;

  materializeActions = new EventEmitter<string | MaterializeAction>();

  ebooksUpdateInProgress = false;

  constructor(private authService: AuthService, private bookService: BookService,
    private bookmarkService: BookmarkService) { }

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

  cancelReindexBooks(): void {
    this.materializeActions.emit({ action: 'modal', params: ['close'] });
  }

  confirmReindexBooks(): void {
    this.materializeActions.emit({ action: 'modal', params: ['close'] });
    this.bookService.reindexBooks().subscribe(() => { });
  }

  cancelUpdateEbooks(): void {
    this.materializeActions.emit({ action: 'modal', params: ['close'] });
  }

  confirmUpdateEbooks(): void {
    this.materializeActions.emit({ action: 'modal', params: ['close'] });
    this.ebooksUpdateInProgress = true;
    this.bookService.updateEbooks().subscribe(() => {
      this.ebooksUpdateInProgress = false;
    });
  }

}
