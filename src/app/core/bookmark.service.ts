import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Bookmark } from '../models/bookmark.model';
import { AuthService } from './auth.service';

@Injectable()
export class BookmarkService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>('/api/bookmarks');
  }

}
