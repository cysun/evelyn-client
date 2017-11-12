import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Bookmark } from '../models/bookmark.model';

@Injectable()
export class BookmarkService {

  constructor(private http: HttpClient) { }

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>('/api/bookmarks');
  }

}
