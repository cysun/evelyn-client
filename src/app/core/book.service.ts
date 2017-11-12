import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Book } from '../models/book.model';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books');
  }

  searchBooks(term: string): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books/search', {
      params: new HttpParams().set('term', term)
    });
  }

}
