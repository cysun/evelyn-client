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

  getBookmark(bookId): Observable<Bookmark> {
    return this.http.get<Bookmark>('/api/bookmarks/book/' + bookId);
  }

  addBookmark(bookId, position: number): Observable<Bookmark> {
    return this.http.post<Bookmark>('/api/bookmarks', {
      book: bookId,
      position: position,
      date: new Date()
    });
  }

  updateBookmark(bookId, position: number): Observable<Bookmark> {
    return this.http.put<Bookmark>('/api/bookmarks/book/' + bookId, {
      book: bookId,
      position: position,
      date: new Date()
    });
  }

  deleteBookmark(id): Observable<Bookmark> {
    return this.http.delete<Bookmark>('/api/bookmarks/' + id);
  }

  deleteAllBookmarks(): Observable<string> {
    return this.http.delete('/api/bookmarks', { responseType: 'text' });
  }

}
